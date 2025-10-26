declare module '@envio/hyperindex' {
  export function createConfig(config: any): any;
}

declare module './generated/handlers' {
  export interface DonationPoolDonateEvent {
    params: {
      donor: string;
      amount: string | number | bigint;
      causeId: string;
    };
    address: string;
    blockTimestamp: string | number;
    transactionHash: string;
    logIndex: string | number;
  }
  
  export interface DonationPoolWithdrawForNGOEvent {
    params: {
      ngoAddress: string;
      amount: string | number | bigint;
      causeId: string;
    };
    address: string;
    blockTimestamp: string | number;
    transactionHash: string;
    logIndex: string | number;
  }
  
  export interface HandleEvents<T, E> {
    (args: { event: any; context: any }): Promise<void>;
  }
  
  export interface HandleContract<T> {
    (args: { contractAddress: string; context: any }): Promise<void>;
  }
}

declare module './generated/entities' {
  export interface Cause {
    id: string;
    contractAddress: string;
    totalDonated: bigint;
    donorCount: number;
    donationCount: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Donation {
    id: string;
    cause: { id: string };
    donor: string;
    amount: bigint;
    timestamp: Date;
  }
  
  export interface Withdrawal {
    id: string;
    cause: { id: string };
    amount: bigint;
    ngoAddress: string;
    timestamp: Date;
  }
  
  export interface DonationStat {
    id: string;
    day: string;
    totalAmount: bigint;
    count: number;
  }
}