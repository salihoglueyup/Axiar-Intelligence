import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Zap, 
  Code, 
  Database, 
  Shield, 
  Users, 
  TrendingUp,
  Star,
  Download,
  Upload,
  Search,
  Filter,
  Play,
  Pause,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  EyeOff,
  Link,
  FileText,
  BarChart3,
  Activity,
  Lock,
  Key,
  CreditCard,
  Mail,
  Calendar,
  Map,
  Cloud,
  Server,
  GitBranch,
  Package,
  ExternalLink,
  Copy,
  Share,
  Heart,
  MessageSquare
} from 'lucide-react';

const ApiMarketplace = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showApiKey, setShowApiKey] = useState(false);
  const [integrations, setIntegrations] = useState([]);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const tabs = [
    { id: 'marketplace', label: 'Marketplace', icon: Globe },
    { id: 'installed', label: 'Installed', icon: Package },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'keys', label: 'API Keys', icon: Key }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: Globe },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'communication', name: 'Communication', icon: Mail },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'storage', name: 'Storage', icon: Database },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'productivity', name: 'Productivity', icon: Calendar },
    { id: 'social', name: 'Social', icon: Users },
    { id: 'cloud', name: 'Cloud', icon: Cloud },
    { id: 'development', name: 'Development', icon: Code }
  ];

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    // Mock data - replace with actual API call
    const mockIntegrations = [
      {
        id: 'stripe',
        name: 'Stripe',
        description: 'Payment processing platform for internet businesses',
        category: 'payment',
        icon: CreditCard,
        rating: 4.8,
        downloads: 45000,
        price: 'Free tier available',
        developer: 'Stripe Inc.',
        tags: ['payment', 'billing', 'subscription'],
        status: 'installed',
        version: 'v1.2.0',
        lastUpdated: '2024-03-20',
        features: ['Payment processing', 'Subscriptions', 'Invoicing', 'Fraud detection'],
        documentation: 'https://docs.stripe.com',
        support: '24/7 support',
        apiKey: 'sk_test_1234567890abcdef',
        endpoints: 15,
        webhooks: true
      },
      {
        id: 'sendgrid',
        name: 'SendGrid',
        description: 'Cloud-based email delivery platform',
        category: 'communication',
        icon: Mail,
        rating: 4.6,
        downloads: 32000,
        price: 'Free tier available',
        developer: 'Twilio',
        tags: ['email', 'marketing', 'notifications'],
        status: 'available',
        version: 'v3.0.0',
        lastUpdated: '2024-03-18',
        features: ['Email delivery', 'Templates', 'Analytics', 'Automation'],
        documentation: 'https://docs.sendgrid.com',
        support: 'Business hours',
        endpoints: 12,
        webhooks: true
      },
      {
        id: 'google-analytics',
        name: 'Google Analytics',
        description: 'Web analytics service for tracking and reporting',
        category: 'analytics',
        icon: BarChart3,
        rating: 4.7,
        downloads: 67000,
        price: 'Free',
        developer: 'Google',
        tags: ['analytics', 'tracking', 'reporting'],
        status: 'installed',
        version: 'v4.0.0',
        lastUpdated: '2024-03-15',
        features: ['Traffic analysis', 'Conversion tracking', 'Custom reports', 'Real-time data'],
        documentation: 'https://developers.google.com/analytics',
        support: 'Community',
        apiKey: 'GA4-1234567890-1',
        endpoints: 8,
        webhooks: false
      },
      {
        id: 'aws-s3',
        name: 'AWS S3',
        description: 'Scalable object storage service',
        category: 'storage',
        icon: Database,
        rating: 4.9,
        downloads: 54000,
        price: 'Pay-as-you-go',
        developer: 'Amazon Web Services',
        tags: ['storage', 'cloud', 'backup'],
        status: 'available',
        version: 'v2.0.0',
        lastUpdated: '2024-03-12',
        features: ['Object storage', 'CDN', 'Backup', 'Versioning'],
        documentation: 'https://docs.aws.amazon.com/s3',
        support: '24/7 support',
        endpoints: 20,
        webhooks: true
      },
      {
        id: 'slack',
        name: 'Slack',
        description: 'Team communication and collaboration platform',
        category: 'productivity',
        icon: MessageSquare,
        rating: 4.5,
        downloads: 38000,
        price: 'Free tier available',
        developer: 'Slack Technologies',
        tags: ['messaging', 'team', 'collaboration'],
        status: 'installed',
        version: 'v1.5.0',
        lastUpdated: '2024-03-10',
        features: ['Messaging', 'Channels', 'File sharing', 'Integrations'],
        documentation: 'https://api.slack.com',
        support: 'Business hours',
        apiKey: 'xoxb-1234567890-abcdef',
        endpoints: 18,
        webhooks: true
      },
      {
        id: 'github',
        name: 'GitHub',
        description: 'Development platform for version control and collaboration',
        category: 'development',
        icon: GitBranch,
        rating: 4.8,
        downloads: 52000,
        price: 'Free tier available',
        developer: 'GitHub Inc.',
        tags: ['git', 'version-control', 'development'],
        status: 'available',
        version: 'v4.0.0',
        lastUpdated: '2024-03-08',
        features: ['Repository management', 'Issues', 'Pull requests', 'Actions'],
        documentation: 'https://docs.github.com',
        support: 'Community',
        endpoints: 25,
        webhooks: true
      }
    ];
    
    setIntegrations(mockIntegrations);
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleInstall = async (integrationId) => {
    // Mock installation process
    const integration = integrations.find(i => i.id === integrationId);
    if (integration) {
      integration.status = 'installing';
      setIntegrations([...integrations]);
      
      setTimeout(() => {
        integration.status = 'installed';
        integration.apiKey = generateApiKey();
        setIntegrations([...integrations]);
      }, 2000);
    }
  };

  const handleUninstall = async (integrationId) => {
    // Mock uninstallation process
    const integration = integrations.find(i => i.id === integrationId);
    if (integration) {
      integration.status = 'available';
      integration.apiKey = null;
      setIntegrations([...integrations]);
    }
  };

  const generateApiKey = () => {
    return 'ak_' + Math.random().toString(36).substr(2, 32);
  };

  const renderMarketplace = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map(integration => (
          <div key={integration.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-900/20 rounded-lg">
                  {React.createElement(integration.icon, { className: "w-6 h-6 text-cyan-500" })}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
                  <p className="text-gray-400 text-sm">{integration.developer}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-white text-sm">{integration.rating}</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4">{integration.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {integration.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span>{integration.downloads.toLocaleString()} downloads</span>
              <span>{integration.price}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">{integration.endpoints} endpoints</span>
                {integration.webhooks && (
                  <Link className="w-4 h-4 text-gray-400" />
                )}
              </div>

              {integration.status === 'installed' ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedIntegration(integration)}
                    className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleUninstall(integration.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                  >
                    Uninstall
                  </button>
                </div>
              ) : integration.status === 'installing' ? (
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-sm">Installing...</span>
                </div>
              ) : (
                <button
                  onClick={() => handleInstall(integration.id)}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm"
                >
                  Install
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInstalled = () => {
    const installedIntegrations = integrations.filter(i => i.status === 'installed');
    
    return (
      <div className="space-y-6">
        {installedIntegrations.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No integrations installed yet</p>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Browse Marketplace
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {installedIntegrations.map(integration => (
              <div key={integration.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-cyan-900/20 rounded-lg">
                      {React.createElement(integration.icon, { className: "w-8 h-8 text-cyan-500" })}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{integration.name}</h3>
                      <p className="text-gray-400">{integration.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <span>Version: {integration.version}</span>
                        <span>Endpoints: {integration.endpoints}</span>
                        <span>Updated: {integration.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedIntegration(integration)}
                      className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleUninstall(integration.id)}
                      className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Uninstall
                    </button>
                  </div>
                </div>

                {/* API Key Section */}
                {integration.apiKey && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium mb-2">API Key</h4>
                        <div className="flex items-center space-x-2">
                          <code className="px-3 py-1 bg-gray-800 text-cyan-400 rounded text-sm font-mono">
                            {showApiKey ? integration.apiKey : '••••••••••••••••••••••••••••••••'}
                          </code>
                          <button
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => navigator.clipboard.writeText(integration.apiKey)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">Active</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Usage Stats */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h4 className="text-white font-medium mb-3">Usage Statistics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-cyan-500 text-lg font-bold">1,234</div>
                      <div className="text-gray-400 text-sm">API Calls Today</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-green-500 text-lg font-bold">98.5%</div>
                      <div className="text-gray-400 text-sm">Success Rate</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-yellow-500 text-lg font-bold">45ms</div>
                      <div className="text-gray-400 text-sm">Avg Response</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-purple-500 text-lg font-bold">12.3K</div>
                      <div className="text-gray-400 text-sm">Total Requests</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-900/20 rounded-lg">
              <Activity className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-green-500 text-sm">+12%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">15,234</div>
          <div className="text-gray-400 text-sm">Total API Calls</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-900/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-green-500 text-sm">+2%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">96.8%</div>
          <div className="text-gray-400 text-sm">Success Rate</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-900/20 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-green-500 text-sm">-8%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">42ms</div>
          <div className="text-gray-400 text-sm">Avg Response Time</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-900/20 rounded-lg">
              <Package className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-green-500 text-sm">+3</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">8</div>
          <div className="text-gray-400 text-sm">Active Integrations</div>
        </div>
      </div>

      {/* Integration Performance */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Integration Performance</h3>
        <div className="space-y-4">
          {integrations.filter(i => i.status === 'installed').map(integration => (
            <div key={integration.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {React.createElement(integration.icon, { className: "w-5 h-5 text-gray-400" })}
                <span className="text-white">{integration.name}</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-cyan-400 font-bold">2,345</div>
                  <div className="text-gray-400 text-sm">Calls</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">98.2%</div>
                  <div className="text-gray-400 text-sm">Success</div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-bold">38ms</div>
                  <div className="text-gray-400 text-sm">Response</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderApiKeys = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">API Key Management</h3>
        
        <div className="space-y-4">
          {integrations.filter(i => i.status === 'installed' && i.apiKey).map(integration => (
            <div key={integration.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {React.createElement(integration.icon, { className: "w-5 h-5 text-cyan-500" })}
                  <span className="text-white font-medium">{integration.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded-full text-xs">
                    Active
                  </span>
                  <button className="p-1 text-gray-400 hover:text-white transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-gray-400" />
                <code className="flex-1 px-3 py-1 bg-gray-700 text-cyan-400 rounded text-sm font-mono">
                  {showApiKey ? integration.apiKey : '••••••••••••••••••••••••••••••••'}
                </code>
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(integration.apiKey)}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
                <span>Created: 2024-03-15</span>
                <span>Last used: 2 hours ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Security Best Practices</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <div className="text-white">Store API keys securely</div>
              <div className="text-gray-400 text-sm">Use environment variables or secret management</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <div className="text-white">Rotate keys regularly</div>
              <div className="text-gray-400 text-sm">Update API keys every 90 days</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <div className="text-white">Monitor usage</div>
              <div className="text-gray-400 text-sm">Track API calls and detect anomalies</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <div className="text-white">Never commit keys to version control</div>
              <div className="text-gray-400 text-sm">Keep API keys out of your code repository</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Globe className="w-8 h-8 text-cyan-500" />
            <span>API Marketplace</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Discover, install, and manage third-party integrations
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Documentation</span>
          </button>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Submit Integration</span>
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
              {React.createElement(tab.icon, { className: "w-4 h-4" })}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'marketplace' && renderMarketplace()}
        {activeTab === 'installed' && renderInstalled()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'keys' && renderApiKeys()}
      </div>
    </div>
  );
};

export default ApiMarketplace;
