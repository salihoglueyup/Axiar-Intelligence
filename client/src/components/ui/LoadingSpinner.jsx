import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const LoadingSpinner = ({ 
  size = 'md', 
  text, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const spinnerVariants = {
    hidden: { rotate: 0 },
    visible: { 
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex flex-col items-center justify-center ${className}`}
    >
      <motion.div
        variants={spinnerVariants}
        initial="hidden"
        animate="visible"
      >
        <Loader2 className={`w-8 h-8 text-cyan-400 ${sizeClasses[size]}`} />
      </motion.div>
      
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 mt-4 text-sm"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )
}

export default LoadingSpinner
