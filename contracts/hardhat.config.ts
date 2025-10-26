import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";

dotenv.config();

const RPC_URL_SEPOLIA = process.env.RPC_URL_SEPOLIA || "https://sepolia.infura.io/v3/your-api-key";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // For local testing
    hardhat: {
      type: "edr-simulated"
    },
    // For testnet deployment
    sepolia: {
      type: "http",
      url: RPC_URL_SEPOLIA,
      // Use a test mnemonic for local development only
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
      chainId: 11155111,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;