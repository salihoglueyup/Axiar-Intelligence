import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // Log error to monitoring service
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      })
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
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
                className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto"
              >
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </motion.div>

              {/* Error Message */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">
                  Bir şeyler yanlış gitti
                </h2>
                
                <p className="text-gray-300 leading-relaxed">
                  Uygulamada beklenmedik bir hata oluştu. 
                  Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
                </p>

                {/* Error Details (Development Only) */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left">
                    <summary className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                      Hata detayları (geliştirici modu)
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-800 rounded text-xs text-red-400 overflow-auto">
                      {this.state.error.toString()}
                    </pre>
                  </details>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sayfayı Yenile
                </Button>
                
                <Button
                  variant="secondary"
                  onClick={this.handleReset}
                  className="flex-1"
                >
                  Tekrar Dene
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

export default ErrorBoundary
