import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, ChevronDown, ChevronUp, Calendar, User, Tag, FileText } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useDebounce } from '@/hooks/useDebounce'

const AdvancedSearch = ({ 
  onSearch, 
  onFilterChange, 
  filters = [],
  placeholder = "Ara...",
  className = '',
  showAdvancedOptions = true,
  enableHistory = true,
  enableSuggestions = true,
  enableFacets = true
}) => {
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState({})
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [searchHistory, setSearchHistory] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [facets, setFacets] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const debouncedQuery = useDebounce(query, 300)

  // Load search history from localStorage
  useEffect(() => {
    if (enableHistory) {
      const history = localStorage.getItem('searchHistory')
      if (history) {
        setSearchHistory(JSON.parse(history))
      }
    }
  }, [enableHistory])

  // Save search history
  const saveToHistory = useCallback((searchQuery) => {
    if (!enableHistory || !searchQuery.trim()) return

    const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10)
    setSearchHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))
  }, [searchHistory, enableHistory])

  // Fetch suggestions
  const fetchSuggestions = useCallback(async (searchQuery) => {
    if (!enableSuggestions || searchQuery.length < 2) {
      setSuggestions([])
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setSuggestions(data.suggestions || [])
    } catch (error) {
      console.error('Failed to fetch suggestions:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, [enableSuggestions])

  // Fetch facets
  const fetchFacets = useCallback(async () => {
    if (!enableFacets) return

    try {
      const response = await fetch('/api/search/facets')
      const data = await response.json()
      setFacets(data.facets || {})
    } catch (error) {
      console.error('Failed to fetch facets:', error)
      setFacets({})
    }
  }, [enableFacets])

  // Handle search
  const handleSearch = useCallback((searchQuery, searchFilters = activeFilters) => {
    if (!searchQuery.trim() && Object.keys(searchFilters).length === 0) return

    saveToHistory(searchQuery)
    setShowSuggestions(false)
    
    onSearch?.({
      query: searchQuery,
      filters: searchFilters,
      timestamp: new Date()
    })
  }, [activeFilters, onSearch, saveToHistory])

  // Handle filter change
  const handleFilterChange = useCallback((filterKey, filterValue) => {
    const newFilters = {
      ...activeFilters,
      [filterKey]: filterValue
    }
    
    setActiveFilters(newFilters)
    onFilterChange?.(newFilters)
  }, [activeFilters, onFilterChange])

  // Clear filter
  const clearFilter = useCallback((filterKey) => {
    const newFilters = { ...activeFilters }
    delete newFilters[filterKey]
    
    setActiveFilters(newFilters)
    onFilterChange?.(newFilters)
  }, [activeFilters, onFilterChange])

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setActiveFilters({})
    onFilterChange?.({})
  }, [onFilterChange])

  // Handle debounced search
  useEffect(() => {
    if (debouncedQuery) {
      fetchSuggestions(debouncedQuery)
      handleSearch(debouncedQuery)
    }
  }, [debouncedQuery, handleSearch, fetchSuggestions])

  // Load facets on mount
  useEffect(() => {
    fetchFacets()
  }, [fetchFacets])

  // Render filter input
  const renderFilterInput = (filter) => {
    const value = activeFilters[filter.key] || ''
    
    switch (filter.type) {
      case 'text':
        return (
          <Input
            placeholder={filter.placeholder}
            value={value}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            icon={filter.icon}
            className="text-sm"
          />
        )
        
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          >
            <option value="">{filter.placeholder}</option>
            {filter.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
        
      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            icon={<Calendar className="w-4 h-4" />}
            className="text-sm"
          />
        )
        
      case 'multiselect':
        return (
          <div className="space-y-2">
            {filter.options.map(option => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={(e) => {
                    const currentValue = Array.isArray(value) ? value : []
                    const newValue = e.target.checked
                      ? [...currentValue, option.value]
                      : currentValue.filter(v => v !== option.value)
                    handleFilterChange(filter.key, newValue)
                  }}
                  className="rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-300">{option.label}</span>
              </label>
            ))}
          </div>
        )
        
      default:
        return null
    }
  }

  // Render active filter tags
  const renderActiveFilters = () => {
    const activeFilterKeys = Object.keys(activeFilters)
    if (activeFilterKeys.length === 0) return null

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {activeFilterKeys.map(key => {
          const filter = filters.find(f => f.key === key)
          const value = activeFilters[key]
          
          if (!filter) return null
          
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm"
            >
              <span className="truncate max-w-32">
                {filter.label}: {Array.isArray(value) ? value.join(', ') : value}
              </span>
              <button
                onClick={() => clearFilter(key)}
                className="hover:text-cyan-300 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )
        })}
        
        {activeFilterKeys.length > 1 && (
          <Button
            variant="secondary"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Hepsini Temizle
          </Button>
        )}
      </div>
    )
  }

  // Render search suggestions
  const renderSuggestions = () => {
    if (!showSuggestions || suggestions.length === 0) return null

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(suggestion)
                handleSearch(suggestion)
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center space-x-3">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-white">{suggestion}</span>
              </div>
            </button>
          ))}
        </motion.div>
      </AnimatePresence>
    )
  }

  // Render search history
  const renderHistory = () => {
    if (!enableHistory || searchHistory.length === 0) return null

    return (
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Arama Geçmişi</h4>
        <div className="space-y-1">
          {searchHistory.slice(0, 5).map((historyItem, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(historyItem)
                handleSearch(historyItem)
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-3 h-3" />
                <span className="truncate">{historyItem}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Render facets
  const renderFacets = () => {
    if (!enableFacets || Object.keys(facets).length === 0) return null

    return (
      <div className="mt-4 space-y-4">
        {Object.entries(facets).map(([facetKey, facetData]) => (
          <div key={facetKey}>
            <h4 className="text-sm font-medium text-gray-400 mb-2">{facetData.label}</h4>
            <div className="space-y-1">
              {facetData.values.map((value, index) => (
                <button
                  key={index}
                  onClick={() => handleFilterChange(facetKey, value.key)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{value.label}</span>
                  <span className="text-xs text-gray-500">({value.count})</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card glass className={`p-6 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          icon={<Search className="w-5 h-5" />}
          className="pr-12"
        />
        
        {/* Search Button */}
        <Button
          onClick={() => handleSearch(query)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          size="sm"
        >
          Ara
        </Button>
        
        {/* Suggestions Dropdown */}
        {renderSuggestions()}
      </div>

      {/* Active Filters */}
      {renderActiveFilters()}

      {/* Advanced Filters Toggle */}
      {showAdvancedOptions && (
        <div className="mt-4">
          <Button
            variant="secondary"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-between"
          >
            <span className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Gelişmiş Filtreler</span>
            </span>
            {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      )}

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4 overflow-hidden"
          >
            {filters.map(filter => (
              <div key={filter.key} className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  {filter.label}
                </label>
                {renderFilterInput(filter)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* History and Facets */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderHistory()}
        {renderFacets()}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-2">
          <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </Card>
  )
}

export default AdvancedSearch
