// src/app/adminpage.tsx

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Users, GraduationCap, FileText, Mail, Phone, 
  Calendar, Download, Search, Filter, BarChart3, Eye, 
  Trash2, Edit, ChevronDown, ChevronUp, MapPin, Clock,
  Building, Star, DownloadCloud, User, MailOpen, X
} from 'lucide-react';

// Mock data for demonstration
const mockApplications = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Frontend Developer',
    jobId: 'frontend-dev-001',
    status: 'new',
    timestamp: new Date('2023-10-15T14:30:00'),
    resumeUrl: 'https://firebasestorage.googleapis.com/v0/b/bds-db-7f03a.firebasestorage.app/o/model1Applications%2Fresumes%2FIxEnsilqQOebC3Avkdwbl5XkLRC3%2F1755879209509_bindu_evisa.pdf?alt=media&token=e21b9443-a9cc-40fc-80d5-3938310b3285',
    university: 'Stanford University',
    graduationYear: '2024',
    currentYear: '4',
    preferredField: 'Web Development',
    linkedIn: 'https://linkedin.com/in/johnsmith',
    portfolio: 'https://johnsmith.dev',
    salaryExpectation: '$85,000',
    message: 'I have 3 years of experience in React and TypeScript...',
    viewed: false,
    source: 'Career Page'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '+1 (555) 987-6543',
    jobTitle: 'Data Scientist',
    jobId: 'data-scientist-002',
    status: 'reviewed',
    timestamp: new Date('2023-10-14T09:15:00'),
    resumeUrl: '/resumes/maria-garcia-resume.pdf',
    university: 'MIT',
    graduationYear: '2023',
    currentYear: 'Graduated',
    preferredField: 'Machine Learning',
    linkedIn: 'https://linkedin.com/in/mariagarcia',
    portfolio: 'https://mariagarcia.com',
    salaryExpectation: '$95,000',
    message: 'Specialized in predictive analytics and machine learning models...',
    viewed: true,
    source: 'LinkedIn'
  },
  {
    id: '3',
    name: 'David Kim',
    email: 'david.kim@example.com',
    phone: '+1 (555) 456-7890',
    jobTitle: 'University Talent Program',
    jobId: 'university-talent-program',
    status: 'new',
    timestamp: new Date('2023-10-16T16:45:00'),
    resumeUrl: '/resumes/david-kim-resume.pdf',
    university: 'University of California',
    graduationYear: '2025',
    currentYear: '3',
    preferredField: 'Cloud Engineering',
    linkedIn: 'https://linkedin.com/in/davidkim',
    portfolio: '',
    salaryExpectation: 'Negotiable',
    message: 'Looking for an opportunity to apply my cloud computing knowledge...',
    viewed: false,
    source: 'Career Page'
  }
];

const mockAnalytics = {
  totalVisitors: 1245,
  totalApplications: 89,
  conversionRate: 7.1,
  popularJobs: [
    { title: 'Frontend Developer', views: 342, applications: 15 },
    { title: 'Data Scientist', views: 278, applications: 12 },
    { title: 'University Program', views: 567, applications: 32 },
    { title: 'DevOps Engineer', views: 189, applications: 8 },
  ],
  trafficSources: [
    { source: 'Direct', count: 456, percentage: 36.6 },
    { source: 'LinkedIn', count: 312, percentage: 25.0 },
    { source: 'Google', count: 278, percentage: 22.3 },
    { source: 'University Portals', count: 124, percentage: 10.0 },
    { source: 'Other', count: 75, percentage: 6.0 },
  ]
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState(mockApplications);
  const [filteredApplications, setFilteredApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(mockAnalytics);
  const [darkMode, setDarkMode] = useState(false);

  // Filter applications based on search and filters
  useEffect(() => {
    let result = applications;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(app => 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(app => app.status === statusFilter);
    }
    
    // Apply job filter
    if (jobFilter !== 'all') {
      result = result.filter(app => app.jobId === jobFilter);
    }
    
    setFilteredApplications(result);
  }, [searchTerm, statusFilter, jobFilter, applications]);

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setIsDetailModalOpen(true);
    
    // Mark as viewed
    if (!application.viewed) {
      setApplications(prev => prev.map(app => 
        app.id === application.id ? { ...app, viewed: true } : app
      ));
    }
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const handleUpdateStatus = (id: string, status: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'reviewed': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'interview': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hired': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getUniqueJobs = () => {
    const jobs = applications.map(app => ({ id: app.jobId, title: app.jobTitle }));
    return [...new Map(jobs.map(item => [item.id, item])).values()];
  };

  return (
    <div className=" pt-20">
      {/* Header */}
      <header className="bg dark:bg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold items-center">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
         
            <button className="p-2 rounded-lg bg-blue-600 text-white">
              Export Data
            </button>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{applications.length}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Applications</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{analytics.totalVisitors}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Career Page Visitors</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                <MailOpen className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{applications.filter(a => !a.viewed).length}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Unread Applications</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                <Star className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{analytics.conversionRate}%</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Applications List */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium">Job Applications</h2>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="interview">Interview</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <select
                    value={jobFilter}
                    onChange={(e) => setJobFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Jobs</option>
                    {getUniqueJobs().map(job => (
                      <option key={job.id} value={job.id}>{job.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredApplications.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No applications found</p>
                  </div>
                ) : (
                  filteredApplications.map(application => (
                    <div key={application.id} className={`px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${!application.viewed ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">
                              {application.name}
                              {!application.viewed && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  New
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{application.email}</p>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                            <button
                              onClick={() => handleViewApplication(application)}
                              className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteApplication(application.id)}
                              className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          {application.jobTitle}
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          Applied on {application.timestamp.toLocaleDateString()} at {application.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Analytics Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium">Career Page Analytics</h2>
              </div>
              <div className="px-6 py-4">
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Traffic Sources</h3>
                  <div className="space-y-2">
                    {analytics.trafficSources.map((source, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{source.source}</span>
                          <span>{source.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Popular Job Postings</h3>
                  <div className="space-y-4">
                    {analytics.popularJobs.map((job, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{job.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{job.views} views • {job.applications} applications</p>
                        </div>
                        <div className="text-sm font-medium">
                          {Math.round((job.applications / job.views) * 100)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium">Quick Actions</h2>
              </div>
              <div className="p-6">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-3">
                  <DownloadCloud className="h-4 w-4 mr-2" />
                  Export Applications
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {isDetailModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Application Details</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{selectedApplication.name} - {selectedApplication.jobTitle}</p>
              </div>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="font-medium">{selectedApplication.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-medium">{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Applied On</p>
                      <p className="font-medium">{selectedApplication.timestamp.toLocaleDateString()} at {selectedApplication.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Professional Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Position</p>
                      <p className="font-medium">{selectedApplication.jobTitle}</p>
                    </div>
                    {selectedApplication.university && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">University</p>
                        <p className="font-medium">{selectedApplication.university}</p>
                      </div>
                    )}
                    {selectedApplication.graduationYear && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Graduation Year</p>
                        <p className="font-medium">{selectedApplication.graduationYear}</p>
                      </div>
                    )}
                    {selectedApplication.preferredField && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Preferred Field</p>
                        <p className="font-medium">{selectedApplication.preferredField}</p>
                      </div>
                    )}
                    {selectedApplication.salaryExpectation && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Salary Expectation</p>
                        <p className="font-medium">{selectedApplication.salaryExpectation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedApplication.linkedIn && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">LinkedIn</h3>
                  <a href={selectedApplication.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {selectedApplication.linkedIn}
                  </a>
                </div>
              )}

              {selectedApplication.portfolio && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Portfolio</h3>
                  <a href={selectedApplication.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {selectedApplication.portfolio}
                  </a>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Cover Letter</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="whitespace-pre-line">{selectedApplication.message}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <a 
                  href={selectedApplication.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
                
                <select
                  value={selectedApplication.status}
                  onChange={(e) => handleUpdateStatus(selectedApplication.id, e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="interview">Interview</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
                
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Send Email
                </button>
                
                <button 
                  onClick={() => handleDeleteApplication(selectedApplication.id)}
                  className="px-4 py-2 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Delete Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}