import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const Input = ({ 
  type = 'text', 
  className, 
  error, 
  label, 
  required,
  icon: Icon,
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-2 bg-[var(--color-bg-card)]/50 border border-white/5 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-neon)] focus:ring-1 focus:ring-[var(--color-neon)]/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all duration-300'
  
  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : ''

  const classes = cn(baseClasses, errorClasses, className)

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
        )}
        <motion.input
          type={type}
          className={cn(classes, Icon && 'pl-10')}
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          {...props}
        />
      </div>
      {error && (
        <motion.p 
          className="text-sm text-red-500"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

export const Textarea = ({ 
  className, 
  error, 
  label, 
  required,
  rows = 4,
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-2 bg-[var(--color-bg-card)]/50 border border-white/5 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-neon)] focus:ring-1 focus:ring-[var(--color-neon)]/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all duration-300 resize-none'
  
  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
    : ''

  const classes = cn(baseClasses, errorClasses, className)

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <motion.textarea
        className={classes}
        rows={rows}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        {...props}
      />
      {error && (
        <motion.p 
          className="text-sm text-red-500"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default Input
