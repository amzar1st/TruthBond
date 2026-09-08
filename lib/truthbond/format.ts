import { formatEther } from "viem";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function shortenAddress(address?: string | null, size = 4) {
  if (!address) return "—";
  return `${address.slice(0, size + 2)}…${address.slice(-size)}`;
}

export function formatGen(value: bigint | string | number, precision = 3) {
  let amount: bigint;
  try {
    amount = typeof value === "bigint" ? value : BigInt(value);
  } catch {
    return "0 GEN";
  }
  const formatted = Number(formatEther(amount));
  return `${formatted.toLocaleString(undefined, {
    maximumFractionDigits: precision,
  })} GEN`;
}

export function formatDate(timestamp: number | string | bigint, withTime = true) {
  const value = Number(timestamp);
  if (!value) return "—";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(new Date(value * 1000));
}

export function relativeDeadline(timestamp: number) {
  const delta = timestamp * 1000 - Date.now();
  const absolute = Math.abs(delta);
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (absolute < 60 * 60 * 1000) {
    return formatter.format(Math.round(delta / 60_000), "minute");
  }
  if (absolute < 48 * 60 * 60 * 1000) {
    return formatter.format(Math.round(delta / 3_600_000), "hour");
  }
  return formatter.format(Math.round(delta / 86_400_000), "day");
}

export function normalizeError(error: unknown) {
  if (typeof error === "object" && error !== null) {
    const possible = error as { code?: number; shortMessage?: string; message?: string };
    if (possible.code === 4001) return "Transaction rejected in your wallet.";
    const message = possible.shortMessage ?? possible.message;
    if (message) {
      const rollback = message.match(/\[rollback\]\s*([^\n]+)/i);
      return rollback?.[1]?.trim() ?? message.split("\n")[0];
    }
  }
  return String(error || "Unexpected transaction error.");
}

export function statusLabel(status: string) {
  return status === "FALSE" ? "FALSE" : status.replaceAll("_", " ");
}
