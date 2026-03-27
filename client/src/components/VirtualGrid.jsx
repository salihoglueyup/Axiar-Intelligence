import React from 'react'
import { useVirtualGrid } from '@/hooks/useVirtualList'

const VirtualGrid = ({
  items,
  itemWidth = 200,
  itemHeight = 200,
  containerWidth = 800,
  containerHeight = 600,
  gap = 16,
  overscan = 2,
  renderItem,
  getItemKey,
  className = '',
  ...props
}) => {
  const {
    containerRef,
    visibleItems,
    totalHeight,
    columns,
    itemWidth: calculatedItemWidth,
    itemHeight: calculatedItemHeight
  } = useVirtualGrid({
    items,
    itemWidth,
    itemHeight,
    containerWidth,
    containerHeight,
    gap,
    overscan,
    getItemKey
  })

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ 
        width: containerWidth, 
        height: containerHeight 
      }}
      {...props}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index, key, style }) => (
          <div
            key={key}
            style={style}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VirtualGrid
