import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Eye, 
  MousePointer, 
  Download, 
  Upload, 
  Filter, 
  Calendar, 
  RefreshCw, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Share, 
  Maximize2, 
  Grid, 
  Layers, 
  Database, 
  Brain, 
  Target, 
  Zap, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Info,
  HelpCircle,
  FileText,
  Image,
  Video,
  Map,
  Globe,
  Server,
  Cloud,
  Shield,
  Key,
  Lock,
  Unlock,
  Search,
  Bell,
  Mail,
  MessageSquare,
  CreditCard,
  Package,
  Truck,
  Building,
  Briefcase,
  BarChart,
  AreaChart,
  ScatterChart,
  Timer,
  UserCheck,
  UserPlus,
  UserMinus,
  UserX,
  Hash,
  Percent,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  MoreVertical,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Expand,
  Shrink,
  Fullscreen,
  Minimize
} from 'lucide-react';
import BIDashboard from '../components/analytics/BIDashboard';
import DataSciencePlatform from '../components/analytics/DataSciencePlatform';
import AdvancedAnalytics from '../components/analytics/AdvancedAnalytics';

const Analytics = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState({});

  const navigationItems = [
    { id: 'dashboard', label: 'BI Dashboard', icon: BarChart3 },
    { id: 'datascience', label: 'Data Science', icon: Brain },
    { id: 'predictive', label: 'Predictive Analytics', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'insights', label: 'AI Insights', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    // Mock data - replace with actual API call
    const mockStats = {
      totalDashboards: 24,
      activeDashboards: 18,
      totalNotebooks: 156,
      activeNotebooks: 89,
      totalModels: 45,
      deployedModels: 12,
      totalDatasets: 8,
      activeDatasets: 8,
      totalForecasts: 15,
      activeForecasts: 12,
      dailyViews: 4400,
      weeklyViews: 28500,
      monthlyViews: 125000,
      totalPredictions: 1250000,
      accuracy: 92.3,
      avgResponseTime: 245,
      dataProcessed: '2.3 TB'
    };
    
    setStats(mockStats);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <BIDashboard />;
      case 'datascience':
        return <DataSciencePlatform />;
      case 'predictive':
        return <AdvancedAnalytics />;
      case 'reports':
        return <ReportsSection />;
      case 'insights':
        return <InsightsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <BIDashboard />;
    }
  };

  const ReportsSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Analytics Reports</h2>
        <p className="text-gray-400">
          Generate and manage comprehensive analytics reports
        </p>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Report Templates</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Executive Summary', description: 'High-level business metrics and KPIs', icon: Building },
            { name: 'Sales Performance', description: 'Detailed sales analysis and trends', icon: ShoppingCart },
            { name: 'Customer Analytics', description: 'Customer behavior and segmentation', icon: Users },
            { name: 'Marketing ROI', description: 'Marketing campaign effectiveness', icon: Target },
            { name: 'Financial Report', description: 'Revenue and cost analysis', icon: DollarSign },
            { name: 'Product Analytics', description: 'Product usage and performance', icon: Package }
          ].map((template, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-cyan-900/20 rounded">
                  <template.icon className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{template.name}</h4>
                  <p className="text-gray-400 text-sm">{template.description}</p>
                </div>
              </div>
              
              <button className="w-full px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors text-sm">
                Generate Report
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Scheduled Reports</h3>
        
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
          <p className="text-gray-400">No scheduled reports yet</p>
          <button className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
            Create Schedule
          </button>
        </div>
      </div>
    </div>
  );

  const InsightsSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">AI Insights</h2>
        <p className="text-gray-400">
          AI-powered insights and recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-900/20 rounded-lg">
              <Brain className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-green-500 text-sm">+12%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">24</div>
          <div className="text-gray-400 text-sm">Active Insights</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-900/20 rounded-lg">
              <Target className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-green-500 text-sm">+8%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">89%</div>
          <div className="text-gray-400 text-sm">Accuracy Rate</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-900/20 rounded-lg">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-green-500 text-sm">+15%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">156</div>
          <div className="text-gray-400 text-sm">Recommendations</div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Insights</h3>
        
        <div className="space-y-4">
          {[
            {
              title: 'Revenue Growth Opportunity',
              description: 'AI identified a 15% revenue growth opportunity in Q2 by optimizing pricing strategy',
              confidence: 0.92,
              impact: 'high',
              category: 'revenue'
            },
            {
              title: 'Customer Churn Risk',
              description: '12% increase in churn risk detected for customers with low engagement scores',
              confidence: 0.87,
              impact: 'medium',
              category: 'customer'
            },
            {
              title: 'Marketing Optimization',
              description: 'Shift 20% of marketing budget to digital channels for 25% better ROI',
              confidence: 0.85,
              impact: 'high',
              category: 'marketing'
            },
            {
              title: 'Product Feature Adoption',
              description: 'New feature adoption rate 40% lower than expected, requires onboarding improvements',
              confidence: 0.78,
              impact: 'medium',
              category: 'product'
            }
          ].map((insight, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{insight.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{insight.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  insight.impact === 'high' ? 'bg-red-900/30 text-red-400' :
                  insight.impact === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-green-900/30 text-green-400'
                }`}>
                  {insight.impact}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-300">Confidence: {(insight.confidence * 100).toFixed(1)}%</span>
                  <span className="text-gray-300">Category: {insight.category}</span>
                </div>
                <button className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                  Take Action →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SettingsSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Analytics Settings</h2>
        <p className="text-gray-400">
          Configure analytics platform settings and preferences
        </p>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Data Sources</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Auto-refresh Data</h4>
              <p className="text-gray-400 text-sm">Automatically refresh data sources</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Cache Results</h4>
              <p className="text-gray-400 text-sm">Cache query results for better performance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Data Validation</h4>
              <p className="text-gray-400 text-sm">Validate data quality and integrity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">AI/ML Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Auto-retrain Models</h4>
              <p className="text-gray-400 text-sm">Automatically retrain models with new data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Model Monitoring</h4>
              <p className="text-gray-400 text-sm">Monitor model performance and drift</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Explainable AI</h4>
              <p className="text-gray-400 text-sm">Provide model explanations and interpretations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
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
              <h4 className="text-white font-medium">Insight Alerts</h4>
              <p className="text-gray-400 text-sm">Get notified about new AI insights</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Anomaly Alerts</h4>
              <p className="text-gray-400 text-sm">Alert when anomalies are detected</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Report Notifications</h4>
              <p className="text-gray-400 text-sm">Notify when reports are ready</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Analytics</h1>
                <p className="text-gray-400 text-sm">Data Platform</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-cyan-600/20 text-cyan-400 border-l-4 border-cyan-500'
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
            <h3 className="text-white font-medium mb-4">Platform Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Dashboards</span>
                <span className="text-white font-medium">{stats.activeDashboards}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Notebooks</span>
                <span className="text-white font-medium">{stats.activeNotebooks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Models</span>
                <span className="text-white font-medium">{stats.deployedModels}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Forecasts</span>
                <span className="text-white font-medium">{stats.activeForecasts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Daily Views</span>
                <span className="text-white font-medium">{stats.dailyViews?.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Accuracy</span>
                <span className="text-green-400 font-medium">{stats.accuracy}%</span>
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

export default Analytics;
