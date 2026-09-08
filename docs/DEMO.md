# TruthBond demo and reviewer guide

## Scenario

Claim ID: `truthbond-demo-002`

Claim: **Ethereum's Dencun upgrade activated on mainnet on March 13, 2024.**

Resolution criteria: verify the activation date with at least two independent, reliable public sources explicitly referring to Ethereum mainnet.

## Reviewer steps

1. Open the TruthBond website and connect MetaMask to GenLayer Studionet (`61999`).
2. Open `truthbond-demo-002` from the active or recently resolved ledger.
3. Inspect the two 1 GEN bonds, challenge argument, and two public evidence records.
4. Review the structured GenLayer verdict, confidence, source tally, and reason.
5. Open the contract and transaction links in GenLayer Explorer.
6. Confirm `get_claim("truthbond-demo-002")` and the protocol/reputation read methods reflect finalized state.

## Transaction record

| Action | Transaction |
| --- | --- |
| Deploy | [`0x9054…dc83`](https://explorer-studio.genlayer.com/tx/0x9054a10345235bfdb07e68fcef4d1a68a7abb829b5cb2549332dd4e858e1dc83) |
| Create demo claim | [`0x6f0f…c485`](https://explorer-studio.genlayer.com/tx/0x6f0f85ba30850effda2850818c3a37c029b4d6cea5aeffcddfd329a04a82c485) |
| Challenge | [`0xd2ed…6066`](https://explorer-studio.genlayer.com/tx/0xd2ed58ab513ff9204c1559c8d1c470183965eb55fce5dceac178c1d16f366066) |
| Ethereum Foundation evidence | [`0x21a4…fb8e`](https://explorer-studio.genlayer.com/tx/0x21a466544e0f43d11668f4c8be7a547e3a04b561c8c26395367d3d0d65dcfb8e) |
| Independent evidence | [`0xa835…8404`](https://explorer-studio.genlayer.com/tx/0xa835dd3faaaaaa12a7863c46eaf15e83f206160924776891c4ce0e2b1eb18404) |
| CoinDesk confirmation | [`0x8e5d…faa1`](https://explorer-studio.genlayer.com/tx/0x8e5d9e7d3516b2798776ebb2de6906ea9d87e28221a5a17ae49fe9b97968faa1) |
| Intelligent resolution | [`0x78c5…2a72`](https://explorer-studio.genlayer.com/tx/0x78c51b0219ade5f3c58467d10ace2c3f50e5460951e10ed8d70d432a609f2a72) |
| Creator settlement | [`0x9cc7…55a2`](https://explorer-studio.genlayer.com/tx/0x9cc7c1f17589f0d6e0a9999145f5ed685c869863fb28da44f481967912b155a2) |

## Verified outcome

- Verdict: `VERIFIED`
- Confidence: `97/100`
- Sources confirming/contradicting: `3 / 0`
- Creator credit: `2 GEN`
- Final claim status: `SETTLED`
- Settlement status: `DISPATCHED`
- Creator claimed: `true`

The first resolution attempt (`0x5dc27d9336cdde19ce030a7ff0c2de1e7bfb7f71224874d7fe0b6c05aa02d189`) finalized as `UNDETERMINED`; validators did not reach consensus and claim state did not change. A stronger independent same-day source was added before the successful retry. This is retained as useful evidence that TruthBond does not settle on a mere transaction submission or failed consensus round.

GenLayer Studio warns that its current token-transfer simulation is limited. The successful settlement transaction changed the authoritative contract state from `CLAIMABLE` to `SETTLED`, set `creator_claimed=true`, and marked the emitted payout `DISPATCHED`; the Studio account balance UI did not reflect the child value transfer.
