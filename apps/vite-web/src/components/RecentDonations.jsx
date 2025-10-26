import React from 'react';

const mock = [
  { id: '1', donor: '0xf39F...2266', amount: 10, time: '5 minutes ago' },
  { id: '2', donor: '0x7099...79C8', amount: 5, time: '30 minutes ago' },
  { id: '3', donor: '0x3C44...93BC', amount: 20, time: '2 hours ago' },
];

export default function RecentDonations() {
  return (
    <div className="card">
      <h3>Recent Donations</h3>
      <ul className="donation-list">
        {mock.map((d) => (
          <li key={d.id} className="donation-item">
            <span className="donor">{d.donor}</span>
            <span className="amount">{d.amount} PYUSD</span>
            <span className="time">{d.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
