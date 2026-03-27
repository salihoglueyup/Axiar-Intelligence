import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Settings, User, Shield, Globe } from 'lucide-react';

const SSOProvider = ({ provider, onConnect, onDisconnect, isConnected, config }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  const providerIcons = {
    saml: <Globe className="w-5 h-5" />,
    oidc: <Shield className="w-5 h-5" />,
    ldap: <User className="w-5 h-5" />,
    oauth2: <Settings className="w-5 h-5" />
  };

  const providerColors = {
    saml: 'bg-blue-500',
    oidc: 'bg-green-500',
    ldap: 'bg-purple-500',
    oauth2: 'bg-orange-500'
  };

  const handleConnect = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await onConnect(provider);
    } catch (err) {
      setError(err.message || 'Failed to connect provider');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await onDisconnect(provider);
    } catch (err) {
      setError(err.message || 'Failed to disconnect provider');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${providerColors[provider]} bg-opacity-20 text-white`}>
            {providerIcons[provider]}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white capitalize">{provider}</h3>
            <p className="text-gray-400 text-sm">
              {provider === 'saml' && 'Security Assertion Markup Language'}
              {provider === 'oidc' && 'OpenID Connect'}
              {provider === 'ldap' && 'Lightweight Directory Access Protocol'}
              {provider === 'oauth2' && 'OAuth 2.0'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-500 text-sm">Connected</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-gray-500" />
              <span className="text-gray-500 text-sm">Not Connected</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {isConnected ? (
          <div className="space-y-3">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              {showConfig ? 'Hide' : 'Show'} Configuration
            </button>
            
            {showConfig && config && (
              <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                <h4 className="text-white font-medium mb-3">Configuration Details</h4>
                {Object.entries(config).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="text-gray-300 text-sm font-mono">
                      {typeof value === 'boolean' ? value.toString() : value}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            <button
              onClick={handleDisconnect}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Disconnecting...' : 'Disconnect'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Configure {provider.toUpperCase()}
            </button>
            
            {showConfig && (
              <SSOConfigForm 
                provider={provider} 
                onSave={handleConnect}
                onCancel={() => setShowConfig(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SSOConfigForm = ({ provider, onSave, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const configFields = {
    saml: [
      { name: 'entry_point', label: 'Entry Point URL', type: 'url', required: true },
      { name: 'issuer', label: 'Issuer', type: 'text', required: true },
      { name: 'certificate', label: 'Certificate', type: 'textarea', required: true },
      { name: 'name_identifier_format', label: 'Name ID Format', type: 'text', required: false }
    ],
    oidc: [
      { name: 'client_id', label: 'Client ID', type: 'text', required: true },
      { name: 'client_secret', label: 'Client Secret', type: 'password', required: true },
      { name: 'issuer_url', label: 'Issuer URL', type: 'url', required: true },
      { name: 'redirect_uri', label: 'Redirect URI', type: 'url', required: true }
    ],
    ldap: [
      { name: 'host', label: 'LDAP Host', type: 'text', required: true },
      { name: 'port', label: 'Port', type: 'number', required: true },
      { name: 'bind_dn', label: 'Bind DN', type: 'text', required: true },
      { name: 'bind_password', label: 'Bind Password', type: 'password', required: true },
      { name: 'base_dn', label: 'Base DN', type: 'text', required: true }
    ],
    oauth2: [
      { name: 'client_id', label: 'Client ID', type: 'text', required: true },
      { name: 'client_secret', label: 'Client Secret', type: 'password', required: true },
      { name: 'authorization_url', label: 'Authorization URL', type: 'url', required: true },
      { name: 'token_url', label: 'Token URL', type: 'url', required: true },
      { name: 'userinfo_url', label: 'User Info URL', type: 'url', required: true }
    ]
  };

  const fields = configFields[provider] || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Configuration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.name}>
          <label className="block text-gray-300 text-sm font-medium mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              required={field.required}
              value={formData[field.name] || ''}
              onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              rows={4}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              value={formData[field.name] || ''}
              onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          )}
        </div>
      ))}
      
      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Connecting...' : 'Connect'}
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
  );
};

export default SSOProvider;
