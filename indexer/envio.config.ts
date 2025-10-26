// Mock configuration for development purposes
// In a real project, this would use the actual Envio library

// Mock createConfig function
function createConfig(config: any) {
  return config;
}

export default {
  contracts: {
    DonationPool: {
      abi: '../contracts/artifacts/contracts/DonationPool.sol/DonationPool.json',
      address: {
        '11155111': '0x0000000000000000000000000000000000000000', // Replace with actual deployed contract address on Sepolia
      },
      startBlock: 0, // Replace with actual deployment block
    },
  },
  networks: ['11155111'], // Sepolia testnet
};