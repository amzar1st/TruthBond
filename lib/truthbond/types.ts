export type ClaimStatus =
  | "OPEN"
  | "CHALLENGED"
  | "VERIFIED"
  | "FALSE"
  | "INCONCLUSIVE"
  | "EXPIRED"
  | "SETTLED";

export type Verdict = "VERIFIED" | "FALSE" | "INCONCLUSIVE" | "";

export interface TruthBondClaim {
  claimId: string;
  creator: `0x${string}`;
  claimText: string;
  resolutionCriteria: string;
  createdAt: number;
  challengeDeadline: number;
  resolutionDeadline: number;
  creatorBond: bigint;
  challenger: `0x${string}`;
  challengerBond: bigint;
  challengeReason: string;
  status: ClaimStatus;
  finalVerdict: Verdict;
  confidence: number;
  sourcesConfirming: number;
  sourcesContradicting: number;
  verdictReason: string;
  resolvedAt: number;
  resolver: `0x${string}`;
  creatorCredit: bigint;
  challengerCredit: bigint;
  creatorClaimed: boolean;
  challengerClaimed: boolean;
  settlementStatus: string;
  evidenceCount: number;
  preview?: boolean;
}

export interface TruthBondEvidence {
  submitter: `0x${string}`;
  url: string;
  note: string;
  supportsClaim: boolean;
  submittedAt: number;
}

export interface ProtocolStats {
  totalClaims: number;
  totalChallenged: number;
  totalVerified: number;
  totalFalse: number;
  totalInconclusive: number;
  totalExpired: number;
  totalSettled: number;
  activeOpen: number;
  activeChallenged: number;
  totalValueBonded: bigint;
  totalValuePaid: bigint;
  contractBalance: bigint;
}

export interface UserReputation {
  address: `0x${string}`;
  score: number;
  claimsCreated: number;
  claimsVerified: number;
  claimsDisproven: number;
  successfulChallenges: number;
  unsuccessfulChallenges: number;
  totalDisputesParticipated: number;
  totalPayouts: bigint;
}

export type TransactionPhase =
  | "idle"
  | "wallet"
  | "submitted"
  | "consensus"
  | "succeeded"
  | "failed";

export interface TransactionState {
  phase: TransactionPhase;
  label: string;
  hash?: `0x${string}`;
  error?: string;
}
