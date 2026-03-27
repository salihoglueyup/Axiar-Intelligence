import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  Settings,
  UserPlus,
  Lock,
  Unlock,
  Copy,
  AlertTriangle
} from 'lucide-react';

const RoleManager = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockRoles = [
        {
          id: 'admin',
          name: 'Administrator',
          description: 'Full system access',
          permissions: ['*'],
          userCount: 2,
          isSystem: true
        },
        {
          id: 'manager',
          name: 'Manager',
          description: 'Manage team and projects',
          permissions: ['users.read', 'users.write', 'projects.*', 'reports.read'],
          userCount: 5,
          isSystem: false
        },
        {
          id: 'analyst',
          name: 'Analyst',
          description: 'View and analyze data',
          permissions: ['projects.read', 'reports.read', 'analytics.read'],
          userCount: 12,
          isSystem: false
        },
        {
          id: 'viewer',
          name: 'Viewer',
          description: 'Read-only access',
          permissions: ['projects.read', 'reports.read'],
          userCount: 25,
          isSystem: false
        }
      ];

      const mockPermissions = [
        { id: 'users.read', name: 'Read Users', category: 'Users', description: 'View user information' },
        { id: 'users.write', name: 'Manage Users', category: 'Users', description: 'Create, edit, delete users' },
        { id: 'projects.read', name: 'Read Projects', category: 'Projects', description: 'View project data' },
        { id: 'projects.write', name: 'Manage Projects', category: 'Projects', description: 'Create, edit, delete projects' },
        { id: 'projects.*', name: 'Full Project Access', category: 'Projects', description: 'Complete project control' },
        { id: 'reports.read', name: 'Read Reports', category: 'Reports', description: 'View reports and analytics' },
        { id: 'reports.write', name: 'Manage Reports', category: 'Reports', description: 'Create, edit, delete reports' },
        { id: 'analytics.read', name: 'View Analytics', category: 'Analytics', description: 'Access analytics dashboard' },
        { id: 'system.admin', name: 'System Admin', category: 'System', description: 'System administration' }
      ];

      setRoles(mockRoles);
      setPermissions(mockPermissions);
    } catch (err) {
      setError('Failed to load roles and permissions');
    } finally {
      setIsLoading(false);
    }
  };

  const groupedPermissions = permissions.reduce((acc, perm) => {
    if (!acc[perm.category]) acc[perm.category] = [];
    acc[perm.category].push(perm);
    return acc;
  }, {});

  const handleCreateRole = async (roleData) => {
    try {
      // Mock API call
      const newRole = {
        id: roleData.name.toLowerCase().replace(/\s+/g, '_'),
        name: roleData.name,
        description: roleData.description,
        permissions: roleData.permissions,
        userCount: 0,
        isSystem: false
      };
      
      setRoles([...roles, newRole]);
      setShowCreateRole(false);
    } catch (err) {
      setError('Failed to create role');
    }
  };

  const handleUpdateRole = async (roleData) => {
    try {
      // Mock API call
      const updatedRoles = roles.map(role =>
        role.id === editingRole.id
          ? { ...role, ...roleData }
          : role
      );
      
      setRoles(updatedRoles);
      setEditingRole(null);
    } catch (err) {
      setError('Failed to update role');
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (!confirm('Are you sure you want to delete this role?')) return;
    
    try {
      // Mock API call
      setRoles(roles.filter(role => role.id !== roleId));
    } catch (err) {
      setError('Failed to delete role');
    }
  };

  const duplicateRole = (role) => {
    setEditingRole({
      ...role,
      name: `${role.name} (Copy)`,
      id: null
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Shield className="w-8 h-8 text-cyan-500" />
            <span>Role Management</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Manage user roles and permissions for enterprise access control
          </p>
        </div>
        
        <button
          onClick={() => setShowCreateRole(true)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Role</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-red-400">{error}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                    </div>
                    <div className="h-8 bg-gray-800 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            roles.map(role => (
              <div
                key={role.id}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-cyan-800 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{role.name}</h3>
                      {role.isSystem && (
                        <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">
                          System
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 mb-3">{role.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-400">{role.userCount} users</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-400">
                          {role.permissions.includes('*') ? 'All permissions' : `${role.permissions.length} permissions`}
                        </span>
                      </div>
                    </div>
                    
                    {role.permissions.length > 0 && !role.permissions.includes('*') && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map(perm => (
                          <span
                            key={perm}
                            className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                          >
                            {perm}
                          </span>
                        ))}
                        {role.permissions.length > 3 && (
                          <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
                            +{role.permissions.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedRole(role)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => duplicateRole(role)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {!role.isSystem && (
                      <>
                        <button
                          onClick={() => setEditingRole(role)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Permission Categories</h3>
            <div className="space-y-3">
              {Object.entries(groupedPermissions).map(([category, perms]) => (
                <div key={category}>
                  <h4 className="text-white font-medium mb-2">{category}</h4>
                  <div className="space-y-1">
                    {perms.map(perm => (
                      <div key={perm.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{perm.name}</span>
                        <span className="text-gray-500 text-xs">{perm.id}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {(showCreateRole || editingRole) && (
        <RoleForm
          role={editingRole}
          permissions={permissions}
          onSave={editingRole ? handleUpdateRole : handleCreateRole}
          onCancel={() => {
            setShowCreateRole(false);
            setEditingRole(null);
          }}
        />
      )}

      {selectedRole && (
        <RoleDetailModal
          role={selectedRole}
          permissions={permissions}
          onClose={() => setSelectedRole(null)}
        />
      )}
    </div>
  );
};

const RoleForm = ({ role, permissions, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions || []
  });

  const groupedPermissions = permissions.reduce((acc, perm) => {
    if (!acc[perm.category]) acc[perm.category] = [];
    acc[perm.category].push(perm);
    return acc;
  }, {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const togglePermission = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-6">
            {role ? 'Edit Role' : 'Create Role'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Role Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-4">
                Permissions
              </label>
              <div className="space-y-4">
                {Object.entries(groupedPermissions).map(([category, perms]) => (
                  <div key={category}>
                    <h4 className="text-white font-medium mb-2">{category}</h4>
                    <div className="space-y-2">
                      {perms.map(perm => (
                        <label key={perm.id} className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(perm.id)}
                            onChange={() => togglePermission(perm.id)}
                            className="mt-1 rounded border-gray-600 bg-gray-800 text-cyan-600 focus:ring-cyan-500 focus:ring-offset-gray-900"
                          />
                          <div>
                            <div className="text-white">{perm.name}</div>
                            <div className="text-gray-400 text-sm">{perm.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                {role ? 'Update' : 'Create'} Role
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const RoleDetailModal = ({ role, permissions, onClose }) => {
  const rolePermissions = permissions.filter(p => 
    role.permissions.includes('*') || role.permissions.includes(p.id)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">{role.name}</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-2">Description</h4>
              <p className="text-gray-400">{role.description}</p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-2">Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-cyan-500">{role.userCount}</div>
                  <div className="text-gray-400 text-sm">Assigned Users</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-cyan-500">
                    {role.permissions.includes('*') ? 'All' : role.permissions.length}
                  </div>
                  <div className="text-gray-400 text-sm">Permissions</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Permissions</h4>
              {role.permissions.includes('*') ? (
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Unlock className="w-5 h-5 text-cyan-500" />
                    <span className="text-cyan-400 font-medium">Full System Access</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {rolePermissions.map(perm => (
                    <div key={perm.id} className="bg-gray-800 rounded-lg p-3">
                      <div className="text-white font-medium">{perm.name}</div>
                      <div className="text-gray-400 text-sm">{perm.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManager;
