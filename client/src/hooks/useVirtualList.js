import { useState, useEffect, useRef, useMemo } from 'react'

export const useVirtualList = ({
  items,
  itemHeight = 50,
  containerHeight = 400,
  overscan = 5,
  getItemKey = (item, index) => index
}) => {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef(null)

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    )

    return { startIndex, endIndex }
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length])

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1).map((item, index) => ({
      item,
      index: visibleRange.startIndex + index,
      key: getItemKey(item, visibleRange.startIndex + index)
    }))
  }, [items, visibleRange, getItemKey])

  const totalHeight = items.length * itemHeight

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop)
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    containerRef,
    visibleItems,
    totalHeight,
    itemHeight,
    containerHeight
  }
}

export const useVirtualGrid = ({
  items,
  itemWidth = 200,
  itemHeight = 200,
  containerWidth = 800,
  containerHeight = 600,
  gap = 16,
  overscan = 2,
  getItemKey = (item, index) => index
}) => {
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef(null)

  const columns = useMemo(() => {
    return Math.floor((containerWidth + gap) / (itemWidth + gap))
  }, [containerWidth, itemWidth, gap])

  const visibleRange = useMemo(() => {
    const startRow = Math.max(0, Math.floor(scrollTop / (itemHeight + gap)) - overscan)
    const endRow = Math.min(
      Math.ceil(items.length / columns) - 1,
      Math.ceil((scrollTop + containerHeight) / (itemHeight + gap)) + overscan
    )

    const startIndex = startRow * columns
    const endIndex = Math.min(items.length - 1, (endRow + 1) * columns - 1)

    return { startIndex, endIndex }
  }, [scrollTop, itemHeight, gap, containerHeight, columns, items.length, overscan])

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1).map((item, index) => {
      const itemIndex = visibleRange.startIndex + index
      const row = Math.floor(itemIndex / columns)
      const col = itemIndex % columns

      return {
        item,
        index: itemIndex,
        key: getItemKey(item, itemIndex),
        row,
        col,
        style: {
          position: 'absolute',
          left: col * (itemWidth + gap),
          top: row * (itemHeight + gap),
          width: itemWidth,
          height: itemHeight
        }
      }
    })
  }, [items, visibleRange, getItemKey, columns, itemWidth, itemHeight, gap])

  const totalRows = Math.ceil(items.length / columns)
  const totalHeight = totalRows * (itemHeight + gap) - gap

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop)
    setScrollLeft(e.target.scrollLeft)
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    containerRef,
    visibleItems,
    totalHeight,
    totalRows,
    columns,
    itemWidth,
    itemHeight,
    containerWidth,
    containerHeight
  }
}
