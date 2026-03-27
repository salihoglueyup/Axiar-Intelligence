import { useState, useEffect, useCallback } from 'react'

export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState)
  const [loadingMessage, setLoadingMessage] = useState('')

  const startLoading = useCallback((message = '') => {
    setIsLoading(true)
    setLoadingMessage(message)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
    setLoadingMessage('')
  }, [])

  const toggleLoading = useCallback(() => {
    setIsLoading(prev => !prev)
    if (!isLoading) {
      setLoadingMessage('')
    }
  }, [isLoading])

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    toggleLoading,
    setIsLoading
  }
}

export const useAsyncLoading = () => {
  const [operations, setOperations] = useState(new Map())

  const startOperation = useCallback((key, message = '') => {
    setOperations(prev => new Map(prev).set(key, { loading: true, message }))
  }, [])

  const stopOperation = useCallback((key) => {
    setOperations(prev => {
      const newMap = new Map(prev)
      newMap.delete(key)
      return newMap
    })
  }, [])

  const isOperationLoading = useCallback((key) => {
    return operations.get(key)?.loading || false
  }, [operations])

  const getOperationMessage = useCallback((key) => {
    return operations.get(key)?.message || ''
  }, [operations])

  const clearAllOperations = useCallback(() => {
    setOperations(new Map())
  }, [])

  return {
    startOperation,
    stopOperation,
    isOperationLoading,
    getOperationMessage,
    clearAllOperations,
    loadingCount: operations.size
  }
}
