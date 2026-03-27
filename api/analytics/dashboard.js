// BI Dashboard API endpoints
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const dashboardId = searchParams.get('id');
    const userId = searchParams.get('userId');
    const category = searchParams.get('category');
    
    let data;
    
    if (dashboardId) {
      data = await getDashboard(dashboardId);
    } else if (userId) {
      data = await getUserDashboards(userId);
    } else if (category) {
      data = await getDashboardsByCategory(category);
    } else {
      data = await getAllDashboards();
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
    const { action, dashboardData } = body;

    switch (action) {
      case 'create':
        const dashboard = await createDashboard(dashboardData);
        return new Response(JSON.stringify({
          success: true,
          data: dashboard
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'update':
        const update = await updateDashboard(dashboardData);
        return new Response(JSON.stringify({
          success: true,
          data: update
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'delete':
        const deletion = await deleteDashboard(dashboardData);
        return new Response(JSON.stringify({
          success: true,
          data: deletion
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'duplicate':
        const duplicate = await duplicateDashboard(dashboardData);
        return new Response(JSON.stringify({
          success: true,
          data: duplicate
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
async function getAllDashboards() {
  // Mock data - replace with actual database query
  const dashboards = [
    {
      id: 'dash_1',
      name: 'Executive Overview',
      description: 'High-level business metrics and KPIs',
      category: 'executive',
      isPublic: true,
      owner: 'admin',
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-03-23T14:30:00Z',
      views: 1247,
      favorites: 89,
      widgets: 6,
      layout: 'grid',
      refreshInterval: 300,
      tags: ['executive', 'kpi', 'overview'],
      permissions: {
        view: ['all'],
        edit: ['admin', 'executive'],
        share: ['admin']
      },
      widgets: [
        {
          id: 'widget_1',
          type: 'kpi',
          title: 'Total Revenue',
          position: { x: 0, y: 0, w: 4, h: 2 },
          config: {
            metric: 'revenue',
            period: '30d',
            format: 'currency',
            trend: true
          }
        },
        {
          id: 'widget_2',
          type: 'line',
          title: 'User Growth',
          position: { x: 4, y: 0, w: 8, h: 4 },
          config: {
            metric: 'users',
            period: '90d',
            smoothing: true
          }
        }
      ]
    },
    {
      id: 'dash_2',
      name: 'Sales Performance',
      description: 'Sales team performance and revenue tracking',
      category: 'sales',
      isPublic: false,
      owner: 'sales_team',
      createdAt: '2024-03-10T15:30:00Z',
      updatedAt: '2024-03-22T09:15:00Z',
      views: 892,
      favorites: 67,
      widgets: 8,
      layout: 'grid',
      refreshInterval: 600,
      tags: ['sales', 'revenue', 'performance'],
      permissions: {
        view: ['sales_team', 'admin'],
        edit: ['sales_manager', 'admin'],
        share: ['sales_manager', 'admin']
      }
    },
    {
      id: 'dash_3',
      name: 'Marketing Analytics',
      description: 'Campaign performance and marketing ROI',
      category: 'marketing',
      isPublic: true,
      owner: 'marketing_team',
      createdAt: '2024-03-05T09:00:00Z',
      updatedAt: '2024-03-21T16:45:00Z',
      views: 1567,
      favorites: 123,
      widgets: 10,
      layout: 'grid',
      refreshInterval: 900,
      tags: ['marketing', 'campaigns', 'roi'],
      permissions: {
        view: ['all'],
        edit: ['marketing_team', 'admin'],
        share: ['marketing_manager', 'admin']
      }
    }
  ];

  return dashboards;
}

async function getDashboard(dashboardId) {
  const dashboards = await getAllDashboards();
  const dashboard = dashboards.find(d => d.id === dashboardId);
  
  if (!dashboard) {
    throw new Error('Dashboard not found');
  }

  return dashboard;
}

async function getUserDashboards(userId) {
  const dashboards = await getAllDashboards();
  return dashboards.filter(d => 
    d.owner === userId || 
    d.isPublic || 
    d.permissions.view.includes(userId)
  );
}

async function getDashboardsByCategory(category) {
  const dashboards = await getAllDashboards();
  return dashboards.filter(d => d.category === category);
}

async function createDashboard(dashboardData) {
  const {
    name,
    description,
    category,
    userId,
    widgets = [],
    layout = 'grid',
    refreshInterval = 300,
    isPublic = false
  } = dashboardData;

  // Validate required fields
  if (!name || !description || !category || !userId) {
    throw new Error('Name, description, category, and userId are required');
  }

  // Create dashboard
  const dashboard = {
    id: generateDashboardId(),
    name: name,
    description: description,
    category: category,
    isPublic: isPublic,
    owner: userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
    favorites: 0,
    widgets: widgets.length,
    layout: layout,
    refreshInterval: refreshInterval,
    tags: [],
    permissions: {
      view: [userId],
      edit: [userId],
      share: [userId]
    },
    widgets: widgets
  };

  // Save dashboard
  await saveDashboard(dashboard);

  return dashboard;
}

async function updateDashboard(dashboardData) {
  const { id, ...updates } = dashboardData;
  
  if (!id) {
    throw new Error('Dashboard ID is required');
  }

  // Get existing dashboard
  const dashboard = await getDashboard(id);

  // Update fields
  const updatedDashboard = {
    ...dashboard,
    ...updates,
    updatedAt: new Date().toISOString()
  };

  // Save updated dashboard
  await saveDashboard(updatedDashboard);

  return updatedDashboard;
}

async function deleteDashboard(dashboardData) {
  const { id } = dashboardData;
  
  if (!id) {
    throw new Error('Dashboard ID is required');
  }

  // Get dashboard
  const dashboard = await getDashboard(id);

  // Mark as deleted
  dashboard.deletedAt = new Date().toISOString();

  // Save changes
  await saveDashboard(dashboard);

  return { success: true, message: 'Dashboard deleted successfully' };
}

async function duplicateDashboard(dashboardData) {
  const { id, name, userId } = dashboardData;
  
  if (!id || !name || !userId) {
    throw new Error('Dashboard ID, name, and userId are required');
  }

  // Get original dashboard
  const original = await getDashboard(id);

  // Create duplicate
  const duplicate = {
    ...original,
    id: generateDashboardId(),
    name: name,
    owner: userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
    favorites: 0,
    isPublic: false,
    permissions: {
      view: [userId],
      edit: [userId],
      share: [userId]
    },
    clonedFrom: id
  };

  // Clone widgets with new IDs
  duplicate.widgets = duplicate.widgets.map(widget => ({
    ...widget,
    id: generateWidgetId()
  }));

  // Save duplicate
  await saveDashboard(duplicate);

  return duplicate;
}

// Utility functions
function generateDashboardId() {
  return 'dash_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateWidgetId() {
  return 'widget_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Database operations (mock implementations)
async function saveDashboard(dashboard) {
  console.log('Saving dashboard:', dashboard.id, dashboard.name);
}
