import { useState, useCallback, useRef } from 'react'

export const useHover = () => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return {
    ref,
    isHovered,
    hoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }
  }
}

export const useHoverScale = (scale = 1.05) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return {
    ref,
    isHovered,
    hoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      style: {
        transform: isHovered ? `scale(${scale})` : 'scale(1)',
        transition: 'transform 0.2s ease-out'
      }
    }
  }
}
