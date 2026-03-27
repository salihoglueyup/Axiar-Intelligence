import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react'

const Toast = ({ 
  toast, 
  position = 'top-right',
  autoClose = 5000,
  onClose 
}) => {
  const [isVisible, setIsVisible] = React.useState(true)

  useEffect(() => {
    if (autoClose > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, autoClose)

      return () => clearTimeout(timer)
    }
  }, [autoClose, onClose])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      default:
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getTypeStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/30 text-green-400'
      case 'error':
        return 'bg-red-500/20 border-red-500/30 text-red-400'
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
      default:
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400'
    }
  }

  const getPositionClasses = () => {
    const positions = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    }
    return positions[position] || positions['top-right']
  }

  const toastVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: -50
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 400 
          }}
          className={`fixed z-50 ${getPositionClasses()}`}
        >
          <div className={`glass border ${getTypeStyles()} rounded-lg p-4 min-w-80 max-w-md shadow-2xl`}>
            <div className="flex items-start space-x-3">
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {getIcon()}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white">
                    {toast.title}
                  </h4>
                  
                  {/* Close Button */}
                  <button
                    onClick={handleClose}
                    className="flex-shrink-0 ml-4 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {toast.description && (
                  <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                    {toast.description}
                  </p>
                )}
              </div>
            </div>

            {/* Progress Bar (if applicable) */}
            {toast.progress !== undefined && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>İlerleme</span>
                  <span>{Math.round(toast.progress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${toast.progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Toast Container Component
export const ToastContainer = ({ children }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="pointer-events-auto">
        {children}
      </div>
    </div>
  )
}

export default Toast
