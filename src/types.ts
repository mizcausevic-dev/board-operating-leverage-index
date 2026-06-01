export type LeverageTrack =
  | "AI_PLATFORM"
  | "IDENTITY_SECURITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "PROCUREMENT_TRUST"
  | "PUBLIC_SECTOR";

export type LeverageAction = "SCALE" | "FORTIFY" | "REDEPLOY" | "ESCALATE";

export interface BoardOperatingLeverageItem {
  id: string;
  owner: string;
  audience: string;
  track: LeverageTrack;
  action: LeverageAction;
  leverageTheme: string;
  boardQuestion: string;
  currentPosture: string;
  requiredProof: string;
  leverageScore: number;
  dragPressureScore: number;
  ownerReadinessScore: number;
  reinvestmentConfidenceScore: number;
  urgencyScore: number;
  annualLeverageValueMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
  requiredEvidence: string[];
}

export interface BoardOperatingLeverageExport {
  generatedAt: string;
  items: BoardOperatingLeverageItem[];
}

export type FindingCode =
  | "scale-ready"
  | "drag-pocket"
  | "owner-readiness-gap"
  | "reinvestment-gap"
  | "escalation-needed";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  track: LeverageTrack;
  audience: string;
  message: string;
}

export interface BoardOperatingLeverageReport {
  generatedAt: string;
  items: number;
  averageLeverageScore: number;
  averageDragPressureScore: number;
  averageOwnerReadinessScore: number;
  averageReinvestmentConfidenceScore: number;
  averageUrgencyScore: number;
  scaleReadyLanes: number;
  escalationLanes: number;
  annualLeverageValueMillions: number;
  findingsList: Finding[];
  ok: boolean;
}
