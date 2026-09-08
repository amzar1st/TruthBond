"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { TRUTHBOND_DEPLOYMENT } from "@/lib/truthbond/deployment";
import { normalizeError } from "@/lib/truthbond/format";
import { ensureStudionet } from "@/lib/truthbond/sdk";

type Address = `0x${string}`;

interface WalletContextValue {
  address: Address | null;
  chainId: number | null;
  connecting: boolean;
  error: string | null;
  isCorrectNetwork: boolean;
  hasProvider: boolean;
  connect(): Promise<Address | null>;
  switchNetwork(): Promise<void>;
}

const WalletContext = createContext<WalletContextValue | null>(null);

function parseChainId(value: unknown) {
  if (typeof value !== "string") return null;
  const parsed = Number.parseInt(value, 16);
  return Number.isFinite(parsed) ? parsed : null;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<Address | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasProvider, setHasProvider] = useState(false);

  const syncWallet = useCallback(async () => {
    const provider = window.ethereum;
    setHasProvider(Boolean(provider));
    if (!provider) return;
    const [accounts, currentChain] = await Promise.all([
      provider.request({ method: "eth_accounts" }),
      provider.request({ method: "eth_chainId" }),
    ]);
    const nextAccounts = Array.isArray(accounts) ? accounts : [];
    setAddress((nextAccounts[0] as Address | undefined) ?? null);
    setChainId(parseChainId(currentChain));
  }, []);

  useEffect(() => {
    void syncWallet();
    const provider = window.ethereum;
    if (!provider?.on) return;

    const handleAccounts = (...args: unknown[]) => {
      const accounts = args[0];
      const list = Array.isArray(accounts) ? accounts : [];
      setAddress((list[0] as Address | undefined) ?? null);
      setError(null);
    };
    const handleChain = (...args: unknown[]) => {
      setChainId(parseChainId(args[0]));
      setError(null);
    };
    provider.on("accountsChanged", handleAccounts);
    provider.on("chainChanged", handleChain);
    return () => {
      provider.removeListener?.("accountsChanged", handleAccounts);
      provider.removeListener?.("chainChanged", handleChain);
    };
  }, [syncWallet]);

  const connect = useCallback(async () => {
    const provider = window.ethereum;
    setError(null);
    if (!provider) {
      setError("MetaMask was not detected. Install or open this page in MetaMask.");
      return null;
    }
    setConnecting(true);
    try {
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      const next = Array.isArray(accounts) ? (accounts[0] as Address | undefined) : undefined;
      setAddress(next ?? null);
      const currentChain = await provider.request({ method: "eth_chainId" });
      setChainId(parseChainId(currentChain));
      return next ?? null;
    } catch (walletError) {
      setError(normalizeError(walletError));
      return null;
    } finally {
      setConnecting(false);
    }
  }, []);

  const switchNetwork = useCallback(async () => {
    const provider = window.ethereum;
    if (!provider) {
      setError("MetaMask was not detected.");
      return;
    }
    setConnecting(true);
    setError(null);
    try {
      await ensureStudionet(provider);
      const currentChain = await provider.request({ method: "eth_chainId" });
      setChainId(parseChainId(currentChain));
    } catch (walletError) {
      setError(normalizeError(walletError));
    } finally {
      setConnecting(false);
    }
  }, []);

  const value = useMemo<WalletContextValue>(
    () => ({
      address,
      chainId,
      connecting,
      error,
      isCorrectNetwork: chainId === TRUTHBOND_DEPLOYMENT.chainId,
      hasProvider,
      connect,
      switchNetwork,
    }),
    [address, chainId, connect, connecting, error, hasProvider, switchNetwork],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const value = useContext(WalletContext);
  if (!value) throw new Error("useWallet must be used inside WalletProvider");
  return value;
}
