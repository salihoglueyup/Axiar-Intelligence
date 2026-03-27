import React, { useState, useEffect } from 'react';
import { 
  Link, 
  Activity, 
  Settings, 
  Play, 
  Pause, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Edit, 
  Plus, 
  Search, 
  Filter, 
  Globe, 
  Shield, 
  Zap, 
  Database, 
  Code, 
  Calendar, 
  BarChart3, 
  Download, 
  Upload, 
  ExternalLink, 
  Key, 
  Lock, 
  Unlock, 
  Bell, 
  Mail, 
  MessageSquare, 
  CreditCard, 
  Users, 
  FileText, 
  GitBranch
} from 'lucide-react';

const WebhookManager = () => {
  const [activeTab, setActiveTab] = useState('webhooks');
  const [webhooks, setWebhooks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [showSecret, setShowSecret] = useState({});
  const [selectedWebhook, setSelectedWebhook] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);

  const tabs = [
    { id: 'webhooks', label: 'Webhooks', icon: Link },
    { id: 'logs', label: 'Delivery Logs', icon: Activity },
    { id: 'events', label: 'Events', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  const eventTypes = [
    'user.created',
    'user.updated',
    'user.deleted',
    'payment.completed',
    'payment.failed',
    'invoice.created',
    'invoice.paid',
    'subscription.created',
    'subscription.updated',
    'subscription.cancelled',
    'project.created',
    'project.updated',
    'project.deleted',
    'report.generated',
    'system.maintenance',
    'security.breach'
  ];

  const httpMethods = ['POST', 'PUT', 'PATCH'];
  const contentTypes = ['application/json', 'application/x-www-form-urlencoded'];

  useEffect(() => {
    loadWebhooks();
    loadLogs();
  }, []);

  const loadWebhooks = async () => {
    // Mock data - replace with actual API call
    const mockWebhooks = [
      {
        id: 'wh_1234567890',
        name: 'Payment Notifications',
        url: 'https://api.example.com/webhooks/payments',
        events: ['payment.completed', 'payment.failed'],
        secret: 'whsec_1234567890abcdef',
        active: true,
        method: 'POST',
        contentType: 'application/json',
        retries: 3,
        timeout: 30,
        created: '2024-03-15T10:00:00Z',
        lastTriggered: '2024-03-23T14:30:00Z',
        totalDeliveries: 1247,
        successRate: 98.5,
        avgResponseTime: 245,
        headers: {
          'X-Custom-Header': 'value',
          'Authorization': 'Bearer token123'
        }
      },
      {
        id: 'wh_1234567891',
        name: 'User Activity Sync',
        url: 'https://sync.example.com/users',
        events: ['user.created', 'user.updated', 'user.deleted'],
        secret: 'whsec_fedcba0987654321',
        active: true,
        method: 'POST',
        contentType: 'application/json',
        retries: 5,
        timeout: 15,
        created: '2024-03-10T15:30:00Z',
        lastTriggered: '2024-03-23T13:15:00Z',
        totalDeliveries: 892,
        successRate: 96.2,
        avgResponseTime: 189,
        headers: {
          'X-API-Key': 'sync-key-123'
        }
      },
      {
        id: 'wh_1234567892',
        name: 'Analytics Tracking',
        url: 'https://analytics.example.com/events',
        events: ['project.created', 'project.updated', 'project.deleted'],
        secret: 'whsec_abcdef1234567890',
        active: false,
        method: 'POST',
        contentType: 'application/json',
        retries: 2,
        timeout: 10,
        created: '2024-03-05T09:00:00Z',
        lastTriggered: '2024-03-20T11:45:00Z',
        totalDeliveries: 456,
        successRate: 94.8,
        avgResponseTime: 156,
        headers: {}
      }
    ];
    
    setWebhooks(mockWebhooks);
  };

  const loadLogs = async () => {
    // Mock data - replace with actual API call
    const mockLogs = [
      {
        id: 'log_1',
        webhookId: 'wh_1234567890',
        webhookName: 'Payment Notifications',
        eventType: 'payment.completed',
        status: 'success',
        statusCode: 200,
        responseTime: 234,
        timestamp: '2024-03-23T14:30:00Z',
        attempt: 1,
        payload: {
          id: 'pay_123',
          amount: 99.99,
          currency: 'USD',
          status: 'completed'
        },
        response: {
          status: 'ok',
          processed: true
        },
        error: null
      },
      {
        id: 'log_2',
        webhookId: 'wh_1234567891',
        webhookName: 'User Activity Sync',
        eventType: 'user.created',
        status: 'failed',
        statusCode: 500,
        responseTime: 5000,
        timestamp: '2024-03-23T13:15:00Z',
        attempt: 3,
        payload: {
          id: 'user_456',
          email: 'user@example.com',
          name: 'John Doe'
        },
        response: null,
        error: 'Internal Server Error'
      },
      {
        id: 'log_3',
        webhookId: 'wh_1234567892',
        webhookName: 'Analytics Tracking',
        eventType: 'project.created',
        status: 'success',
        statusCode: 200,
        responseTime: 156,
        timestamp: '2024-03-23T12:00:00Z',
        attempt: 1,
        payload: {
          id: 'project_789',
          name: 'New Project',
          owner: 'user_456'
        },
        response: {
          tracked: true,
          event_id: 'evt_123'
        },
        error: null
      }
    ];
    
    setLogs(mockLogs);
  };

  const handleToggleWebhook = async (webhookId) => {
    const webhook = webhooks.find(w => w.id === webhookId);
    if (webhook) {
      webhook.active = !webhook.active;
      setWebhooks([...webhooks]);
    }
  };

  const handleDeleteWebhook = async (webhookId) => {
    if (confirm('Are you sure you want to delete this webhook?')) {
      setWebhooks(webhooks.filter(w => w.id !== webhookId));
    }
  };

  const handleRetryWebhook = async (logId) => {
    // Mock retry logic
    const log = logs.find(l => l.id === logId);
    if (log) {
      log.status = 'retrying';
      setLogs([...logs]);
      
      setTimeout(() => {
        log.status = Math.random() > 0.2 ? 'success' : 'failed';
        log.statusCode = log.status === 'success' ? 200 : 500;
        log.attempt += 1;
        setLogs([...logs]);
      }, 2000);
    }
  };

  const toggleSecretVisibility = (webhookId) => {
    setShowSecret(prev => ({
      ...prev,
      [webhookId]: !prev[webhookId]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-500';
      case 'failed': return 'text-red-500';
      case 'retrying': return 'text-yellow-500';
      case 'pending': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      case 'retrying': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const renderWebhooks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search webhooks..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Webhook</span>
        </button>
      </div>

      <div className="space-y-4">
        {webhooks.map(webhook => (
          <div key={webhook.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{webhook.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    webhook.active 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-gray-900/30 text-gray-400'
                  }`}>
                    {webhook.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <span>{webhook.method}</span>
                  <span>{webhook.contentType}</span>
                  <span>{webhook.retries} retries</span>
                  <span>{webhook.timeout}s timeout</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <code className="px-3 py-1 bg-gray-800 text-cyan-400 rounded text-sm font-mono">
                    {webhook.url}
                  </code>
                  <button
                    onClick={() => copyToClipboard(webhook.url)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{webhook.events.length} events</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{webhook.totalDeliveries} deliveries</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-green-400">{webhook.successRate}% success</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{webhook.avgResponseTime}ms avg</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleWebhook(webhook.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    webhook.active 
                      ? 'bg-green-900/20 text-green-400 hover:bg-green-900/30' 
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {webhook.active ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setSelectedWebhook(webhook)}
                  className="p-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteWebhook(webhook.id)}
                  className="p-2 bg-red-900/20 text-red-400 rounded-lg hover:bg-red-900/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Events */}
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">Events</h4>
              <div className="flex flex-wrap gap-2">
                {webhook.events.map((event, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </div>

            {/* Secret */}
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Key className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">Signing Secret</span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="px-3 py-1 bg-gray-800 text-cyan-400 rounded text-sm font-mono">
                    {showSecret[webhook.id] ? webhook.secret : '••••••••••••••••••••••••••••••••'}
                  </code>
                  <button
                    onClick={() => toggleSecretVisibility(webhook.id)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    {showSecret[webhook.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(webhook.secret)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search logs..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="retrying">Retrying</option>
          </select>
        </div>
        
        <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Logs</span>
        </button>
      </div>

      <div className="space-y-4">
        {logs.map(log => (
          <div key={log.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getStatusIcon(log.status)}
                  <span className={`font-medium ${getStatusColor(log.status)}`}>
                    {log.status.toUpperCase()}
                  </span>
                  <span className="text-white">{log.webhookName}</span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-300">{log.eventType}</span>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span>Attempt {log.attempt}</span>
                  </div>
                  {log.statusCode && (
                    <div className="flex items-center space-x-1">
                      <Code className="w-4 h-4" />
                      <span>HTTP {log.statusCode}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>{log.responseTime}ms</span>
                  </div>
                </div>

                {log.error && (
                  <div className="mb-3 p-3 bg-red-900/20 border border-red-800 rounded">
                    <p className="text-red-400 text-sm">{log.error}</p>
                  </div>
                )}
              </div>
              
              {log.status === 'failed' && (
                <button
                  onClick={() => handleRetryWebhook(log.id)}
                  className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors flex items-center space-x-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry</span>
                </button>
              )}
            </div>

            {/* Payload */}
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">Payload</h4>
              <pre className="bg-gray-800 p-3 rounded text-gray-300 text-sm overflow-x-auto">
                {JSON.stringify(log.payload, null, 2)}
              </pre>
            </div>

            {/* Response */}
            {log.response && (
              <div>
                <h4 className="text-white font-medium mb-2">Response</h4>
                <pre className="bg-gray-800 p-3 rounded text-gray-300 text-sm overflow-x-auto">
                  {JSON.stringify(log.response, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Available Events</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventTypes.map(event => (
            <div key={event} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{event}</span>
                <Bell className="w-4 h-4 text-cyan-500" />
              </div>
              <p className="text-gray-400 text-sm">
                Triggered when {event.replace('.', ' ')} occurs
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Event Categories</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-medium mb-2 flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>User Events</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {eventTypes.filter(e => e.startsWith('user')).map(event => (
                <span key={event} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {event}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-2 flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Payment Events</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {eventTypes.filter(e => e.startsWith('payment') || e.startsWith('invoice') || e.startsWith('subscription')).map(event => (
                <span key={event} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {event}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-2 flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Project Events</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {eventTypes.filter(e => e.startsWith('project')).map(event => (
                <span key={event} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {event}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-2 flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>System Events</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {eventTypes.filter(e => e.startsWith('system') || e.startsWith('security')).map(event => (
                <span key={event} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  {event}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Require HTTPS for all webhooks</h4>
              <p className="text-gray-400 text-sm">Only accept webhook URLs that use HTTPS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Verify webhook signatures</h4>
              <p className="text-gray-400 text-sm">Validate incoming webhook signatures</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Rate limiting</h4>
              <p className="text-gray-400 text-sm">Limit webhook delivery frequency</p>
            </div>
            <select className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white">
              <option>1000/hour</option>
              <option>5000/hour</option>
              <option>10000/hour</option>
              <option>Unlimited</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">IP Whitelist</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Add IP address or CIDR block"
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-cyan-500"
            />
            <button className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors">
              Add
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
              <span className="text-gray-300">192.168.1.0/24</span>
              <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
              <span className="text-gray-300">10.0.0.0/8</span>
              <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Security Best Practices</h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <div className="text-white">Use unique secrets for each webhook</div>
              <div className="text-gray-400 text-sm">Generate unique signing secrets for better security</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <div className="text-white">Rotate secrets regularly</div>
              <div className="text-gray-400 text-sm">Update webhook secrets every 90 days</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <div className="text-white">Monitor webhook logs</div>
              <div className="text-gray-400 text-sm">Regularly check for failed deliveries and suspicious activity</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div>
              <div className="text-white">Never log sensitive data</div>
              <div className="text-gray-400 text-sm">Avoid logging full payloads in production</div>
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
            <Link className="w-8 h-8 text-cyan-500" />
            <span>Webhook Manager</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Configure and manage webhook endpoints for real-time event notifications
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Documentation</span>
          </button>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create Webhook</span>
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
        {activeTab === 'webhooks' && renderWebhooks()}
        {activeTab === 'logs' && renderLogs()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'security' && renderSecurity()}
      </div>
    </div>
  );
};

export default WebhookManager;
