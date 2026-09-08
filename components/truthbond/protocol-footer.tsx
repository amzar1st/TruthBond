import Link from "next/link";
import { Brand } from "./logo";

export function ProtocolFooter() {
  return <footer className="site-footer"><div><Brand /><p>Evidence-backed verdicts. Bonded on-chain.</p></div><nav><Link href="/">Explore</Link><Link href="/create">Create claim</Link><a href="https://github.com/amzar1st/TruthBond" target="_blank" rel="noreferrer">GitHub</a></nav></footer>;
}
