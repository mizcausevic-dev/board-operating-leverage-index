import type { BoardOperatingLeverageReport } from "./types.js";

export function toSummary(report: BoardOperatingLeverageReport) {
  return [
    `Leverage lanes: ${report.items}`,
    `Average leverage score: ${report.averageLeverageScore}`,
    `Average drag pressure: ${report.averageDragPressureScore}`,
    `Average owner readiness: ${report.averageOwnerReadinessScore}`,
    `Average reinvestment confidence: ${report.averageReinvestmentConfidenceScore}`,
    `Average urgency: ${report.averageUrgencyScore}`,
    `Scale-ready lanes: ${report.scaleReadyLanes}`,
    `Escalation lanes: ${report.escalationLanes}`,
    `Annual leverage value ($M): ${report.annualLeverageValueMillions}`,
    `High findings: ${report.findingsList.filter((item) => item.severity === "high").length}`
  ].join("\n");
}
