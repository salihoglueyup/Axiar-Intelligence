import React from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertTriangle } from 'lucide-react'
import Card from '@/components/ui/Card'

const RateLimitIndicator = ({ 
  isBlocked, 
  requestCount, 
  maxRequests, 
  windowMs, 
  resetTime,
  onReset 
}) => {
  const formatTime = (ms) => {
    const seconds = Math.ceil(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    
    if (minutes > 0) {
      return `${minutes}d ${remainingSeconds}s`
    }
    return `${seconds}s`
  }

  const getProgress = () => {
    return (requestCount / maxRequests) * 100
  }

  const getStatusColor = () => {
    const progress = getProgress()
    if (isBlocked) return 'text-red-400'
    if (progress > 80) return 'text-yellow-400'
    if (progress > 60) return 'text-orange-400'
    return 'text-green-400'
  }

  const getStatusIcon = () => {
    if (isBlocked) return <AlertTriangle className="w-4 h-4" />
    return <Clock className="w-4 h-4" />
  }

  if (!isBlocked && requestCount === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 right-4 z-50"
    >
      <Card glass className="w-80 shadow-2xl">
        <div className="flex items-center space-x-3 p-4">
          {/* Icon */}
          <div className={`flex-shrink-0 ${getStatusColor()}`}>
            {getStatusIcon()}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-white">
                {isBlocked ? 'İstek Limiti Aşıldı' : 'İstek Limiti'}
              </h3>
              
              {/* Reset Button */}
              {isBlocked && onReset && (
                <button
                  onClick={onReset}
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Sıfırla
                </button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>{requestCount} / {maxRequests} istek</span>
                <span>{getProgress().toFixed(0)}%</span>
              </div>
              
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgress()}%` }}
                  transition={{ duration: 0.3 }}
                  className={`h-full ${
                    isBlocked ? 'bg-red-500' :
                    getProgress() > 80 ? 'bg-yellow-500' :
                    getProgress() > 60 ? 'bg-orange-500' :
                    'bg-green-500'
                  }`}
                />
              </div>
            </div>

            {/* Status Message */}
            <div className="text-xs space-y-1">
              {isBlocked ? (
                <div className="text-red-400">
                  <p>Çok fazla istek gönderdiniz.</p>
                  <p>
                    {resetTime 
                      ? `${formatTime(resetTime - Date.now())} sonra tekrar deneyin.`
                      : 'Lütfen bekleyin.'
                    }
                  </p>
                </div>
              ) : (
                <div className="text-gray-300">
                  <p>
                    {maxRequests - requestCount} istek hakkınız kaldı.
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTime(windowMs)} zaman aralığında
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default RateLimitIndicator
