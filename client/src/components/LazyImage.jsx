import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Image as ImageIcon } from 'lucide-react'
import Skeleton from '@/components/ui/Skeleton'

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/placeholder.jpg',
  loading = 'lazy',
  sizes,
  srcSet,
  quality = 75,
  format = 'webp',
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Generate optimized image URL
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return placeholder
    
    // For demo purposes, return original src
    // In production, this would use an image optimization service
    return originalSrc
  }

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!srcSet) return undefined
    
    return srcSet.map(({ src, width }) => ({
      src: getOptimizedSrc(src),
      width
    }))
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-800 rounded-lg ${className}`}>
        <ImageIcon className="w-8 h-8 text-gray-600" />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0">
          <Skeleton variant="default" className="w-full h-full" />
        </div>
      )}
      
      {/* Actual Image */}
      <motion.div
        ref={imgRef}
        variants={imageVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="w-full h-full"
      >
        {isInView && (
          <img
            src={getOptimizedSrc(src)}
            srcSet={generateSrcSet()}
            sizes={sizes}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            {...props}
          />
        )}
      </motion.div>

      {/* Loading indicator */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}

export default LazyImage
