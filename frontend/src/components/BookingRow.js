import React from 'react';

const BookingRow = ({ booking, onApprove, onReject, isAdmin }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500 bg-opacity-20 text-green-300 border-green-400';
      case 'rejected':
        return 'bg-red-500 bg-opacity-20 text-red-300 border-red-400';
      default:
        return 'bg-yellow-500 bg-opacity-20 text-yellow-300 border-yellow-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return '✓';
      case 'rejected':
        return '✗';
      default:
        return '⏳';
    }
  };

  return (
    <tr className="border-b border-white border-opacity-10 hover:bg-white hover:bg-opacity-5 transition-all">
      <td className="px-6 py-4 text-white font-medium">{booking.roomId?.name}</td>
      {isAdmin && <td className="px-6 py-4 text-white text-opacity-90">{booking.userId?.name}</td>}
      <td className="px-6 py-4 text-white text-opacity-90">{formatDate(booking.start)}</td>
      <td className="px-6 py-4 text-white text-opacity-90">{formatDate(booking.end)}</td>
      <td className="px-6 py-4">
        <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getStatusStyle(booking.status)} inline-flex items-center gap-2`}>
          <span>{getStatusIcon(booking.status)}</span>
          {booking.status}
        </span>
      </td>
      {isAdmin && booking.status === 'pending' && (
        <td className="px-6 py-4">
          <div className="flex gap-2">
            <button
              onClick={() => onApprove(booking._id)}
              className="bg-green-500 bg-opacity-20 text-green-300 border border-green-400 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all text-sm font-medium"
            >
              ✓ Approve
            </button>
            <button
              onClick={() => onReject(booking._id)}
              className="bg-red-500 bg-opacity-20 text-red-300 border border-red-400 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all text-sm font-medium"
            >
              ✗ Reject
            </button>
          </div>
        </td>
      )}
      {isAdmin && booking.status !== 'pending' && <td className="px-6 py-4"></td>}
    </tr>
  );
};

export default BookingRow;
