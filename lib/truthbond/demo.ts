import type { ProtocolStats, TruthBondClaim, TruthBondEvidence } from "./types";

// Fixed preview timestamp keeps server and client markup identical during hydration.
// Live contract data replaces these cards immediately after the first read.
const now = 1_788_858_000;

export const PREVIEW_CLAIMS: TruthBondClaim[] = [
  {
    claimId: "ethereum-merge-date",
    creator: "0x6a3f88ad65fd24948c5e62a79c00a9f5210a15ae",
    claimText: "The Ethereum Merge completed on September 15, 2022.",
    resolutionCriteria:
      "Confirm the completion date using at least two independent, reliable public sources that clearly identify the Ethereum Merge event.",
    createdAt: now - 3_200,
    challengeDeadline: now + 5_400,
    resolutionDeadline: now + 12_600,
    creatorBond: 500_000_000_000_000_000n,
    challenger: "0xb81177192eb5c54e71c1029edc8b23c690717c90",
    challengerBond: 500_000_000_000_000_000n,
    challengeReason: "The exact date should be established from independent public records.",
    status: "CHALLENGED",
    finalVerdict: "",
    confidence: 0,
    sourcesConfirming: 0,
    sourcesContradicting: 0,
    verdictReason: "",
    resolvedAt: 0,
    resolver: "0x0000000000000000000000000000000000000000",
    creatorCredit: 0n,
    challengerCredit: 0n,
    creatorClaimed: false,
    challengerClaimed: false,
    settlementStatus: "LOCKED",
    evidenceCount: 2,
    preview: true,
  },
  {
    claimId: "preview-resolved",
    creator: "0x98c515dbd8a65aab0cc4c57d2ef94d562a672a30",
    claimText: "Ethereum's Dencun upgrade activated on mainnet on March 13, 2024.",
    resolutionCriteria:
      "Use dated Ethereum Foundation material and at least one independent technical publication.",
    createdAt: now - 86_400,
    challengeDeadline: now - 72_000,
    resolutionDeadline: now - 68_400,
    creatorBond: 250_000_000_000_000_000n,
    challenger: "0x47d38e8dd9804a86a9d6fe2edb623f05866bb65d",
    challengerBond: 250_000_000_000_000_000n,
    challengeReason: "Require independent confirmation of the activation timestamp.",
    status: "VERIFIED",
    finalVerdict: "VERIFIED",
    confidence: 94,
    sourcesConfirming: 2,
    sourcesContradicting: 0,
    verdictReason:
      "Two independent dated sources confirm that the Dencun upgrade activated on Ethereum mainnet on March 13, 2024.",
    resolvedAt: now - 68_400,
    resolver: "0x3feaa31b2810de9c33a3ca6441f87c0634ce3f80",
    creatorCredit: 500_000_000_000_000_000n,
    challengerCredit: 0n,
    creatorClaimed: false,
    challengerClaimed: true,
    settlementStatus: "CLAIMABLE",
    evidenceCount: 2,
    preview: true,
  },
];

export const PREVIEW_EVIDENCE: TruthBondEvidence[] = [
  {
    submitter: PREVIEW_CLAIMS[0].creator,
    url: "https://ethereum.org/en/roadmap/merge/",
    note: "Ethereum Foundation overview and historical context.",
    supportsClaim: true,
    submittedAt: now - 2_900,
  },
  {
    submitter: PREVIEW_CLAIMS[0].challenger,
    url: "https://www.coindesk.com/tech/2022/09/15/ethereum-merge-complete/",
    note: "Independent contemporary report of completion.",
    supportsClaim: true,
    submittedAt: now - 2_600,
  },
];

export const EMPTY_STATS: ProtocolStats = {
  totalClaims: 0,
  totalChallenged: 0,
  totalVerified: 0,
  totalFalse: 0,
  totalInconclusive: 0,
  totalExpired: 0,
  totalSettled: 0,
  activeOpen: 0,
  activeChallenged: 0,
  totalValueBonded: 0n,
  totalValuePaid: 0n,
  contractBalance: 0n,
};
