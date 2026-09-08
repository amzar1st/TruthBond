"use client";

import { AlertCircle, Check, ExternalLink, LoaderCircle, Wallet } from "lucide-react";

import { TRUTHBOND_DEPLOYMENT } from "@/lib/truthbond/deployment";
import type { TransactionState } from "@/lib/truthbond/types";

export function TransactionPanel({ state }: { state: TransactionState }) {
  if (state.phase === "idle") return null;
  const isLoading = ["wallet", "submitted", "consensus"].includes(state.phase);
  return (
    <div className={`transaction-panel tx-${state.phase}`} role="status" aria-live="polite">
      <div className="tx-icon">
        {state.phase === "wallet" && <Wallet size={18} />}
        {isLoading && state.phase !== "wallet" && (
          <LoaderCircle className="spin" size={18} />
        )}
        {state.phase === "succeeded" && <Check size={18} />}
        {state.phase === "failed" && <AlertCircle size={18} />}
      </div>
      <div>
        <strong>{state.label}</strong>
        {state.phase === "consensus" && (
          <p>Submitted on-chain. Waiting for validator consensus and execution finality.</p>
        )}
        {state.error && <p>{state.error}</p>}
        {state.hash && (
          <a
            href={`${TRUTHBOND_DEPLOYMENT.explorerUrl}/tx/${state.hash}`}
            target="_blank"
            rel="noreferrer"
          >
            Transaction {state.hash.slice(0, 10)}…{state.hash.slice(-6)}
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
}
