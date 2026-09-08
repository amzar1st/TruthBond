import { ExternalLink } from "lucide-react";
import { TRUTHBOND_DEPLOYMENT } from "@/lib/truthbond/deployment";
import { shortenAddress } from "@/lib/truthbond/format";

export function ContractStrip() {
  const address = TRUTHBOND_DEPLOYMENT.address;
  return <div className="contract-strip"><div><span className="live-dot" /> Live on GenLayer Studionet</div><div className="contract-address"><span>Intelligent Contract</span><a href={`${TRUTHBOND_DEPLOYMENT.explorerUrl}/address/${address}`} target="_blank" rel="noreferrer">{shortenAddress(address, 8)} <ExternalLink size={14} /></a></div></div>;
}
