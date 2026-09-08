"use client";

import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";
import { ExecutionResult, TransactionStatus } from "genlayer-js/types";
import type { CalldataEncodable } from "genlayer-js/types";

import { TRUTHBOND_DEPLOYMENT } from "./deployment";
import { normalizeError } from "./format";
import type {
  ProtocolStats,
  TruthBondClaim,
  TruthBondEvidence,
  UserReputation,
} from "./types";

type JsonRecord = Record<string, unknown>;
type Address = `0x${string}`;
type Hash = `0x${string}`;

export interface EthereumProvider {
  request(args: { method: string; params?: unknown[] | object }): Promise<unknown>;
  on?(event: string, listener: (...args: unknown[]) => void): void;
  removeListener?(event: string, listener: (...args: unknown[]) => void): void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

const readClient = createClient({ chain: studionet });

function record(value: unknown): JsonRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Contract returned an unexpected value.");
  }
  return value as JsonRecord;
}

function text(value: unknown): string {
  return typeof value === "string" ? value : String(value ?? "");
}

function number(value: unknown): number {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function bigint(value: unknown): bigint {
  try {
    return BigInt(value as string | number | bigint);
  } catch {
    return 0n;
  }
}

function bool(value: unknown): boolean {
  return value === true;
}

function requireAddress(): Address {
  if (!TRUTHBOND_DEPLOYMENT.address) {
    throw new Error("TruthBond is not deployed yet. The interface is in preview mode.");
  }
  return TRUTHBOND_DEPLOYMENT.address;
}

export function normalizeClaim(value: unknown): TruthBondClaim {
  const item = record(value);
  return {
    claimId: text(item.claim_id),
    creator: text(item.creator) as Address,
    claimText: text(item.claim_text),
    resolutionCriteria: text(item.resolution_criteria),
    createdAt: number(item.created_at),
    challengeDeadline: number(item.challenge_deadline),
    resolutionDeadline: number(item.resolution_deadline),
    creatorBond: bigint(item.creator_bond),
    challenger: text(item.challenger) as Address,
    challengerBond: bigint(item.challenger_bond),
    challengeReason: text(item.challenge_reason),
    status: text(item.status) as TruthBondClaim["status"],
    finalVerdict: text(item.final_verdict) as TruthBondClaim["finalVerdict"],
    confidence: number(item.confidence),
    sourcesConfirming: number(item.sources_confirming),
    sourcesContradicting: number(item.sources_contradicting),
    verdictReason: text(item.verdict_reason),
    resolvedAt: number(item.resolved_at),
    resolver: text(item.resolver) as Address,
    creatorCredit: bigint(item.creator_credit),
    challengerCredit: bigint(item.challenger_credit),
    creatorClaimed: bool(item.creator_claimed),
    challengerClaimed: bool(item.challenger_claimed),
    settlementStatus: text(item.settlement_status),
    evidenceCount: number(item.evidence_count),
  };
}

export function normalizeEvidence(value: unknown): TruthBondEvidence {
  const item = record(value);
  return {
    submitter: text(item.submitter) as Address,
    url: text(item.url),
    note: text(item.note),
    supportsClaim: bool(item.supports_claim),
    submittedAt: number(item.submitted_at),
  };
}

export async function readClaim(claimId: string) {
  const result = await readClient.readContract({
    address: requireAddress(),
    functionName: "get_claim",
    args: [claimId],
  });
  return normalizeClaim(result);
}

export async function readClaims() {
  const ids = await readClient.readContract({
    address: requireAddress(),
    functionName: "get_claims",
    args: [],
  });
  if (!Array.isArray(ids)) throw new Error("Claim index could not be decoded.");
  const claims = await Promise.all(ids.map((id) => readClaim(String(id))));
  return claims.sort((a, b) => b.createdAt - a.createdAt);
}

export async function readEvidence(claimId: string) {
  const result = await readClient.readContract({
    address: requireAddress(),
    functionName: "get_claim_evidence",
    args: [claimId],
  });
  if (!Array.isArray(result)) return [];
  return result.map(normalizeEvidence);
}

export async function readProtocolStats(): Promise<ProtocolStats> {
  const item = record(
    await readClient.readContract({
      address: requireAddress(),
      functionName: "get_protocol_stats",
      args: [],
    }),
  );
  return {
    totalClaims: number(item.total_claims),
    totalChallenged: number(item.total_challenged),
    totalVerified: number(item.total_verified),
    totalFalse: number(item.total_false),
    totalInconclusive: number(item.total_inconclusive),
    totalExpired: number(item.total_expired),
    totalSettled: number(item.total_settled),
    activeOpen: number(item.active_open),
    activeChallenged: number(item.active_challenged),
    totalValueBonded: bigint(item.total_value_bonded),
    totalValuePaid: bigint(item.total_value_paid),
    contractBalance: bigint(item.contract_balance),
  };
}

export async function readReputation(address: Address): Promise<UserReputation> {
  const item = record(
    await readClient.readContract({
      address: requireAddress(),
      functionName: "get_user_reputation",
      args: [address],
    }),
  );
  return {
    address: text(item.address) as Address,
    score: number(item.score),
    claimsCreated: number(item.claims_created),
    claimsVerified: number(item.claims_verified),
    claimsDisproven: number(item.claims_disproven),
    successfulChallenges: number(item.successful_challenges),
    unsuccessfulChallenges: number(item.unsuccessful_challenges),
    totalDisputesParticipated: number(item.total_disputes_participated),
    totalPayouts: bigint(item.total_payouts),
  };
}

export async function ensureStudionet(provider: EthereumProvider) {
  const chainId = `0x${TRUTHBOND_DEPLOYMENT.chainId.toString(16)}`;
  const current = await provider.request({ method: "eth_chainId" });
  if (String(current).toLowerCase() === chainId.toLowerCase()) return;
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  } catch (error) {
    const code = (error as { code?: number })?.code;
    if (code !== 4902) throw error;
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId,
          chainName: studionet.name,
          rpcUrls: studionet.rpcUrls.default.http,
          nativeCurrency: studionet.nativeCurrency,
          blockExplorerUrls: [TRUTHBOND_DEPLOYMENT.explorerUrl],
        },
      ],
    });
  }
}

export async function writeTruthBond(
  account: Address,
  functionName: string,
  args: CalldataEncodable[],
  value = 0n,
  onSubmitted?: (hash: Hash) => void,
) {
  const provider = window.ethereum;
  if (!provider) throw new Error("MetaMask was not detected in this browser.");
  await ensureStudionet(provider);
  const client = createClient({ chain: studionet, account, provider });
  const hash = (await client.writeContract({
    address: requireAddress(),
    functionName,
    args,
    value,
  })) as Hash;
  onSubmitted?.(hash);

  const receipt = await readClient.waitForTransactionReceipt({
    hash,
    status: TransactionStatus.FINALIZED,
    interval: 3_000,
    retries: 120,
  });
  if (receipt.txExecutionResultName !== ExecutionResult.FINISHED_WITH_RETURN) {
    let detail = `Execution ended as ${receipt.txExecutionResultName ?? "NOT_VOTED"}.`;
    try {
      const trace = await readClient.debugTraceTransaction({ hash });
      detail = trace.stderr || trace.genvm_log || detail;
    } catch {
      // The receipt result is still authoritative if trace retrieval is unavailable.
    }
    throw new Error(detail);
  }
  return { hash, receipt };
}

export async function transactionStatus(hash: Hash) {
  try {
    return await readClient.getTransaction({ hash });
  } catch (error) {
    throw new Error(normalizeError(error));
  }
}
