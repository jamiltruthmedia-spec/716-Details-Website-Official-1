import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const checks = [
  {
    file: "mobile-car-detailing.html",
    mustNotContain: ["$89", "$149", "$229"],
  },
  {
    file: "mobile-car-detailing-near-me.html",
    mustNotContain: ["starts at $89", "starts at $149", "From $89", "From $149"],
  },
  {
    file: "rv-detailing.html",
    mustNotContain: ["$585", "$785", "$985"],
  },
  {
    file: "fleet-detailing.html",
    mustNotContain: ["From $49/vehicle", "From $89/vehicle", "Pricing starts at $49 per vehicle"],
  },
  {
    file: "dealership-detailing.html",
    mustNotContain: ["From $89/car", "From $149/car"],
  },
  {
    file: "window-tinting.html",
    mustContain: ["Starting at $300", "Starting at $400", "$140", "$190", "$60"],
    mustNotContain: ["Lifetime warranty", "$100", "$50", "$185", "$85"],
  },
  {
    file: "landing/window-tinting.html",
    mustContain: ["Starting at $300", "Starting at $400", "starting at $300", "starting at $400"],
    mustNotContain: ["$330", "$440", "Lifetime warranty", "MaxPro", "127 Google Reviews"],
  },
  {
    file: "ceramic-coating.html",
    mustContain: ["Starting at $1,200", "Starting at $1,800", "Starting at $2,500"],
    mustNotContain: ["$650", "$705", "$905", "$1,255"],
  },
  {
    file: "index.html",
    mustContain: [
      "Starting at $350",
      "Starting at $250",
      "Starting at $100",
      "Starting at $1,200",
      "Starting at $650+",
      "Starting at $300",
      "Custom Quote",
      "Starting at $485",
    ],
    mustNotContain: [
      "Starting at $705",
      "Starting at $290",
      "Starting at $220",
      "Starting at $85",
      "Starting at $89",
      "Starting at $585",
      "prices start at $89",
      "starts at $290",
      "starts at $705",
    ],
  },
];

const failures = [];

for (const check of checks) {
  const content = read(check.file);

  for (const expected of check.mustContain ?? []) {
    if (!content.includes(expected)) {
      failures.push(`${check.file}: missing "${expected}"`);
    }
  }

  for (const disallowed of check.mustNotContain ?? []) {
    if (content.includes(disallowed)) {
      failures.push(`${check.file}: still contains "${disallowed}"`);
    }
  }
}

for (const file of readdirSync(join(root, "locations"))) {
  if (!file.endsWith(".html")) continue;
  const path = `locations/${file}`;
  const content = read(path);
  if (content.includes('class="service-price"')) {
    failures.push(`${path}: still contains service-price markup`);
  }
}

if (failures.length) {
  console.error("TRU-72 validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("TRU-72 validation passed.");
