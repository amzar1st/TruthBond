"use client";

import { Activity, Award, Scale, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { ProtocolFooter } from "@/components/truthbond/protocol-footer";
import { ProtocolHeader } from "@/components/truthbond/protocol-header";
import { WalletButton } from "@/components/truthbond/wallet-button";
import { useWallet } from "@/components/truthbond/wallet-provider";
import { formatGen, shortenAddress } from "@/lib/truthbond/format";
import { readReputation } from "@/lib/truthbond/sdk";
import type { UserReputation } from "@/lib/truthbond/types";

export default function ProfilePage(){const {address}=useWallet();const [rep,setRep]=useState<UserReputation|null>(null);useEffect(()=>{if(address)readReputation(address).then(setRep).catch(()=>setRep(null));else setRep(null)},[address]);return <><ProtocolHeader/><main className="page-shell"><div className="page-intro"><span className="kicker">PROTOCOL IDENTITY</span><h1>Reputation follows evidence.</h1><p>Participation statistics inform the community. They never replace validator evaluation of the public record.</p></div>{!address?<section className="connect-card"><ShieldCheck size={42}/><h2>Connect your wallet</h2><p>View claims, challenges, payouts, and your on-chain TruthBond score.</p><WalletButton/></section>:<><section className="profile-banner"><div><span>CONNECTED PARTICIPANT</span><h2>{shortenAddress(address,8)}</h2></div><div className="score-ring"><strong>{rep?.score??0}</strong><span>score</span></div></section><section className="reputation-grid"><div><Activity/><span>Total disputes</span><strong>{rep?.totalDisputesParticipated??0}</strong></div><div><ShieldCheck/><span>Claims verified</span><strong>{rep?.claimsVerified??0}</strong></div><div><Scale/><span>Successful challenges</span><strong>{rep?.successfulChallenges??0}</strong></div><div><Award/><span>Total payouts</span><strong>{formatGen(rep?.totalPayouts??0n)}</strong></div></section><section className="ledger-panel reputation-details"><h2>Activity ledger</h2><div><span>Claims created</span><strong>{rep?.claimsCreated??0}</strong></div><div><span>Claims disproven</span><strong>{rep?.claimsDisproven??0}</strong></div><div><span>Unsuccessful challenges</span><strong>{rep?.unsuccessfulChallenges??0}</strong></div></section></>}</main><ProtocolFooter/></>}
