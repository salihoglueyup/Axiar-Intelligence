import React, { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

const LazyComponent = ({ 
  componentPath, 
  fallback = <LoadingSpinner size="lg" />,
  ...props 
}) => {
  const LazyComponent = lazy(componentPath)

  const fallbackVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <motion.div
      variants={fallbackVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
    >
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    </motion.div>
  )
}

export default LazyComponent

// Predefined lazy components for common usage
export const LazyProjects = (props) => (
  <LazyComponent 
    componentPath={() => import('@/pages/portal/Projects')}
    {...props}
  />
)

export const LazyReports = (props) => (
  <LazyComponent 
    componentPath={() => import('@/pages/portal/Reports')}
    {...props}
  />
)

export const LazyInvoices = (props) => (
  <LazyComponent 
    componentPath={() => import('@/pages/portal/Invoices')}
    {...props}
  />
)

export const LazySettings = (props) => (
  <LazyComponent 
    componentPath={() => import('@/pages/portal/Settings')}
    {...props}
  />
)
