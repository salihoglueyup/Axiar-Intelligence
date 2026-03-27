import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Download, 
  QrCode, 
  Apple, 
  Play,
  CheckCircle,
  AlertTriangle,
  Settings,
  Zap,
  Shield,
  Globe,
  Star,
  Users,
  BarChart3,
  Camera,
  MessageSquare,
  Calendar,
  Map,
  Bell,
  Wifi,
  Battery,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const MobileApp = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [installStats, setInstallStats] = useState({});
  const [appVersions, setAppVersions] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const [showQRCode, setShowQRCode] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Smartphone },
    { id: 'ios', label: 'iOS App', icon: Apple },
    { id: 'android', label: 'Android App', icon: Play },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  useEffect(() => {
    loadInstallStats();
    loadAppVersions();
    loadUserReviews();
  }, []);

  const loadInstallStats = async () => {
    // Mock data - replace with actual API call
    const stats = {
      totalInstalls: 125000,
      activeUsers: 89000,
      iosInstalls: 67000,
      androidInstalls: 58000,
      monthlyGrowth: 12.5,
      rating: 4.8,
      retention: {
        day1: 0.85,
        day7: 0.72,
        day30: 0.58,
        day90: 0.41
      },
      demographics: {
        ageGroups: {
          '18-24': 0.15,
          '25-34': 0.35,
          '35-44': 0.25,
          '45-54': 0.15,
          '55+': 0.10
        },
        regions: {
          'North America': 0.45,
          'Europe': 0.30,
          'Asia': 0.20,
          'Other': 0.05
        }
      }
    };
    setInstallStats(stats);
  };

  const loadAppVersions = async () => {
    // Mock data - replace with actual API call
    const versions = {
      ios: {
        current: '3.2.1',
        latest: '3.2.1',
        minSupported: '3.0.0',
        releaseDate: '2024-03-20',
        size: '45.2 MB',
        requirements: 'iOS 14.0+',
        features: ['Dark Mode', 'Widgets', 'Apple Watch Support', 'Face ID']
      },
      android: {
        current: '3.2.0',
        latest: '3.2.1',
        minSupported: '3.0.0',
        releaseDate: '2024-03-18',
        size: '38.7 MB',
        requirements: 'Android 7.0+',
        features: ['Material Design', 'Widgets', 'Biometric Auth', 'Push Notifications']
      }
    };
    setAppVersions(versions);
  };

  const loadUserReviews = async () => {
    // Mock data - replace with actual API call
    const reviews = [
      {
        id: 1,
        platform: 'ios',
        rating: 5,
        title: 'Amazing app!',
        content: 'This app has transformed how I manage my projects. The interface is intuitive and the features are exactly what I needed.',
        author: 'Sarah Johnson',
        date: '2024-03-22',
        helpful: 23,
        version: '3.2.1'
      },
      {
        id: 2,
        platform: 'android',
        rating: 4,
        title: 'Great but needs more features',
        content: 'Really solid app with good performance. Would love to see more customization options in the next update.',
        author: 'Mike Chen',
        date: '2024-03-21',
        helpful: 15,
        version: '3.2.0'
      },
      {
        id: 3,
        platform: 'ios',
        rating: 5,
        title: 'Perfect for teams',
        content: 'Our team has been using this for 6 months and it\'s been a game changer. Collaboration features are top-notch.',
        author: 'Emily Davis',
        date: '2024-03-20',
        helpful: 31,
        version: '3.2.1'
      }
    ];
    setUserReviews(reviews);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-900/20 rounded-lg">
              <Download className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-green-500 text-sm">+12.5%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {installStats.totalInstalls?.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Total Installs</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-900/20 rounded-lg">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-green-500 text-sm">+8.2%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {installStats.activeUsers?.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Active Users</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-900/20 rounded-lg">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-green-500 text-sm">+0.2</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{installStats.rating}</div>
          <div className="text-gray-400 text-sm">App Rating</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-900/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-green-500 text-sm">+5.1%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {Math.round(installStats.retention?.day30 * 100)}%
          </div>
          <div className="text-gray-400 text-sm">30-Day Retention</div>
        </div>
      </div>

      {/* Platform Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Platform Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Apple className="w-5 h-5 text-gray-400" />
                <span className="text-white">iOS</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '54%' }}></div>
                </div>
                <span className="text-gray-400 text-sm">{installStats.iosInstalls}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Play className="w-5 h-5 text-gray-400" />
                <span className="text-white">Android</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '46%' }}></div>
                </div>
                <span className="text-gray-400 text-sm">{installStats.androidInstalls}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Download Options</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowQRCode(true)}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <QrCode className="w-5 h-5" />
              <span>Show QR Code</span>
            </button>
            <button className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
              <Apple className="w-5 h-5" />
              <span>App Store</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            <button className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Google Play</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlatformDetails = (platform) => {
    const version = appVersions[platform];
    const platformData = platform === 'ios' ? {
      icon: <Apple className="w-6 h-6" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-800',
      storeName: 'App Store',
      deviceName: 'iPhone & iPad'
    } : {
      icon: <Play className="w-6 h-6" />,
      color: 'text-green-500',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-800',
      storeName: 'Google Play',
      deviceName: 'Android Devices'
    };

    return (
      <div className="space-y-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className={`p-3 rounded-lg ${platformData.bgColor}`}>
              {platformData.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{platformData.storeName}</h3>
              <p className="text-gray-400">{platformData.deviceName}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Version Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Version</span>
                  <span className="text-white">{version.current}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Latest Version</span>
                  <span className="text-white">{version.latest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Min Supported</span>
                  <span className="text-white">{version.minSupported}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Release Date</span>
                  <span className="text-white">{version.releaseDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">App Size</span>
                  <span className="text-white">{version.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Requirements</span>
                  <span className="text-white">{version.requirements}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Key Features</h4>
              <div className="space-y-2">
                {version.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">App Screenshots</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`bg-gray-800 rounded-lg aspect-square flex items-center justify-center ${platformData.borderColor} border-2`}>
                <Smartphone className={`w-12 h-12 ${platformData.color}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderFeatures = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: <MessageSquare className="w-6 h-6" />, title: 'Real-time Chat', description: 'Instant messaging with team members' },
          { icon: <Calendar className="w-6 h-6" />, title: 'Calendar Integration', description: 'Sync with your calendar app' },
          { icon: <Camera className="w-6 h-6" />, title: 'Document Scanner', description: 'Scan and upload documents' },
          { icon: <Map className="w-6 h-6" />, title: 'Location Tracking', description: 'Track project locations' },
          { icon: <Bell className="w-6 h-6" />, title: 'Push Notifications', description: 'Stay updated with alerts' },
          { icon: <Shield className="w-6 h-6" />, title: 'Secure Login', description: 'Biometric authentication support' },
          { icon: <Wifi className="w-6 h-6" />, title: 'Offline Mode', description: 'Work without internet connection' },
          { icon: <Battery className="w-6 h-6" />, title: 'Battery Optimized', description: 'Efficient power usage' },
          { icon: <Globe className="w-6 h-6" />, title: 'Multi-language', description: 'Support for 12+ languages' }
        ].map((feature, index) => (
          <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className={`p-3 rounded-lg bg-cyan-900/20 text-cyan-500 mb-4 inline-block`}>
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Retention</h3>
          <div className="space-y-3">
            {Object.entries(installStats.retention || {}).map(([period, rate]) => (
              <div key={period} className="flex items-center justify-between">
                <span className="text-gray-300 capitalize">{period.replace('day', 'Day')}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${rate * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-cyan-400 text-sm">{Math.round(rate * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Age Demographics</h3>
          <div className="space-y-3">
            {Object.entries(installStats.demographics?.ageGroups || {}).map(([age, percentage]) => (
              <div key={age} className="flex items-center justify-between">
                <span className="text-gray-300">{age}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: `${percentage * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-cyan-400 text-sm">{Math.round(percentage * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Regional Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(installStats.demographics?.regions || {}).map(([region, percentage]) => (
            <div key={region} className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-cyan-500 mb-2">
                {Math.round(percentage * 100)}%
              </div>
              <div className="text-gray-300 text-sm">{region}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-4">
      {userReviews.map(review => (
        <div key={review.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                review.platform === 'ios' ? 'bg-blue-900/20 text-blue-500' : 'bg-green-900/20 text-green-500'
              }`}>
                {review.platform === 'ios' ? <Apple className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-white font-medium">{review.author}</h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{review.date} • Version {review.version}</p>
              </div>
            </div>
          </div>
          
          <h3 className="text-white font-medium mb-2">{review.title}</h3>
          <p className="text-gray-300 mb-4">{review.content}</p>
          
          <div className="flex items-center justify-between text-sm">
            <button className="flex items-center space-x-1 text-gray-400 hover:text-cyan-400 transition-colors">
              <span>Helpful ({review.helpful})</span>
            </button>
            <button className="text-gray-400 hover:text-cyan-400 transition-colors">
              Report
            </button>
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
            <Smartphone className="w-8 h-8 text-cyan-500" />
            <span>Mobile Applications</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Manage and monitor mobile app deployments and analytics
          </p>
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
        {activeTab === 'ios' && renderPlatformDetails('ios')}
        {activeTab === 'android' && renderPlatformDetails('android')}
        {activeTab === 'features' && renderFeatures()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'reviews' && renderReviews()}
      </div>

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Download App</h3>
              <button
                onClick={() => setShowQRCode(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <AlertTriangle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                <QrCode className="w-48 h-48 text-gray-800" />
              </div>
              <p className="text-gray-300 text-center text-sm">
                Scan this QR code with your mobile device to download the app
              </p>
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Apple className="w-4 h-4 inline mr-2" />
                  App Store
                </button>
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Play className="w-4 h-4 inline mr-2" />
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileApp;
