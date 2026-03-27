import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Eye,
  MousePointer,
  Download,
  Calendar,
  RefreshCw,
  Settings,
  Filter,
  Maximize2,
  Grid,
  Layers,
  Database,
  Target,
  Zap,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  FileText,
  Globe,
  Server,
  Cloud,
  Shield,
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
  PieChart,
  LineChart,
  AreaChart,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  Copy,
  Share,
  ShoppingCart
} from 'lucide-react';

const BIDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [dateRange, setDateRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    revenue: 2456789,
    growth: 12.5,
    customers: 45678,
    conversion: 3.4,
    avgOrderValue: 156.78,
    retention: 78.9
  });

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Active Customers',
      value: '45.6K',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Conversion Rate',
      value: '3.4%',
      change: '-0.5%',
      trend: 'down',
      icon: Target,
      color: 'yellow'
    },
    {
      title: 'Avg Order Value',
      value: '$156.78',
      change: '+5.3%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'purple'
    }
  ];

  const salesData = [
    { month: 'Jan', revenue: 180000, orders: 1200 },
    { month: 'Feb', revenue: 220000, orders: 1450 },
    { month: 'Mar', revenue: 195000, orders: 1300 },
    { month: 'Apr', revenue: 245000, orders: 1650 },
    { month: 'May', revenue: 280000, orders: 1890 },
    { month: 'Jun', revenue: 320000, orders: 2150 }
  ];

  const topProducts = [
    { name: 'Enterprise Plan', revenue: 890000, units: 450, growth: 15.2 },
    { name: 'Professional Plan', revenue: 654000, units: 890, growth: 8.7 },
    { name: 'Starter Plan', revenue: 432000, units: 2340, growth: -2.3 },
    { name: 'Custom Solutions', revenue: 321000, units: 67, growth: 45.6 }
  ];

  const customerSegments = [
    { segment: 'Enterprise', customers: 1234, revenue: 1456789, avgValue: 1180 },
    { segment: 'Mid-Market', customers: 3456, revenue: 890123, avgValue: 257 },
    { segment: 'Small Business', customers: 12345, revenue: 456789, avgValue: 37 },
    { segment: 'Startup', customers: 28643, revenue: 234567, avgValue: 8 }
  ];

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [dateRange]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Business Intelligence Dashboard</h2>
          <p className="text-gray-400">Real-time business metrics and analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={handleRefresh}
            className="p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gray-700 rounded-lg`}>
                <kpi.icon className={`w-6 h-6 text-${kpi.color}-400`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {kpi.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{kpi.change}</span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{kpi.value}</div>
              <div className="text-gray-400 text-sm">{kpi.title}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-700 rounded-lg">
            <LineChart className="w-16 h-16 text-gray-500" />
          </div>
        </div>

        {/* Sales by Product */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Sales by Product</h3>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-700 rounded-lg">
            <PieChart className="w-16 h-16 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Top Products</h3>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">{product.name}</div>
                  <div className="text-sm text-gray-400">{product.units} units sold</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-white">${(product.revenue / 1000).toFixed(0)}K</div>
                  <div className={`text-sm ${product.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {product.growth >= 0 ? '+' : ''}{product.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Customer Segments</h3>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {customerSegments.map((segment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">{segment.segment}</div>
                  <div className="text-sm text-gray-400">{segment.customers.toLocaleString()} customers</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-white">${(segment.revenue / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-gray-400">Avg: ${segment.avgValue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {[
            { type: 'sale', message: 'New order #12345 - Enterprise Plan', time: '2 min ago', icon: DollarSign },
            { type: 'customer', message: 'New customer signup - Acme Corp', time: '5 min ago', icon: Users },
            { type: 'revenue', message: 'Revenue milestone: $2.5M reached', time: '1 hour ago', icon: TrendingUp },
            { type: 'alert', message: 'Conversion rate below target', time: '2 hours ago', icon: AlertCircle }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
              <div className={`p-2 rounded-lg ${
                activity.type === 'sale' ? 'bg-green-900' :
                activity.type === 'customer' ? 'bg-blue-900' :
                activity.type === 'revenue' ? 'bg-purple-900' :
                'bg-yellow-900'
              }`}>
                <activity.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white">{activity.message}</div>
                <div className="text-sm text-gray-400">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BIDashboard;
