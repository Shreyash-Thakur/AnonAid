import React, { useState } from 'react';

export default function DonateForm() {
  const [amount, setAmount] = useState('10');
  const [loading, setLoading] = useState(false);

  const handleDonate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Thank you — donated ${amount} PYUSD (demo)`);
    }, 1200);
  };

  return (
    <div className="donate">
      <p className="muted">Your balance: <strong>100.00 PYUSD</strong></p>

      <label className="label">Amount (PYUSD)</label>
      <input
        className="input"
        type="number"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="presets">
        <button className="btn outline" onClick={() => setAmount('5')}>5</button>
        <button className="btn outline" onClick={() => setAmount('10')}>10</button>
        <button className="btn outline" onClick={() => setAmount('20')}>20</button>
      </div>

      <button className="btn primary full" onClick={handleDonate} disabled={loading}>
        {loading ? 'Processing...' : 'Donate Now'}
      </button>

      <p className="small muted">This is a demo UI—no blockchain calls are made.</p>
    </div>
  );
}
