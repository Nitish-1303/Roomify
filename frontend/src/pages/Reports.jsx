import React, { useState } from 'react';
import api from '../api/axios';
import { Download, FileText, Calendar, TrendingUp, Loader, AlertCircle, Send } from 'lucide-react';
import { useFileInput } from '../hooks/use-file-input';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

const Reports = () => {
  const [loading, setLoading] = useState({});
  const [issueDescription, setIssueDescription] = useState('');
  const [issueSubmitting, setIssueSubmitting] = useState(false);
  const { fileName, error, fileInputRef, handleFileSelect, clearFile, fileSize } = useFileInput({
    accept: "image/*,.pdf,.doc,.docx",
    maxSize: 5
  });

  const downloadReport = async (type) => {
    setLoading({ ...loading, [type]: true });
    try {
      const endpoint = type === 'bookings' ? '/reports/bookings' : '/reports/rooms';
      const response = await api.get(endpoint, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}-report-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download report');
    } finally {
      setLoading({ ...loading, [type]: false });
    }
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    if (!issueDescription.trim()) {
      alert('Please describe the issue');
      return;
    }

    setIssueSubmitting(true);
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Issue reported successfully! Our team will review it shortly.');
      setIssueDescription('');
      clearFile();
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to submit issue. Please try again.');
    } finally {
      setIssueSubmitting(false);
    }
  };

  const reports = [
    {
      id: 'bookings',
      title: 'Bookings Report',
      description: 'Export all booking records with user details, room information, and status',
      icon: Calendar,
      color: 'blue',
      includes: ['Booking ID', 'User Name & Email', 'Room Details', 'Date & Time', 'Status', 'Created Date']
    },
    {
      id: 'rooms',
      title: 'Room Utilization Report',
      description: 'Analyze room usage statistics, booking counts, and utilization rates',
      icon: TrendingUp,
      color: 'purple',
      includes: ['Room Name', 'Location', 'Capacity', 'Total Bookings', 'Approved Bookings', 'Utilization Rate']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Reports</h1>
          </div>
          <p className="text-gray-600">Export and analyze your booking data</p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Export to CSV</h3>
              <p className="text-gray-600 text-sm">
                All reports are exported in CSV format, compatible with Excel, Google Sheets, and other spreadsheet applications.
                Data is exported in real-time with the latest information.
              </p>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reports.map((report) => {
            const Icon = report.icon;
            const isLoading = loading[report.id];
            
            return (
              <div key={report.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-${report.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 text-${report.color}-600`} />
                  </div>
                  <button
                    onClick={() => downloadReport(report.id)}
                    disabled={isLoading}
                    className={`px-4 py-2 bg-${report.color}-600 text-white rounded-lg hover:bg-${report.color}-700 transition-all font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Export CSV
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{report.description}</p>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Includes:</h4>
                  <ul className="space-y-1">
                    {report.includes.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Real-Time Data</h3>
            <p className="text-sm text-gray-600">Reports include the latest data from your system</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Secure Export</h3>
            <p className="text-sm text-gray-600">All exports are logged and secured</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Easy Analysis</h3>
            <p className="text-sm text-gray-600">CSV format works with all spreadsheet tools</p>
          </div>
        </div>

        {/* Report Issue Section */}
        <div className="mt-12">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Report an Issue</h2>
                <p className="text-gray-600">
                  Found a problem with the reports? Let us know and attach any relevant screenshots or documents.
                </p>
              </div>
            </div>

            <form onSubmit={handleIssueSubmit} className="space-y-6">
              {/* Description */}
              <div>
                <label htmlFor="issue-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe the issue *
                </label>
                <textarea
                  id="issue-description"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Please describe the issue you're experiencing with the reports..."
                  required
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach file (optional)
                </label>
                <div 
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer",
                    "hover:border-red-400 hover:bg-red-50/50",
                    error && "border-red-500 bg-red-50",
                    fileName && "border-green-500 bg-green-50"
                  )}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {fileName ? (
                    <div className="space-y-2">
                      <FileText className="w-10 h-10 mx-auto text-green-600" />
                      <p className="text-sm font-medium text-gray-900">{fileName}</p>
                      <p className="text-xs text-gray-600">
                        {(fileSize / (1024 * 1024)).toFixed(2)}MB
                      </p>
                      <Button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearFile();
                        }}
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                      >
                        Remove file
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Download className="w-10 h-10 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        Images, PDF, DOC up to 5MB
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />
                {error && (
                  <p className="text-sm text-red-500 mt-2">
                    {error}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={issueSubmitting || !issueDescription.trim()}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {issueSubmitting ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Issue
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
