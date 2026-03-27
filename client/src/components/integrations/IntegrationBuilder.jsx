import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Zap, 
  Plus, 
  Trash2, 
  Settings, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  Copy, 
  Download, 
  Upload, 
  Save, 
  RefreshCw, 
  Globe, 
  Database, 
  Shield, 
  Key, 
  Lock, 
  Unlock, 
  GitBranch, 
  Package, 
  Terminal, 
  Braces, 
  FileCode, 
  TestTube, 
  Rocket, 
  Activity, 
  Clock, 
  BarChart3, 
  Layers, 
  Link, 
  ExternalLink, 
  BookOpen, 
  HelpCircle
} from 'lucide-react';

const IntegrationBuilder = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [integration, setIntegration] = useState({
    name: '',
    description: '',
    category: 'custom',
    version: '1.0.0',
    endpoints: [],
    events: [],
    authentication: {
      type: 'api_key',
      config: {}
    },
    configuration: {
      retries: 3,
      timeout: 30,
      rateLimit: 1000
    }
  });
  const [testResults, setTestResults] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const tabs = [
    { id: 'builder', label: 'Builder', icon: Code },
    { id: 'test', label: 'Test', icon: TestTube },
    { id: 'deploy', label: 'Deploy', icon: Rocket },
    { id: 'docs', label: 'Documentation', icon: BookOpen }
  ];

  const categories = [
    { id: 'custom', name: 'Custom Integration' },
    { id: 'payment', name: 'Payment' },
    { id: 'communication', name: 'Communication' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'storage', name: 'Storage' },
    { id: 'security', name: 'Security' }
  ];

  const authTypes = [
    { id: 'api_key', name: 'API Key', description: 'Simple API key authentication' },
    { id: 'oauth2', name: 'OAuth 2.0', description: 'OAuth 2.0 flow' },
    { id: 'bearer', name: 'Bearer Token', description: 'JWT or bearer token' },
    { id: 'basic', name: 'Basic Auth', description: 'HTTP Basic authentication' },
    { id: 'none', name: 'No Auth', description: 'No authentication required' }
  ];

  const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  const eventTypes = [
    'trigger.manual',
    'trigger.scheduled',
    'trigger.webhook',
    'trigger.api_call',
    'action.create',
    'action.update',
    'action.delete',
    'action.notify'
  ];

  useEffect(() => {
    // Initialize with sample endpoint
    if (integration.endpoints.length === 0) {
      addEndpoint();
    }
  }, []);

  const addEndpoint = () => {
    const newEndpoint = {
      id: Date.now().toString(),
      name: '',
      method: 'GET',
      path: '',
      description: '',
      parameters: [],
      headers: {},
      authentication: integration.authentication.type,
      response: {
        successCode: 200,
        errorCodes: [400, 401, 404, 500],
        schema: {}
      },
      testing: {
        enabled: true,
        mockData: {},
        testCases: []
      }
    };
    
    setIntegration(prev => ({
      ...prev,
      endpoints: [...prev.endpoints, newEndpoint]
    }));
  };

  const removeEndpoint = (endpointId) => {
    setIntegration(prev => ({
      ...prev,
      endpoints: prev.endpoints.filter(e => e.id !== endpointId)
    }));
  };

  const updateEndpoint = (endpointId, field, value) => {
    setIntegration(prev => ({
      ...prev,
      endpoints: prev.endpoints.map(endpoint => 
        endpoint.id === endpointId 
          ? { ...endpoint, [field]: value }
          : endpoint
      )
    }));
  };

  const addParameter = (endpointId) => {
    const endpoint = integration.endpoints.find(e => e.id === endpointId);
    if (endpoint) {
      const newParam = {
        id: Date.now().toString(),
        name: '',
        type: 'string',
        required: false,
        description: '',
        defaultValue: '',
        validation: {
          minLength: null,
          maxLength: null,
          pattern: null
        }
      };
      
      updateEndpoint(endpointId, 'parameters', [...endpoint.parameters, newParam]);
    }
  };

  const removeParameter = (endpointId, paramId) => {
    const endpoint = integration.endpoints.find(e => e.id === endpointId);
    if (endpoint) {
      updateEndpoint(endpointId, 'parameters', endpoint.parameters.filter(p => p.id !== paramId));
    }
  };

  const updateParameter = (endpointId, paramId, field, value) => {
    const endpoint = integration.endpoints.find(e => e.id === endpointId);
    if (endpoint) {
      const updatedParams = endpoint.parameters.map(param => 
        param.id === paramId 
          ? { ...param, [field]: value }
          : param
      );
      updateEndpoint(endpointId, 'parameters', updatedParams);
    }
  };

  const testIntegration = async () => {
    setIsTesting(true);
    
    // Mock testing process
    setTimeout(() => {
      const mockResults = {
        success: true,
        endpoints: integration.endpoints.map(endpoint => ({
          id: endpoint.id,
          name: endpoint.name,
          status: Math.random() > 0.2 ? 'passed' : 'failed',
          responseTime: Math.floor(Math.random() * 500) + 100,
          statusCode: Math.random() > 0.2 ? 200 : 500,
          tests: {
            total: 5,
            passed: Math.floor(Math.random() * 5) + 1,
            failed: Math.floor(Math.random() * 2)
          },
          errors: Math.random() > 0.7 ? ['Connection timeout', 'Invalid response format'] : []
        })),
        summary: {
          totalTests: integration.endpoints.length * 5,
          passed: Math.floor(integration.endpoints.length * 4.2),
          failed: Math.floor(integration.endpoints.length * 0.8),
          avgResponseTime: 245,
          successRate: 84
        }
      };
      
      setTestResults(mockResults);
      setIsTesting(false);
    }, 3000);
  };

  const generateCode = () => {
    const code = {
      javascript: generateJavaScriptCode(),
      python: generatePythonCode(),
      curl: generateCurlCode()
    };
    return code;
  };

  const generateJavaScriptCode = () => {
    return `// ${integration.name} Integration
// Generated on ${new Date().toISOString()}

class ${integration.name.replace(/\s+/g, '')}Integration {
  constructor(config) {
    this.baseURL = config.baseURL;
    this.apiKey = config.apiKey;
    this.timeout = config.timeout || 30000;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${this.apiKey}\`,
        ...options.headers
      },
      timeout: this.timeout,
      ...options
    };

    try {
      const response = await fetch(url, config);
      return await response.json();
    } catch (error) {
      throw new Error(\`API request failed: \${error.message}\`);
    }
  }

${integration.endpoints.map(endpoint => `
  // ${endpoint.name}
  async ${endpoint.name.toLowerCase().replace(/\s+/g, '')}(${endpoint.parameters.map(p => p.name).join(', ')}) {
    const params = {
      ${endpoint.parameters.map(p => `${p.name}: ${p.name}`).join(',\n      ')}
    };
    
    return await this.request('${endpoint.path}', {
      method: '${endpoint.method}',
      body: JSON.stringify(params)
    });
  }`).join('\n')}
}

// Usage example
const client = new ${integration.name.replace(/\s+/g, '')}Integration({
  baseURL: 'https://api.example.com',
  apiKey: 'your-api-key'
});

client.${integration.endpoints[0]?.name.toLowerCase().replace(/\s+/g, '') || 'getData'}()
  .then(data => console.log(data))
  .catch(error => console.error(error));`;
  };

  const generatePythonCode = () => {
    return `# ${integration.name} Integration
# Generated on ${new Date().toISOString()}

import requests
import json
from typing import Dict, Any, Optional

class ${integration.name.replace(/\s+/g, '')}Integration:
    def __init__(self, config: Dict[str, Any]):
        self.base_url = config['base_url']
        self.api_key = config['api_key']
        self.timeout = config.get('timeout', 30)
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.api_key}'
        })

    def _request(self, endpoint: str, method: str = 'GET', **kwargs) -> Dict[str, Any]:
        url = f"{self.base_url}{endpoint}"
        
        try:
            response = self.session.request(
                method=method,
                url=url,
                timeout=self.timeout,
                **kwargs
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise Exception(f"API request failed: {str(e)}")

${integration.endpoints.map(endpoint => {
    const params = endpoint.parameters.map(p => `'${p.name}': {p.name}`).join(',\n            ');
    const funcParams = endpoint.parameters.map(p => `${p.name}: Optional[${p.type}] = None`).join(', ');
    return `    # ${endpoint.name}
    def ${endpoint.name.toLowerCase().replace(' ', '_')}(${funcParams}) -> Dict[str, Any]:
        params = {
            ${params}
        }
        params = {k: v for k, v in params.items() if v is not None}
        
        return self._request(
            endpoint='${endpoint.path}',
            method='${endpoint.method}',
            json=params
        )`;
}).join('\n')}

# Usage example
if __name__ == "__main__":
    client = ${integration.name.replace(/\s+/g, '')}Integration({
        'base_url': 'https://api.example.com',
        'api_key': 'your-api-key'
    })
    
    try:
        result = client.${integration.endpoints[0]?.name.lower().replace(' ', '_') || 'get_data'}()
        print(result)
    except Exception as e:
        print(f"Error: {e}")`;
  };

  const generateCurlCode = () => {
    return `# ${integration.name} Integration - cURL Examples
# Generated on ${new Date().toISOString()}

${integration.endpoints.map(endpoint => `
# ${endpoint.name}
curl -X ${endpoint.method} \\
  https://api.example.com${endpoint.path} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  ${endpoint.method !== 'GET' ? `-d '${JSON.stringify({
    [endpoint.parameters[0]?.name]: 'value'
  } || {}, null, 2)}' \\` : ''} 
  --max-time ${integration.configuration.timeout}`).join('\n')}

# Common headers
# -H "Accept: application/json"
# -H "User-Agent: YourApp/1.0"
# -H "X-Custom-Header: value"

# Authentication options
# API Key: -H "Authorization: Bearer YOUR_API_KEY"
# Basic Auth: -u "username:password"
# OAuth 2.0: -H "Authorization: Bearer ACCESS_TOKEN"`;
  };

  const renderBuilder = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Integration Name
            </label>
            <input
              type="text"
              value={integration.name}
              onChange={(e) => setIntegration(prev => ({ ...prev, name: e.target.value }))}
              placeholder="My Integration"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Version
            </label>
            <input
              type="text"
              value={integration.version}
              onChange={(e) => setIntegration(prev => ({ ...prev, version: e.target.value }))}
              placeholder="1.0.0"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={integration.description}
              onChange={(e) => setIntegration(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what this integration does..."
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Category
            </label>
            <select
              value={integration.category}
              onChange={(e) => setIntegration(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Authentication */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Authentication</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Authentication Type
            </label>
            <select
              value={integration.authentication.type}
              onChange={(e) => setIntegration(prev => ({
                ...prev,
                authentication: { ...prev.authentication, type: e.target.value }
              }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              {authTypes.map(auth => (
                <option key={auth.id} value={auth.id}>{auth.name}</option>
              ))}
            </select>
            <p className="text-gray-400 text-xs mt-1">
              {authTypes.find(a => a.id === integration.authentication.type)?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Endpoints */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">API Endpoints</h3>
          <button
            onClick={addEndpoint}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Endpoint</span>
          </button>
        </div>
        
        <div className="space-y-6">
          {integration.endpoints.map((endpoint, index) => (
            <div key={endpoint.id} className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-cyan-500 font-mono text-sm">{endpoint.method}</span>
                    <input
                      type="text"
                      value={endpoint.name}
                      onChange={(e) => updateEndpoint(endpoint.id, 'name', e.target.value)}
                      placeholder="Endpoint Name"
                      className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={() => removeEndpoint(endpoint.id)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <input
                      type="text"
                      value={endpoint.path}
                      onChange={(e) => updateEndpoint(endpoint.id, 'path', e.target.value)}
                      placeholder="/api/endpoint"
                      className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-cyan-500 font-mono text-sm"
                    />
                  </div>
                  
                  <textarea
                    value={endpoint.description}
                    onChange={(e) => updateEndpoint(endpoint.id, 'description', e.target.value)}
                    placeholder="Describe this endpoint..."
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-cyan-500 resize-none text-sm"
                  />
                </div>
              </div>

              {/* Parameters */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Parameters</h4>
                  <button
                    onClick={() => addParameter(endpoint.id)}
                    className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span className="text-sm">Add Parameter</span>
                  </button>
                </div>
                
                <div className="space-y-2">
                  {endpoint.parameters.map((param, paramIndex) => (
                    <div key={param.id} className="flex items-center space-x-2 bg-gray-700/50 rounded p-2">
                      <input
                        type="text"
                        value={param.name}
                        onChange={(e) => updateParameter(endpoint.id, param.id, 'name', e.target.value)}
                        placeholder="Parameter name"
                        className="flex-1 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-cyan-500 text-sm"
                      />
                      
                      <select
                        value={param.type}
                        onChange={(e) => updateParameter(endpoint.id, param.id, 'type', e.target.value)}
                        className="px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-cyan-500 text-sm"
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                        <option value="array">Array</option>
                        <option value="object">Object</option>
                      </select>
                      
                      <label className="flex items-center space-x-1 text-sm">
                        <input
                          type="checkbox"
                          checked={param.required}
                          onChange={(e) => updateParameter(endpoint.id, param.id, 'required', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-gray-300">Required</span>
                      </label>
                      
                      <button
                        onClick={() => removeParameter(endpoint.id, param.id)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Retries
            </label>
            <input
              type="number"
              value={integration.configuration.retries}
              onChange={(e) => setIntegration(prev => ({
                ...prev,
                configuration: { ...prev.configuration, retries: parseInt(e.target.value) }
              }))}
              min="0"
              max="10"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Timeout (seconds)
            </label>
            <input
              type="number"
              value={integration.configuration.timeout}
              onChange={(e) => setIntegration(prev => ({
                ...prev,
                configuration: { ...prev.configuration, timeout: parseInt(e.target.value) }
              }))}
              min="1"
              max="300"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Rate Limit (requests/hour)
            </label>
            <input
              type="number"
              value={integration.configuration.rateLimit}
              onChange={(e) => setIntegration(prev => ({
                ...prev,
                configuration: { ...prev.configuration, rateLimit: parseInt(e.target.value) }
              }))}
              min="1"
              max="10000"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowCode(!showCode)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
        >
          <Code className="w-4 h-4" />
          <span>{showCode ? 'Hide Code' : 'Generate Code'}</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={testIntegration}
            disabled={isTesting || !integration.name}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isTesting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Testing...</span>
              </>
            ) : (
              <>
                <TestTube className="w-4 h-4" />
                <span>Test Integration</span>
              </>
            )}
          </button>
          
          <button
            disabled={!integration.name}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Rocket className="w-4 h-4" />
            <span>Deploy</span>
          </button>
        </div>
      </div>

      {/* Generated Code */}
      {showCode && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Generated Code</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => copyToClipboard(generateCode().javascript)}
                className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors flex items-center space-x-1"
              >
                <Copy className="w-3 h-3" />
                <span className="text-sm">Copy</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-2">JavaScript</h4>
              <pre className="bg-gray-800 p-4 rounded text-gray-300 text-sm overflow-x-auto">
                <code>{generateCode().javascript}</code>
              </pre>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-2">Python</h4>
              <pre className="bg-gray-800 p-4 rounded text-gray-300 text-sm overflow-x-auto">
                <code>{generateCode().python}</code>
              </pre>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-2">cURL</h4>
              <pre className="bg-gray-800 p-4 rounded text-gray-300 text-sm overflow-x-auto">
                <code>{generateCode().curl}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Test Results */}
      {testResults && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Test Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-500">{testResults.summary.passed}</div>
              <div className="text-gray-400 text-sm">Tests Passed</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-500">{testResults.summary.failed}</div>
              <div className="text-gray-400 text-sm">Tests Failed</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-500">{testResults.summary.successRate}%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-500">{testResults.summary.avgResponseTime}ms</div>
              <div className="text-gray-400 text-sm">Avg Response</div>
            </div>
          </div>
          
          <div className="space-y-3">
            {testResults.endpoints.map(endpoint => (
              <div key={endpoint.id} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                <div className="flex items-center space-x-3">
                  {endpoint.status === 'passed' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="text-white">{endpoint.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-300">{endpoint.statusCode}</span>
                  <span className="text-cyan-400">{endpoint.responseTime}ms</span>
                  <span className="text-gray-300">{endpoint.tests.passed}/{endpoint.tests.total} tests</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const renderTest = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Integration Testing</h3>
        
        <div className="text-center py-12">
          <TestTube className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
          <p className="text-gray-400">Use the Builder tab to create and test integrations</p>
        </div>
      </div>
    </div>
  );

  const renderDeploy = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Deployment Options</h3>
        
        <div className="text-center py-12">
          <Rocket className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
          <p className="text-gray-400">Complete your integration in the Builder tab to deploy</p>
        </div>
      </div>
    </div>
  );

  const renderDocs = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Documentation</h3>
        
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
          <p className="text-gray-400">Documentation will be generated after integration is complete</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Code className="w-8 h-8 text-cyan-500" />
            <span>Integration Builder</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Create custom integrations with visual builder and code generation
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <HelpCircle className="w-4 h-4" />
            <span>Help</span>
          </button>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
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
        {activeTab === 'builder' && renderBuilder()}
        {activeTab === 'test' && renderTest()}
        {activeTab === 'deploy' && renderDeploy()}
        {activeTab === 'docs' && renderDocs()}
      </div>
    </div>
  );
};

export default IntegrationBuilder;
