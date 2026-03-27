import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  FileText, 
  Database, 
  Settings,
  BarChart3,
  Lock,
  Key,
  Eye,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Globe,
  Building,
  UserCheck,
  ClipboardList
} from 'lucide-react';
import SSOManagement from '../components/enterprise/SSOManagement';
import RoleManager from '../components/enterprise/RoleManager';
import AuditLogs from '../components/enterprise/AuditLogs';
import DataGovernance from '../components/enterprise/DataGovernance';

const Enterprise = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Building },
    { id: 'sso', label: 'SSO Management', icon: Key },
    { id: 'roles', label: 'Role Management', icon: UserCheck },
    { id: 'audit', label: 'Audit Logs', icon: ClipboardList },
    { id: 'governance', label: 'Data Governance', icon: Database },
    { id: 'analytics', label: 'Enterprise Analytics', icon: BarChart3 }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <EnterpriseOverview />;
      case 'sso':
        return <SSOManagement />;
      case 'roles':
        return <RoleManager />;
      case 'audit':
        return <AuditLogs />;
      case 'governance':
        return <DataGovernance />;
      case 'analytics':
        return <EnterpriseAnalytics />;
      default:
        return <EnterpriseOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Enterprise</h1>
                <p className="text-gray-400 text-sm">Management Portal</p>
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
            <h3 className="text-white font-medium mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Active Users</span>
                <span className="text-white font-medium">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">SSO Providers</span>
                <span className="text-white font-medium">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Security Score</span>
                <span className="text-green-400 font-medium">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Compliance</span>
                <span className="text-cyan-400 font-medium">98%</span>
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

const EnterpriseOverview = () => {
  const stats = [
    {
      title: 'Security Score',
      value: '94%',
      change: '+2%',
      trend: 'up',
      icon: Shield,
      color: 'text-green-500',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-800'
    },
    {
      title: 'Compliance Rate',
      value: '98%',
      change: '+1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-900/20',
      borderColor: 'border-cyan-800'
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-900/20',
      borderColor: 'border-purple-800'
    },
    {
      title: 'Security Events',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-800'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'security',
      message: 'New SSO provider configured: Azure AD',
      timestamp: '2 hours ago',
      icon: Key,
      color: 'text-cyan-500'
    },
    {
      id: 2,
      type: 'user',
      message: 'Role permissions updated for Manager role',
      timestamp: '4 hours ago',
      icon: UserCheck,
      color: 'text-purple-500'
    },
    {
      id: 3,
      type: 'compliance',
      message: 'GDPR compliance report generated successfully',
      timestamp: '6 hours ago',
      icon: FileText,
      color: 'text-green-500'
    },
    {
      id: 4,
      type: 'security',
      message: 'Security policy updated: Data encryption',
      timestamp: '1 day ago',
      icon: Shield,
      color: 'text-red-500'
    }
  ];

  const systemHealth = [
    { component: 'SSO Integration', status: 'healthy', uptime: '99.9%' },
    { component: 'Role Management', status: 'healthy', uptime: '100%' },
    { component: 'Audit Logging', status: 'healthy', uptime: '99.8%' },
    { component: 'Data Governance', status: 'warning', uptime: '98.5%' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Enterprise Overview</h2>
        <p className="text-gray-400">
          Monitor and manage your enterprise security, compliance, and governance
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${activity.color} bg-opacity-20`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-white">{activity.message}</p>
                  <p className="text-gray-400 text-sm mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
          <div className="space-y-3">
            {systemHealth.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{item.component}</div>
                  <div className="text-gray-400 text-sm">{item.uptime}</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'healthy' 
                    ? 'bg-green-900/30 text-green-400' 
                    : 'bg-yellow-900/30 text-yellow-400'
                }`}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-cyan-500 transition-colors text-left">
            <Key className="w-6 h-6 text-cyan-500 mb-2" />
            <div className="text-white font-medium">Configure SSO</div>
            <div className="text-gray-400 text-sm">Set up single sign-on providers</div>
          </button>
          <button className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-cyan-500 transition-colors text-left">
            <UserCheck className="w-6 h-6 text-purple-500 mb-2" />
            <div className="text-white font-medium">Manage Roles</div>
            <div className="text-gray-400 text-sm">Update user roles and permissions</div>
          </button>
          <button className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-cyan-500 transition-colors text-left">
            <FileText className="w-6 h-6 text-green-500 mb-2" />
            <div className="text-white font-medium">Generate Report</div>
            <div className="text-gray-400 text-sm">Create compliance reports</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const EnterpriseAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Enterprise Analytics</h2>
        <p className="text-gray-400">
          Advanced analytics and insights for enterprise operations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Activity Trends</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
              <p>User activity chart would be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Security Metrics</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-2" />
              <p>Security metrics dashboard would be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Compliance Overview</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-2" />
              <p>Compliance overview would be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Data Flow Analysis</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Activity className="w-12 h-12 mx-auto mb-2" />
              <p>Data flow analysis would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enterprise;
