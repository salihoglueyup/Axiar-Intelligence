// Role Management API endpoints
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUsers = searchParams.get('includeUsers') === 'true';
    
    // Get roles and optionally user assignments
    const roles = await getRoles(includeUsers);
    
    return new Response(JSON.stringify({
      success: true,
      data: roles
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
    const { action, roleData } = body;

    switch (action) {
      case 'create':
        const newRole = await createRole(roleData);
        return new Response(JSON.stringify({
          success: true,
          data: newRole
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'update':
        const updatedRole = await updateRole(roleData.id, roleData);
        return new Response(JSON.stringify({
          success: true,
          data: updatedRole
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'delete':
        await deleteRole(roleData.id);
        return new Response(JSON.stringify({
          success: true,
          message: 'Role deleted successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'assign':
        await assignRoleToUsers(roleData.id, roleData.userIds);
        return new Response(JSON.stringify({
          success: true,
          message: 'Role assigned to users successfully'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
        
      case 'unassign':
        await unassignRoleFromUsers(roleData.id, roleData.userIds);
        return new Response(JSON.stringify({
          success: true,
          message: 'Role unassigned from users successfully'
        }), {
          status: 200,
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
async function getRoles(includeUsers = false) {
  // Mock implementation - replace with actual database query
  const roles = [
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access',
      permissions: ['*'],
      isSystem: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Manage team and projects',
      permissions: ['users.read', 'users.write', 'projects.*', 'reports.read'],
      isSystem: false,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-03-10T10:00:00Z'
    },
    {
      id: 'analyst',
      name: 'Analyst',
      description: 'View and analyze data',
      permissions: ['projects.read', 'reports.read', 'analytics.read'],
      isSystem: false,
      createdAt: '2024-02-01T00:00:00Z',
      updatedAt: '2024-02-01T00:00:00Z'
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Read-only access',
      permissions: ['projects.read', 'reports.read'],
      isSystem: false,
      createdAt: '2024-02-15T00:00:00Z',
      updatedAt: '2024-02-15T00:00:00Z'
    }
  ];

  if (includeUsers) {
    // Add user count and user assignments for each role
    for (const role of roles) {
      role.userCount = await getUserCountForRole(role.id);
      role.users = await getUsersForRole(role.id);
    }
  } else {
    // Just add user count
    for (const role of roles) {
      role.userCount = await getUserCountForRole(role.id);
    }
  }

  return roles;
}

async function createRole(roleData) {
  // Validate role data
  validateRoleData(roleData);
  
  // Check if role name already exists
  const existingRole = await getRoleByName(roleData.name);
  if (existingRole) {
    throw new Error('Role with this name already exists');
  }
  
  // Create role
  const newRole = {
    id: generateRoleId(roleData.name),
    name: roleData.name,
    description: roleData.description,
    permissions: roleData.permissions || [],
    isSystem: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  await saveRole(newRole);
  
  return newRole;
}

async function updateRole(roleId, roleData) {
  // Get existing role
  const existingRole = await getRoleById(roleId);
  if (!existingRole) {
    throw new Error('Role not found');
  }
  
  // Check if it's a system role
  if (existingRole.isSystem) {
    throw new Error('Cannot modify system roles');
  }
  
  // Validate role data
  validateRoleData(roleData);
  
  // Check if name conflicts with another role
  if (roleData.name !== existingRole.name) {
    const nameConflict = await getRoleByName(roleData.name);
    if (nameConflict && nameConflict.id !== roleId) {
      throw new Error('Role with this name already exists');
    }
  }
  
  // Update role
  const updatedRole = {
    ...existingRole,
    ...roleData,
    updatedAt: new Date().toISOString()
  };
  
  await saveRole(updatedRole);
  
  return updatedRole;
}

async function deleteRole(roleId) {
  // Get existing role
  const existingRole = await getRoleById(roleId);
  if (!existingRole) {
    throw new Error('Role not found');
  }
  
  // Check if it's a system role
  if (existingRole.isSystem) {
    throw new Error('Cannot delete system roles');
  }
  
  // Check if role has users assigned
  const userCount = await getUserCountForRole(roleId);
  if (userCount > 0) {
    throw new Error('Cannot delete role with assigned users');
  }
  
  // Delete role
  await removeRole(roleId);
}

async function assignRoleToUsers(roleId, userIds) {
  // Validate role exists
  const role = await getRoleById(roleId);
  if (!role) {
    throw new Error('Role not found');
  }
  
  // Validate users exist
  for (const userId of userIds) {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }
  }
  
  // Assign role to users
  for (const userId of userIds) {
    await addRoleToUser(userId, roleId);
  }
}

async function unassignRoleFromUsers(roleId, userIds) {
  // Validate role exists
  const role = await getRoleById(roleId);
  if (!role) {
    throw new Error('Role not found');
  }
  
  // Unassign role from users
  for (const userId of userIds) {
    await removeRoleFromUser(userId, roleId);
  }
}

// Validation functions
function validateRoleData(roleData) {
  if (!roleData.name || roleData.name.trim().length === 0) {
    throw new Error('Role name is required');
  }
  
  if (!roleData.description || roleData.description.trim().length === 0) {
    throw new Error('Role description is required');
  }
  
  if (roleData.permissions && !Array.isArray(roleData.permissions)) {
    throw new Error('Permissions must be an array');
  }
  
  // Validate permissions
  if (roleData.permissions) {
    for (const permission of roleData.permissions) {
      if (typeof permission !== 'string') {
        throw new Error('Permissions must be strings');
      }
    }
  }
}

// Utility functions
function generateRoleId(name) {
  return name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
}

// Database operations (mock implementations)
async function getRoleById(roleId) {
  // Mock database query
  const roles = await getRoles();
  return roles.find(role => role.id === roleId);
}

async function getRoleByName(name) {
  // Mock database query
  const roles = await getRoles();
  return roles.find(role => role.name === name);
}

async function getUserCountForRole(roleId) {
  // Mock database query
  const mockCounts = {
    'admin': 2,
    'manager': 5,
    'analyst': 12,
    'viewer': 25
  };
  return mockCounts[roleId] || 0;
}

async function getUsersForRole(roleId) {
  // Mock database query
  return []; // Return empty array for now
}

async function getUserById(userId) {
  // Mock database query
  return { id: userId, name: 'Test User' };
}

async function saveRole(role) {
  // Mock database save
  console.log('Saving role:', role);
}

async function removeRole(roleId) {
  // Mock database delete
  console.log('Removing role:', roleId);
}

async function addRoleToUser(userId, roleId) {
  // Mock database operation
  console.log(`Adding role ${roleId} to user ${userId}`);
}

async function removeRoleFromUser(userId, roleId) {
  // Mock database operation
  console.log(`Removing role ${roleId} from user ${userId}`);
}
