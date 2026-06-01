import { analyze } from "../analyze.js";
import { sampleBoardOperatingLeverageIndex } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardOperatingLeverageIndex, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageLeverageScore: report.averageLeverageScore,
    averageDragPressureScore: report.averageDragPressureScore,
    averageOwnerReadinessScore: report.averageOwnerReadinessScore,
    averageReinvestmentConfidenceScore: report.averageReinvestmentConfidenceScore,
    averageUrgencyScore: report.averageUrgencyScore,
    scaleReadyLanes: report.scaleReadyLanes,
    escalationLanes: report.escalationLanes,
    annualLeverageValueMillions: report.annualLeverageValueMillions,
    highFindings,
    recommendation:
      "Scale procurement and AI reuse, redeploy revenue capacity cleanly, fortify identity and biotech readiness, and escalate FinTech drag before another board reinvestment ask."
  };
}

export function leverageIndex() {
  return sampleBoardOperatingLeverageIndex.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    action: item.action,
    leverageTheme: item.leverageTheme,
    leverageScore: item.leverageScore,
    nextMove: item.nextMove
  }));
}

export function dragPockets() {
  return sampleBoardOperatingLeverageIndex.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    dragPressureScore: item.dragPressureScore,
    ownerReadinessScore: item.ownerReadinessScore,
    reinvestmentConfidenceScore: item.reinvestmentConfidenceScore,
    requiredEvidence: item.requiredEvidence
  }));
}

export function scalingMotions() {
  return sampleBoardOperatingLeverageIndex.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    action: item.action,
    annualLeverageValueMillions: item.annualLeverageValueMillions,
    leverageScore: item.leverageScore,
    companyTags: item.companyTags
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic operating-leverage data only - no live board packets, budgets, or actual reinvestment approvals are included.",
    "Leverage, drag, owner readiness, reinvestment confidence, urgency, and annual leverage value metrics are modeled from the sample executive-intelligence estate in this repo.",
    "This surface is read-only and shows how Kinetic Gain can package board-readable operating leverage into one decision layer.",
    "Company tags and track labels are synthetic design aids rather than audited market or financial signals.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    leverageIndex: leverageIndex(),
    dragPockets: dragPockets(),
    scalingMotions: scalingMotions(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardOperatingLeverageIndex
  };
}
