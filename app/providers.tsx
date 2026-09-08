"use client";

import { Toaster } from "sonner";

import { WalletProvider } from "@/components/truthbond/wallet-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#10181d",
            border: "1px solid rgba(148, 172, 180, 0.2)",
            color: "#edf7f7",
          },
        }}
      />
    </WalletProvider>
  );
}
