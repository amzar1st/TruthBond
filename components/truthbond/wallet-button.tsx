"use client";

import { AlertTriangle, ChevronDown, Wallet } from "lucide-react";

import { shortenAddress } from "@/lib/truthbond/format";

import { useWallet } from "./wallet-provider";

export function WalletButton() {
  const {
    address,
    connecting,
    connect,
    isCorrectNetwork,
    switchNetwork,
    error,
  } = useWallet();

  if (!address) {
    return (
      <div className="wallet-wrap">
        <button className="button button-primary button-small" onClick={() => void connect()}>
          <Wallet size={16} />
          {connecting ? "Connecting…" : "Connect wallet"}
        </button>
        {error && <span className="wallet-error">{error}</span>}
      </div>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <div className="wallet-wrap">
        <button
          className="button button-warning button-small"
          onClick={() => void switchNetwork()}
        >
          <AlertTriangle size={16} />
          {connecting ? "Switching…" : "Switch to Studionet"}
        </button>
        {error && <span className="wallet-error">{error}</span>}
      </div>
    );
  }

  return (
    <button className="wallet-connected" title={address}>
      <span className="network-dot" />
      {shortenAddress(address)}
      <ChevronDown size={14} />
    </button>
  );
}
