import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const Card = ({ 
  children, 
  className, 
  glass = false, 
  neon = false, 
  hover = true,
  animate = true,
  ...props 
}) => {
  const baseClasses = 'rounded-xl p-6 transition-all duration-300 relative overflow-hidden'
  
  const variantClasses = glass 
    ? 'glass border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md' 
    : 'bg-[var(--color-bg-card)]/50 border border-white/5'
  
  const neonClasses = neon 
    ? 'border-[var(--color-neon)]/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
    : ''
  
  const hoverClasses = hover 
    ? 'hover:scale-[1.01] hover:border-[var(--color-neon)]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]' 
    : ''

  const classes = cn(
    baseClasses,
    variantClasses,
    neonClasses,
    hoverClasses,
    className
  )

  const MotionDiv = animate ? motion.div : 'div'
  const motionProps = animate ? {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4 },
    whileHover: hover ? { y: -2 } : {}
  } : {}

  return (
    <MotionDiv
      className={classes}
      {...motionProps}
      {...props}
    >
      {/* Decorative inner glow for neon cards */}
      {neon && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-neon)] to-transparent opacity-30" />}
      {children}
    </MotionDiv>
  )
}

export const CardHeader = ({ children, className, ...props }) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
)

export const CardTitle = ({ children, className, ...props }) => (
  <h3 className={cn('text-xl font-semibold text-white mb-2', className)} {...props}>
    {children}
  </h3>
)

export const CardDescription = ({ children, className, ...props }) => (
  <p className={cn('text-gray-400 text-sm', className)} {...props}>
    {children}
  </p>
)

export const CardContent = ({ children, className, ...props }) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
)

export const CardFooter = ({ children, className, ...props }) => (
  <div className={cn('mt-4 pt-4 border-t border-gray-800', className)} {...props}>
    {children}
  </div>
)

export default Card
