/**
 * Envio stubs for frontend-only demo mode
 *
 * To keep the demo frontend self-contained we'll return mocked data here.
 * Replace these with real GraphQL calls to your Envio endpoint when reconnecting
 * the indexer later.
 */

export async function getCauseTotals(causeId: string) {
  // Mocked totals (6 decimals assumed)
  return {
    causeId,
    totalRaised: '50000000', // 50.000000 PYUSD
    donorCount: '24',
    lastDonationAt: Math.floor(Date.now() / 1000).toString(),
    totalWithdrawn: '15000000', // 15.000000 PYUSD
  };
}

export async function getRecentDonations(causeId: string, limit: number = 10) {
  // Return a small set of mocked donation events
  const now = Math.floor(Date.now() / 1000);
  const mock = [
    {
      id: 'd1',
      txHash: '0x1111111111111111111111111111111111111111111111111111111111111111',
      donor: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      amount: '10000000', // 10 PYUSD
      causeId,
      timestamp: (now - 300).toString(),
    },
    {
      id: 'd2',
      txHash: '0x2222222222222222222222222222222222222222222222222222222222222222',
      donor: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      amount: '5000000', // 5 PYUSD
      causeId,
      timestamp: (now - 1800).toString(),
    },
  ];

  return mock.slice(0, limit);
}

export async function getRecentWithdrawals(causeId: string, limit: number = 10) {
  // No withdrawals in demo mode
  return [];
}