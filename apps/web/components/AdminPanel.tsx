"use client";

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DEFAULT_CAUSE_ID } from '@/lib/constants';

export default function AdminPanel() {
  const { toast } = useToast();
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  
  // Mock data for demo
  const availableBalance = '5000';
  const isAdmin = true;
  
  // Handle withdraw
  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    
    try {
      setIsWithdrawing(true);
      
      // Simulate withdrawal process
      setTimeout(() => {
        setIsWithdrawing(false);
        setWithdrawAmount('');
        toast({
          title: "Withdrawal Successful",
          description: (
            <div>
              <p>Your withdrawal of {withdrawAmount} PYUSD has been processed.</p>
              <p className="underline text-blue-500">View on Blockscout</p>
            </div>
          ),
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      toast({
        variant: "destructive",
        title: "Withdrawal Failed",
        description: "Failed to process withdrawal. Please try again.",
      });
      setIsWithdrawing(false);
    }
  };
  
  if (!isAdmin) {
    return (
      <div className="rounded-lg border p-8 text-center bg-yellow-50">
        <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
        <p className="mb-4">
          This area is restricted to the authorized NGO wallet address.
          Your current wallet does not have admin privileges.
        </p>
        <p className="text-sm text-gray-500">
          NGO Admin address: 0x1234...5678
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">NGO Admin Panel</h2>
      
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Available Balance</p>
        <p className="text-xl font-semibold">
          {Number(availableBalance) / 1000000} PYUSD
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="withdrawAmount">Withdrawal Amount (PYUSD)</Label>
          <Input
            id="withdrawAmount"
            type="number"
            min="0"
            step="1"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="mt-1"
            disabled={isWithdrawing}
          />
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={handleWithdraw} 
            disabled={
              isWithdrawing || 
              !withdrawAmount ||
              Number(withdrawAmount) <= 0
            }
            className="w-full"
          >
            {isWithdrawing ? 'Processing...' : 'Withdraw Funds'}
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          All withdrawals are recorded on-chain and fully transparent.
          Please submit proof of use after utilizing the funds.
        </p>
      </div>
    </div>
  );
}