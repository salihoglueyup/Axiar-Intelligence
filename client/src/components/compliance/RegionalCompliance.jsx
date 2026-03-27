import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Globe, 
  Gavel, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  MapPin,
  Calendar,
  Users,
  Database,
  Lock,
  Eye,
  EyeOff,
  Download,
  Upload,
  Search,
  Filter,
  BarChart3,
  Activity,
  Flag,
  Building,
  Scale,
  BookOpen,
  AlertCircle,
  CheckSquare,
  XSquare
} from 'lucide-react';

const RegionalCompliance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [complianceData, setComplianceData] = useState({});
  const [regulations, setRegulations] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'regulations', label: 'Regulations', icon: Gavel },
    { id: 'gdpr', label: 'GDPR', icon: Shield },
    { id: 'ccpa', label: 'CCPA', icon: Flag },
    { id: 'hipaa', label: 'HIPAA', icon: Database },
    { id: 'audits', label: 'Audits', icon: FileText }
  ];

  const regions = [
    { code: 'all', name: 'All Regions', flag: '🌍' },
    { code: 'eu', name: 'European Union', flag: '🇪🇺' },
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'ca', name: 'Canada', flag: '🇨🇦' },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
    { code: 'jp', name: 'Japan', flag: '🇯🇵' },
    { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
    { code: 'in', name: 'India', flag: '🇮🇳' },
    { code: 'br', name: 'Brazil', flag: '🇧🇷' }
  ];

  useEffect(() => {
    loadComplianceData();
    loadRegulations();
    loadAuditLogs();
  }, [selectedRegion]);

  const loadComplianceData = async () => {
    // Mock data - replace with actual API call
    const data = {
      overall: {
        score: 94.2,
        lastUpdated: '2024-03-23T10:00:00Z',
        totalRegulations: 12,
        compliantRegulations: 11,
        criticalIssues: 2,
        warnings: 5,
        info: 8
      },
      regions: {
        eu: { score: 96.5, regulations: ['GDPR', 'ePrivacy'], status: 'compliant' },
        us: { score: 91.2, regulations: ['CCPA', 'HIPAA', 'SOX'], status: 'mostly_compliant' },
        uk: { score: 94.8, regulations: ['UK GDPR', 'Data Protection Act'], status: 'compliant' },
        ca: { score: 89.5, regulations: ['PIPEDA', 'CCPA'], status: 'mostly_compliant' },
        au: { score: 92.1, regulations: ['Privacy Act', 'Notifiable Data Breaches'], status: 'compliant' },
        jp: { score: 87.3, regulations: ['APPI', 'My Number Act'], status: 'mostly_compliant' },
        sg: { score: 95.8, regulations: ['PDPA'], status: 'compliant' },
        in: { score: 85.7, regulations: ['IT Rules', 'DPDP Act'], status: 'mostly_compliant' },
        br: { score: 83.2, regulations: ['LGPD'], status: 'needs_attention' }
      },
      categories: {
        dataProtection: { score: 95.2, issues: 1 },
        privacy: { score: 93.8, issues: 2 },
        security: { score: 96.1, issues: 0 },
        consent: { score: 91.5, issues: 3 },
        breachNotification: { score: 94.7, issues: 1 },
        dataRetention: { score: 89.3, issues: 2 },
        crossBorder: { score: 92.8, issues: 1 },
        userRights: { score: 96.4, issues: 0 }
      }
    };
    setComplianceData(data);
  };

  const loadRegulations = async () => {
    // Mock data - replace with actual API call
    const regs = [
      {
        id: 'gdpr',
        name: 'General Data Protection Regulation',
        region: 'eu',
        type: 'data_protection',
        status: 'compliant',
        score: 96.5,
        effectiveDate: '2018-05-25',
        nextReview: '2024-05-25',
        description: 'EU regulation on data protection and privacy',
        requirements: [
          'Lawful basis for processing',
          'Data subject rights',
          'Consent management',
          'Breach notification',
          'Data protection officer',
          'Privacy by design'
        ],
        penalties: {
          maxFine: '€20 million or 4% of global turnover',
          enforcementBody: 'National data protection authorities'
        }
      },
      {
        id: 'ccpa',
        name: 'California Consumer Privacy Act',
        region: 'us',
        type: 'privacy',
        status: 'mostly_compliant',
        score: 91.2,
        effectiveDate: '2020-01-01',
        nextReview: '2024-01-01',
        description: 'California state privacy law',
        requirements: [
          'Right to know',
          'Right to delete',
          'Right to opt-out',
          'Non-discrimination',
          'Business transparency'
        ],
        penalties: {
          maxFine: '$7,500 per violation',
          enforcementBody: 'California Attorney General'
        }
      },
      {
        id: 'hipaa',
        name: 'Health Insurance Portability and Accountability Act',
        region: 'us',
        type: 'healthcare',
        status: 'compliant',
        score: 94.8,
        effectiveDate: '1996-08-21',
        nextReview: '2024-08-21',
        description: 'US healthcare data protection law',
        requirements: [
          'Administrative safeguards',
          'Physical safeguards',
          'Technical safeguards',
          'Breach notification',
          'Privacy policies'
        ],
        penalties: {
          maxFine: '$1.5 million per violation',
          enforcementBody: 'Department of Health and Human Services'
        }
      },
      {
        id: 'lgpd',
        name: 'Lei Geral de Proteção de Dados',
        region: 'br',
        type: 'data_protection',
        status: 'needs_attention',
        score: 83.2,
        effectiveDate: '2020-09-18',
        nextReview: '2024-09-18',
        description: 'Brazilian data protection law',
        requirements: [
          'Lawful processing',
          'Data subject rights',
          'Consent management',
          'Data protection officer',
          'Breach notification'
        ],
        penalties: {
          maxFine: 'R$50 million or 2% of revenue',
          enforcementBody: 'National Data Protection Authority'
        }
      }
    ];
    
    // Filter by selected region
    const filtered = selectedRegion === 'all' 
      ? regs 
      : regs.filter(reg => reg.region === selectedRegion);
    
    setRegulations(filtered);
  };

  const loadAuditLogs = async () => {
    // Mock data - replace with actual API call
    const logs = [
      {
        id: 1,
        timestamp: '2024-03-23T14:30:00Z',
        type: 'compliance_check',
        regulation: 'GDPR',
        region: 'eu',
        status: 'passed',
        score: 96.5,
        issues: [],
        auditor: 'System',
        details: 'Automated GDPR compliance check completed successfully'
      },
      {
        id: 2,
        timestamp: '2024-03-23T13:15:00Z',
        type: 'violation',
        regulation: 'CCPA',
        region: 'us',
        status: 'warning',
        score: 85.2,
        issues: ['Missing privacy policy link', 'Incomplete opt-out mechanism'],
        auditor: 'System',
        details: 'CCPA compliance check found 2 issues requiring attention'
      },
      {
        id: 3,
        timestamp: '2024-03-23T11:45:00Z',
        type: 'audit',
        regulation: 'HIPAA',
        region: 'us',
        status: 'passed',
        score: 94.8,
        issues: [],
        auditor: 'External Auditor',
        details: 'Quarterly HIPAA audit completed - all requirements met'
      },
      {
        id: 4,
        timestamp: '2024-03-23T10:20:00Z',
        type: 'breach',
        regulation: 'GDPR',
        region: 'eu',
        status: 'critical',
        score: 72.1,
        issues: ['Data breach detected - 1,200 records affected'],
        auditor: 'System',
        details: 'Security incident detected - immediate notification required'
      }
    ];
    
    // Filter by selected region
    const filtered = selectedRegion === 'all' 
      ? logs 
      : logs.filter(log => log.region === selectedRegion);
    
    setAuditLogs(filtered);
  };

  const getScoreColor = (score) => {
    if (score >= 95) return 'text-green-500';
    if (score >= 85) return 'text-yellow-500';
    if (score >= 70) return 'text-orange-500';
    return 'text-red-500';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'bg-green-900/30 text-green-400';
      case 'mostly_compliant': return 'bg-yellow-900/30 text-yellow-400';
      case 'needs_attention': return 'bg-orange-900/30 text-orange-400';
      case 'non_compliant': return 'bg-red-900/30 text-red-400';
      default: return 'bg-gray-900/30 text-gray-400';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Overall Compliance Score</h3>
          <span className="text-sm text-gray-400">
            Last updated: {new Date(complianceData.overall?.lastUpdated).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-8 border-gray-700"></div>
            <div 
              className="absolute inset-0 rounded-full border-8 border-cyan-500"
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((complianceData.overall?.score / 100) * 2 * Math.PI - Math.PI / 2)}% ${50 - 50 * Math.sin((complianceData.overall?.score / 100) * 2 * Math.PI - Math.PI / 2)}%, 50% 50%)`
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(complianceData.overall?.score)}`}>
                  {complianceData.overall?.score}%
                </div>
                <div className="text-gray-400 text-sm">Score</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">{complianceData.overall?.criticalIssues}</div>
            <div className="text-gray-400 text-sm">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">{complianceData.overall?.warnings}</div>
            <div className="text-gray-400 text-sm">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{complianceData.overall?.info}</div>
            <div className="text-gray-400 text-sm">Info</div>
          </div>
        </div>
      </div>

      {/* Regional Scores */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Regional Compliance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(complianceData.regions || {}).map(([region, data]) => {
            const regionInfo = regions.find(r => r.code === region);
            return (
              <div key={region} className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{regionInfo?.flag}</span>
                    <span className="text-white font-medium">{regionInfo?.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(data.status)}`}>
                    {data.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${getScoreColor(data.score)}`}>
                    {data.score}%
                  </span>
                  <div className="text-right">
                    <div className="text-gray-400 text-xs">{data.regulations.length} regs</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Compliance Categories</h3>
        <div className="space-y-3">
          {Object.entries(complianceData.categories || {}).map(([category, data]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-white capitalize">{category.replace('_', ' ')}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-cyan-500 h-2 rounded-full" 
                    style={{ width: `${data.score}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium ${getScoreColor(data.score)}`}>
                  {data.score}%
                </span>
                {data.issues > 0 && (
                  <span className="text-red-500 text-sm">{data.issues} issues</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRegulations = () => (
    <div className="space-y-4">
      {regulations.map(regulation => (
        <div key={regulation.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-white">{regulation.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(regulation.status)}`}>
                  {regulation.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-gray-400 mb-3">{regulation.description}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{regions.find(r => r.code === regulation.region)?.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Effective: {new Date(regulation.effectiveDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Next review: {new Date(regulation.nextReview).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className={`text-2xl font-bold ${getScoreColor(regulation.score)}`}>
                {regulation.score}%
              </div>
              <div className="text-gray-400 text-sm">Score</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Key Requirements</h4>
              <div className="space-y-2">
                {regulation.requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-300 text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Penalties</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Fine:</span>
                  <span className="text-white">{regulation.penalties.maxFine}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Enforcement:</span>
                  <span className="text-white">{regulation.penalties.enforcementBody}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAuditLogs = () => (
    <div className="space-y-4">
      {auditLogs.map(log => (
        <div key={log.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="text-white font-medium capitalize">{log.type.replace('_', ' ')}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  log.status === 'passed' ? 'bg-green-900/30 text-green-400' :
                  log.status === 'warning' ? 'bg-yellow-900/30 text-yellow-400' :
                  log.status === 'critical' ? 'bg-red-900/30 text-red-400' :
                  'bg-gray-900/30 text-gray-400'
                }`}>
                  {log.status}
                </span>
                <span className="text-gray-400 text-sm">{log.regulation}</span>
              </div>
              <p className="text-gray-300 mb-2">{log.details}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{regions.find(r => r.code === log.region)?.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{log.auditor}</span>
                </div>
              </div>
              
              {log.issues && log.issues.length > 0 && (
                <div className="mt-3 space-y-1">
                  {log.issues.map((issue, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-yellow-400">{issue}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="text-right ml-4">
              <div className={`text-2xl font-bold ${getScoreColor(log.score)}`}>
                {log.score}%
              </div>
              <div className="text-gray-400 text-sm">Score</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Gavel className="w-8 h-8 text-cyan-500" />
            <span>Regional Compliance</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Monitor and maintain compliance across different regions and regulations
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          >
            {regions.map(region => (
              <option key={region.code} value={region.code}>
                {region.flag} {region.name}
              </option>
            ))}
          </select>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'regulations' && renderRegulations()}
        {activeTab === 'gdpr' && renderRegulations()}
        {activeTab === 'ccpa' && renderRegulations()}
        {activeTab === 'hipaa' && renderRegulations()}
        {activeTab === 'audits' && renderAuditLogs()}
      </div>
    </div>
  );
};

export default RegionalCompliance;
