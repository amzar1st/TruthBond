import { ArrowUpRight, Clock, FileCheck2 } from "lucide-react";
import Link from "next/link";

import { formatGen, relativeDeadline, shortenAddress } from "@/lib/truthbond/format";
import type { TruthBondClaim } from "@/lib/truthbond/types";
import { StatusPill } from "./status-pill";

export function ClaimCard({ claim }: { claim: TruthBondClaim }) {
  const resolved = Boolean(claim.finalVerdict);
  return <Link href={`/claims/${claim.claimId}`} className="claim-card">
    <div className="claim-card-top"><StatusPill status={claim.finalVerdict || claim.status} /><span className="claim-id">#{claim.claimId}</span></div>
    <h3>{claim.claimText}</h3><p className="claim-criteria">{claim.resolutionCriteria}</p>
    <div className="claim-meta"><span><FileCheck2 size={15} /> {claim.evidenceCount} sources</span><span><Clock size={15} /> {resolved ? `${claim.confidence}% confidence` : relativeDeadline(claim.challengeDeadline)}</span></div>
    <div className="claim-card-bottom"><div><span>Bonded</span><strong>{formatGen(claim.creatorBond + claim.challengerBond)}</strong></div><div><span>Creator</span><strong>{shortenAddress(claim.creator)}</strong></div><ArrowUpRight size={20} /></div>
  </Link>;
}
