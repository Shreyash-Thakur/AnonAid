import DonateForm from '@/components/DonateForm';
import RecentDonations from '@/components/RecentDonations';

export default function DonatePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Make a Donation</h1>
      
      <div className="max-w-lg mx-auto mb-12">
        <p className="text-gray-600 mb-6 text-center">
          Your donation will directly support humanitarian relief efforts.
          All transactions are processed on-chain using PYUSD stablecoin,
          ensuring both transparency and donor pseudonymity.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <DonateForm />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Recent Donations</h2>
        <RecentDonations />
      </div>
    </div>
  );
}