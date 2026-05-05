import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const removedBookingPath = 'booking/schedule-appointment.html';
const thankYouPath = 'thank-you.html';
const legacyInternalBookingUrl = '/booking/schedule-appointment.html';
const directBookingUrl = 'https://booking.716detailing.com/booking/PGlYHaagbepUC7Fhmriz';
const legacyServiceMenuUrl = 'https://booking.716detailing.com/widget/service-menu/6916562e8d2159e52ad49b60';

const failures = [];

if (existsSync(removedBookingPath)) {
  failures.push(`Internal booking bridge should be removed: ${removedBookingPath}`);
}

if (!existsSync(thankYouPath)) {
  failures.push(`Missing tracked route file: ${thankYouPath}`);
}

const vercelConfig = JSON.parse(readFileSync('vercel.json', 'utf8'));
const redirects = vercelConfig.redirects ?? [];
const rewrites = vercelConfig.rewrites ?? [];

if (!redirects.some((redirect) => (
  redirect.source === legacyInternalBookingUrl
  && redirect.destination === directBookingUrl
  && redirect.permanent === true
))) {
  failures.push(`Missing permanent Vercel redirect from ${legacyInternalBookingUrl} to direct GHL booking URL`);
}

if (rewrites.some((rewrite) => rewrite.source === legacyInternalBookingUrl)) {
  failures.push(`Internal booking bridge should not have a Vercel rewrite: ${legacyInternalBookingUrl}`);
}

if (!rewrites.some((rewrite) => rewrite.source === '/thank-you.html' && rewrite.destination === '/thank-you.html')) {
  failures.push('Missing Vercel rewrite for /thank-you.html');
}

const sitemap = readFileSync('sitemap.xml', 'utf8');
const htmlRoutes = collectHtmlRoutes('.');
for (const route of htmlRoutes) {
  const loc = `https://www.716detailing.com${route}`;
  if (!sitemap.includes(`<loc>${loc}</loc>`)) {
    failures.push(`Missing sitemap URL: ${loc}`);
  }
}

if (sitemap.includes('<loc>https://www.716detailing.com/booking/schedule-appointment.html</loc>')) {
  failures.push('Sitemap still includes removed internal booking bridge URL');
}

const htmlFiles = collectHtmlFiles('.');
let directBookingHrefCount = 0;
for (const path of htmlFiles) {
  const html = readFileSync(path, 'utf8');
  if (html.includes(`href="${legacyInternalBookingUrl}"`) || html.includes(`href="${legacyServiceMenuUrl}"`)) {
    failures.push(`${path} still links to legacy/internal booking URL`);
  }

  const anchorMatches = html.matchAll(/<a\b[^>]*href=(['"])([^'"]+)\1[^>]*>([\s\S]*?)<\/a>/gi);
  for (const [, , href, label] of anchorMatches) {
    const labelText = label.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
    if (href === directBookingUrl) {
      directBookingHrefCount += 1;
    }
    if (href.includes('booking.716detailing.com') && href !== directBookingUrl) {
      failures.push(`${path} has non-direct GHL booking anchor: ${href}`);
    }
    if ((labelText.includes('book') || labelText.includes('schedule appointment'))
      && href.includes('booking.716detailing.com')
      && href !== directBookingUrl) {
      failures.push(`${path} has non-direct GHL booking CTA: ${href}`);
    }
  }
}

if (directBookingHrefCount === 0) {
  failures.push('No direct GHL booking hrefs found');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Direct GHL booking links, legacy redirect, and sitemap coverage verified.');

function collectHtmlRoutes(root) {
  return collectHtmlFiles(root)
    .map((path) => (path === 'index.html' ? '/' : `/${path}`))
    .sort();
}

function collectHtmlFiles(root) {
  const ignoredDirs = new Set(['.git', 'node_modules', '.hermes', 'backups-v1']);
  const files = [];

  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!ignoredDirs.has(entry.name)) {
          walk(join(dir, entry.name));
        }
        continue;
      }

      if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(join(dir, entry.name).replace(/^\.\//, '').replaceAll('\\', '/'));
      }
    }
  }

  walk(root);
  return files.sort();
}
