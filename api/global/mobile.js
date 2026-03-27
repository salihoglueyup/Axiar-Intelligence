// Mobile App API endpoints
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform'); // ios, android, all
    const region = searchParams.get('region'); // us, eu, apac, all
    
    let data;
    
    if (platform === 'ios' || platform === 'android') {
      data = await getMobileAppStats(platform, region);
    } else {
      data = await getAllMobileStats(region);
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, appData } = body;

    switch (action) {
      case 'register_device':
        const device = await registerDevice(appData);
        return new Response(JSON.stringify({
          success: true,
          data: device
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'update_analytics':
        const analytics = await updateAnalytics(appData);
        return new Response(JSON.stringify({
          success: true,
          data: analytics
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'send_notification':
        const notification = await sendNotification(appData);
        return new Response(JSON.stringify({
          success: true,
          data: notification
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'track_event':
        const event = await trackEvent(appData);
        return new Response(JSON.stringify({
          success: true,
          data: event
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
        
      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Helper functions
async function getAllMobileStats(region = 'all') {
  // Mock data - replace with actual database query
  const stats = {
    overview: {
      totalInstalls: 125000,
      activeUsers: 89000,
      monthlyGrowth: 12.5,
      rating: 4.8,
      avgSessionDuration: 450, // seconds
      crashRate: 0.02
    },
    platforms: {
      ios: {
        installs: 67000,
        activeUsers: 48000,
        rating: 4.9,
        version: '3.2.1',
        devices: ['iPhone 14', 'iPhone 13', 'iPhone 12', 'iPad Pro', 'iPad Air'],
        osVersions: ['iOS 17.2', 'iOS 17.1', 'iOS 17.0', 'iOS 16.6']
      },
      android: {
        installs: 58000,
        activeUsers: 41000,
        rating: 4.7,
        version: '3.2.0',
        devices: ['Samsung Galaxy S23', 'Google Pixel 7', 'OnePlus 11', 'Xiaomi 13'],
        osVersions: ['Android 14', 'Android 13', 'Android 12', 'Android 11']
      }
    },
    regions: {
      'us': {
        installs: 45000,
        activeUsers: 32000,
        revenue: 1250000,
        growth: 15.2
      },
      'eu': {
        installs: 38000,
        activeUsers: 27000,
        revenue: 980000,
        growth: 12.8
      },
      'apac': {
        installs: 32000,
        activeUsers: 23000,
        revenue: 1450000,
        growth: 18.5
      },
      'latam': {
        installs: 8000,
        activeUsers: 6000,
        revenue: 320000,
        growth: 22.1
      },
      'mea': {
        installs: 2000,
        activeUsers: 1000,
        revenue: 280000,
        growth: 8.7
      }
    },
    retention: {
      day1: 0.85,
      day7: 0.72,
      day30: 0.58,
      day90: 0.41,
      day180: 0.32
    },
    demographics: {
      ageGroups: {
        '18-24': 0.15,
        '25-34': 0.35,
        '35-44': 0.25,
        '45-54': 0.15,
        '55+': 0.10
      },
      gender: {
        'male': 0.58,
        'female': 0.41,
        'other': 0.01
      }
    },
    usage: {
      dailyActive: {
        total: 89000,
        avgSessionTime: 450,
        sessionsPerUser: 3.2,
        screenViewsPerSession: 8.5
      },
      features: {
        'dashboard': 0.92,
        'projects': 0.78,
        'reports': 0.65,
        'settings': 0.45,
        'notifications': 0.88,
        'offline_mode': 0.23
      }
    },
    performance: {
      avgLoadTime: 2.3, // seconds
      crashRate: 0.02,
      anrRate: 0.01,
      memoryUsage: 45.6, // MB
      batteryUsage: 12.3, // % per hour
      networkUsage: 23.4 // MB per session
    }
  };

  // Filter by region if specified
  if (region !== 'all') {
    const regionData = stats.regions[region];
    if (regionData) {
      return {
        ...stats,
        overview: {
          ...stats.overview,
          totalInstalls: regionData.installs,
          activeUsers: regionData.activeUsers
        },
        regions: {
          [region]: regionData
        }
      };
    }
  }

  return stats;
}

async function getMobileAppStats(platform, region = 'all') {
  const allStats = await getAllMobileStats(region);
  
  if (platform === 'ios') {
    return {
      ...allStats,
      overview: {
        ...allStats.overview,
        totalInstalls: allStats.platforms.ios.installs,
        activeUsers: allStats.platforms.ios.activeUsers,
        rating: allStats.platforms.ios.rating
      },
      platforms: {
        ios: allStats.platforms.ios
      }
    };
  }
  
  if (platform === 'android') {
    return {
      ...allStats,
      overview: {
        ...allStats.overview,
        totalInstalls: allStats.platforms.android.installs,
        activeUsers: allStats.platforms.android.activeUsers,
        rating: allStats.platforms.android.rating
      },
      platforms: {
        android: allStats.platforms.android
      }
    };
  }
  
  return allStats;
}

async function registerDevice(deviceData) {
  const { deviceId, platform, osVersion, appVersion, userAgent, region } = deviceData;
  
  // Validate required fields
  if (!deviceId || !platform || !appVersion) {
    throw new Error('Device ID, platform, and app version are required');
  }

  // Check if device already exists
  const existingDevice = await getDeviceById(deviceId);
  
  const device = {
    id: deviceId,
    platform: platform,
    osVersion: osVersion,
    appVersion: appVersion,
    userAgent: userAgent,
    region: region || 'unknown',
    firstSeen: existingDevice ? existingDevice.firstSeen : new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    isActive: true,
    sessions: existingDevice ? existingDevice.sessions + 1 : 1,
    totalSessionTime: existingDevice ? existingDevice.totalSessionTime + 0 : 0,
    crashes: existingDevice ? existingDevice.crashes : 0,
    notifications: existingDevice ? existingDevice.notifications : 0,
    lastKnownLocation: null,
    preferences: existingDevice ? existingDevice.preferences : {},
    metadata: {
      deviceModel: extractDeviceModel(userAgent),
      screenWidth: null,
      screenHeight: null,
      language: null,
      timezone: null
    }
  };

  // Save device to database (mock implementation)
  await saveDevice(device);
  
  return {
    deviceId: device.id,
    registered: !existingDevice,
    sessionId: generateSessionId(),
    config: {
      enableNotifications: true,
      enableAnalytics: true,
      enableCrashReporting: true,
      enablePerformanceMonitoring: true
    }
  };
}

async function updateAnalytics(analyticsData) {
  const { deviceId, sessionId, eventType, eventData, timestamp = new Date().toISOString() } = analyticsData;
  
  // Validate required fields
  if (!deviceId || !eventType) {
    throw new Error('Device ID and event type are required');
  }

  // Get device information
  const device = await getDeviceById(deviceId);
  if (!device) {
    throw new Error('Device not found');
  }

  // Create analytics event
  const event = {
    id: generateEventId(),
    deviceId: deviceId,
    sessionId: sessionId,
    eventType: eventType,
    eventData: eventData || {},
    timestamp: timestamp,
    region: device.region,
    platform: device.platform,
    appVersion: device.appVersion,
    osVersion: device.osVersion
  };

  // Update device stats based on event type
  switch (eventType) {
    case 'session_start':
      device.sessions += 1;
      device.lastSeen = timestamp;
      break;
    case 'session_end':
      if (eventData && eventData.duration) {
        device.totalSessionTime += eventData.duration;
      }
      device.lastSeen = timestamp;
      break;
    case 'crash':
      device.crashes += 1;
      device.lastSeen = timestamp;
      break;
    case 'notification_received':
      device.notifications += 1;
      break;
  }

  // Save updated device and event
  await saveDevice(device);
  await saveAnalyticsEvent(event);

  return {
    eventId: event.id,
    recorded: true,
    timestamp: timestamp
  };
}

async function sendNotification(notificationData) {
  const { 
    deviceIds, 
    title, 
    message, 
    data, 
    priority = 'normal',
    platform = 'all' 
  } = notificationData;

  // Validate required fields
  if (!deviceIds || !title || !message) {
    throw new Error('Device IDs, title, and message are required');
  }

  const notification = {
    id: generateNotificationId(),
    deviceIds: Array.isArray(deviceIds) ? deviceIds : [deviceIds],
    title: title,
    message: message,
    data: data || {},
    priority: priority,
    platform: platform,
    status: 'pending',
    createdAt: new Date().toISOString(),
    scheduledAt: null,
    sentAt: null,
    deliveredAt: null,
    readAt: null,
    stats: {
      total: deviceIds.length,
      sent: 0,
      delivered: 0,
      read: 0,
      failed: 0
    }
  };

  // Send notifications (mock implementation)
  const results = await sendPushNotifications(notification);

  return {
    notificationId: notification.id,
    status: 'sent',
    results: results,
    timestamp: new Date().toISOString()
  };
}

async function trackEvent(eventData) {
  const { deviceId, eventName, properties, timestamp = new Date().toISOString() } = eventData;
  
  // Validate required fields
  if (!deviceId || !eventName) {
    throw new Error('Device ID and event name are required');
  }

  // Create custom event
  const event = {
    id: generateEventId(),
    deviceId: deviceId,
    eventName: eventName,
    properties: properties || {},
    timestamp: timestamp,
    type: 'custom'
  };

  // Save event
  await saveCustomEvent(event);

  return {
    eventId: event.id,
    tracked: true,
    timestamp: timestamp
  };
}

// Utility functions
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateEventId() {
  return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateNotificationId() {
  return 'notif_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function extractDeviceModel(userAgent) {
  // Mock device model extraction
  if (userAgent.includes('iPhone')) return 'iPhone';
  if (userAgent.includes('iPad')) return 'iPad';
  if (userAgent.includes('Android')) return 'Android Device';
  if (userAgent.includes('Windows')) return 'Windows Device';
  if (userAgent.includes('Mac')) return 'Mac Device';
  return 'Unknown Device';
}

// Mock notification sending
async function sendPushNotifications(notification) {
  const results = [];
  
  for (const deviceId of notification.deviceIds) {
    // Mock notification send
    const result = {
      deviceId: deviceId,
      status: Math.random() > 0.1 ? 'sent' : 'failed', // 90% success rate
      sentAt: new Date().toISOString(),
      error: null
    };
    
    if (result.status === 'failed') {
      result.error = 'Device not reachable';
    }
    
    results.push(result);
  }

  return results;
}

// Database operations (mock implementations)
async function getDeviceById(deviceId) {
  // Mock database query
  return null; // Return null for now, would query actual database
}

async function saveDevice(device) {
  console.log('Saving device:', device.id, device.platform);
}

async function saveAnalyticsEvent(event) {
  console.log('Saving analytics event:', event.eventType, event.deviceId);
}

async function saveCustomEvent(event) {
  console.log('Saving custom event:', event.eventName, event.deviceId);
}
