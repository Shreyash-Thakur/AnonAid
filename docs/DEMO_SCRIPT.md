# Demo Script

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see README.md for details)
4. Start the development server: `npm run dev`

## Demo Flow

### 1. Introduction (1 minute)

- Introduce AnonAid as a privacy-preserving donation platform
- Highlight the problem it solves: enabling anonymous donations to sensitive causes
- Mention technology stack: PYUSD, Hardhat 3, Blockscout, Envio

### 2. Smart Contract Overview (2 minutes)

- Show the `DonationPool.sol` contract code
- Explain the donation and withdrawal functions
- Highlight the privacy and transparency features
- Demonstrate contract deployment to Sepolia

### 3. User Journey: Making a Donation (3 minutes)

- Navigate to the AnonAid homepage
- Connect wallet using RainbowKit
- Select a cause (Humanitarian Relief Fund)
- Enter donation amount and approve PYUSD spending
- Complete the donation
- Show transaction confirmation and Blockscout explorer link

### 4. Dashboard and Transparency (2 minutes)

- Navigate to the Cause Dashboard
- Show real-time donation statistics from Envio indexer
- Demonstrate how fund transparency works
- Highlight donor pseudonymity preservation

### 5. NGO Administrator Perspective (2 minutes)

- Navigate to the Admin Panel
- Connect with NGO administrator wallet
- Show the withdrawal interface
- Demonstrate a withdrawal transaction
- Verify the transparency of the withdrawal on-chain

### 6. Technical Architecture Discussion (2 minutes)

- Explain the monorepo structure
- Discuss the indexer implementation with Envio
- Show how Blockscout integration provides transparency
- Highlight the PYUSD integration for stable value

### 7. Future Development and Conclusion (1 minute)

- Discuss potential future features
- Multiple causes support
- Enhanced privacy features
- Mobile application
- Q&A

## Preparation Checklist

- [ ] Ensure test PYUSD tokens are available in demo wallet
- [ ] Verify smart contract deployment on Sepolia
- [ ] Check that Envio indexer is running
- [ ] Test all demo flows before presentation
- [ ] Prepare backup video recording in case of technical issues