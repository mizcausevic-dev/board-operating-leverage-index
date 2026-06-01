import { toExport } from "../src/analyze.js";
import { sampleBoardOperatingLeverageIndex } from "../src/data/sampleVerticalBrief.js";
import { writeFileSync } from "node:fs";

const clean = sampleBoardOperatingLeverageIndex.map((item) => ({
  ...item,
  relatedSurfaces: [...item.relatedSurfaces].sort(),
  requiredEvidence: [...item.requiredEvidence].sort(),
  companyTags: [...item.companyTags].sort()
}));

writeFileSync("fixtures/board-operating-leverage-index.json", JSON.stringify(toExport(sampleBoardOperatingLeverageIndex), null, 2));

writeFileSync("fixtures/board-operating-leverage-index-clean.json", JSON.stringify(toExport(clean), null, 2));
