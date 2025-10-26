"use client";

import { useState, useEffect } from 'react';
import { DEFAULT_CAUSE_ID } from '@/lib/constants';

type CauseDashboardProps = {
  causeId?: string;
  contractAddress?: string;
};

export default function CauseDashboard({ causeId, contractAddress }: CauseDashboardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mock data for demo
  const totalRaised = '50000000'; // 50 PYUSD
  const withdrawn = '15000000'; // 15 PYUSD
  const donorCount = '24';
  const lastDonationTime = Math.floor(Date.now() / 1000) - 1800; // 30 minutes ago

  // Calculate available balance
  const getAvailableBalance = () => {
    return (Number(totalRaised) - Number(withdrawn)).toString();
  };

  // Format timestamp
  const formatTimestamp = (timestamp: number | null) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp * 1000).toLocaleString();
  };

  // Simulate loading for demo
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-gray-100 rounded"></div>
          <div className="h-24 bg-gray-100 rounded"></div>
          <div className="h-24 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-6">Humanitarian Relief Fund</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
          <h3 className="text-sm uppercase text-blue-700 font-semibold">Total Raised</h3>
          <p className="text-3xl font-bold mt-2">
            {Number(totalRaised) / 1000000} PYUSD
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-green-50 border border-green-100">
          <h3 className="text-sm uppercase text-green-700 font-semibold">Available Balance</h3>
          <p className="text-3xl font-bold mt-2">
            {Number(getAvailableBalance()) / 1000000} PYUSD
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
          <h3 className="text-sm uppercase text-purple-700 font-semibold">Unique Donors</h3>
          <p className="text-3xl font-bold mt-2">
            {donorCount}
          </p>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-lg bg-gray-50 border">
          <h3 className="text-sm uppercase text-gray-700 font-semibold">Total Withdrawn</h3>
          <p className="text-xl font-semibold mt-2">
            {Number(withdrawn) / 1000000} PYUSD
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-gray-50 border">
          <h3 className="text-sm uppercase text-gray-700 font-semibold">Last Donation</h3>
          <p className="text-xl font-semibold mt-2">
            {formatTimestamp(lastDonationTime)}
          </p>
        </div>
      </div>
      
      <div className="mt-8 p-4 border-t pt-6">
        <p className="text-sm text-gray-600">
          All transactions are transparent and verifiable on the blockchain.
          The NGO can only withdraw funds through the authorized wallet address.
        </p>
      </div>
    </div>
  );
}