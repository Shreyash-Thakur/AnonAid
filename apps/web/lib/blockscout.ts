/**
 * Blockscout stubs for frontend-only demo mode
 *
 * The frontend uses `getTxUrl` for links and may call `fetchRecentDonations` in some
 * code paths. To avoid runtime network calls during the demo, return mocked data.
 */

// Helper function to get transaction URL for Blockscout explorer
export function getTxUrl(txHash: string): string {
  return `https://sepolia.blockscout.com/tx/${txHash}`;
}

// Helper function to get contract URL for Blockscout explorer
export function getContractUrl(contractAddress: string): string {
  return `https://sepolia.blockscout.com/address/${contractAddress}`;
}

// Return mocked recent donations for the frontend demo
export async function fetchRecentDonations(contractAddress: string, limit: number = 10) {
  const now = Math.floor(Date.now() / 1000);
  const mock = [
    {
      donor: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      amount: '10000000',
      causeId: '0x57f466d717692502288eab6114fc5e63a55c42b5e927cfc52a0be2b1701281eb',
      txHash: '0x1111111111111111111111111111111111111111111111111111111111111111',
      timestamp: (now - 300).toString(),
    },
    {
      donor: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      amount: '5000000',
      causeId: '0x57f466d717692502288eab6114fc5e63a55c42b5e927cfc52a0be2b1701281eb',
      txHash: '0x2222222222222222222222222222222222222222222222222222222222222222',
      timestamp: (now - 1800).toString(),
    },
  ];

  return mock.slice(0, limit);
}

// For an Autoscout instance (if time allows)
export const AUTOSCOUT_URL = ""; // Placeholder