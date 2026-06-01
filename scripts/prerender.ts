import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  renderDocs,
  renderLeverageIndex,
  renderOverview,
  renderDragPockets,
  renderScalingMotions,
  renderVerification
} from "../src/services/render.js";
import {
  leverageIndex,
  scalingMotions,
  payload,
  dragPockets,
  riskMap,
  summary,
  verification
} from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderOverview()]],
  ["/leverage-index", ["leverage-index/index.html", renderLeverageIndex()]],
  ["/drag-pockets", ["drag-pockets/index.html", renderDragPockets()]],
  ["/scaling-motions", ["scaling-motions/index.html", renderScalingMotions()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://leverage.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://leverage.kineticgain.com/</loc></url><url><loc>https://leverage.kineticgain.com/leverage-index/</loc></url><url><loc>https://leverage.kineticgain.com/drag-pockets/</loc></url><url><loc>https://leverage.kineticgain.com/scaling-motions/</loc></url><url><loc>https://leverage.kineticgain.com/verification/</loc></url><url><loc>https://leverage.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/leverage-index.json": leverageIndex(),
  "api/drag-pockets.json": dragPockets(),
  "api/scaling-motions.json": scalingMotions(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
