import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Wrench, Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { FileUpload } from '../components/ui/file-upload';

const Maintenance = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    roomId: '',
    issueType: 'AC',
    title: '',
    description: '',
    priority: 'medium'
  });
  const [rooms, setRooms] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    fetchIssues();
    fetchRooms();
    if (user?.role === 'admin') {
      fetchStats();
    }
  }, [user]);

  const fetchIssues = async () => {
    try {
      const response = await api.get('/maintenance');
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/maintenance/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await api.get('/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
    console.log('Uploaded files:', files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real implementation, you would upload files to a server
      // For now, we'll just include file info in the form data
      const issueData = {
        ...formData,
        attachments: uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
      };
      await api.post('/maintenance', issueData);
      setShowModal(false);
      setFormData({ roomId: '', issueType: 'AC', title: '', description: '', priority: 'medium' });
      setUploadedFiles([]);
      fetchIssues();
      if (user?.role === 'admin') fetchStats();
      alert('Issue reported successfully!');
    } catch (error) {
      alert('Failed to report issue');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/maintenance/${id}`, { status });
      fetchIssues();
      if (user?.role === 'admin') fetchStats();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Wrench className="w-8 h-8 text-orange-600" />
              <h1 className="text-4xl font-bold text-gray-900">Maintenance & Issues</h1>
            </div>
            <p className="text-gray-600">Report and track facility issues</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-medium flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Report Issue
          </button>
        </div>

        {/* Stats Cards (Admin Only) */}
        {user?.role === 'admin' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Issues</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats.total}</h3>
                </div>
                <Wrench className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Open</p>
                  <h3 className="text-3xl font-bold text-red-600">{stats.open}</h3>
                </div>
                <AlertTriangle className="w-12 h-12 text-red-400" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">In Progress</p>
                  <h3 className="text-3xl font-bold text-yellow-600">{stats.inProgress}</h3>
                </div>
                <Clock className="w-12 h-12 text-yellow-400" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Resolved</p>
                  <h3 className="text-3xl font-bold text-green-600">{stats.resolved}</h3>
                </div>
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
            </div>
          </div>
        )}

        {/* Issues List */}
        <div className="space-y-4">
          {issues.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
              <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No issues reported</h3>
              <p className="text-gray-600">All systems are running smoothly!</p>
            </div>
          ) : (
            issues.map((issue) => (
              <div key={issue._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getPriorityColor(issue.priority)}`}>
                        {issue.priority.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                        {issue.issueType}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{issue.title}</h3>
                    <p className="text-gray-600 mb-3">{issue.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>Room: {issue.roomId?.name}</span>
                      <span>Reported by: {issue.reportedBy?.name}</span>
                      <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {user?.role === 'admin' && issue.status !== 'resolved' && (
                    <div className="flex gap-2 ml-4">
                      {issue.status === 'open' && (
                        <button
                          onClick={() => updateStatus(issue._id, 'in-progress')}
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all text-sm font-medium"
                        >
                          Start Work
                        </button>
                      )}
                      {issue.status === 'in-progress' && (
                        <button
                          onClick={() => updateStatus(issue._id, 'resolved')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-medium"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Report Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Report Issue</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                  <select
                    value={formData.roomId}
                    onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select Room</option>
                    {rooms.map((room) => (
                      <option key={room._id} value={room._id}>{room.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
                  <select
                    value={formData.issueType}
                    onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="AC">Air Conditioning</option>
                    <option value="Projector">Projector</option>
                    <option value="Lights">Lights</option>
                    <option value="Cleanliness">Cleanliness</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Network">Network</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach Photo (Optional)
                  </label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <FileUpload 
                      onChange={handleFileUpload}
                      accept="image/*,.pdf"
                      maxSize={5}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Upload a photo or PDF of the issue (max 5MB)
                  </p>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maintenance;
