import React, { useState, useEffect } from 'react';
import { Plus, Shield, Users, Settings, AlertTriangle, CheckCircle } from 'lucide-react';
import SSOProvider from './SSOProvider';

const SSOManagement = () => {
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddProvider, setShowAddProvider] = useState(false);

  useEffect(() => {
    loadSSOProviders();
  }, []);

  const loadSSOProviders = async () => {
    try {
      // Mock data - replace with actual API call
      const mockProviders = [
        {
          id: 'saml-1',
          type: 'saml',
          name: 'Company SAML',
          isConnected: true,
          config: {
            entry_point: 'https://sso.company.com/saml',
            issuer: 'company-saml',
            name_identifier_format: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
          }
        },
        {
          id: 'oidc-1',
          type: 'oidc',
          name: 'Microsoft Azure AD',
          isConnected: false,
          config: null
        }
      ];
      
      setProviders(mockProviders);
    } catch (err) {
      setError('Failed to load SSO providers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectProvider = async (providerType) => {
    // Mock implementation - replace with actual API call
    console.log(`Connecting ${providerType} provider`);
    await loadSSOProviders();
  };

  const handleDisconnectProvider = async (providerType) => {
    // Mock implementation - replace with actual API call
    console.log(`Disconnecting ${providerType} provider`);
    await loadSSOProviders();
  };

  const availableProviderTypes = ['saml', 'oidc', 'ldap', 'oauth2'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Shield className="w-8 h-8 text-cyan-500" />
            <span>SSO Management</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Configure and manage single sign-on providers for enterprise authentication
          </p>
        </div>
        
        <button
          onClick={() => setShowAddProvider(!showAddProvider)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Provider</span>
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

      {showAddProvider && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Add SSO Provider</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableProviderTypes.map(type => (
              <button
                key={type}
                onClick={() => {
                  setShowAddProvider(false);
                  // Add new provider logic here
                }}
                className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-cyan-500 transition-colors text-center"
              >
                <div className="text-2xl mb-2">
                  {type === 'saml' && '🔐'}
                  {type === 'oidc' && '🛡️'}
                  {type === 'ldap' && '👥'}
                  {type === 'oauth2' && '🔑'}
                </div>
                <div className="text-white font-medium capitalize">{type}</div>
                <div className="text-gray-400 text-xs mt-1">
                  {type === 'saml' && 'SAML 2.0'}
                  {type === 'oidc' && 'OpenID Connect'}
                  {type === 'ldap' && 'LDAP/AD'}
                  {type === 'oauth2' && 'OAuth 2.0'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {providers.length === 0 ? (
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-12 text-center">
              <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No SSO Providers</h3>
              <p className="text-gray-400 mb-6">
                Configure single sign-on providers to enable enterprise authentication
              </p>
              <button
                onClick={() => setShowAddProvider(true)}
                className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Add Your First Provider
              </button>
            </div>
          ) : (
            providers.map(provider => (
              <SSOProvider
                key={provider.id}
                provider={provider.type}
                onConnect={handleConnectProvider}
                onDisconnect={handleDisconnectProvider}
                isConnected={provider.isConnected}
                config={provider.config}
              />
            ))
          )}
        </div>
      )}

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>SSO Settings</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Auto-provision Users</h4>
              <p className="text-gray-400 text-sm">Automatically create user accounts for SSO logins</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Default Role</h4>
              <p className="text-gray-400 text-sm">Default role for auto-provisioned users</p>
            </div>
            <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Session Timeout</h4>
              <p className="text-gray-400 text-sm">Maximum session duration (hours)</p>
            </div>
            <input
              type="number"
              min="1"
              max="24"
              defaultValue="8"
              className="w-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SSOManagement;
