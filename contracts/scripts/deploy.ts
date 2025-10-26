import { Contract, JsonRpcProvider, Wallet, ContractFactory, id } from "ethers";
import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  // Get the private key from environment variables
  const privateKey = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
  
  // Get RPC URL for Sepolia testnet
  const rpcUrl = process.env.RPC_URL_SEPOLIA || "https://sepolia.infura.io/v3/your-api-key";
  const provider = new JsonRpcProvider(rpcUrl);
  
  // Create wallet from private key
  const deployer = new Wallet(privateKey, provider);
  console.log("Deploying DonationPool contract with the account:", deployer.address);

  // Get the PYUSD address from the environment variables or use a default (Sepolia testnet)
  const pyusdAddress = process.env.PYUSD_ADDRESS || "0x7EBD08ED9274833A82c68e98e076be3AE119EC29"; // Default to example PYUSD address on Sepolia
  console.log("Using PYUSD address:", pyusdAddress);

  // Get the contract factory using the artifact directly
  const DonationPoolArtifact = JSON.parse(fs.readFileSync(
    path.join(__dirname, "..", "artifacts", "contracts", "DonationPool.sol", "DonationPool.json"), 
    "utf8"
  ));
  
  // Create contract factory
  const factory = new ContractFactory(
    DonationPoolArtifact.abi,
    DonationPoolArtifact.bytecode,
    deployer
  );
  
  // Deploy the contract
  console.log("Deploying contract...");
  const donationPool = await factory.deploy(deployer.address, pyusdAddress);
  await donationPool.waitForDeployment();
  
  const donationPoolAddress = await donationPool.getAddress();

  console.log("DonationPool deployed to:", donationPoolAddress);

  // Export contract address and ABI for the frontend
  const contractsDir = path.join(__dirname, "..", "..", "apps", "web", "lib");
  
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  // Import JSON using dynamic import for ESM compatibility
  const artifact = JSON.parse(fs.readFileSync(
    path.join(__dirname, "..", "artifacts", "contracts", "DonationPool.sol", "DonationPool.json"), 
    "utf8"
  ));

  // Create constants.ts with contract address and ABI
  fs.writeFileSync(
    path.join(contractsDir, "constants.ts"),
    `export const DONATION_POOL_ADDRESS = "${donationPoolAddress}";\n` +
    `export const PYUSD_ADDRESS = "${pyusdAddress}";\n` +
    `export const DONATION_POOL_ABI = ${JSON.stringify(artifact.abi, null, 2)};\n` +
    `export const DEFAULT_CAUSE_ID = "${id("HUMANITARIAN_RELIEF")}";\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});