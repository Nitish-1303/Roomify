import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DemoToolbar() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const switchRole = async (admin) => {
    setBusy(true);
    try {
      await login(admin ? 'admin@roomify.com' : 'user@roomify.com', admin ? 'admin123' : 'user123');
      navigate('/bookings');
    } finally { setBusy(false); }
  };
  const reset = () => {
    if (window.confirm('Reset the sample bookings and start again?')) {
      localStorage.removeItem('roomify-demo-v1');
      window.location.assign('/rooms');
    }
  };
  return <aside className="demo-toolbar" aria-label="Demo controls">
    <div><strong>Interactive demo</strong><span>Sample rooms. Changes stay in this browser, not a real booking system.</span></div>
    <div className="demo-actions">
      <button disabled={busy} onClick={() => switchRole(user?.role !== 'admin')}>
        {user?.role === 'admin' ? 'View as member' : 'Review as admin'}
      </button>
      <button onClick={reset}>Reset demo</button>
    </div>
  </aside>;
}
