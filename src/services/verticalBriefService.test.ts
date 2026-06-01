import { describe, expect, it } from "vitest";
import { dragPockets, leverageIndex, payload, riskMap, scalingMotions, summary, verification } from "./verticalBriefService.js";

describe("board operating leverage service", () => {
  it("returns the summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the leverage index", () => {
    expect(leverageIndex()[0]?.audience).toBeTruthy();
  });

  it("returns the drag pockets view", () => {
    expect(dragPockets()[0]?.dragPressureScore).toBeGreaterThan(0);
  });

  it("returns the scaling motions view", () => {
    expect(scalingMotions()[0]?.annualLeverageValueMillions).toBeGreaterThan(0);
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification()[0]).toContain("Synthetic");
  });

  it("keeps the headline in the payload sample", () => {
    expect(payload().sample[0]?.headline).toBeTruthy();
  });
});
