import React from 'react'
import Card from '@/components/ui/Card'

const CSSTestWidget = () => {
  const [isVisible, setIsVisible] = React.useState(true)
  const [count, setCount] = React.useState(0)

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card glass className="p-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            CSS Test Widget
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-500/20 rounded-lg text-white">
              <p className="text-sm font-medium">CSS Test</p>
              <p className="text-xs mt-2">
                Bu widget CSS class'larını test ediyor.
              </p>
            </div>
            <div className="p-4 bg-blue-500/20 rounded-lg text-white">
              <p className="text-sm font-medium">Görünürlük Test</p>
              <p className="text-xs mt-2">
                Sayfa: {isVisible ? 'Görünür' : 'Gizli'}
              </p>
              <p className="text-xs mt-2">
                Sayaç: {count}
              </p>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {isVisible ? 'Gizle' : 'Göster'}
              </button>
              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Sayaç Arttır ({count})
              </button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default CSSTestWidget
