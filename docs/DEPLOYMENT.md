# Deployment Guide

## Frontend Deployment

### Vercel Deployment (Recommended)

1. **Connect GitHub Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy from project root
   vercel --prod
   ```

2. **Configure Build Settings**
   - Build Command: `cd apps/vite-web && npm run build`
   - Output Directory: `apps/vite-web/dist`
   - Install Command: `npm install`

3. **Environment Variables**
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
   NEXT_PUBLIC_PYUSD_ADDRESS=0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
   ```

### Netlify Deployment

1. **Deploy via GitHub**
   - Connect repository
   - Build command: `cd apps/vite-web && npm run build`
   - Publish directory: `apps/vite-web/dist`

2. **Manual Deploy**
   ```bash
   cd apps/vite-web
   npm run build
   # Upload dist/ folder to Netlify
   ```

## Smart Contract Deployment

### Sepolia Testnet

1. **Setup Environment**
   ```bash
   cd contracts
   cp .env.example .env
   # Add your private key and RPC URL
   ```

2. **Deploy Contract**
   ```bash
   npx hardhat run scripts/deploy.ts --network sepolia
   ```

3. **Verify Contract**
   ```bash
   npx hardhat verify --network sepolia DEPLOYED_ADDRESS "NGO_WALLET_ADDRESS"
   ```

### Mainnet Deployment

⚠️ **IMPORTANT:** Thoroughly test on testnet first!

1. **Security Checklist**
   - [ ] Complete security audit
   - [ ] Multi-signature wallet setup
   - [ ] Emergency pause mechanism tested
   - [ ] Gas optimization verified

2. **Deploy to Mainnet**
   ```bash
   npx hardhat run scripts/deploy.ts --network mainnet
   ```

## Envio Indexer Deployment

1. **Install Envio CLI**
   ```bash
   npm install -g envio
   ```

2. **Deploy Indexer**
   ```bash
   cd indexer
   envio deploy
   ```

3. **Configure Endpoints**
   - Update frontend with GraphQL endpoint
   - Test queries in playground

## Domain Setup

1. **Custom Domain**
   - Configure DNS records
   - Setup SSL certificates
   - Enable HTTPS redirect

2. **CDN Configuration**
   - Configure caching headers
   - Enable compression
   - Setup geographic distribution

## Monitoring

1. **Analytics**
   - Google Analytics integration
   - User behavior tracking
   - Conversion metrics

2. **Error Tracking**
   - Sentry integration
   - Real-time error alerts
   - Performance monitoring

3. **Uptime Monitoring**
   - Health check endpoints
   - Alert notifications
   - Response time tracking

## Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] Wallet connection works
- [ ] Contract interactions functional
- [ ] Indexer data updates in real-time
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags configured
- [ ] Analytics tracking active
- [ ] Error monitoring enabled
- [ ] Backup procedures documented