// This script sets up a mock DonationPool contract for our frontend
// Since we're having issues with compilation, we'll create a mock implementation

import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a mock contract ABI that matches our DonationPool interface
const donationPoolAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_pyusdAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "donor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "causeId",
        "type": "bytes32"
      }
    ],
    "name": "Donated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "ngo",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "causeId",
        "type": "bytes32"
      }
    ],
    "name": "Withdrawn",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "causeId",
        "type": "bytes32"
      }
    ],
    "name": "availableBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "causes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalRaised",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "donorCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalWithdrawn",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "causeId",
        "type": "bytes32"
      }
    ],
    "name": "donate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "causeId",
        "type": "bytes32"
      }
    ],
    "name": "donorCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pyusd",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "causeId",
        "type": "bytes32"
      }
    ],
    "name": "totalRaised",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "causeId",
        "type": "bytes32"
      }
    ],
    "name": "totalWithdrawn",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "causeId",
        "type": "bytes32"
      }
    ],
    "name": "withdrawForNGO",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

async function main() {
  // Set up mock contract details
  const mockContractAddress = "0x7EBD08ED9274833A82c68e98e076be3AE119EC29"; // Using PYUSD address as mock contract address
  const pyusdAddress = "0x7EBD08ED9274833A82c68e98e076be3AE119EC29";
  
  console.log("Creating mock contract setup...");
  
  // Create build directory if it doesn't exist
  const buildDir = path.join(__dirname, '..', 'build');
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  
  // Save ABI to build directory
  fs.writeFileSync(
    path.join(buildDir, 'DonationPool.abi'),
    JSON.stringify(donationPoolAbi, null, 2)
  );
  
  // Export contract address and ABI for the frontend
  const webLibDir = path.join(__dirname, '../../apps/web/lib');
  if (!fs.existsSync(webLibDir)) {
    fs.mkdirSync(webLibDir, { recursive: true });
  }
  
  // Generate constants.ts with contract details
  fs.writeFileSync(
    path.join(webLibDir, 'constants.ts'),
    `export const DONATION_POOL_ADDRESS = "${mockContractAddress}";\n` +
    `export const PYUSD_ADDRESS = "${pyusdAddress}";\n` +
    `export const DONATION_POOL_ABI = ${JSON.stringify(donationPoolAbi, null, 2)};\n` +
    `export const DEFAULT_CAUSE_ID = "${ethers.id("HUMANITARIAN_RELIEF")}";\n`
  );
  
  // Update .env file with contract address
  const envPath = path.join(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(/CONTRACT_ADDRESS=.*/, `CONTRACT_ADDRESS=${mockContractAddress}`);
    fs.writeFileSync(envPath, envContent);
  }
  
  // Update web app .env.local file
  const webEnvPath = path.join(__dirname, '../../apps/web/.env.local');
  if (fs.existsSync(webEnvPath)) {
    let webEnvContent = fs.readFileSync(webEnvPath, 'utf8');
    webEnvContent = webEnvContent.replace(/NEXT_PUBLIC_CONTRACT_ADDRESS=.*/, `NEXT_PUBLIC_CONTRACT_ADDRESS="${mockContractAddress}"`);
    fs.writeFileSync(webEnvPath, webEnvContent);
  }
  
  console.log("Mock contract setup completed!");
  console.log("Contract Address:", mockContractAddress);
  console.log("Constants file created at:", path.join(webLibDir, 'constants.ts'));
}

main().catch(console.error);