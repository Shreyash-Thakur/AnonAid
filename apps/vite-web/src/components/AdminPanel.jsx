import React, { useState } from 'react';

export default function AdminPanel() {
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleWithdraw = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert(`Requested withdraw of ${amount} PYUSD (demo)`);
      setAmount('');
    }, 1200);
  };

  return (
    <div>
      <p className="muted">Available balance: <strong>35.00 PYUSD</strong></p>
      <label className="label">Withdraw amount</label>
      <input className="input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button className="btn primary full" onClick={handleWithdraw} disabled={processing || !amount}>
        {processing ? 'Processing...' : 'Withdraw Funds'}
      </button>
      <p className="small muted">This action is a demo and does not perform on-chain withdrawals.</p>
    </div>
  );
}
