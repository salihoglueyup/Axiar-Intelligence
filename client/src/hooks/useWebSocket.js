import { useState, useEffect, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'

export const useWebSocket = (url, options = {}) => {
  const {
    reconnectAttempts = 5,
    reconnectInterval = 3000,
    heartbeatInterval = 30000,
    onMessage = null,
    onError = null,
    onConnect = null,
    onDisconnect = null,
    autoConnect = true
  } = options

  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [reconnectCount, setReconnectCount] = useState(0)
  
  const reconnectTimeoutRef = useRef(null)
  const heartbeatIntervalRef = useRef(null)
  const messageQueueRef = useRef([])
  const reconnectCountRef = useRef(0)

  // Connect to WebSocket
  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url)
      
      ws.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        setConnectionStatus('connected')
        setReconnectCount(0)
        reconnectCountRef.current = 0
        
        // Send queued messages
        while (messageQueueRef.current.length > 0) {
          const message = messageQueueRef.current.shift()
          ws.send(JSON.stringify(message))
        }
        
        // Start heartbeat
        startHeartbeat(ws)
        
        onConnect?.(ws)
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          setLastMessage(data)
          onMessage?.(data, event)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason)
        setIsConnected(false)
        setConnectionStatus('disconnected')
        stopHeartbeat()
        onDisconnect?.(event)
        
        // Attempt reconnection if not closed intentionally
        if (event.code !== 1000 && reconnectCountRef.current < reconnectAttempts) {
          scheduleReconnect()
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setConnectionStatus('error')
        onError?.(error)
      }

      setSocket(ws)
      return ws
    } catch (error) {
      console.error('Failed to create WebSocket:', error)
      setConnectionStatus('error')
      return null
    }
  }, [url, reconnectAttempts, onMessage, onError, onConnect, onDisconnect])

  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    if (socket) {
      socket.close(1000, 'Client disconnect')
      setSocket(null)
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    stopHeartbeat()
  }, [socket])

  // Send message
  const send = useCallback((message) => {
    const messageData = typeof message === 'string' ? message : JSON.stringify(message)
    
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(messageData)
    } else {
      // Queue message for when connection is restored
      messageQueueRef.current.push(message)
      console.log('Message queued (WebSocket not connected):', message)
    }
  }, [socket])

  // Schedule reconnection
  const scheduleReconnect = useCallback(() => {
    if (reconnectCountRef.current < reconnectAttempts) {
      const delay = reconnectInterval * Math.pow(2, reconnectCountRef.current)
      setConnectionStatus('reconnecting')
      setReconnectCount(reconnectCountRef.current + 1)
      
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log(`Attempting to reconnect (${reconnectCountRef.current + 1}/${reconnectAttempts})`)
        connect()
      }, delay)
    } else {
      setConnectionStatus('failed')
      toast.error('Bağlantı kurulamadı. Lütfen sayfayı yenileyin.')
    }
  }, [reconnectAttempts, reconnectInterval, connect])

  // Start heartbeat
  const startHeartbeat = useCallback((ws) => {
    heartbeatIntervalRef.current = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }))
      }
    }, heartbeatInterval)
  }, [heartbeatInterval])

  // Stop heartbeat
  const stopHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current)
      heartbeatIntervalRef.current = null
    }
  }, [])

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect && url) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [autoConnect, url, connect, disconnect])

  return {
    socket,
    isConnected,
    lastMessage,
    connectionStatus,
    reconnectCount,
    send,
    connect,
    disconnect
  }
}

// Real-time notifications hook
export const useRealTimeNotifications = (userId) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  
  const wsUrl = `${process.env.REACT_APP_WS_URL}/notifications/${userId}`
  const { send, isConnected } = useWebSocket(wsUrl, {
    onMessage: (data) => {
      if (data.type === 'notification') {
        const notification = {
          id: data.id,
          title: data.title,
          message: data.message,
          type: data.type,
          timestamp: data.timestamp,
          read: false
        }
        
        setNotifications(prev => [notification, ...prev])
        setUnreadCount(prev => prev + 1)
        
        // Show toast notification
        toast.info(notification.title, {
          description: notification.message,
          onClick: () => markAsRead(notification.id)
        })
      } else if (data.type === 'notification_read') {
        setNotifications(prev => 
          prev.map(n => n.id === data.id ? { ...n, read: true } : n)
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    }
  })

  const markAsRead = useCallback((notificationId) => {
    if (isConnected) {
      send({
        type: 'mark_read',
        notificationId
      })
    }
  }, [isConnected, send])

  const markAllAsRead = useCallback(() => {
    if (isConnected) {
      send({
        type: 'mark_all_read'
      })
    }
  }, [isConnected, send])

  const clearNotifications = useCallback(() => {
    setNotifications([])
    setUnreadCount(0)
  }, [])

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    isConnected
  }
}

// Real-time collaboration hook
export const useRealTimeCollaboration = (projectId) => {
  const [collaborators, setCollaborators] = useState([])
  const [activeUsers, setActiveUsers] = useState([])
  const [cursorPositions, setCursorPositions] = useState({})
  
  const wsUrl = `${process.env.REACT_APP_WS_URL}/projects/${projectId}/collaborate`
  const { send, isConnected } = useWebSocket(wsUrl, {
    onMessage: (data) => {
      switch (data.type) {
        case 'user_joined':
          setActiveUsers(prev => [...prev, data.user])
          toast.info(`${data.user.name} projeye katıldı`)
          break
          
        case 'user_left':
          setActiveUsers(prev => prev.filter(u => u.id !== data.userId))
          toast.info(`${data.userName} projeden ayrıldı`)
          break
          
        case 'cursor_update':
          setCursorPositions(prev => ({
            ...prev,
            [data.userId]: {
              x: data.x,
              y: data.y,
              user: data.user
            }
          }))
          break
          
        case 'collaboration_update':
          setCollaborators(data.collaborators)
          break
      }
    }
  })

  const sendCursorPosition = useCallback((x, y) => {
    if (isConnected) {
      send({
        type: 'cursor_update',
        x,
        y
      })
    }
  }, [isConnected, send])

  const sendCollaborationUpdate = useCallback((update) => {
    if (isConnected) {
      send({
        type: 'collaboration_update',
        ...update
      })
    }
  }, [isConnected, send])

  return {
    collaborators,
    activeUsers,
    cursorPositions,
    sendCursorPosition,
    sendCollaborationUpdate,
    isConnected
  }
}

// Real-time data sync hook
export const useRealTimeSync = (resourceType, resourceId) => {
  const [data, setData] = useState(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(null)
  
  const wsUrl = `${process.env.REACT_APP_WS_URL}/sync/${resourceType}/${resourceId}`
  const { send, isConnected } = useWebSocket(wsUrl, {
    onMessage: (data) => {
      switch (data.type) {
        case 'sync_update':
          setData(data.payload)
          setLastSync(new Date())
          setIsSyncing(false)
          break
          
        case 'sync_request':
          // Server is requesting data sync
          setIsSyncing(true)
          break
          
        case 'sync_complete':
          setIsSyncing(false)
          setLastSync(new Date())
          break
      }
    }
  })

  const requestSync = useCallback(() => {
    if (isConnected) {
      setIsSyncing(true)
      send({
        type: 'sync_request'
      })
    }
  }, [isConnected, send])

  const updateData = useCallback((newData) => {
    setData(newData)
    if (isConnected) {
      send({
        type: 'data_update',
        payload: newData
      })
    }
  }, [isConnected, send])

  return {
    data,
    isSyncing,
    lastSync,
    requestSync,
    updateData,
    isConnected
  }
}
