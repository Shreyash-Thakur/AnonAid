import React, { useState } from 'react';
import Header from './components/Header.jsx';
import DonateForm from './components/DonateForm.jsx';
import RecentDonations from './components/RecentDonations.jsx';
import CauseDashboard from './components/CauseDashboard.jsx';
import AdminPanel from './components/AdminPanel.jsx';

export default function App() {
  const [route, setRoute] = useState('home');

  return (
    <div className="app-root">
      <Header onNavigate={setRoute} />

      <main className="container">
        {route === 'home' && (
          <div>
            <h1 className="title">AnonAid — Privacy-Preserving Donations</h1>
            <p className="lead">A lightweight demo UI (Vite + React, JavaScript only).</p>

            <div className="grid">
              <CauseDashboard />
              <div>
                <h2>About</h2>
                <p>
                  This demo uses mocked data and does not connect to blockchain backends.
                </p>
              </div>
            </div>
          </div>
        )}

        {route === 'donate' && (
          <div>
            <h1 className="title">Make a Donation</h1>
            <div className="card">
              <DonateForm />
            </div>
            <div className="spacer" />
            <RecentDonations />
          </div>
        )}

        {route === 'admin' && (
          <div>
            <h1 className="title">NGO Admin Panel</h1>
            <div className="card">
              <AdminPanel />
            </div>
          </div>
        )}

        {route === 'cause' && (
          <div>
            <h1 className="title">Cause Dashboard</h1>
            <CauseDashboard />
          </div>
        )}
      </main>

      <footer className="footer">AnonAid © {new Date().getFullYear()}</footer>
    </div>
  );
}
