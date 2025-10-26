import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AnonAid</h1>
        <p className="text-xl text-gray-600 mb-6">
          A Web3 platform for privacy-preserving donations to sensitive causes
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/cause/humanitarian-relief"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md"
          >
            View Current Cause
          </Link>
          <Link
            href="/donate"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md"
          >
            Donate Now
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3">Donor Pseudonymity</h3>
          <p className="text-gray-600">
            Make contributions to sensitive causes without revealing your identity. Only your wallet address is visible on-chain.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3">Radical Transparency</h3>
          <p className="text-gray-600">
            All donations and withdrawals are recorded on the blockchain, providing full transparency on fund movements.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3">PYUSD Powered</h3>
          <p className="text-gray-600">
            Donate using PayPal USD (PYUSD), a fully backed stablecoin that bridges traditional finance with Web3.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mx-auto mb-4">1</div>
            <h4 className="font-bold mb-2">Connect</h4>
            <p className="text-gray-600">Connect your wallet and acquire PYUSD tokens</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mx-auto mb-4">2</div>
            <h4 className="font-bold mb-2">Approve</h4>
            <p className="text-gray-600">Approve the DonationPool contract to use your PYUSD</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mx-auto mb-4">3</div>
            <h4 className="font-bold mb-2">Donate</h4>
            <p className="text-gray-600">Make your donation to the humanitarian cause</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mx-auto mb-4">4</div>
            <h4 className="font-bold mb-2">Track</h4>
            <p className="text-gray-600">Monitor how funds are being utilized through blockchain transparency</p>
          </div>
        </div>
      </div>
    </div>
  );
}