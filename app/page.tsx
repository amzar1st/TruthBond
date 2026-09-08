"use client";

import { ArrowRight, DatabaseZap, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClaimCard } from "@/components/truthbond/claim-card";
import { ContractStrip } from "@/components/truthbond/contract-strip";
import { ProtocolFooter } from "@/components/truthbond/protocol-footer";
import { ProtocolHeader } from "@/components/truthbond/protocol-header";
import { EMPTY_STATS, PREVIEW_CLAIMS } from "@/lib/truthbond/demo";
import { formatGen } from "@/lib/truthbond/format";
import { readClaims, readProtocolStats } from "@/lib/truthbond/sdk";
import type { ProtocolStats, TruthBondClaim } from "@/lib/truthbond/types";

export default function Home() {
  const [claims, setClaims] = useState<TruthBondClaim[]>(PREVIEW_CLAIMS);
  const [stats, setStats] = useState<ProtocolStats>(EMPTY_STATS);
  const [live, setLive] = useState(false);
  useEffect(() => { Promise.all([readClaims(), readProtocolStats()]).then(([c, s]) => { setClaims(c); setStats(s); setLive(true); }).catch(() => setLive(false)); }, []);
  const active = claims.filter((claim) => !claim.finalVerdict && claim.status !== "EXPIRED");
  const resolved = claims.filter((claim) => Boolean(claim.finalVerdict));
  return <><ProtocolHeader /><main>
    <section className="hero section-shell"><div className="eyebrow"><span /> ON-CHAIN EVIDENCE PROTOCOL</div><h1>Facts deserve<br /><em>skin in the game.</em></h1><p>TruthBond turns disputed real-world claims into on-chain, evidence-backed verdicts using GenLayer consensus.</p><div className="hero-actions"><Link href="/create" className="button button-primary">Create a bonded claim <ArrowRight size={17} /></Link><a href="#claims" className="button button-secondary">Explore disputes</a></div><div className="trust-row"><span><ShieldCheck size={18} /> Validator consensus</span><span><DatabaseZap size={18} /> Public web evidence</span><span><Scale size={18} /> Enforced settlement</span></div></section>
    <div className="section-shell"><ContractStrip /></div>
    <section className="stats-grid section-shell" aria-label="Protocol statistics"><div><span>Total claims</span><strong>{live ? stats.totalClaims : "—"}</strong></div><div><span>Challenged</span><strong>{live ? stats.totalChallenged : "—"}</strong></div><div><span>Resolved</span><strong>{live ? stats.totalVerified + stats.totalFalse + stats.totalInconclusive : "—"}</strong></div><div><span>Value bonded</span><strong>{live ? formatGen(stats.totalValueBonded) : "—"}</strong></div></section>
    <section id="claims" className="claims-section section-shell"><div className="section-heading"><div><span className="kicker">ACTIVE LEDGER</span><h2>Claims under scrutiny</h2></div><Link href="/create">Post a claim <ArrowRight size={15} /></Link></div><div className="claim-grid">{active.length ? active.map((claim) => <ClaimCard key={claim.claimId} claim={claim} />) : <div className="empty-ledger">No active claims. Be the first to put a fact on the line.</div>}</div></section>
    <section className="process section-shell"><span className="kicker">HOW IT SETTLES</span><h2>Evidence becomes consequence.</h2><div className="process-grid">{[["01","Bond","A creator states an objective claim and locks GEN."],["02","Challenge","A counterparty matches the bond and states the dispute."],["03","Consensus","Validators independently retrieve evidence and reason."],["04","Settle","The structured verdict assigns claimable funds on-chain."]].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
    {resolved.length > 0 && <section className="claims-section section-shell"><div className="section-heading"><div><span className="kicker">FINAL VERDICTS</span><h2>Recently resolved</h2></div></div><div className="claim-grid">{resolved.map((claim)=><ClaimCard key={claim.claimId} claim={claim}/>)}</div></section>}
  </main><ProtocolFooter /></>;
}
