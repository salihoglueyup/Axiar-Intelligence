import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Check, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useRealTimeNotifications } from '@/hooks/useWebSocket'

const LiveNotifications = ({ 
  userId, 
  maxVisible = 5, 
  autoHide = 5000,
  position = 'top-right',
  showSound = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,

    isConnected
  } = useRealTimeNotifications(userId)

  // Auto-hide notifications
  useEffect(() => {
    if (autoHide > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, autoHide)
      
      return () => clearTimeout(timer)
    }
  }, [autoHide])

  // Play notification sound
  useEffect(() => {
    if (showSound && notifications.length > 0 && unreadCount > 0) {
      const audio = new Audio('/notification-sound.mp3')
      audio.volume = 0.3
      audio.play().catch(() => {
        // Ignore autoplay errors
      })
    }
  }, [notifications.length, unreadCount, showSound])

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'info':
      default:
        return <Info className="w-5 h-5 text-cyan-400" />
    }
  }

  // Get notification color
  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/30'
      case 'error':
        return 'bg-red-500/20 border-red-500/30'
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/30'
      case 'info':
      default:
        return 'bg-cyan-500/20 border-cyan-500/30'
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'Az önce'
    if (diffMins < 60) return `${diffMins} dakika önce`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} saat önce`
    return `${Math.floor(diffMins / 1440)} gün önce`
  }

  // Handle notification click
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id)
    // Handle navigation to related content
    if (notification.url) {
      window.location.href = notification.url
    }
  }

  // Position classes
  const positionClasses = {
    'top-right': 'fixed top-4 right-4',
    'top-left': 'fixed top-4 left-4',
    'bottom-right': 'fixed bottom-4 right-4',
    'bottom-left': 'fixed bottom-4 left-4'
  }

  const visibleNotifications = notifications.slice(0, maxVisible)

  return (
    <>
      {/* Notification Bell */}
      <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVisible(!isVisible)}
          className={`relative p-3 rounded-lg ${
            isConnected ? 'bg-cyan-500/20 border border-cyan-500/30' : 'bg-gray-800/50 border border-gray-700'
          } transition-all`}
        >
          <Bell className={`w-5 h-5 ${isConnected ? 'text-cyan-400' : 'text-gray-400'}`} />
          
          {/* Unread count badge */}
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.div>
          )}
        </motion.button>

        {/* Notifications Panel */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute mt-2 w-80 max-h-96 overflow-hidden"
            >
              <Card glass className="shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-semibold text-white">Bildirimler</h3>
                    {unreadCount > 0 && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={markAllAsRead}
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsVisible(false)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-64 overflow-y-auto">
                  {visibleNotifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">Bildirim bulunmuyor</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {visibleNotifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-3 border-b border-gray-700 cursor-pointer transition-all ${
                            !notification.read ? getNotificationColor(notification.type) : 'hover:bg-gray-800/50'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-sm font-medium text-white truncate">
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                                )}
                              </div>
                              
                              <p className="text-xs text-gray-400 line-clamp-2">
                                {notification.message}
                              </p>
                              
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTimestamp(notification.timestamp)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > maxVisible && (
                  <div className="p-3 border-t border-gray-700">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setExpanded(!expanded)}
                      className="w-full"
                    >
                      {expanded ? 'Daha Az Göster' : `Tümünü Gör (${notifications.length})`}
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-40">
        <AnimatePresence>
          {notifications.slice(0, 3).map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`p-4 rounded-lg shadow-lg max-w-sm ${getNotificationColor(notification.type)}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-xs text-gray-300">
                    {notification.message}
                  </p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    markAsRead(notification.id)
                  }}
                  className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

// Notification Settings Component
export const NotificationSettings = ({ 
  settings, 
  onSettingsChange,
  className = ''
}) => {
  const [localSettings, setLocalSettings] = useState(settings || {
    push: true,
    email: false,
    sound: true,
    desktop: true,
    types: {
      success: true,
      error: true,
      warning: true,
      info: true
    }
  })

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value }
    setLocalSettings(newSettings)
    onSettingsChange?.(newSettings)
  }

  const handleTypeChange = (type, enabled) => {
    const newSettings = {
      ...localSettings,
      types: {
        ...localSettings.types,
        [type]: enabled
      }
    }
    setLocalSettings(newSettings)
    onSettingsChange?.(newSettings)
  }

  return (
    <Card glass className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Bildirim Ayarları</h3>
      
      <div className="space-y-4">
        {/* General Settings */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Genel Ayarlar</h4>
          
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Push Bildirimleri</span>
            <input
              type="checkbox"
              checked={localSettings.push}
              onChange={(e) => handleSettingChange('push', e.target.checked)}
              className="rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
            />
          </label>
          
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-400">E-posta Bildirimleri</span>
            <input
              type="checkbox"
              checked={localSettings.email}
              onChange={(e) => handleSettingChange('email', e.target.checked)}
              className="rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
            />
          </label>
          
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Sesli Bildirimler</span>
            <input
              type="checkbox"
              checked={localSettings.sound}
              onChange={(e) => handleSettingChange('sound', e.target.checked)}
              className="rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
            />
          </label>
          
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Masaüstü Bildirimleri</span>
            <input
              type="checkbox"
              checked={localSettings.desktop}
              onChange={(e) => handleSettingChange('desktop', e.target.checked)}
              className="rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
            />
          </label>
        </div>

        {/* Notification Types */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Bildirim Türleri</h4>
          
          {Object.entries(localSettings.types).map(([type, enabled]) => (
            <label key={type} className="flex items-center justify-between">
              <span className="text-sm text-gray-400 capitalize">{type}</span>
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => handleTypeChange(type, e.target.checked)}
                className="rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
              />
            </label>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default LiveNotifications
