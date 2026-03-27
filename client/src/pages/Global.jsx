import React, { useState } from 'react';
import { 
  Globe, 
  MessageSquare, 
  Smartphone, 
  MapPin, 
  Gavel, 
  Shield,
  Settings,
  BarChart3,
  Users,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Database,
  Lock,
  Eye,
  Calendar,
  Clock,
  Flag,
  Building,
  Target,
  Zap,
  Languages
} from 'lucide-react';
import LanguageSelector from '../components/i18n/LanguageSelector';
import MobileApp from '../components/mobile/MobileApp';
import RegionalCompliance from '../components/compliance/RegionalCompliance';

const Global = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [globalStats, setGlobalStats] = useState({});

  const navigationItems = [
    { id: 'overview', label: 'Global Overview', icon: Globe },
    { id: 'i18n', label: 'Internationalization', icon: MessageSquare },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { id: 'compliance', label: 'Regional Compliance', icon: Gavel },
    { id: 'analytics', label: 'Global Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Global Settings', icon: Settings }
  ];

  const globalRegions = [
    { code: 'na', name: 'North America', flag: '🇺🇸', users: 45000, revenue: 1250000 },
    { code: 'eu', name: 'Europe', flag: '🇪🇺', users: 38000, revenue: 980000 },
    { code: 'apac', name: 'Asia Pacific', flag: '🇯🇵', users: 52000, revenue: 1450000 },
    { code: 'latam', name: 'Latin America', flag: '🇧🇷', users: 18000, revenue: 320000 },
    { code: 'mea', name: 'Middle East & Africa', flag: '🇸🇦', users: 12000, revenue: 280000 }
  ];

  const complianceFrameworks = [
    { name: 'GDPR', region: 'EU', status: 'compliant', score: 96.5 },
    { name: 'CCPA', region: 'US', status: 'mostly_compliant', score: 91.2 },
    { name: 'HIPAA', region: 'US', status: 'compliant', score: 94.8 },
    { name: 'PIPEDA', region: 'CA', status: 'compliant', score: 89.5 },
    { name: 'APPI', region: 'JP', status: 'mostly_compliant', score: 87.3 },
    { name: 'LGPD', region: 'BR', status: 'needs_attention', score: 83.2 }
  ];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language.code);
    // In a real app, this would trigger a full app re-render with translations
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <GlobalOverview regions={globalRegions} frameworks={complianceFrameworks} />;
      case 'i18n':
        return <InternationalizationSection currentLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />;
      case 'mobile':
        return <MobileApp />;
      case 'compliance':
        return <RegionalCompliance />;
      case 'analytics':
        return <GlobalAnalytics regions={globalRegions} />;
      case 'settings':
        return <GlobalSettings />;
      default:
        return <GlobalOverview regions={globalRegions} frameworks={complianceFrameworks} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Global Platform</h1>
                <p className="text-gray-400 text-sm">Worldwide Operations</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-green-600/20 text-green-400 border-l-4 border-green-500'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Quick Stats */}
          <div className="p-6 border-t border-gray-800">
            <h3 className="text-white font-medium mb-4">Global Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Total Users</span>
                <span className="text-white font-medium">165K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Regions</span>
                <span className="text-white font-medium">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Languages</span>
                <span className="text-white font-medium">12+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Compliance</span>
                <span className="text-green-400 font-medium">94%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const GlobalOverview = ({ regions, frameworks }) => {
  const stats = [
    {
      title: 'Global Users',
      value: '165K',
      change: '+18%',
      trend: 'up',
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-800'
    },
    {
      title: 'Active Regions',
      value: '5',
      change: '+1',
      trend: 'up',
      icon: MapPin,
      color: 'text-blue-500',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-800'
    },
    {
      title: 'Languages',
      value: '12+',
      change: '+3',
      trend: 'up',
      icon: Languages,
      color: 'text-purple-500',
      bgColor: 'bg-purple-900/20',
      borderColor: 'border-purple-800'
    },
    {
      title: 'Compliance Score',
      value: '94%',
      change: '+2%',
      trend: 'up',
      icon: Shield,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-900/20',
      borderColor: 'border-cyan-800'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Global Overview</h2>
        <p className="text-gray-400">
          Monitor worldwide operations and regional performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gray-900/50 border ${stat.borderColor} rounded-lg p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Performance */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Regional Performance</h3>
          <div className="space-y-4">
            {regions.map(region => (
              <div key={region.code} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{region.flag}</span>
                  <div>
                    <div className="text-white font-medium">{region.name}</div>
                    <div className="text-gray-400 text-sm">{region.users.toLocaleString()} users</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400 font-bold">
                    ${(region.revenue / 1000).toFixed(0)}K
                  </div>
                  <div className="text-gray-400 text-sm">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Compliance Frameworks</h3>
          <div className="space-y-3">
            {frameworks.map(framework => (
              <div key={framework.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    framework.status === 'compliant' ? 'bg-green-500' :
                    framework.status === 'mostly_compliant' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="text-white font-medium">{framework.name}</div>
                    <div className="text-gray-400 text-sm">{framework.region}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    framework.score >= 95 ? 'text-green-500' :
                    framework.score >= 85 ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {framework.score}%
                  </div>
                  <div className="text-gray-400 text-sm">Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Global Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-green-500 transition-colors text-left">
            <Globe className="w-6 h-6 text-green-500 mb-2" />
            <div className="text-white font-medium">Add Region</div>
            <div className="text-gray-400 text-sm">Expand to new markets</div>
          </button>
          <button className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-green-500 transition-colors text-left">
            <Languages className="w-6 h-6 text-purple-500 mb-2" />
            <div className="text-white font-medium">Add Language</div>
            <div className="text-gray-400 text-sm">Support new locales</div>
          </button>
          <button className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-green-500 transition-colors text-left">
            <Gavel className="w-6 h-6 text-cyan-500 mb-2" />
            <div className="text-white font-medium">Compliance Check</div>
            <div className="text-gray-400 text-sm">Run global audit</div>
          </button>
          <button className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-green-500 transition-colors text-left">
            <BarChart3 className="w-6 h-6 text-blue-500 mb-2" />
            <div className="text-white font-medium">Global Report</div>
            <div className="text-gray-400 text-sm">Export analytics</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const InternationalizationSection = ({ currentLanguage, onLanguageChange }) => {
  const [translations, setTranslations] = useState({
    total: 1250,
    translated: 1180,
    pending: 70,
    languages: 12
  });

  const translationProgress = (translations.translated / translations.total) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Internationalization</h2>
        <p className="text-gray-400">
          Manage multi-language support and localization
        </p>
      </div>

      {/* Language Selector */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Language Selection</h3>
        <div className="flex items-center space-x-4">
          <LanguageSelector 
            onLanguageChange={onLanguageChange} 
            currentLanguage={currentLanguage}
          />
          <div className="text-gray-400 text-sm">
            Current: {currentLanguage.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Translation Progress */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Translation Progress</h3>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white">Overall Progress</span>
            <span className="text-cyan-400">{translationProgress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${translationProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-cyan-500">{translations.total}</div>
            <div className="text-gray-400 text-sm">Total Strings</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-500">{translations.translated}</div>
            <div className="text-gray-400 text-sm">Translated</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-500">{translations.pending}</div>
            <div className="text-gray-400 text-sm">Pending</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-500">{translations.languages}</div>
            <div className="text-gray-400 text-sm">Languages</div>
          </div>
        </div>
      </div>

      {/* Localization Settings */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Localization Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Date & Time</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Date Format</span>
                <select className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Time Format</span>
                <select className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white">
                  <option>12-hour</option>
                  <option>24-hour</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Timezone</span>
                <select className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white">
                  <option>UTC</option>
                  <option>EST</option>
                  <option>PST</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">Number & Currency</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Number Format</span>
                <select className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white">
                  <option>1,234.56</option>
                  <option>1.234,56</option>
                  <option>1234.56</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Currency</span>
                <select className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Decimal Places</span>
                <input type="number" min="0" max="4" defaultValue="2" className="w-20 px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GlobalAnalytics = ({ regions }) => {
  const totalUsers = regions.reduce((sum, region) => sum + region.users, 0);
  const totalRevenue = regions.reduce((sum, region) => sum + region.revenue, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Global Analytics</h2>
        <p className="text-gray-400">
          Worldwide performance metrics and insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Distribution</h3>
          <div className="space-y-3">
            {regions.map(region => (
              <div key={region.code} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{region.flag}</span>
                  <span className="text-white">{region.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(region.users / totalUsers) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-400 text-sm">{((region.users / totalUsers) * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Distribution</h3>
          <div className="space-y-3">
            {regions.map(region => (
              <div key={region.code} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{region.flag}</span>
                  <span className="text-white">{region.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(region.revenue / totalRevenue) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-400 text-sm">{((region.revenue / totalRevenue) * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GlobalSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Global Settings</h2>
        <p className="text-gray-400">
          Configure worldwide platform settings
        </p>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Global Configuration</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Multi-language Support</h4>
              <p className="text-gray-400 text-sm">Enable multiple language interfaces</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Regional Compliance</h4>
              <p className="text-gray-400 text-sm">Automatically apply regional regulations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Global Analytics</h4>
              <p className="text-gray-400 text-sm">Track worldwide usage metrics</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Global;
