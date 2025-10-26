# AnonAid - Privacy-Preserving Donation Platform

A Web3 crowdfunding platform that enables privacy-preserving donations to sensitive humanitarian causes using PYUSD stablecoin.

## 🌟 Features

- **Donor Pseudonymity**: Contributors can donate without revealing their real identity - only wallet addresses are visible on-chain
- **Radical Transparency**: All donations and withdrawals are permanently recorded on blockchain for complete fund tracking
- **PYUSD Integration**: Uses PayPal USD stablecoin for stable value donations bridging traditional finance with Web3
- **NGO Fund Management**: Authorized NGO wallets can withdraw funds with full on-chain transparency
- **Real-time Analytics**: Live donation tracking and cause progress monitoring

## 🏗️ Project Structure

```
AnonAid/
├── apps/
│   ├── web/           # Next.js frontend (original)
│   └── vite-web/      # Vite + React frontend (demo)
├── contracts/         # Smart contracts (Hardhat)
├── indexer/          # Envio indexer configuration
└── docs/             # Documentation
```

## 🚀 Quick Start

### Frontend (Vite Demo)
```bash
cd apps/vite-web
npm install
npm run dev
```

Visit `http://localhost:5174` to see the demo.

### Smart Contracts
```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test
```

## 🛠️ Technology Stack

- **Frontend**: Vite + React (JavaScript), Next.js (TypeScript)
- **Smart Contracts**: Solidity, Hardhat 3
- **Blockchain**: Ethereum Sepolia Testnet
- **Token**: PYUSD (PayPal USD)
- **Indexing**: Envio HyperIndex
- **Explorer**: Blockscout Integration

## 📱 Demo

The Vite frontend (`apps/vite-web`) provides a fully functional demo with:
- Mock donation flows
- Simulated wallet connections
- Real-time UI updates
- Responsive design

## 🔒 Privacy & Transparency

AnonAid balances privacy and transparency by:
- Showing only wallet addresses (not real identities) on-chain
- Recording all transactions permanently on blockchain
- Providing NGO withdrawal transparency
- Enabling cause-specific fund tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🏆 Hackathon

Built for Web3 hackathons focusing on social impact and financial inclusion.
