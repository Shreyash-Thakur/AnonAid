"use client";

import { useState, useEffect } from 'react';
import { DEFAULT_CAUSE_ID } from '@/lib/constants';

// Interface for donation data
interface Donation {
  id: string;
  txHash: string;
  donor: string;
  amount: string;
  timestamp: string;
}

export default function RecentDonations() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Helper to format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Mock donation data for demo
  const mockDonations: Donation[] = [
    {
      id: '1',
      txHash: '0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234',
      donor: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      amount: '10000000', // 10 PYUSD (assuming 6 decimals)
      timestamp: (Math.floor(Date.now() / 1000) - 300).toString() // 5 minutes ago
    },
    {
      id: '2',
      txHash: '0x223456789abcdef123456789abcdef123456789abcdef123456789abcdef1234',
      donor: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      amount: '5000000', // 5 PYUSD
      timestamp: (Math.floor(Date.now() / 1000) - 1800).toString() // 30 minutes ago
    },
    {
      id: '3',
      txHash: '0x323456789abcdef123456789abcdef123456789abcdef123456789abcdef1234',
      donor: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      amount: '20000000', // 20 PYUSD
      timestamp: (Math.floor(Date.now() / 1000) - 7200).toString() // 2 hours ago
    },
    {
      id: '4',
      txHash: '0x423456789abcdef123456789abcdef123456789abcdef123456789abcdef1234',
      donor: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
      amount: '15000000', // 15 PYUSD
      timestamp: (Math.floor(Date.now() / 1000) - 86400).toString() // 1 day ago
    },
  ];

  // Helper to format timestamp
  const formatTimestamp = (timestamp: string) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleString();
  };

  // Simulate loading for demo purposes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-lg border p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h3 className="text-xl font-semibold mb-4">Recent Donations</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 font-semibold">Donor</th>
              <th className="text-right py-2 font-semibold">Amount</th>
              <th className="text-right py-2 font-semibold">Time</th>
              <th className="text-right py-2 font-semibold">Transaction</th>
            </tr>
          </thead>
          <tbody>
            {mockDonations.map((donation) => (
              <tr key={donation.id} className="border-b">
                <td className="py-3">{formatAddress(donation.donor)}</td>
                <td className="py-3 text-right">
                  {Number(donation.amount) / 1000000} PYUSD
                </td>
                <td className="py-3 text-right">
                  {formatTimestamp(donation.timestamp)}
                </td>
                <td className="py-3 text-right">
                  <a 
                    href="#"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}