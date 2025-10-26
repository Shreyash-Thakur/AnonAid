# AnonAid

A Web3 crowdfunding dApp for privacy-preserving donations to sensitive causes. AnonAid pairs donor pseudonymity with radical transparency of funds.

## Overview

AnonAid allows donors to contribute PYUSD (PayPal USD stablecoin) on Sepolia to a single DonationPool smart contract per cause. The app shows live, verifiable on-chain flows (total raised, recent donations, NGO withdrawals) via an indexer + explorer, while an authorized NGO wallet can withdraw funds with on-chain proofs.

## Architecture

The project is structured as a monorepo with the following components:

- `/contracts`: Hardhat v3, Solidity contracts, tests, deployment scripts
- `/apps/web`: Next.js + React + Wagmi/RainbowKit for wallet connectivity, viem for contract calls
- `/indexer`: Envio HyperIndex schema + mappings + hosted deployment
- `/docs`: Documentation, prize checklists, demo script

## Setup

### Prerequisites

- Node.js (v18+)
- pnpm (v8+)
- MetaMask or another Ethereum wallet with Sepolia testnet configured

### Environment Variables

Create the following `.env` files:

**contracts/.env**
```
PRIVATE_KEY=your_private_key
RPC_URL_SEPOLIA=your_sepolia_rpc_url
ETHERSCAN_KEY=your_etherscan_api_key
```

**apps/web/.env.local**
```
NEXT_PUBLIC_CONTRACT_ADDRESS=deployed_contract_address
NEXT_PUBLIC_PYUSD_ADDRESS=pyusd_token_address
NEXT_PUBLIC_ENVIO_URL=your_envio_graphql_endpoint
```

### Installation

```bash
# Install all dependencies
pnpm i
```

### Running the Project

```bash
# Start the Next.js web app
pnpm -w run dev

# Run contract tests
pnpm -F contracts run test

# Deploy contracts to Sepolia
pnpm -F contracts run deploy

# Verify contracts on Sepolia
pnpm -F contracts run verify
```

## Legal & Ethical Note

AnonAid is a technical demonstration. It provides pseudonymity at the wallet level (not full anonymity). NGOs using this platform should ensure compliance with relevant regulations and perform necessary KYC/AML procedures if required by law. This application does not provide legal advice or ensure regulatory compliance for donation recipients.

## License

MIT