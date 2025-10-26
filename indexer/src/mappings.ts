import {
  DonationPoolDonateEvent,
  DonationPoolWithdrawForNGOEvent,
  HandleEvents,
  HandleContract,
} from './generated/handlers';
import { Cause, Donation, Withdrawal, DonationStat } from './generated/entities';

// Initialize the cause entity when indexing begins
const handleContract: HandleContract<'DonationPool'> = async ({ contractAddress, context }) => {
  const causeExists = await context.entities.Cause.findById(contractAddress);

  if (!causeExists) {
    await context.entities.Cause.create({
      id: contractAddress,
      contractAddress,
      totalDonated: BigInt(0),
      donorCount: 0,
      donationCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
};

// Handle donation events
const handleDonate: HandleEvents<'DonationPool', 'Donate'> = async ({ event, context }) => {
  const { donor, amount } = event.params;
  const causeId = event.address;

  // Get or create cause
  const cause = await context.entities.Cause.findById(causeId);
  if (!cause) {
    throw new Error(`Cause not found: ${causeId}`);
  }

  // Update cause stats
  const updatedCause = await context.entities.Cause.update({
    id: causeId,
    totalDonated: cause.totalDonated + BigInt(amount),
    donationCount: cause.donationCount + 1,
    updatedAt: new Date(),
  });

  // Check if this is a new donor
  const previousDonations = await context.entities.Donation.findAll({
    where: {
      cause: { id: causeId },
      donor,
    },
  });

  // If this is the first donation from this donor, increment donor count
  if (previousDonations.length === 0) {
    await context.entities.Cause.update({
      id: causeId,
      donorCount: updatedCause.donorCount + 1,
    });
  }

  // Create donation record
  const timestamp = new Date(Number(event.blockTimestamp) * 1000);
  const donationId = `${event.transactionHash}-${event.logIndex}`;
  
  await context.entities.Donation.create({
    id: donationId,
    cause: { id: causeId },
    donor,
    amount: BigInt(amount),
    timestamp,
  });

  // Update daily stats
  const day = timestamp.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const dayStatId = `${causeId}-${day}`;
  
  const existingStat = await context.entities.DonationStat.findById(dayStatId);
  
  if (existingStat) {
    await context.entities.DonationStat.update({
      id: dayStatId,
      totalAmount: existingStat.totalAmount + BigInt(amount),
      count: existingStat.count + 1,
    });
  } else {
    await context.entities.DonationStat.create({
      id: dayStatId,
      day,
      totalAmount: BigInt(amount),
      count: 1,
    });
  }
};

// Handle withdrawal events
const handleWithdrawForNGO: HandleEvents<'DonationPool', 'WithdrawForNGO'> = async ({ event, context }) => {
  const { ngoAddress, amount } = event.params;
  const causeId = event.address;
  
  // Create withdrawal record
  const withdrawalId = `${event.transactionHash}-${event.logIndex}`;
  const timestamp = new Date(Number(event.blockTimestamp) * 1000);
  
  await context.entities.Withdrawal.create({
    id: withdrawalId,
    cause: { id: causeId },
    amount: BigInt(amount),
    ngoAddress,
    timestamp,
  });

  // Update cause last updated time
  await context.entities.Cause.update({
    id: causeId,
    updatedAt: new Date(),
  });
};

export { handleContract, handleDonate, handleWithdrawForNGO };