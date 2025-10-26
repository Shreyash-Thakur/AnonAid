# Environment Setup Guide

This guide helps you set up the development environment for AnonAid.

## Prerequisites

- Node.js v18 or higher
- pnpm v8 or higher
- Git
- MetaMask or compatible Ethereum wallet

## Environment Variables

### Smart Contracts (.env in /contracts)

```bash
PRIVATE_KEY=your_ethereum_private_key_here
RPC_URL_SEPOLIA=https://sepolia.infura.io/v3/your_infura_key
ETHERSCAN_KEY=your_etherscan_api_key
```

### Frontend (.env.local in /apps/web)

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=deployed_contract_address
NEXT_PUBLIC_PYUSD_ADDRESS=0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
NEXT_PUBLIC_ENVIO_URL=your_envio_graphql_endpoint
```

## Quick Start Commands

```bash
# Install dependencies
pnpm install

# Start Vite demo
cd apps/vite-web && npm run dev

# Compile contracts
cd contracts && npx hardhat compile

# Run tests
cd contracts && npx hardhat test
```

## Network Configuration

AnonAid is configured for Ethereum Sepolia testnet:
- Chain ID: 11155111
- RPC URL: https://sepolia.infura.io/v3/YOUR_KEY
- Block Explorer: https://sepolia.etherscan.io