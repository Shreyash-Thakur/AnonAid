import AdminPanel from '@/components/AdminPanel';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">NGO Admin Panel</h1>
      
      <div className="max-w-lg mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600 mb-6">
            This secure panel allows authorized NGO administrators to withdraw funds from the donation pool.
            All withdrawals are recorded on-chain for full transparency.
          </p>
          
          <AdminPanel />
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="font-medium text-yellow-800 mb-2">Important Note</h3>
          <p className="text-sm text-yellow-700">
            This page should only be accessed by authorized NGO administrators. All actions performed
            here will be permanently recorded on the blockchain.
          </p>
        </div>
      </div>
    </div>
  );
}