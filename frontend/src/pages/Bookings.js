import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Bookings() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(null);
  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setBookings((await api.get('/bookings')).data); }
    catch { setError('Bookings could not load. Try again.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load, isAdmin]);
  const decide = async (id, action) => {
    setBusy(id);
    try { await api.put(`/bookings/${id}/${action}`); await load(); }
    catch { setError('That request could not be updated. Try again.'); }
    finally { setBusy(null); }
  };
  const formatTime = (date) => new Date(date).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  return <main className="studio-bookings">
    <p className="studio-eyebrow">A little room for your plans.</p>
    <div className="studio-bookings-heading"><div>
      <h1>{isAdmin ? 'Booking requests' : 'My bookings'}</h1>
      <p>{isAdmin ? 'Review requests and keep the team moving.' : 'Your requests, with a clear view of what happens next.'}</p>
    </div><Link className="studio-button" to="/rooms">Find a room →</Link></div>
    {error && <div role="alert" className="studio-feedback">{error} <button onClick={load}>Try again</button></div>}
    {loading ? <p role="status">Loading bookings…</p> : bookings.length === 0 ?
      <div className="studio-empty"><h2>Your next good meeting starts here.</h2><p>No booking requests yet.</p><Link to="/rooms">Explore spaces →</Link></div> :
      <div className="studio-booking-list">{bookings.map((booking) => <article className="studio-request-card" key={booking._id}>
        <div><span className={`studio-status studio-status-${booking.status}`}>{booking.status}</span>
          <h2>{booking.roomId?.name || 'Room'}</h2><p>{booking.roomId?.location}</p>
          {isAdmin && <p>Requested by {booking.userId?.name || 'Team member'}</p>}
        </div>
        <div className="studio-request-time"><strong>{formatTime(booking.start)}</strong><span>to {formatTime(booking.end)}</span></div>
        {isAdmin && booking.status === 'pending' ? <div className="demo-actions">
          <button disabled={busy === booking._id} onClick={() => decide(booking._id, 'approve')}>Approve</button>
          <button disabled={busy === booking._id} onClick={() => decide(booking._id, 'reject')}>Decline</button>
        </div> : <p className="studio-request-note">{booking.status === 'pending' ? 'Waiting for admin review' : booking.status === 'approved' ? 'Ready for your meeting' : 'Not approved. Try another time.'}</p>}
      </article>)}</div>}
  </main>;
}
