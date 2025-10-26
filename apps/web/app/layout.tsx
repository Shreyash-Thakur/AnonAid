import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'AnonAid - Privacy-Preserving Donations',
  description: 'A Web3 crowdfunding dApp for privacy-preserving donations to sensitive causes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <header className="border-b py-4">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">AnonAid</h1>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    Connect Wallet
                  </button>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6">
              <div className="container mx-auto px-4">
                <p className="text-center text-sm text-gray-600">
                  AnonAid © {new Date().getFullYear()} - A Web3 platform for privacy-preserving donations
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}