import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Target,
  Globe,
  Server,
  Cloud,
  Shield,
  Database,
  Brain,
  Eye,
  Filter,
  Download,
  Upload,
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
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  FileText,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Calendar,
  Search,
  Bell,
  Mail,
  MessageSquare,
  Building,
  Briefcase,
  BarChart,
  AreaChart,
  ScatterChart,
  Timer,
  Hash,
  Percent,
  Users,
  DollarSign,
  ShoppingCart,
  MousePointer,
  CreditCard,
  Package,
  Truck
} from 'lucide-react';

const AdvancedAnalytics = () => {
  const [selectedView, setSelectedView] = useState('dashboard');
  const [dateRange, setDateRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [realTimeData, setRealTimeData] = useState({});

  const views = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'funnel', label: 'Funnel Analysis', icon: Filter },
    { id: 'cohort', label: 'Cohort Analysis', icon: Users },
    { id: 'segmentation', label: 'Segmentation', icon: Target },
    { id: 'attribution', label: 'Attribution', icon: Brain },
    { id: 'forecasting', label: 'Forecasting', icon: TrendingUp }
  ];

  const kpiMetrics = [
    {
      title: 'Total Revenue',
      value: '$8.4M',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      breakdown: { direct: 45, indirect: 35, referral: 20 }
    },
    {
      title: 'Active Users',
      value: '124.5K',
      change: '+8.7%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      breakdown: { new: 25, returning: 75 }
    },
    {
      title: 'Conversion Rate',
      value: '4.2%',
      change: '+0.8%',
      trend: 'up',
      icon: Target,
      color: 'purple',
      breakdown: { desktop: 60, mobile: 40 }
    },
    {
      title: 'Avg Order Value',
      value: '$234.56',
      change: '-2.1%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'yellow',
      breakdown: { premium: 35, standard: 65 }
    }
  ];

  const funnelData = [
    { stage: 'Awareness', users: 1000000, conversion: 100, dropoff: 0 },
    { stage: 'Interest', users: 450000, conversion: 45, dropoff: 55 },
    { stage: 'Consideration', users: 180000, conversion: 40, dropoff: 60 },
    { stage: 'Intent', users: 72000, conversion: 40, dropoff: 60 },
    { stage: 'Evaluation', users: 28800, conversion: 40, dropoff: 60 },
    { stage: 'Purchase', users: 12096, conversion: 42, dropoff: 58 }
  ];

  const cohortData = [
    { cohort: 'Jan 2024', month0: 100, month1: 78, month2: 65, month3: 54, month4: 48, month5: 43 },
    { cohort: 'Feb 2024', month0: 120, month1: 85, month2: 72, month3: 61, month4: 54, month5: null },
    { cohort: 'Mar 2024', month0: 95, month1: 82, month2: 69, month3: 58, month4: null, month5: null },
    { cohort: 'Apr 2024', month0: 110, month1: 88, month2: 74, month3: null, month4: null, month5: null },
    { cohort: 'May 2024', month0: 130, month1: 92, month2: null, month3: null, month4: null, month5: null }
  ];

  const segments = [
    {
      name: 'High Value',
      size: 15420,
      revenue: 4567890,
      avgValue: 296,
      characteristics: ['Frequent buyers', 'High AOV', 'Premium products'],
      growth: 12.5
    },
    {
      name: 'Mid Value',
      size: 45680,
      revenue: 3456789,
      avgValue: 76,
      characteristics: ['Regular buyers', 'Standard products', 'Price sensitive'],
      growth: 8.3
    },
    {
      name: 'Low Value',
      size: 89450,
      revenue: 1234567,
      avgValue: 14,
      characteristics: ['Occasional buyers', 'Discount seekers', 'Basic products'],
      growth: -2.1
    },
    {
      name: 'New',
      size: 23450,
      revenue: 567890,
      avgValue: 24,
      characteristics: ['First-time buyers', 'Exploring products', 'High potential'],
      growth: 45.6
    }
  ];

  const attributionChannels = [
    { channel: 'Organic Search', revenue: 2345678, conversions: 1234, cost: 123456, roi: 1900 },
    { channel: 'Paid Search', revenue: 1890123, conversions: 987, cost: 234567, roi: 806 },
    { channel: 'Social Media', revenue: 1456789, conversions: 765, cost: 89012, roi: 1637 },
    { channel: 'Email', revenue: 1234567, conversions: 543, cost: 23456, roi: 5264 },
    { channel: 'Direct', revenue: 987654, conversions: 432, cost: 0, roi: 0 }
  ];

  const forecastingData = [
    { period: 'Jan', actual: 1234567, forecast: 1200000, confidence: 95 },
    { period: 'Feb', actual: 1345678, forecast: 1300000, confidence: 92 },
    { period: 'Mar', actual: 1456789, forecast: 1400000, confidence: 88 },
    { period: 'Apr', actual: null, forecast: 1500000, confidence: 85 },
    { period: 'May', actual: null, forecast: 1600000, confidence: 82 },
    { period: 'Jun', actual: null, forecast: 1700000, confidence: 78 }
  ];

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData({
        activeUsers: Math.floor(Math.random() * 1000) + 5000,
        currentRevenue: Math.floor(Math.random() * 10000) + 50000,
        conversionRate: (Math.random() * 2 + 3).toFixed(1),
        avgSessionDuration: Math.floor(Math.random() * 300) + 180
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [selectedView, dateRange]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-400' : 'text-red-400';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? ArrowUp : ArrowDown;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Advanced Analytics</h2>
          <p className="text-gray-400">Deep insights and predictive analytics</p>
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

      {/* View Navigation */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1 overflow-x-auto">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setSelectedView(view.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              selectedView === view.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <view.icon className="w-4 h-4" />
            <span>{view.label}</span>
          </button>
        ))}
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Users', value: realTimeData.activeUsers || 0, icon: Users },
          { label: 'Current Revenue', value: `$${((realTimeData.currentRevenue || 0) / 1000).toFixed(0)}K`, icon: DollarSign },
          { label: 'Conversion Rate', value: `${realTimeData.conversionRate || 0}%`, icon: Target },
          { label: 'Avg Session', value: `${Math.floor((realTimeData.avgSessionDuration || 0) / 60)}m`, icon: Clock }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400 text-sm">{metric.label}</div>
                <div className="text-xl font-bold text-white mt-1">{metric.value}</div>
              </div>
              <div className="p-2 bg-gray-700 rounded-lg">
                <metric.icon className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dashboard View */}
      {selectedView === 'dashboard' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiMetrics.map((kpi, index) => (
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
                  <div className={`flex items-center space-x-1 text-sm ${getTrendColor(kpi.trend)}`}>
                    <getTrendIcon className="w-4 h-4" />
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

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Channel Performance</h3>
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-700 rounded-lg">
                <BarChart className="w-16 h-16 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Funnel Analysis */}
      {selectedView === 'funnel' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-6">Conversion Funnel</h3>
            <div className="space-y-4">
              {funnelData.map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-32 text-right">
                    <div className="font-medium text-white">{stage.stage}</div>
                    <div className="text-sm text-gray-400">{stage.users.toLocaleString()}</div>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-700 rounded-full h-8">
                      <div
                        className="bg-blue-500 h-8 rounded-full flex items-center justify-center text-white text-sm"
                        style={{ width: `${stage.conversion}%` }}
                      >
                        {stage.conversion}%
                      </div>
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <div className={`text-sm ${stage.dropoff > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {stage.dropoff > 0 ? `-${stage.dropoff}%` : '0%'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cohort Analysis */}
      {selectedView === 'cohort' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-6">Cohort Retention</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-3 text-gray-400">Cohort</th>
                    <th className="text-center p-3 text-gray-400">Month 0</th>
                    <th className="text-center p-3 text-gray-400">Month 1</th>
                    <th className="text-center p-3 text-gray-400">Month 2</th>
                    <th className="text-center p-3 text-gray-400">Month 3</th>
                    <th className="text-center p-3 text-gray-400">Month 4</th>
                    <th className="text-center p-3 text-gray-400">Month 5</th>
                  </tr>
                </thead>
                <tbody>
                  {cohortData.map((cohort, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-3 text-white">{cohort.cohort}</td>
                      <td className="p-3 text-center text-green-400">{cohort.month0}%</td>
                      <td className="p-3 text-center">{cohort.month1}%</td>
                      <td className="p-3 text-center">{cohort.month2}%</td>
                      <td className="p-3 text-center">{cohort.month3}%</td>
                      <td className="p-3 text-center">{cohort.month4}%</td>
                      <td className="p-3 text-center">{cohort.month5}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Segmentation */}
      {selectedView === 'segmentation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {segments.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">{segment.name}</h4>
                  <div className={`text-sm ${segment.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {segment.growth >= 0 ? '+' : ''}{segment.growth}%
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Size</span>
                    <span className="text-white">{segment.size.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue</span>
                    <span className="text-white">${(segment.revenue / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Value</span>
                    <span className="text-white">${segment.avgValue}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-gray-400 text-sm mb-2">Characteristics:</div>
                  <div className="flex flex-wrap gap-2">
                    {segment.characteristics.map((char, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-700 rounded text-xs">
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Attribution */}
      {selectedView === 'attribution' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Channel Attribution</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 text-gray-400">Channel</th>
                    <th className="text-left p-4 text-gray-400">Revenue</th>
                    <th className="text-left p-4 text-gray-400">Conversions</th>
                    <th className="text-left p-4 text-gray-400">Cost</th>
                    <th className="text-left p-4 text-gray-400">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {attributionChannels.map((channel, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-4 text-white">{channel.channel}</td>
                      <td className="p-4 text-gray-300">${(channel.revenue / 1000000).toFixed(2)}M</td>
                      <td className="p-4 text-gray-300">{channel.conversions.toLocaleString()}</td>
                      <td className="p-4 text-gray-300">${(channel.cost / 1000).toFixed(0)}K</td>
                      <td className="p-4">
                        <span className={`font-medium ${
                          channel.roi >= 1000 ? 'text-green-400' :
                          channel.roi >= 500 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {channel.roi}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Forecasting */}
      {selectedView === 'forecasting' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-6">Revenue Forecasting</h3>
            <div className="space-y-4">
              {forecastingData.map((period, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-20">
                    <div className="font-medium text-white">{period.period}</div>
                  </div>
                  <div className="flex-1 flex items-center space-x-4">
                    {period.actual && (
                      <div className="text-green-400">
                        ${(period.actual / 1000000).toFixed(2)}M
                      </div>
                    )}
                    <div className={`flex items-center space-x-2 ${period.actual ? 'text-blue-400' : 'text-yellow-400'}`}>
                      <span>${(period.forecast / 1000000).toFixed(2)}M</span>
                      {!period.actual && <span className="text-xs">(forecast)</span>}
                    </div>
                  </div>
                  <div className="w-24">
                    <div className="text-sm text-gray-400">Confidence</div>
                    <div className="text-white">{period.confidence}%</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedAnalytics;
