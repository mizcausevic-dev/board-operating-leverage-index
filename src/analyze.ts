import type {
  BoardOperatingLeverageExport,
  BoardOperatingLeverageItem,
  BoardOperatingLeverageReport,
  Finding
} from "./types.js";

function average(items: BoardOperatingLeverageItem[], pick: (item: BoardOperatingLeverageItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: BoardOperatingLeverageItem): Finding[] {
  const findings: Finding[] = [];

  if (item.action === "SCALE" && item.leverageScore >= 74 && item.dragPressureScore <= 38 && item.reinvestmentConfidenceScore >= 78) {
    findings.push({
      code: "scale-ready",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This lane is already showing reusable operating leverage that can scale into the next planning cycle."
    });
  }

  if (item.dragPressureScore >= 68) {
    findings.push({
      code: "drag-pocket",
      severity: item.dragPressureScore >= 80 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Drag pressure is still high enough that this lane will slow every new leverage motion."
    });
  }

  if (item.ownerReadinessScore <= 64) {
    findings.push({
      code: "owner-readiness-gap",
      severity: item.ownerReadinessScore <= 54 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Owner readiness is still too weak to scale this lane safely."
    });
  }

  if (item.reinvestmentConfidenceScore < 70) {
    findings.push({
      code: "reinvestment-gap",
      severity: item.reinvestmentConfidenceScore < 60 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Leadership still lacks enough confidence to reinvest on top of this leverage story."
    });
  }

  if (item.action === "ESCALATE") {
    findings.push({
      code: "escalation-needed",
      severity: "high",
      track: item.track,
      audience: item.audience,
      message: "This lane should be escalated before another scale or reinvestment claim reaches the board."
    });
  }

  return findings;
}

export function analyze(items: BoardOperatingLeverageItem[], options: { now?: string } = {}): BoardOperatingLeverageReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const scaleReadyLanes = items.filter((item) => item.action === "SCALE").length;
  const escalationLanes = items.filter((item) => item.action === "ESCALATE").length;
  const annualLeverageValueMillions = Math.round(items.reduce((sum, item) => sum + item.annualLeverageValueMillions, 0));

  return {
    generatedAt,
    items: items.length,
    averageLeverageScore: average(items, (item) => item.leverageScore),
    averageDragPressureScore: average(items, (item) => item.dragPressureScore),
    averageOwnerReadinessScore: average(items, (item) => item.ownerReadinessScore),
    averageReinvestmentConfidenceScore: average(items, (item) => item.reinvestmentConfidenceScore),
    averageUrgencyScore: average(items, (item) => item.urgencyScore),
    scaleReadyLanes,
    escalationLanes,
    annualLeverageValueMillions,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: BoardOperatingLeverageItem[], now?: string): BoardOperatingLeverageExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
