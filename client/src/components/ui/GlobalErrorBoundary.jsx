import React from 'react'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // Log error to monitoring service
    console.error('Global Error Boundary caught an error:', error, errorInfo)
    
    // Send to analytics if available
    if (window.gtag) {
      window.gtag('event', 'global_error', {
        error_message: error.message,
        error_stack: error.stack,
        component_stack: errorInfo.componentStack,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  goHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-lg w-full">
            {/* Error Animation */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2">
                <Bug className="w-8 h-8 text-red-500 animate-pulse" />
                <AlertTriangle className="w-8 h-8 text-orange-500 animate-bounce" />
              </div>
            </div>

            {/* Error Card */}
            <div className="bg-gray-800/90 backdrop-blur-xl rounded-xl border border-red-500/20 p-8 shadow-2xl">
              <div className="text-center">
                {/* Error Icon */}
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>

                {/* Error Title */}
                <h1 className="text-3xl font-bold text-white mb-4">
                  Beklenmedik Bir Hata
                </h1>
                <p className="text-gray-300 mb-6">
                  Sistemde beklenmedik bir sorun oluştu. Verileriniz güvende.
                </p>

                {/* Error Details */}
                {this.state.error && (
                  <details className="bg-gray-900/50 rounded-lg p-4 text-left mb-6">
                    <summary className="cursor-pointer text-cyan-400 hover:text-cyan-300 transition-colors flex items-center">
                      <Bug className="w-4 h-4 mr-2" />
                      Teknik Detayları
                    </summary>
                    <div className="mt-3 text-sm text-gray-400 font-mono">
                      <div className="mb-2">
                        <strong className="text-red-400">Hata Mesajı:</strong>
                        <div className="bg-gray-800 p-2 rounded mt-1">
                          {this.state.error.message}
                        </div>
                      </div>
                      {this.state.error.stack && (
                        <div className="mb-2">
                          <strong className="text-orange-400">Stack Trace:</strong>
                          <div className="bg-gray-800 p-2 rounded mt-1 text-xs overflow-auto max-h-32">
                            {this.state.error.stack}
                          </div>
                        </div>
                      )}
                    </div>
                  </details>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={this.handleRetry}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center shadow-lg"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Sayfayı Yenile
                  </button>
                  <button
                    onClick={this.goHome}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Ana Sayfa
                  </button>
                </div>

                {/* Support Info */}
                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm">
                    Sorun devam ediyorsa: <span className="text-cyan-400">destek@axiar.io</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default GlobalErrorBoundary
