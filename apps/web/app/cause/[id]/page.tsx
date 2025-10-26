import { notFound } from 'next/navigation';
import CauseDashboard from '@/components/CauseDashboard';

type Props = {
  params: {
    id: string;
  };
};

// In a real app, this would fetch cause data from a database or API
const getCauseData = (id: string) => {
  if (id === 'humanitarian-relief') {
    return {
      id: 'humanitarian-relief',
      name: 'Humanitarian Relief Fund',
      description: 'Supporting emergency humanitarian aid in crisis regions',
      contractAddress: '0x7EBD08ED9274833A82c68e98e076be3AE119EC29',  // Using our mock contract address
      ngoWallet: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',        // Example wallet address
      raised: 0,                 // This would be fetched from blockchain/indexer
      goal: 10000,
      donorCount: 0,             // This would be fetched from blockchain/indexer
    };
  }
  return null;
};

export default function CausePage({ params }: Props) {
  const cause = getCauseData(params.id);

  if (!cause) {
    notFound();
    // TypeScript doesn't know notFound() prevents further execution
    // So we need to add a return statement to satisfy the type checker
    return null; 
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4 text-center">{cause.name}</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">{cause.description}</p>
      
      <CauseDashboard causeId={cause.id} contractAddress={cause.contractAddress} />
    </div>
  );
}