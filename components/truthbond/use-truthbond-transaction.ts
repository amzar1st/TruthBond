"use client";

import { useCallback, useState } from "react";

import { normalizeError } from "@/lib/truthbond/format";
import { writeTruthBond } from "@/lib/truthbond/sdk";
import type { TransactionState } from "@/lib/truthbond/types";
import type { CalldataEncodable } from "genlayer-js/types";

import { useWallet } from "./wallet-provider";

const initialState: TransactionState = { phase: "idle", label: "" };

export function useTruthBondTransaction() {
  const { address, connect } = useWallet();
  const [state, setState] = useState<TransactionState>(initialState);

  const execute = useCallback(
    async (options: {
      functionName: string;
      args: CalldataEncodable[];
      value?: bigint;
      label: string;
    }) => {
      setState({ phase: "wallet", label: "Confirm the transaction in MetaMask" });
      let account = address;
      if (!account) account = await connect();
      if (!account) {
        setState({ phase: "failed", label: "Wallet connection required" });
        return null;
      }
      try {
        const result = await writeTruthBond(
          account,
          options.functionName,
          options.args,
          options.value ?? 0n,
          (hash) => {
            setState({
              phase: "consensus",
              label: `${options.label} is in consensus`,
              hash,
            });
          },
        );
        setState({
          phase: "succeeded",
          label: `${options.label} finalized successfully`,
          hash: result.hash,
        });
        try {
          const recent = JSON.parse(localStorage.getItem("truthbond-transactions") ?? "[]");
          localStorage.setItem(
            "truthbond-transactions",
            JSON.stringify(
              [{ hash: result.hash, label: options.label, timestamp: Date.now() }, ...recent].slice(
                0,
                12,
              ),
            ),
          );
        } catch {
          // Transaction success is not dependent on local browser storage.
        }
        return result;
      } catch (error) {
        setState((current) => ({
          phase: "failed",
          label: `${options.label} failed`,
          hash: current.hash,
          error: normalizeError(error),
        }));
        return null;
      }
    },
    [address, connect],
  );

  return { state, execute, reset: () => setState(initialState) };
}
