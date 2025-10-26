import React from 'react';

export default function Header({ onNavigate }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <h1 className="brand">AnonAid</h1>
        <nav>
          <button onClick={() => onNavigate('home')} className="navbtn">Home</button>
          <button onClick={() => onNavigate('donate')} className="navbtn">Donate</button>
          <button onClick={() => onNavigate('cause')} className="navbtn">Cause</button>
          <button onClick={() => onNavigate('admin')} className="navbtn">Admin</button>
        </nav>
      </div>
    </header>
  );
}
