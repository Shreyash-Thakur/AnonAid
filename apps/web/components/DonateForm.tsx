"use client";

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DEFAULT_CAUSE_ID } from '@/lib/constants';

export default function DonateForm() {
  const { toast } = useToast();
  const [amount, setAmount] = useState<string>('10');
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isDonating, setIsDonating] = useState<boolean>(false);
  
  // Mock balance for demo
  const formattedBalance = '100.00';
  
  // Handle amount presets
  const handlePresetClick = (value: string) => {
    setAmount(value);
  };

  // Handle approve PYUSD for DonationPool
  const handleApprove = async () => {
    try {
      setIsApproving(true);
      
      // Simulate approval process
      setTimeout(() => {
        setIsApproving(false);
        toast({
          title: "Approval Successful",
          description: "You can now make your donation.",
        });
      }, 1500);
      
    } catch (error) {
      console.error('Error approving PYUSD:', error);
      toast({
        variant: "destructive",
        title: "Approval Failed",
        description: "Failed to approve PYUSD. Please try again.",
      });
      setIsApproving(false);
    }
  };

  // Handle donate
  const handleDonate = async () => {
    try {
      setIsDonating(true);
      
      // Simulate donation process
      setTimeout(() => {
        setIsDonating(false);
        toast({
          title: "Thank You for Your Donation!",
          description: (
            <div>
              <p>Your contribution of {amount} PYUSD has been processed.</p>
              <p className="underline text-blue-500">View on Blockscout</p>
            </div>
          ),
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error donating:', error);
      toast({
        variant: "destructive",
        title: "Donation Failed",
        description: "Failed to process donation. Please try again.",
      });
      setIsDonating(false);
    }
  };

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">Donate PYUSD</h2>
      
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Your PYUSD Balance</p>
        <p className="text-xl font-semibold">{formattedBalance} PYUSD</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">Donation Amount (PYUSD)</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1"
            disabled={isApproving || isDonating}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            onClick={() => handlePresetClick('5')}
            disabled={isApproving || isDonating}
          >
            5 PYUSD
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handlePresetClick('10')}
            disabled={isApproving || isDonating}
          >
            10 PYUSD
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handlePresetClick('20')}
            disabled={isApproving || isDonating}
          >
            20 PYUSD
          </Button>
        </div>
        
        <div className="pt-4">
          {Math.random() > 0.5 ? (
            <Button 
              onClick={handleApprove} 
              disabled={isApproving || isDonating || Number(amount) <= 0}
              className="w-full"
            >
              {isApproving ? 'Approving...' : 'Approve PYUSD'}
            </Button>
          ) : (
            <Button 
              onClick={handleDonate} 
              disabled={isApproving || isDonating || Number(amount) <= 0}
              className="w-full"
            >
              {isDonating ? 'Processing...' : 'Donate Now'}
            </Button>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          Your donation will be pseudonymous on the blockchain. 
          100% of funds go to the humanitarian cause.
        </p>
      </div>
    </div>
  );
}