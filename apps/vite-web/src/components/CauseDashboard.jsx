import React from 'react';

export default function CauseDashboard() {
  const totalRaised = 50; // PYUSD
  const available = 35; // PYUSD
  const donors = 24;
  const lastDonation = new Date(Date.now() - 30 * 60 * 1000).toLocaleString();

  return (
    <div className="card">
      <h3>Humanitarian Relief Fund</h3>
      <div className="stats">
        <div className="stat">
          <div className="stat-title">Total Raised</div>
          <div className="stat-value">{totalRaised} PYUSD</div>
        </div>
        <div className="stat">
          <div className="stat-title">Available</div>
          <div className="stat-value">{available} PYUSD</div>
        </div>
        <div className="stat">
          <div className="stat-title">Donors</div>
          <div className="stat-value">{donors}</div>
        </div>
      </div>

      <div className="mt">
        <div className="muted">Last donation: {lastDonation}</div>
      </div>
    </div>
  );
}
