import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const Skeleton = ({ 
  className = '', 
  variant = 'default',
  lines = 1,
  height 
}) => {
  const baseClasses = 'relative overflow-hidden bg-white/5 rounded-lg'
  
  const variants = {
    default: baseClasses,
    text: `${baseClasses} h-4`,
    avatar: `${baseClasses} w-12 h-12 rounded-full`,
    button: `${baseClasses} h-10`,
    card: baseClasses,
    line: `${baseClasses} h-2`
  }

  // Shimmer animation
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { 
      x: '100%',
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear"
      }
    }
  }

  const renderSkeleton = () => {
    const commonClasses = cn(className, variants[variant])
    
    const Shimmer = () => (
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    )

    switch (variant) {
      case 'lines':
        return (
          <div className={cn('space-y-3', className)}>
            {Array.from({ length: lines }).map((_, index) => (
              <div key={index} className={cn(variants.line, 'relative overflow-hidden')}>
                <Shimmer />
              </div>
            ))}
          </div>
        )
      
      default:
        const currentVariantClass = variant === 'card' 
          ? cn(variants.card, height || 'h-32')
          : variant === 'avatar' ? variants.avatar
          : variants[variant] || variants.default

        return (
          <div className={cn(currentVariantClass, 'relative overflow-hidden', className)}>
            <Shimmer />
          </div>
        )
    }
  }

  return renderSkeleton()
}

export default Skeleton
