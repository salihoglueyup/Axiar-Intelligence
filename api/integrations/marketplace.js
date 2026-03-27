// API Marketplace endpoints
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    
    let data;
    
    if (featured === 'true') {
      data = await getFeaturedIntegrations();
    } else if (category) {
      data = await getIntegrationsByCategory(category);
    } else if (search) {
      data = await searchIntegrations(search);
    } else {
      data = await getAllIntegrations();
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
    const { action, integrationData } = body;

    switch (action) {
      case 'install':
        const installation = await installIntegration(integrationData);
        return new Response(JSON.stringify({
          success: true,
          data: installation
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'uninstall':
        const uninstallation = await uninstallIntegration(integrationData);
        return new Response(JSON.stringify({
          success: true,
          data: uninstallation
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'update':
        const update = await updateIntegration(integrationData);
        return new Response(JSON.stringify({
          success: true,
          data: update
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'submit':
        const submission = await submitIntegration(integrationData);
        return new Response(JSON.stringify({
          success: true,
          data: submission
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
async function getAllIntegrations() {
  // Mock data - replace with actual database query
  const integrations = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Payment processing platform for internet businesses',
      category: 'payment',
      icon: 'credit-card',
      rating: 4.8,
      downloads: 45000,
      price: 'Free tier available',
      developer: 'Stripe Inc.',
      tags: ['payment', 'billing', 'subscription'],
      status: 'available',
      version: 'v1.2.0',
      lastUpdated: '2024-03-20',
      features: ['Payment processing', 'Subscriptions', 'Invoicing', 'Fraud detection'],
      documentation: 'https://docs.stripe.com',
      support: '24/7 support',
      endpoints: 15,
      webhooks: true,
      authentication: ['api_key', 'oauth2'],
      pricing: {
        free: true,
        paid: {
          basic: '$0.30 + 2.9%',
          pro: '$0.25 + 2.7%',
          enterprise: 'Custom'
        }
      },
      screenshots: [
        'https://example.com/stripe-1.png',
        'https://example.com/stripe-2.png',
        'https://example.com/stripe-3.png'
      ],
      reviews: [
        {
          id: 1,
          author: 'John Doe',
          rating: 5,
          comment: 'Excellent payment platform with great documentation',
          date: '2024-03-15'
        },
        {
          id: 2,
          author: 'Jane Smith',
          rating: 4,
          comment: 'Reliable but pricing can be complex',
          date: '2024-03-10'
        }
      ]
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      description: 'Cloud-based email delivery platform',
      category: 'communication',
      icon: 'mail',
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
      webhooks: true,
      authentication: ['api_key'],
      pricing: {
        free: { emails: 100, day: 'free' },
        paid: {
          basic: '$15/month - 40,000 emails',
          pro: '$60/month - 100,000 emails',
          premier: '$120/month - 200,000 emails'
        }
      }
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Web analytics service for tracking and reporting',
      category: 'analytics',
      icon: 'bar-chart',
      rating: 4.7,
      downloads: 67000,
      price: 'Free',
      developer: 'Google',
      tags: ['analytics', 'tracking', 'reporting'],
      status: 'available',
      version: 'v4.0.0',
      lastUpdated: '2024-03-15',
      features: ['Traffic analysis', 'Conversion tracking', 'Custom reports', 'Real-time data'],
      documentation: 'https://developers.google.com/analytics',
      support: 'Community',
      endpoints: 8,
      webhooks: false,
      authentication: ['oauth2'],
      pricing: {
        free: true
      }
    },
    {
      id: 'aws-s3',
      name: 'AWS S3',
      description: 'Scalable object storage service',
      category: 'storage',
      icon: 'database',
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
      webhooks: true,
      authentication: ['api_key', 'oauth2'],
      pricing: {
        payg: {
          storage: '$0.023 per GB',
          requests: '$0.0004 per 1,000 requests',
          dataTransfer: '$0.09 per GB'
        }
      }
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication and collaboration platform',
      category: 'productivity',
      icon: 'message-square',
      rating: 4.5,
      downloads: 38000,
      price: 'Free tier available',
      developer: 'Slack Technologies',
      tags: ['messaging', 'team', 'collaboration'],
      status: 'available',
      version: 'v1.5.0',
      lastUpdated: '2024-03-10',
      features: ['Messaging', 'Channels', 'File sharing', 'Integrations'],
      documentation: 'https://api.slack.com',
      support: 'Business hours',
      endpoints: 18,
      webhooks: true,
      authentication: ['oauth2', 'bot_token'],
      pricing: {
        free: { users: 10, storage: '5GB' },
        paid: {
          pro: '$8.75/user/month',
          business: '$15/user/month',
          enterprise: 'Custom'
        }
      }
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Development platform for version control and collaboration',
      category: 'development',
      icon: 'git-branch',
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
      webhooks: true,
      authentication: ['oauth2', 'personal_access_token'],
      pricing: {
        free: { publicRepos: 'unlimited', privateRepos: 'unlimited' },
        paid: {
          pro: '$4/user/month',
          team: '$4/user/month',
          enterprise: '$21/user/month'
        }
      }
    }
  ];

  return integrations;
}

async function getFeaturedIntegrations() {
  const allIntegrations = await getAllIntegrations();
  return allIntegrations.filter(integration => 
    integration.downloads > 30000 && integration.rating >= 4.5
  ).slice(0, 6);
}

async function getIntegrationsByCategory(category) {
  const allIntegrations = await getAllIntegrations();
  return allIntegrations.filter(integration => integration.category === category);
}

async function searchIntegrations(query) {
  const allIntegrations = await getAllIntegrations();
  const lowerQuery = query.toLowerCase();
  
  return allIntegrations.filter(integration => 
    integration.name.toLowerCase().includes(lowerQuery) ||
    integration.description.toLowerCase().includes(lowerQuery) ||
    integration.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    integration.developer.toLowerCase().includes(lowerQuery)
  );
}

async function installIntegration(integrationData) {
  const { integrationId, configuration = {} } = integrationData;
  
  // Validate input
  if (!integrationId) {
    throw new Error('Integration ID is required');
  }

  // Get integration details
  const integration = await getIntegrationById(integrationId);
  if (!integration) {
    throw new Error('Integration not found');
  }

  // Check if already installed
  const existingInstallation = await getInstallation(integrationId);
  if (existingInstallation) {
    throw new Error('Integration is already installed');
  }

  // Generate API key and credentials
  const credentials = await generateCredentials(integration);

  // Create installation record
  const installation = {
    id: generateInstallationId(),
    integrationId: integrationId,
    integrationName: integration.name,
    status: 'installed',
    credentials: credentials,
    configuration: configuration,
    createdAt: new Date().toISOString(),
    lastUsed: null,
    usage: {
      totalCalls: 0,
      successfulCalls: 0,
      failedCalls: 0,
      lastCall: null
    },
    settings: {
      enabled: true,
      logging: true,
      notifications: true
    }
  };

  // Save installation
  await saveInstallation(installation);

  // Trigger installation webhook
  await triggerWebhook('integration.installed', installation);

  return installation;
}

async function uninstallIntegration(integrationData) {
  const { integrationId } = integrationData;
  
  // Validate input
  if (!integrationId) {
    throw new Error('Integration ID is required');
  }

  // Get installation
  const installation = await getInstallation(integrationId);
  if (!installation) {
    throw new Error('Integration is not installed');
  }

  // Update status
  installation.status = 'uninstalled';
  installation.uninstalledAt = new Date().toISOString();

  // Save changes
  await saveInstallation(installation);

  // Trigger uninstallation webhook
  await triggerWebhook('integration.uninstalled', installation);

  return { success: true, message: 'Integration uninstalled successfully' };
}

async function updateIntegration(integrationData) {
  const { integrationId, configuration, settings } = integrationData;
  
  // Validate input
  if (!integrationId) {
    throw new Error('Integration ID is required');
  }

  // Get installation
  const installation = await getInstallation(integrationId);
  if (!installation) {
    throw new Error('Integration is not installed');
  }

  // Update configuration and settings
  if (configuration) {
    installation.configuration = { ...installation.configuration, ...configuration };
  }
  
  if (settings) {
    installation.settings = { ...installation.settings, ...settings };
  }

  installation.updatedAt = new Date().toISOString();

  // Save changes
  await saveInstallation(installation);

  return installation;
}

async function submitIntegration(integrationData) {
  const { integration } = integrationData;
  
  // Validate required fields
  const requiredFields = ['name', 'description', 'category', 'developer', 'documentation'];
  for (const field of requiredFields) {
    if (!integration[field]) {
      throw new Error(`${field} is required`);
    }
  }

  // Create submission record
  const submission = {
    id: generateSubmissionId(),
    integration: integration,
    status: 'pending_review',
    submittedAt: new Date().toISOString(),
    submittedBy: 'current_user', // Would get from auth context
    reviewStatus: 'pending',
    reviewNotes: null,
    approvedAt: null,
    approvedBy: null
  };

  // Save submission
  await saveSubmission(submission);

  // Trigger submission webhook
  await triggerWebhook('integration.submitted', submission);

  return submission;
}

// Utility functions
function generateInstallationId() {
  return 'inst_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateSubmissionId() {
  return 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

async function generateCredentials(integration) {
  const credentials = {
    apiKey: generateApiKey(),
    apiSecret: generateApiSecret(),
    webhookUrl: generateWebhookUrl(),
    createdAt: new Date().toISOString()
  };

  // Add integration-specific credentials
  if (integration.authentication.includes('oauth2')) {
    credentials.oauth2 = {
      clientId: generateClientId(),
      clientSecret: generateClientSecret(),
      redirectUri: generateRedirectUri()
    };
  }

  return credentials;
}

function generateApiKey() {
  return 'ak_' + Math.random().toString(36).substr(2, 32);
}

function generateApiSecret() {
  return 'as_' + Math.random().toString(36).substr(2, 32);
}

function generateWebhookUrl() {
  return `https://api.example.com/webhooks/${Math.random().toString(36).substr(2, 16)}`;
}

function generateClientId() {
  return 'cid_' + Math.random().toString(36).substr(2, 16);
}

function generateClientSecret() {
  return 'csec_' + Math.random().toString(36).substr(2, 32);
}

function generateRedirectUri() {
  return `https://app.example.com/auth/callback/${Math.random().toString(36).substr(2, 8)}`;
}

// Database operations (mock implementations)
async function getIntegrationById(integrationId) {
  const allIntegrations = await getAllIntegrations();
  return allIntegrations.find(i => i.id === integrationId);
}

async function getInstallation(integrationId) {
  // Mock database query
  return null; // Return null for now, would query actual database
}

async function saveInstallation(installation) {
  console.log('Saving installation:', installation.integrationId);
}

async function saveSubmission(submission) {
  console.log('Saving submission:', submission.id);
}

async function triggerWebhook(event, data) {
  console.log('Triggering webhook:', event, data.id);
}
