import React from 'react'
import { useVirtualList } from '@/hooks/useVirtualList'

const VirtualList = ({
  items,
  itemHeight = 50,
  containerHeight = 400,
  overscan = 5,
  renderItem,
  getItemKey,
  className = '',
  ...props
}) => {
  const {
    containerRef,
    visibleItems,
    totalHeight,
    itemHeight: calculatedItemHeight
  } = useVirtualList({
    items,
    itemHeight,
    containerHeight,
    overscan,
    getItemKey
  })

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      {...props}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index, key }) => (
          <div
            key={key}
            style={{
              position: 'absolute',
              top: index * calculatedItemHeight,
              left: 0,
              right: 0,
              height: calculatedItemHeight
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VirtualList
