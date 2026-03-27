import React from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, RefreshCw } from 'lucide-react'
import { useSecurityLogger } from '@/hooks/useSecurityProtections'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

class SecurityBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorType: null
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    const { logSecurityEvent } = useSecurityLogger()
    
    // Analyze error type
    const errorType = this.analyzeError(error)
    
    // Log security event
    logSecurityEvent('component_error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorType,
      severity: errorType === 'security' ? 'high' : 'medium'
    })

    this.setState({
      error,
      errorInfo,
      errorType
    })
  }

  analyzeError = (error) => {
    const message = error.message.toLowerCase()
    
    // Security-related errors
    if (message.includes('xss') || 
        message.includes('injection') || 
        message.includes('csrf') ||
        message.includes('unauthorized') ||
        message.includes('forbidden')) {
      return 'security'
    }
    
    // Network errors
    if (message.includes('network') || 
        message.includes('fetch') ||
        message.includes('cors')) {
      return 'network'
    }
    
    // Validation errors
    if (message.includes('validation') || 
        message.includes('invalid') ||
        message.includes('required')) {
      return 'validation'
    }
    
    // Default
    return 'general'
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorType: null
    })
  }

  handleReportError = () => {
    const { error, errorInfo, errorType } = this.state
    
    // Create error report
    const errorReport = {
      type: errorType,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      url: window.location.href
    }

    // Send to error reporting service
    import('@/services/api').then(({ default: api }) => {
      api.post('/security/report-error', errorReport).catch(() => {})
    }).catch(() => {})
  }

  render() {
    if (this.state.hasError) {
      const { error, errorType } = this.state
      
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex items-center justify-center p-4"
        >
          <Card glass className="max-w-md w-full">
            <div className="text-center space-y-6">
              {/* Error Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                  errorType === 'security' 
                    ? 'bg-red-500/20' 
                    : errorType === 'network'
                    ? 'bg-yellow-500/20'
                    : 'bg-blue-500/20'
                }`}
              >
                {errorType === 'security' ? (
                  <Shield className="w-8 h-8 text-red-400" />
                ) : errorType === 'network' ? (
                  <AlertTriangle className="w-8 h-8 text-yellow-400" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-blue-400" />
                )}
              </motion.div>

              {/* Error Message */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">
                  {errorType === 'security' 
                    ? 'Güvenlik Hatası'
                    : errorType === 'network'
                    ? 'Bağlantı Hatası'
                    : 'Beklenmedik Hata'
                  }
                </h2>
                
                <p className="text-gray-300 leading-relaxed">
                  {errorType === 'security' 
                    ? 'Güvenlik önlemleri nedeniyle işlem engellendi. Lütfen sayfayı yenileyin veya destekle iletişime geçin.'
                    : errorType === 'network'
                    ? 'Ağ bağlantısı kurulamadı. İnternet bağlantınızı kontrol edin.'
                    : 'Uygulamada beklenmedik bir hata oluştu.'
                  }
                </p>

                {/* Error Details (Development) */}
                {process.env.NODE_ENV === 'development' && (
                  <details className="text-left">
                    <summary className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                      Hata Detayları (Geliştirici Modu)
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-800 rounded text-xs text-red-400 overflow-auto">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={this.handleReset}
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Tekrar Dene
                </Button>
                
                <Button
                  variant="secondary"
                  onClick={this.handleReportError}
                  className="flex-1"
                >
                  Hata Bildir
                </Button>
              </div>

              {/* Support Info */}
              <div className="pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">
                  Sorun devam ediyorsa: 
                  <a 
                    href="mailto:support@axiar.io" 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    support@axiar.io
                  </a>
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )
    }

    return this.props.children
  }
}

export default SecurityBoundary
