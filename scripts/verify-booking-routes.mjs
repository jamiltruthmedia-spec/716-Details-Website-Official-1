import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const legacyBookingRoute = '/booking/schedule-appointment.html';
const oldServiceMenuUrl = 'https://booking.716detailing.com/widget/service-menu/6916562e8d2159e52ad49b60';
const externalBookingUrl = 'https://booking.716detailing.com/booking/PGlYHaagbepUC7Fhmriz';
const homepagePath = 'index.html';

const failures = [];

const vercelConfig = JSON.parse(readFileSync('vercel.json', 'utf8'));
const redirects = vercelConfig.redirects ?? [];

if (
  !redirects.some(
    (redirect) =>
      redirect.source === legacyBookingRoute &&
      redirect.destination === externalBookingUrl &&
      redirect.permanent === true
  )
) {
  failures.push(`Missing permanent redirect from ${legacyBookingRoute} to the external booking URL`);
}

const legacyBookingRewrite = (vercelConfig.rewrites ?? []).find(
  (rewrite) => rewrite.source === legacyBookingRoute
);

if (legacyBookingRewrite) {
  failures.push(`Legacy booking route should not be rewritten internally: ${legacyBookingRoute}`);
}

const thankYouRewrite = (vercelConfig.rewrites ?? []).find(
  (rewrite) => rewrite.source === '/thank-you.html' && rewrite.destination === '/thank-you.html'
);
if (!thankYouRewrite) {
  failures.push('Missing Vercel rewrite for /thank-you.html');
}

const sitemap = readFileSync('sitemap.xml', 'utf8');
const htmlRoutes = collectHtmlRoutes('.');
for (const route of htmlRoutes) {
  if (route === legacyBookingRoute) {
    continue;
  }
  const loc = `https://www.716detailing.com${route}`;
  if (!sitemap.includes(`<loc>${loc}</loc>`)) {
    failures.push(`Missing sitemap URL: ${loc}`);
  }
}

if (sitemap.includes(`https://www.716detailing.com${legacyBookingRoute}`)) {
  failures.push(`Sitemap should not include the legacy booking route: ${legacyBookingRoute}`);
}

for (const file of htmlRoutes.map((route) => (route === '/' ? homepagePath : route.slice(1)))) {
  const contents = readFileSync(file, 'utf8');

  if (contents.includes(oldServiceMenuUrl)) {
    failures.push(`Stale service-menu booking URL still present in ${file}`);
  }

  if (contents.includes(`href="${legacyBookingRoute}"`)) {
    failures.push(`Legacy internal booking route still linked in ${file}`);
  }

  for (const match of contents.matchAll(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const href = match[1];
    const text = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const isBookingLink =
      text === 'Book Online' ||
      text === 'Book Now' ||
      text === 'Schedule Appointment' ||
      text === 'Book & Mention Add-Ons';

    if (isBookingLink && href !== externalBookingUrl) {
      failures.push(`${file} has booking link "${text}" pointing to ${href} instead of ${externalBookingUrl}`);
    }
  }
}

const homepage = readFileSync(homepagePath, 'utf8');

const homepageBookingCtas = [
  {
    name: 'mobile nav booking link',
    pattern: /<a href="([^"]+)" class="nav-mobile-book">Book Online<\/a>/
  },
  {
    name: 'hero booking CTA',
    pattern: /<a href="([^"]+)" class="cta-btn">Book Online<\/a>/
  },
  {
    name: 'service card booking CTAs',
    pattern: /<a href="([^"]+)" class="service-quote-btn">Book Online<\/a>/g,
    multiple: true
  },
  {
    name: 'footer schedule appointment link',
    pattern: /<li><a href="([^"]+)">Schedule Appointment<\/a><\/li>/
  }
];

for (const { name, pattern, multiple = false } of homepageBookingCtas) {
  if (multiple) {
    const matches = [...homepage.matchAll(pattern)];

    if (matches.length === 0) {
      failures.push(`Could not locate homepage ${name} in ${homepagePath}`);
      continue;
    }

    for (const match of matches) {
      const href = match[1];
      if (href !== externalBookingUrl) {
        failures.push(`Homepage ${name} should point to ${externalBookingUrl}, found ${href}`);
      }
    }

    continue;
  }

  const match = homepage.match(pattern);
  if (!match) {
    failures.push(`Could not locate homepage ${name} in ${homepagePath}`);
    continue;
  }

  const href = match[1];
  if (href !== externalBookingUrl) {
    failures.push(`Homepage ${name} should point to ${externalBookingUrl}, found ${href}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Direct booking URLs, stale-link cleanup, and sitemap coverage verified.');

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
