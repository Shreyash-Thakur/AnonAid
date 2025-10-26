import hre from "hardhat";
import dotenv from "dotenv";
import { Wallet } from "ethers";

dotenv.config();

async function main() {
  // Get the contract address from environment or previous deployment
  const contractAddress = process.env.CONTRACT_ADDRESS;
  
  if (!contractAddress) {
    console.error("Please set CONTRACT_ADDRESS in your .env file");
    return;
  }

  // Get the PYUSD address used during deployment
  const pyusdAddress = process.env.PYUSD_ADDRESS || "0x7EBD08ED9274833A82c68e98e076be3AE119EC29"; // Default example PYUSD address
  
  // Get the deployer address
  const privateKey = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
  const deployer = new Wallet(privateKey);
  
  console.log("Verifying contract at address:", contractAddress);
  
  try {
    // Verify contract
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [
        deployer.address, // Owner address
        pyusdAddress   // PYUSD address
      ],
    });
    console.log("Contract verified successfully");
  } catch (error) {
    console.error("Error verifying contract:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});