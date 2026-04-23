import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const bookingPath = 'booking/schedule-appointment.html';
const thankYouPath = 'thank-you.html';
const internalBookingUrl = '/booking/schedule-appointment.html';
const externalBookingUrl = 'https://booking.716detailing.com/widget/service-menu/6916562e8d2159e52ad49b60';

const failures = [];

for (const path of [bookingPath, thankYouPath]) {
  if (!existsSync(path)) {
    failures.push(`Missing tracked route file: ${path}`);
  }
}

const vercelConfig = JSON.parse(readFileSync('vercel.json', 'utf8'));
const rewrites = vercelConfig.rewrites ?? [];
for (const route of [internalBookingUrl, '/thank-you.html']) {
  if (!rewrites.some((rewrite) => rewrite.source === route && rewrite.destination === route)) {
    failures.push(`Missing Vercel rewrite for ${route}`);
  }
}

const sitemap = readFileSync('sitemap.xml', 'utf8');
const htmlRoutes = collectHtmlRoutes('.');
for (const route of htmlRoutes) {
  const loc = `https://www.716detailing.com${route}`;
  if (!sitemap.includes(`<loc>${loc}</loc>`)) {
    failures.push(`Missing sitemap URL: ${loc}`);
  }
}

const homepage = readFileSync('index.html', 'utf8');
if (!homepage.includes(`href="${internalBookingUrl}"`)) {
  failures.push(`Homepage does not link to ${internalBookingUrl}`);
}

if (homepage.includes(`href="${externalBookingUrl}"`)) {
  failures.push('Homepage still links CTAs directly to the external booking service menu');
}

const homepageBookingCtas = [
  {
    name: 'hero CTA',
    pattern: /<div class="hero-cta">[\s\S]*?<a href="([^"]+)"(?:[^>]*onclick="([^"]*)")?[^>]*class="cta-btn primary"/
  },
  {
    name: 'mid-page CTA',
    pattern: /<section id="about" class="about">[\s\S]*?<a href="([^"]+)"(?:[^>]*onclick="([^"]*)")?[^>]*class="cta-btn">(?:Book Online|Get Free Quote)<\/a>/
  },
  {
    name: 'selection CTA',
    pattern: /<div class="selection-cta">[\s\S]*?<a href="([^"]+)"(?:[^>]*onclick="([^"]*)")?[^>]*class="cta-btn primary"/
  },
  {
    name: 'contact CTA',
    pattern: /<div class="contact-cta-buttons">[\s\S]*?<a href="([^"]+)"(?:[^>]*onclick="([^"]*)")?[^>]*class="cta-btn primary"/
  }
];

for (const { name, pattern } of homepageBookingCtas) {
  const match = homepage.match(pattern);

  if (!match) {
    failures.push(`Could not locate homepage ${name} in index.html`);
    continue;
  }

  const [, href, onclick = ''] = match;
  if (href !== internalBookingUrl) {
    failures.push(`Homepage ${name} should point to ${internalBookingUrl}, found ${href}`);
  }

  if (onclick.includes('openQuotePopup')) {
    failures.push(`Homepage ${name} should navigate to the booking route instead of opening the quote popup`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Booking routes, homepage CTAs, and sitemap coverage verified.');

function collectHtmlRoutes(root) {
  const ignoredDirs = new Set(['.git', 'node_modules', '.hermes', 'backups-v1']);
  const routes = [];

  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!ignoredDirs.has(entry.name)) {
          walk(join(dir, entry.name));
        }
        continue;
      }

      if (entry.isFile() && entry.name.endsWith('.html')) {
        const path = join(dir, entry.name).replace(/^\.\//, '').replaceAll('\\', '/');
        routes.push(path === 'index.html' ? '/' : `/${path}`);
      }
    }
  }

  walk(root);
  return routes.sort();
}
