import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const buttonVariants = {
  primary: 'bg-gradient-to-r from-[var(--color-neon)] to-[var(--color-neon-purple)] text-gray-900 font-bold hover:brightness-110 shadow-[0_0_15px_rgba(0,240,255,0.3)]',
  secondary: 'border border-[var(--color-neon)] text-[var(--color-neon)] hover:bg-[var(--color-neon)]/10',
  ghost: 'text-[var(--color-neon)] hover:bg-[var(--color-neon)]/5',
  danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:brightness-110 shadow-[0_0_15px_rgba(239,68,68,0.3)]',
  icon: 'p-2 text-[var(--color-neon)] hover:bg-[var(--color-neon)]/10'
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  disabled, 
  loading, 
  icon: Icon,
  iconPosition = 'left',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-ring rounded-lg disabled:opacity-50 disabled:cursor-not-allowed neon-glow'
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
    icon: 'p-2'
  }

  const classes = cn(
    baseClasses,
    buttonVariants[variant],
    sizeClasses[size],
    className
  )

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
      {loading && (
        <svg className="animate-spin w-4 h-4 ml-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
    </>
  )

  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {content}
    </motion.button>
  )
}

export default Button
