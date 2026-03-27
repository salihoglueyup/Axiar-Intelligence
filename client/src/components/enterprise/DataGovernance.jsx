import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Database, 
  Clock, 
  Users, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Download,
  Upload,
  Calendar,
  MapPin,
  Server,
  Activity,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const DataGovernance = () => {
  const [policies, setPolicies] = useState([]);
  const [dataFlows, setDataFlows] = useState([]);
  const [complianceReports, setComplianceReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('policies');
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockPolicies = [
        {
          id: 'data_retention',
          name: 'Data Retention Policy',
          description: 'Automated data retention and deletion based on regulatory requirements',
          status: 'active',
          lastUpdated: '2024-03-20T10:00:00Z',
          complianceScore: 95,
          affectedRecords: 125000,
          nextReview: '2024-06-20T00:00:00Z',
          rules: [
            { type: 'retention', duration: '7 years', condition: 'financial_data' },
            { type: 'retention', duration: '2 years', condition: 'user_activity' },
            { type: 'deletion', condition: 'expired_sessions' }
          ]
        },
        {
          id: 'data_encryption',
          name: 'Data Encryption Policy',
          description: 'Encryption requirements for data at rest and in transit',
          status: 'active',
          lastUpdated: '2024-03-15T10:00:00Z',
          complianceScore: 100,
          affectedRecords: 500000,
          nextReview: '2024-09-15T00:00:00Z',
          rules: [
            { type: 'encryption', algorithm: 'AES-256', condition: 'all_data' },
            { type: 'encryption', algorithm: 'TLS-1.3', condition: 'transit' }
          ]
        },
        {
          id: 'access_control',
          name: 'Access Control Policy',
          description: 'Role-based access control and data classification',
          status: 'active',
          lastUpdated: '2024-03-10T10:00:00Z',
          complianceScore: 88,
          affectedRecords: 75000,
          nextReview: '2024-06-10T00:00:00Z',
          rules: [
            { type: 'rbac', condition: 'all_resources' },
            { type: 'classification', levels: ['public', 'internal', 'confidential', 'restricted'] }
          ]
        }
      ];

      const mockDataFlows = [
        {
          id: 'flow_1',
          name: 'Customer Data Processing',
          source: 'CRM System',
          destination: 'Analytics Platform',
          dataType: 'Customer PII',
          classification: 'confidential',
          status: 'active',
          lastActivity: '2024-03-23T09:30:00Z',
          volume: 15000,
          encryption: true,
          compliance: true
        },
        {
          id: 'flow_2',
          name: 'Financial Data Export',
          source: 'ERP System',
          destination: 'Regulatory Reporting',
          dataType: 'Financial Records',
          classification: 'restricted',
          status: 'active',
          lastActivity: '2024-03-23T08:15:00Z',
          volume: 5000,
          encryption: true,
          compliance: true
        },
        {
          id: 'flow_3',
          name: 'Log Data Aggregation',
          source: 'Application Logs',
          destination: 'SIEM System',
          dataType: 'Security Logs',
          classification: 'internal',
          status: 'active',
          lastActivity: '2024-03-23T10:45:00Z',
          volume: 50000,
          encryption: true,
          compliance: true
        }
      ];

      const mockReports = [
        {
          id: 'report_1',
          name: 'GDPR Compliance Report',
          type: 'regulatory',
          period: 'Q1 2024',
          status: 'completed',
          score: 94,
          generatedAt: '2024-03-20T14:00:00Z',
          nextDue: '2024-04-20T00:00:00Z',
          findings: 12,
          critical: 1,
          warnings: 3
        },
        {
          id: 'report_2',
          name: 'Data Protection Impact Assessment',
          type: 'dpia',
          period: 'Monthly',
          status: 'in_progress',
          score: null,
          generatedAt: null,
          nextDue: '2024-03-31T00:00:00Z',
          findings: 0,
          critical: 0,
          warnings: 0
        }
      ];

      setPolicies(mockPolicies);
      setDataFlows(mockDataFlows);
      setComplianceReports(mockReports);
    } catch (err) {
      setError('Failed to load governance data');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-900/20 text-green-400 border-green-800';
      case 'warning':
        return 'bg-yellow-900/20 text-yellow-400 border-yellow-800';
      case 'error':
        return 'bg-red-900/20 text-red-400 border-red-800';
      default:
        return 'bg-gray-900/20 text-gray-400 border-gray-800';
    }
  };

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'restricted':
        return 'bg-red-900/30 text-red-400';
      case 'confidential':
        return 'bg-orange-900/30 text-orange-400';
      case 'internal':
        return 'bg-blue-900/30 text-blue-400';
      case 'public':
        return 'bg-green-900/30 text-green-400';
      default:
        return 'bg-gray-900/30 text-gray-400';
    }
  };

  const tabs = [
    { id: 'policies', label: 'Policies', icon: Shield },
    { id: 'dataflows', label: 'Data Flows', icon: Activity },
    { id: 'compliance', label: 'Compliance', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Shield className="w-8 h-8 text-cyan-500" />
            <span>Data Governance</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Manage data policies, compliance, and governance across the enterprise
          </p>
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

      <div className="border-b border-gray-800">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'policies' && (
        <PoliciesTab 
          policies={policies} 
          isLoading={isLoading}
          onSelectPolicy={setSelectedPolicy}
        />
      )}

      {activeTab === 'dataflows' && (
        <DataFlowsTab 
          dataFlows={dataFlows} 
          isLoading={isLoading}
        />
      )}

      {activeTab === 'compliance' && (
        <ComplianceTab 
          reports={complianceReports} 
          isLoading={isLoading}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsTab 
          policies={policies}
          dataFlows={dataFlows}
          reports={complianceReports}
          isLoading={isLoading}
        />
      )}

      {selectedPolicy && (
        <PolicyDetailModal
          policy={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />
      )}
    </div>
  );
};

const PoliciesTab = ({ policies, isLoading, onSelectPolicy }) => {
  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
                <div className="h-8 bg-gray-800 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        policies.map(policy => (
          <div
            key={policy.id}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-cyan-800 transition-colors cursor-pointer"
            onClick={() => onSelectPolicy(policy)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{policy.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(policy.status)}`}>
                    {policy.status}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{policy.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-cyan-500">{policy.complianceScore}%</div>
                    <div className="text-gray-400 text-sm">Compliance Score</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-500">
                      {policy.affectedRecords.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm">Affected Records</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-500">{policy.rules.length}</div>
                    <div className="text-gray-400 text-sm">Active Rules</div>
                  </div>
                  <div>
                    <div className="text-sm text-cyan-400">
                      {new Date(policy.nextReview).toLocaleDateString()}
                    </div>
                    <div className="text-gray-400 text-sm">Next Review</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const DataFlowsTab = ({ dataFlows, isLoading }) => {
  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'restricted':
        return 'bg-red-900/30 text-red-400';
      case 'confidential':
        return 'bg-orange-900/30 text-orange-400';
      case 'internal':
        return 'bg-blue-900/30 text-blue-400';
      case 'public':
        return 'bg-green-900/30 text-green-400';
      default:
        return 'bg-gray-900/30 text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-800 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        dataFlows.map(flow => (
          <div
            key={flow.id}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{flow.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getClassificationColor(flow.classification)}`}>
                    {flow.classification}
                  </span>
                  {getStatusIcon(flow.status)}
                </div>
                
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Server className="w-4 h-4" />
                    <span>{flow.source}</span>
                  </div>
                  <span>→</span>
                  <div className="flex items-center space-x-1">
                    <Database className="w-4 h-4" />
                    <span>{flow.destination}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-lg font-bold text-white">{flow.dataType}</div>
                    <div className="text-gray-400 text-sm">Data Type</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-cyan-500">{flow.volume.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Records/Day</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {flow.encryption ? (
                      <Lock className="w-4 h-4 text-green-500" />
                    ) : (
                      <Unlock className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-white">Encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {flow.compliance ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className="text-white">Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const ComplianceTab = ({ reports, isLoading }) => {
  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-800 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        reports.map(report => (
          <div
            key={report.id}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{report.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-6 mb-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <span>{report.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{report.period}</span>
                  </div>
                </div>
                
                {report.status === 'completed' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-cyan-500">{report.score}%</div>
                      <div className="text-gray-400 text-sm">Compliance Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{report.findings}</div>
                      <div className="text-gray-400 text-sm">Total Findings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-500">{report.critical}</div>
                      <div className="text-gray-400 text-sm">Critical Issues</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-500">{report.warnings}</div>
                      <div className="text-gray-400 text-sm">Warnings</div>
                    </div>
                  </div>
                )}
                
                {report.status === 'in_progress' && (
                  <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="text-blue-400">Report in progress - Due {new Date(report.nextDue).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const AnalyticsTab = ({ policies, dataFlows, reports, isLoading }) => {
  const totalPolicies = policies.length;
  const activePolicies = policies.filter(p => p.status === 'active').length;
  const avgCompliance = policies.reduce((sum, p) => sum + p.complianceScore, 0) / policies.length;
  const totalDataVolume = dataFlows.reduce((sum, f) => sum + f.volume, 0);
  const completedReports = reports.filter(r => r.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 text-cyan-500" />
            <span className="text-2xl font-bold text-white">{totalPolicies}</span>
          </div>
          <div className="text-gray-400 text-sm">Total Policies</div>
          <div className="text-green-400 text-sm mt-1">{activePolicies} active</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-white">{avgCompliance.toFixed(1)}%</span>
          </div>
          <div className="text-gray-400 text-sm">Avg Compliance</div>
          <div className="text-green-400 text-sm mt-1">+2.3% from last month</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold text-white">{totalDataVolume.toLocaleString()}</span>
          </div>
          <div className="text-gray-400 text-sm">Daily Data Flow</div>
          <div className="text-purple-400 text-sm mt-1">{dataFlows.length} active flows</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-white">{completedReports}</span>
          </div>
          <div className="text-gray-400 text-sm">Completed Reports</div>
          <div className="text-orange-400 text-sm mt-1">This quarter</div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Compliance Trends</h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-2" />
            <p>Compliance trend chart would be displayed here</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">2 hours ago</span>
            <span className="text-white">Data retention policy updated</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-400">5 hours ago</span>
            <span className="text-white">New data flow established: Analytics → Reporting</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-400">1 day ago</span>
            <span className="text-white">GDPR compliance report generated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PolicyDetailModal = ({ policy, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">{policy.name}</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <AlertTriangle className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-medium mb-2">Description</h4>
              <p className="text-gray-400">{policy.description}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-500">{policy.complianceScore}%</div>
                <div className="text-gray-400 text-sm">Compliance Score</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-500">{policy.affectedRecords.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Affected Records</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-2xl font-bold text-cyan-500">{policy.rules.length}</div>
                <div className="text-gray-400 text-sm">Active Rules</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-cyan-400">{new Date(policy.nextReview).toLocaleDateString()}</div>
                <div className="text-gray-400 text-sm">Next Review</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Policy Rules</h4>
              <div className="space-y-2">
                {policy.rules.map((rule, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span className="text-white capitalize">{rule.type}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-300">
                        {rule.duration || rule.algorithm || rule.condition}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case 'error':
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-900/20 text-green-400 border-green-800';
    case 'warning':
      return 'bg-yellow-900/20 text-yellow-400 border-yellow-800';
    case 'error':
      return 'bg-red-900/20 text-red-400 border-red-800';
    default:
      return 'bg-gray-900/20 text-gray-400 border-gray-800';
  }
};

export default DataGovernance;
