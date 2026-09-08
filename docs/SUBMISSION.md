# GenLayer Project Explorer submission

## Project name

TruthBond

## Primary tag

Dispute Resolution

Suggested sub-tags: AI, Oracles, Consumer, DeFi.

## One-liner (123 characters)

TruthBond turns disputed real-world claims into on-chain, evidence-backed verdicts using GenLayer consensus.

## Description

TruthBond is an on-chain evidence challenge protocol for objective, publicly verifiable claims. A creator states a fact and locks a GEN bond. A challenger matches that bond and both parties submit public evidence URLs. TruthBond’s GenLayer Intelligent Contract is the adjudicator: validators independently retrieve the evidence, treat page content as untrusted data, reason against explicit resolution criteria, and reach consensus on a structured VERIFIED, FALSE, or INCONCLUSIVE decision. The verdict, confidence, source tally, reason, reputation updates, and settlement credits are committed on-chain. VERIFIED awards the pot to the creator, FALSE awards it to the challenger, and INCONCLUSIVE refunds both. A responsive Next.js frontend provides MetaMask wallet connection, live contract reads, guarded actions, consensus transaction tracking, evidence inspection, and reputation profiles. GenLayer is essential because deterministic contracts cannot independently inspect current web evidence or interpret conflicting natural-language facts.

## How to review

1. Open the public TruthBond website and connect MetaMask to Studionet.
2. Open the resolved `truthbond-demo-002` claim.
3. Review its creator bond, matched challenge, and two public evidence URLs.
4. Inspect the validator-generated verdict, confidence, source tally, and reason.
5. Follow the contract and transaction links to GenLayer Explorer.
6. Confirm final state using `get_claim`, `get_claim_evidence`, and `get_protocol_stats`.

## Evidence links

- Website: pending public deployment verification
- Source: https://github.com/amzar1st/TruthBond
- Contract: https://explorer-studio.genlayer.com/address/0x9Cd93529fFba38Dc5c07eC8e9eef93D56E48d569
- Deployment: https://explorer-studio.genlayer.com/tx/0x9054a10345235bfdb07e68fcef4d1a68a7abb829b5cb2549332dd4e858e1dc83
- Resolution: https://explorer-studio.genlayer.com/tx/0x78c51b0219ade5f3c58467d10ace2c3f50e5460951e10ed8d70d432a609f2a72
- Settlement: https://explorer-studio.genlayer.com/tx/0x9cc7c1f17589f0d6e0a9999145f5ed685c869863fb28da44f481967912b155a2
- Demo transaction links: `docs/DEMO.md`
