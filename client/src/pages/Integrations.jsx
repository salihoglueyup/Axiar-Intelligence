import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Zap, 
  Terminal, 
  Link, 
  Settings, 
  BarChart3, 
  Package, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Activity, 
  Clock, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Edit, 
  Plus, 
  RefreshCw, 
  Shield, 
  Key, 
  Database, 
  CreditCard, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Map, 
  Cloud, 
  Server, 
  GitBranch, 
  FileText, 
  HelpCircle,
  Code
} from 'lucide-react';
import ApiMarketplace from '../components/integrations/ApiMarketplace';
import WebhookManager from '../components/integrations/WebhookManager';
import IntegrationBuilder from '../components/integrations/IntegrationBuilder';

const Integrations = () => {
  const [activeSection, setActiveSection] = useState('marketplace');
  const [integrations, setIntegrations] = useState([]);
  const [webhooks, setWebhooks] = useState([]);
  const [stats, setStats] = useState({});

  const navigationItems = [
    { id: 'marketplace', label: 'API Marketplace', icon: Globe },
    { id: 'webhooks', label: 'Webhooks', icon: Link },
    { id: 'builder', label: 'Integration Builder', icon: Code },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  useEffect(() => {
    loadIntegrations();
    loadWebhooks();
    loadStats();
  }, []);

  const loadIntegrations = async () => {
    // Mock data - replace with actual API call
    const mockIntegrations = [
      {
        id: 'stripe',
        name: 'Stripe',
        category: 'payment',
        status: 'active',
        version: 'v1.2.0',
        apiCalls: 15420,
        successRate: 98.5,
        lastUsed: '2024-03-23T14:30:00Z',
        icon: CreditCard
      },
      {
        id: 'sendgrid',
        name: 'SendGrid',
        category: 'communication',
        status: 'active',
        version: 'v3.0.0',
        apiCalls: 8930,
        successRate: 96.2,
        lastUsed: '2024-03-23T13:15:00Z',
        icon: Mail
      },
      {
        id: 'google-analytics',
        name: 'Google Analytics',
        category: 'analytics',
        status: 'active',
        version: 'v4.0.0',
        apiCalls: 23450,
        successRate: 99.1,
        lastUsed: '2024-03-23T12:00:00Z',
        icon: BarChart3
      }
    ];
    
    setIntegrations(mockIntegrations);
  };

  const loadWebhooks = async () => {
    // Mock data - replace with actual API call
    const mockWebhooks = [
      {
        id: 'wh_1234567890',
        name: 'Payment Notifications',
        status: 'active',
        events: ['payment.completed', 'payment.failed'],
        deliveries: 1247,
        successRate: 98.5,
        lastTriggered: '2024-03-23T14:30:00Z',
        icon: Link
      },
      {
        id: 'wh_1234567891',
        name: 'User Activity Sync',
        status: 'active',
        events: ['user.created', 'user.updated', 'user.deleted'],
        deliveries: 892,
        successRate: 96.2,
        lastTriggered: '2024-03-23T13:15:00Z',
        icon: Link
      }
    ];
    
    setWebhooks(mockWebhooks);
  };

  const loadStats = async () => {
    // Mock data - replace with actual API call
    const mockStats = {
      totalIntegrations: 8,
      activeIntegrations: 6,
      totalWebhooks: 12,
      activeWebhooks: 10,
      totalApiCalls: 125000,
      avgSuccessRate: 97.2,
      avgResponseTime: 245,
      monthlyGrowth: 18.5
    };
    
    setStats(mockStats);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'marketplace':
        return <ApiMarketplace />;
      case 'webhooks':
        return <WebhookManager />;
      case 'builder':
        return <IntegrationBuilder />;
      case 'analytics':
        return <IntegrationsAnalytics integrations={integrations} webhooks={webhooks} />;
      case 'settings':
        return <IntegrationsSettings />;
      default:
        return <ApiMarketplace />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Integrations</h1>
                <p className="text-gray-400 text-sm">Ecosystem Hub</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-purple-600/20 text-purple-400 border-l-4 border-purple-500'
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
            <h3 className="text-white font-medium mb-4">Integration Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Active Integrations</span>
                <span className="text-white font-medium">{stats.activeIntegrations}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Active Webhooks</span>
                <span className="text-white font-medium">{stats.activeWebhooks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">API Calls Today</span>
                <span className="text-white font-medium">{stats.totalApiCalls?.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Success Rate</span>
                <span className="text-green-400 font-medium">{stats.avgSuccessRate}%</span>
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

const IntegrationsAnalytics = ({ integrations, webhooks }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Integration Analytics</h2>
        <p className="text-gray-400">
          Monitor performance and usage of your integrations and webhooks
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-900/20 rounded-lg">
              <Activity className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-green-500 text-sm">+18%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">125K</div>
          <div className="text-gray-400 text-sm">Total API Calls</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-900/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-green-500 text-sm">+2%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">97.2%</div>
          <div className="text-gray-400 text-sm">Success Rate</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-900/20 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-green-500 text-sm">-8%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">245ms</div>
          <div className="text-gray-400 text-sm">Avg Response</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-900/20 rounded-lg">
              <Package className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-green-500 text-sm">+3</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">16</div>
          <div className="text-gray-400 text-sm">Total Integrations</div>
        </div>
      </div>

      {/* Integration Performance */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Integration Performance</h3>
        <div className="space-y-4">
          {integrations.map(integration => (
            <div key={integration.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <integration.icon className="w-5 h-5 text-cyan-500" />
                <span className="text-white">{integration.name}</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-cyan-400 font-bold">{integration.apiCalls.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Calls</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">{integration.successRate}%</div>
                  <div className="text-gray-400 text-sm">Success</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-sm">{new Date(integration.lastUsed).toLocaleDateString()}</div>
                  <div className="text-gray-400 text-sm">Last used</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhook Performance */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Webhook Performance</h3>
        <div className="space-y-4">
          {webhooks.map(webhook => (
            <div key={webhook.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link className="w-5 h-5 text-cyan-500" />
                <span className="text-white">{webhook.name}</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-cyan-400 font-bold">{webhook.deliveries.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">Deliveries</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">{webhook.successRate}%</div>
                  <div className="text-gray-400 text-sm">Success</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-sm">{new Date(webhook.lastTriggered).toLocaleDateString()}</div>
                  <div className="text-gray-400 text-sm">Last triggered</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Trends */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Usage Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">API Calls Over Time</h4>
            <div className="space-y-2">
              {[
                { date: '2024-03-23', calls: 5234 },
                { date: '2024-03-22', calls: 4892 },
                { date: '2024-03-21', calls: 4567 },
                { date: '2024-03-20', calls: 4234 },
                { date: '2024-03-19', calls: 3987 }
              ].map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300">{day.date}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(day.calls / 5234) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-cyan-400 text-sm">{day.calls.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">Success Rate Over Time</h4>
            <div className="space-y-2">
              {[
                { date: '2024-03-23', rate: 97.2 },
                { date: '2024-03-22', rate: 96.8 },
                { date: '2024-03-21', rate: 97.5 },
                { date: '2024-03-20', rate: 95.3 },
                { date: '2024-03-19', rate: 94.7 }
              ].map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300">{day.date}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${day.rate}%` }}
                      ></div>
                    </div>
                    <span className="text-green-400 text-sm">{day.rate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IntegrationsSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Integration Settings</h2>
        <p className="text-gray-400">
          Configure global integration settings and preferences
        </p>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">API Configuration</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Rate Limiting</h4>
              <p className="text-gray-400 text-sm">Global API rate limit per hour</p>
            </div>
            <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
              <option>1000</option>
              <option>5000</option>
              <option>10000</option>
              <option>Unlimited</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Timeout</h4>
              <p className="text-gray-400 text-sm">Default request timeout in seconds</p>
            </div>
            <input
              type="number"
              defaultValue="30"
              min="1"
              max="300"
              className="w-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Retry Policy</h4>
              <p className="text-gray-400 text-sm">Number of retry attempts</p>
            </div>
            <input
              type="number"
              defaultValue="3"
              min="0"
              max="10"
              className="w-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Webhook Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Default Timeout</h4>
              <p className="text-gray-400 text-sm">Webhook delivery timeout in seconds</p>
            </div>
            <input
              type="number"
              defaultValue="30"
              min="1"
              max="300"
              className="w-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Retry Attempts</h4>
              <p className="text-gray-400 text-sm">Number of retry attempts for failed webhooks</p>
            </div>
            <input
              type="number"
              defaultValue="3"
              min="0"
              max="10"
              className="w-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Signature Verification</h4>
              <p className="text-gray-400 text-sm">Verify webhook signatures by default</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">API Key Rotation</h4>
              <p className="text-gray-400 text-sm">Automatically rotate API keys every 90 days</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">IP Whitelisting</h4>
              <p className="text-gray-400 text-sm">Restrict API access to specific IP addresses</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Audit Logging</h4>
              <p className="text-gray-400 text-sm">Log all API calls and webhook deliveries</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Failure Notifications</h4>
              <p className="text-gray-400 text-sm">Get notified when integrations fail</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Usage Alerts</h4>
              <p className="text-gray-400 text-sm">Alert when approaching rate limits</p>
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

export default Integrations;
