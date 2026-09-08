export const TRUTHBOND_DEPLOYMENT = {
  contractName: "TruthBondIntelligentContract",
  address: "0x9Cd93529fFba38Dc5c07eC8e9eef93D56E48d569" as `0x${string}`,
  deploymentTransaction:
    "0x9054a10345235bfdb07e68fcef4d1a68a7abb829b5cb2549332dd4e858e1dc83" as `0x${string}`,
  network: "studionet" as const,
  chainId: 61_999,
  rpcUrl: "https://studio.genlayer.com/api",
  explorerUrl: "https://explorer-studio.genlayer.com",
  deployedAt: "2026-09-08T08:54:00Z",
};

export const isContractConfigured = Boolean(TRUTHBOND_DEPLOYMENT.address);
