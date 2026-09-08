# GenLayer Project Explorer submission

## Project name

TruthBond

## Primary tag

Dispute Resolution

Suggested sub-tags: AI & Agents, Identity/Reputation, Onchain Justice.

## One-liner (108 characters)

TruthBond turns disputed real-world claims into on-chain, evidence-backed verdicts using GenLayer consensus.

## Description

TruthBond is an on-chain evidence challenge protocol for objective, publicly verifiable claims. A creator posts a claim and GEN bond; a challenger matches the bond and both submit public URLs. The TruthBondIntelligentContract—not the frontend—asks GenLayer validators to retrieve evidence, treat webpage text only as untrusted factual input, evaluate the claim against explicit criteria, and reach consensus on structured VERIFIED, FALSE, or INCONCLUSIVE fields. The finalized verdict, confidence, source counts, reasoning, reputation, and settlement credits are stored on-chain. VERIFIED awards the pot to the creator, FALSE to the challenger, and INCONCLUSIVE refunds both. A responsive Next.js app provides MetaMask connection, guarded transactions, live claim and evidence reads, settlement status, and reputation profiles. GenLayer is essential because deterministic smart contracts cannot independently read current public evidence and judge conflicting natural-language facts.

## How to review

1. Open the public TruthBond website and connect MetaMask to Studionet.
2. Open the resolved `truthbond-demo-002` claim.
3. Review its creator bond, matched challenge, and three public evidence URLs.
4. Inspect the validator-generated verdict, confidence, source tally, and reason.
5. Follow the contract and transaction links to GenLayer Explorer.
6. Confirm final state using `get_claim`, `get_claim_evidence`, and `get_protocol_stats`.

## Expected verification outcome

The demo claim resolves `VERIFIED` with confidence `97/100`, three confirming sources, zero contradicting sources, status `SETTLED`, settlement status `DISPATCHED`, and `creator_claimed = true`. The creator settlement credit is 2 GEN (the combined bonds).

## Network

Studio / Studionet (chain ID 61999).

## Evidence links

- Website: https://truthbond.amzar1st96.chatgpt.site
- Source: https://github.com/amzar1st/TruthBond
- Contract: https://explorer-studio.genlayer.com/address/0x9Cd93529fFba38Dc5c07eC8e9eef93D56E48d569
- Deployment: https://explorer-studio.genlayer.com/tx/0x9054a10345235bfdb07e68fcef4d1a68a7abb829b5cb2549332dd4e858e1dc83
- Resolution: https://explorer-studio.genlayer.com/tx/0x78c51b0219ade5f3c58467d10ace2c3f50e5460951e10ed8d70d432a609f2a72
- Settlement: https://explorer-studio.genlayer.com/tx/0x9cc7c1f17589f0d6e0a9999145f5ed685c869863fb28da44f481967912b155a2
- Demo transaction links: `docs/DEMO.md`
