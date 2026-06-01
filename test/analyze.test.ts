import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardOperatingLeverageIndex } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleBoardOperatingLeverageIndex, { now: "2026-06-01T00:00:00Z" });
    expect(report.items).toBe(sampleBoardOperatingLeverageIndex.length);
  });

  it("computes positive leverage metrics", () => {
    const report = analyze(sampleBoardOperatingLeverageIndex, { now: "2026-06-01T00:00:00Z" });
    expect(report.averageLeverageScore).toBeGreaterThan(0);
    expect(report.averageReinvestmentConfidenceScore).toBeGreaterThan(0);
  });

  it("counts scale-ready and escalation lanes", () => {
    const report = analyze(sampleBoardOperatingLeverageIndex, { now: "2026-06-01T00:00:00Z" });
    expect(report.scaleReadyLanes).toBeGreaterThan(0);
    expect(report.escalationLanes).toBeGreaterThanOrEqual(0);
  });

  it("emits findings", () => {
    const report = analyze(sampleBoardOperatingLeverageIndex, { now: "2026-06-01T00:00:00Z" });
    expect(report.findingsList.length).toBeGreaterThan(0);
  });

  it("rolls up annual leverage value", () => {
    const report = analyze(sampleBoardOperatingLeverageIndex, { now: "2026-06-01T00:00:00Z" });
    expect(report.annualLeverageValueMillions).toBeGreaterThan(0);
  });
});
