// Direct deployment script without Hardhat
// This script uses ethers.js directly to deploy the contract
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Solidity compiler output - you'll need to compile the contract first
// Can use solcjs directly if needed
const contractPath = path.join(__dirname, '../contracts/DonationPool.sol');
const outputDir = path.join(__dirname, '../build');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function compileSolidity() {
  // Check if ABI file exists
  const abiPath = path.join(outputDir, 'DonationPool.abi');
  const binPath = path.join(outputDir, 'DonationPool.bin');
  
  if (!fs.existsSync(abiPath) || !fs.existsSync(binPath)) {
    console.log('Compiled files not found. Please compile the contract first.');
    return null;
  }
  
  try {
    const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
    const bytecode = '0x' + fs.readFileSync(binPath, 'utf8').toString().trim();
    
    return { abi, bytecode };
  } catch (error) {
    console.error('Error reading compiled files:', error);
    return null;
  }
}

async function deployContract() {
  // Get credentials from .env file
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const RPC_URL = process.env.RPC_URL_SEPOLIA;
  const PYUSD_ADDRESS = process.env.PYUSD_ADDRESS || "0x7EBD08ED9274833A82c68e98e076be3AE119EC29";
  
  if (!PRIVATE_KEY || !RPC_URL) {
    console.error('Please set PRIVATE_KEY and RPC_URL_SEPOLIA in your .env file');
    return;
  }
  
  try {
    // Connect to the network
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log(`Connected to the network with address: ${wallet.address}`);
    
    // Get balance to ensure we have funds for deployment
    const balance = await provider.getBalance(wallet.address);
    console.log(`Account balance: ${ethers.formatEther(balance)} ETH`);
    
    if (balance === 0n) {
      console.error('Account has no ETH for deployment. Please fund your account.');
      return;
    }
    
    // Get contract data
    const compiled = await compileSolidity();
    if (!compiled) return;
    
    console.log('Deploying DonationPool contract...');
    
    // Deploy the contract
    const factory = new ethers.ContractFactory(compiled.abi, compiled.bytecode, wallet);
    const contract = await factory.deploy(wallet.address, PYUSD_ADDRESS);
    
    console.log(`Transaction hash: ${contract.deploymentTransaction().hash}`);
    await contract.waitForDeployment();
    
    const contractAddress = await contract.getAddress();
    console.log(`DonationPool deployed at address: ${contractAddress}`);
    
    // Update the .env file with the contract address
    const envPath = path.join(__dirname, '../.env');
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(/CONTRACT_ADDRESS=.*/, `CONTRACT_ADDRESS=${contractAddress}`);
    fs.writeFileSync(envPath, envContent);
    
    // Export contract address and ABI for the frontend
    const webLibDir = path.join(__dirname, '../../apps/web/lib');
    if (!fs.existsSync(webLibDir)) {
      fs.mkdirSync(webLibDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(webLibDir, 'constants.ts'),
      `export const DONATION_POOL_ADDRESS = "${contractAddress}";\n` +
      `export const PYUSD_ADDRESS = "${PYUSD_ADDRESS}";\n` +
      `export const DONATION_POOL_ABI = ${JSON.stringify(compiled.abi, null, 2)};\n` +
      `export const DEFAULT_CAUSE_ID = "${ethers.id("HUMANITARIAN_RELIEF")}";\n`
    );
    
    // Also update the web app's .env.local file
    const webEnvPath = path.join(__dirname, '../../apps/web/.env.local');
    if (fs.existsSync(webEnvPath)) {
      let webEnvContent = fs.readFileSync(webEnvPath, 'utf8');
      webEnvContent = webEnvContent.replace(/NEXT_PUBLIC_CONTRACT_ADDRESS=.*/, `NEXT_PUBLIC_CONTRACT_ADDRESS="${contractAddress}"`);
      fs.writeFileSync(webEnvPath, webEnvContent);
    }
    
    console.log('Deployment completed successfully!');
  } catch (error) {
    console.error('Error deploying contract:', error);
  }
}

// Run the deployment
deployContract().catch(console.error);