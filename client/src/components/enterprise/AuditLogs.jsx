import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Calendar,
  User,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Activity,
  Database,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    action: '',
    user: '',
    dateRange: '7d',
    severity: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    loadAuditLogs();
  }, [selectedFilters, searchTerm]);

  const loadAuditLogs = async () => {
    try {
      setIsLoading(true);
      
      // Mock data - replace with actual API call
      const mockLogs = [
        {
          id: '1',
          timestamp: '2024-03-23T10:30:00Z',
          action: 'user_login',
          severity: 'info',
          user: 'john.doe@company.com',
          userId: 'user_123',
          resource: 'auth',
          resourceId: null,
          ip: '192.168.1.100',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          details: {
            method: 'sso',
            provider: 'azure-ad',
            success: true
          },
          message: 'User logged in via SSO'
        },
        {
          id: '2',
          timestamp: '2024-03-23T10:25:00Z',
          action: 'role_updated',
          severity: 'warning',
          user: 'admin@company.com',
          userId: 'user_456',
          resource: 'role',
          resourceId: 'role_manager',
          ip: '192.168.1.101',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          details: {
            previousPermissions: ['users.read', 'projects.read'],
            newPermissions: ['users.read', 'users.write', 'projects.read', 'projects.write'],
            changedBy: 'admin@company.com'
          },
          message: 'Role permissions updated'
        },
        {
          id: '3',
          timestamp: '2024-03-23T10:20:00Z',
          action: 'data_export',
          severity: 'info',
          user: 'analyst@company.com',
          userId: 'user_789',
          resource: 'reports',
          resourceId: 'report_456',
          ip: '192.168.1.102',
          userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
          details: {
            format: 'csv',
            recordCount: 1250,
            duration: 3.2
          },
          message: 'Exported reports data to CSV'
        },
        {
          id: '4',
          timestamp: '2024-03-23T10:15:00Z',
          action: 'security_violation',
          severity: 'critical',
          user: 'unknown',
          userId: null,
          resource: 'auth',
          resourceId: null,
          ip: '192.168.1.200',
          userAgent: 'curl/7.68.0',
          details: {
            violationType: 'brute_force',
            attemptCount: 5,
            blocked: true
          },
          message: 'Multiple failed login attempts detected'
        },
        {
          id: '5',
          timestamp: '2024-03-23T10:10:00Z',
          action: 'system_backup',
          severity: 'info',
          user: 'system',
          userId: 'system',
          resource: 'database',
          resourceId: 'db_backup_001',
          ip: 'localhost',
          userAgent: 'System Service',
          details: {
            backupSize: '2.3GB',
            duration: 45,
            success: true
          },
          message: 'Automated database backup completed'
        }
      ];
      
      // Apply filters and search
      let filteredLogs = mockLogs;
      
      if (searchTerm) {
        filteredLogs = filteredLogs.filter(log =>
          log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.action.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (selectedFilters.action) {
        filteredLogs = filteredLogs.filter(log => log.action === selectedFilters.action);
      }
      
      if (selectedFilters.severity) {
        filteredLogs = filteredLogs.filter(log => log.severity === selectedFilters.severity);
      }
      
      setLogs(filteredLogs);
    } catch (err) {
      setError('Failed to load audit logs');
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-900/20 text-red-400 border-red-800';
      case 'warning':
        return 'bg-yellow-900/20 text-yellow-400 border-yellow-800';
      case 'info':
        return 'bg-green-900/20 text-green-400 border-green-800';
      default:
        return 'bg-gray-900/20 text-gray-400 border-gray-800';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'user_login':
      case 'user_logout':
        return <User className="w-4 h-4" />;
      case 'role_updated':
      case 'permission_changed':
        return <Shield className="w-4 h-4" />;
      case 'data_export':
      case 'data_import':
        return <Database className="w-4 h-4" />;
      case 'security_violation':
        return <AlertTriangle className="w-4 h-4" />;
      case 'system_backup':
        return <Settings className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const exportLogs = () => {
    // Mock export functionality
    const csvContent = logs.map(log => 
      `${log.timestamp},${log.action},${log.severity},${log.user},${log.message}`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <FileText className="w-8 h-8 text-cyan-500" />
            <span>Audit Logs</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Monitor and track system activities for security and compliance
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button
            onClick={exportLogs}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-red-400">{error}</span>
          </div>
        </div>
      )}

      {showFilters && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Filter Logs</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Action
              </label>
              <select
                value={selectedFilters.action}
                onChange={(e) => setSelectedFilters({...selectedFilters, action: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">All Actions</option>
                <option value="user_login">User Login</option>
                <option value="user_logout">User Logout</option>
                <option value="role_updated">Role Updated</option>
                <option value="data_export">Data Export</option>
                <option value="security_violation">Security Violation</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Severity
              </label>
              <select
                value={selectedFilters.severity}
                onChange={(e) => setSelectedFilters({...selectedFilters, severity: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">All Severities</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Date Range
              </label>
              <select
                value={selectedFilters.dateRange}
                onChange={(e) => setSelectedFilters({...selectedFilters, dateRange: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="1d">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                User
              </label>
              <input
                type="text"
                value={selectedFilters.user}
                onChange={(e) => setSelectedFilters({...selectedFilters, user: e.target.value})}
                placeholder="Filter by user..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..."
              className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{logs.length} entries</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {logs.length === 0 ? (
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-12 text-center">
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Logs Found</h3>
              <p className="text-gray-400">
                No audit logs match your current filters
              </p>
            </div>
          ) : (
            logs.map(log => (
              <div
                key={log.id}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-cyan-800 transition-colors cursor-pointer"
                onClick={() => setSelectedLog(log)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg border ${getSeverityColor(log.severity)}`}>
                    {getSeverityIcon(log.severity)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        {getActionIcon(log.action)}
                        <span className="text-white font-medium capitalize">
                          {log.action.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-2">{log.message}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{log.user}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Database className="w-3 h-3" />
                        <span>{log.resource}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity className="w-3 h-3" />
                        <span>{log.ip}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {selectedLog && (
        <AuditLogDetail
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </div>
  );
};

const AuditLogDetail = ({ log, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Audit Log Details</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">Event Information</h4>
                <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Action</span>
                    <span className="text-white capitalize">{log.action.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Severity</span>
                    <span className="text-white capitalize">{log.severity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timestamp</span>
                    <span className="text-white">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Message</span>
                    <span className="text-white text-right">{log.message}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-2">User Information</h4>
                <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">User</span>
                    <span className="text-white">{log.user}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">User ID</span>
                    <span className="text-white font-mono">{log.userId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">IP Address</span>
                    <span className="text-white font-mono">{log.ip}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">Resource Information</h4>
                <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Resource</span>
                    <span className="text-white">{log.resource}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Resource ID</span>
                    <span className="text-white font-mono">{log.resourceId || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-2">Additional Details</h4>
                <div className="bg-gray-800 rounded-lg p-4">
                  <pre className="text-gray-300 text-sm overflow-x-auto">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-2">User Agent</h4>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-300 text-sm break-all">{log.userAgent}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
