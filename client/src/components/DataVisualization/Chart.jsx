import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, LineChart, PieChart, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import Card from '@/components/ui/Card'

// Chart component using Chart.js
const Chart = ({ 
  type = 'bar',
  data,
  options = {},
  width,
  height = 400,
  className = '',
  showLegend = true,
  showTooltip = true,
  responsive = true,
  maintainAspectRatio = true,
  onClick,
  onHover,
  customColors = ['#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
}) => {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)
  const [isChartReady, setIsChartReady] = useState(false)
  const [chartInstance, setChartInstance] = useState(null)

  // Default chart options
  const defaultOptions = {
    responsive,
    maintainAspectRatio,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top',
        labels: {
          color: '#d1d5db',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        enabled: showTooltip,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || ''
            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString()
            }
            return label
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(55, 65, 81, 0.5)',
          borderColor: '#374151'
        },
        ticks: {
          color: '#9ca3af'
        }
      },
      y: {
        grid: {
          color: 'rgba(55, 65, 81, 0.5)',
          borderColor: '#374151'
        },
        ticks: {
          color: '#9ca3af'
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    onClick: onClick,
    onHover: onHover
  }

  // Merge custom colors
  const chartData = {
    ...data,
    datasets: data.datasets?.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || customColors[index % customColors.length],
      borderColor: dataset.borderColor || customColors[index % customColors.length],
      borderWidth: dataset.borderWidth || 1
    }))
  }

  // Initialize chart
  const initializeChart = useCallback(async () => {
    if (!canvasRef.current || !chartData) return

    try {
      // Dynamically import Chart.js
      const Chart = (await import('chart.js')).default
      
      // Destroy existing chart
      if (chartInstance) {
        chartInstance.destroy()
      }

      // Create new chart
      const ctx = canvasRef.current.getContext('2d')
      const newChart = new Chart(ctx, {
        type,
        data: chartData,
        options: { ...defaultOptions, ...options }
      })

      setChartInstance(newChart)
      setIsChartReady(true)
    } catch (error) {
      console.error('Failed to initialize chart:', error)
    }
  }, [type, chartData, options, defaultOptions, chartInstance])

  // Update chart when data changes
  useEffect(() => {
    if (chartInstance && chartData) {
      chartInstance.data = chartData
      chartInstance.update('active')
    }
  }, [chartData, chartInstance])

  // Initialize chart on mount
  useEffect(() => {
    initializeChart()

    return () => {
      if (chartInstance) {
        chartInstance.destroy()
      }
    }
  }, [initializeChart, chartInstance])

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (chartInstance) {
        chartInstance.resize()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [chartInstance])

  // Get chart icon based on type
  const getChartIcon = () => {
    switch (type) {
      case 'bar':
        return <BarChart3 className="w-5 h-5" />
      case 'line':
        return <LineChart className="w-5 h-5" />
      case 'pie':
        return <PieChart className="w-5 h-5" />
      case 'doughnut':
        return <PieChart className="w-5 h-5" />
      default:
        return <BarChart3 className="w-5 h-5" />
    }
  }

  return (
    <Card glass className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getChartIcon()}
          <h3 className="text-lg font-semibold text-white">
            {data?.title || 'Chart'}
          </h3>
        </div>
        
        {/* Chart Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => chartInstance?.resetZoom()}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Reset Zoom"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {!isChartReady && (
        <div className="flex items-center justify-center" style={{ height }}>
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Chart Canvas */}
      <div className={`relative ${isChartReady ? 'block' : 'hidden'}`}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="max-w-full"
        />
      </div>

      {/* Chart Stats */}
      {chartData?.datasets && chartData.datasets.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {chartData.datasets.map((dataset, index) => {
            const values = dataset.data.filter(v => typeof v === 'number')
            const total = values.reduce((sum, val) => sum + val, 0)
            const average = values.length > 0 ? total / values.length : 0
            const max = Math.max(...values)
            const min = Math.min(...values)

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white">
                  {total.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">
                  {dataset.label || 'Dataset'}
                </div>
                <div className="text-xs text-gray-500">
                  Avg: {average.toFixed(1)} | Max: {max}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </Card>
  )
}

// Stat Card component
export const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  color = 'cyan',
  trend = 'up',
  className = '',
  format = 'number',
  subtitle,
  onClick
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />
    return <Minus className="w-4 h-4" />
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-400'
    if (trend === 'down') return 'text-red-400'
    return 'text-gray-400'
  }

  const formatValue = (val) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('tr-TR', {
          style: 'currency',
          currency: 'TRY'
        }).format(val)
      case 'percentage':
        return `${val}%`
      case 'number':
      default:
        return val.toLocaleString()
    }
  }

  const colorClasses = {
    cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-gray-800/50 backdrop-blur-sm border ${colorClasses[color]} rounded-lg p-6 cursor-pointer transition-all ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {change > 0 ? '+' : ''}{change}%
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-bold text-white">
          {formatValue(value)}
        </div>
        <div className="text-sm text-gray-400">
          {title}
        </div>
        {subtitle && (
          <div className="text-xs text-gray-500">
            {subtitle}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Progress Chart component
export const ProgressChart = ({ 
  title, 
  value, 
  max = 100, 
  color = 'cyan',
  showPercentage = true,
  size = 'md',
  className = ''
}) => {
  const percentage = (value / max) * 100
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  }

  const colorClasses = {
    cyan: 'bg-cyan-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500'
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-300">{title}</span>
        {showPercentage && (
          <span className="text-sm text-gray-400">{percentage.toFixed(1)}%</span>
        )}
      </div>
      
      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${colorClasses[color]}`}
        />
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{value.toLocaleString()} / {max.toLocaleString()}</span>
        <span>{max - value.toLocaleString()} kaldı</span>
      </div>
    </div>
  )
}

export default Chart
