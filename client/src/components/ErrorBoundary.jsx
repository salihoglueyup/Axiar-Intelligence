import React from 'react'
import { toast } from 'react-toastify'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('[Global Error Boundary]:', error, errorInfo)
    toast.error('Uygulama içinde bir hata oluştu. Sayfa yenileniyor...')
    
    // Optional: Auto-reload after a few seconds if it's a critical render error
    // setTimeout(() => window.location.reload(), 5000);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6 text-center">
          <div className="bg-red-500/10 border border-red-500/50 p-8 rounded-2xl max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Tüh! Bir Şeyler Ters Gitti</h2>
            <p className="text-slate-400 mb-6">
              Beklenmedik bir hata ile karşılaştık. Endişelenmeyin, verileriniz güvende.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
            >
              Uygulamayı Yeniden Başlat
            </button>
            <div className="mt-8 text-xs text-slate-600 font-mono text-left overflow-auto max-h-32">
              {this.state.error?.toString()}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
