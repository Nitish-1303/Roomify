import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Shield, User, Calendar, FileText, Filter } from 'lucide-react';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterAction, setFilterAction] = useState('');

  useEffect(() => {
    fetchLogs();
  }, [currentPage, filterAction]);

  const fetchLogs = async () => {
    try {
      const params = { page: currentPage };
      if (filterAction) params.action = filterAction;
      
      const response = await api.get('/audit', { params });
      setLogs(response.data.logs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action) => {
    if (action.includes('BOOKING')) return <Calendar className="w-4 h-4" />;
    if (action.includes('ROOM')) return <FileText className="w-4 h-4" />;
    if (action.includes('USER')) return <User className="w-4 h-4" />;
    return <Shield className="w-4 h-4" />;
  };

  const getActionColor = (action) => {
    if (action.includes('CREATED')) return 'bg-green-100 text-green-700 border-green-200';
    if (action.includes('APPROVED')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (action.includes('REJECTED')) return 'bg-red-100 text-red-700 border-red-200';
    if (action.includes('DELETED')) return 'bg-gray-100 text-gray-700 border-gray-200';
    return 'bg-purple-100 text-purple-700 border-purple-200';
  };

  const formatAction = (action) => {
    return action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Audit Logs</h1>
          </div>
          <p className="text-gray-600">Complete activity history and system events</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterAction}
              onChange={(e) => {
                setFilterAction(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Actions</option>
              <option value="BOOKING_CREATED">Booking Created</option>
              <option value="BOOKING_APPROVED">Booking Approved</option>
              <option value="BOOKING_REJECTED">Booking Rejected</option>
              <option value="ROOM_CREATED">Room Created</option>
              <option value="USER_LOGIN">User Login</option>
            </select>
            <span className="text-sm text-gray-600">
              Showing {logs.length} logs
            </span>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Entity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{log.userId?.name}</div>
                          <div className="text-sm text-gray-500">{log.userId?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium border ${getActionColor(log.action)}`}>
                        {getActionIcon(log.action)}
                        {formatAction(log.action)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{log.entityType}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{log.details || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
