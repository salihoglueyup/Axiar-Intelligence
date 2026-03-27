import { useState, useEffect } from 'react'
import { supabase } from '@/services/supabase'

export const useSupabaseQuery = (queryFn, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const result = await queryFn()
        
        if (isMounted) {
          setData(result)
        }
      } catch (err) {
        if (isMounted) {
          setError(err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, dependencies)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await queryFn()
      setData(result)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

// Real-time subscription hook
export const useSupabaseRealtime = (table, filter = '*', callback) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fetch
    const fetchInitialData = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from(table)
          .select(filter)

        if (error) throw error
        setData(data)
      } catch (error) {
        console.error('Initial fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()

    // Set up real-time subscription
    const subscription = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        (payload) => {
          if (callback) {
            callback(payload)
          } else {
            // Default behavior: update data based on event type
            setData(currentData => {
              switch (payload.eventType) {
                case 'INSERT':
                  return [...(currentData || []), payload.new]
                case 'UPDATE':
                  return (currentData || []).map(item => 
                    item.id === payload.new.id ? payload.new : item
                  )
                case 'DELETE':
                  return (currentData || []).filter(item => 
                    item.id !== payload.old.id
                  )
                default:
                  return currentData
              }
            })
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [table, filter, callback])

  return { data, loading }
}
