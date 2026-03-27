import React from 'react'
import Card from '@/components/ui/Card'

const SimpleTestWidget = () => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card glass className="p-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Simple Test Widget
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-500/20 rounded-lg text-white">
              <p className="text-sm font-medium">Test Başarılı!</p>
              <p className="text-xs mt-2">
                Bu widget renderlanıyor. Ana sayfa çalışıyor.
              </p>
            </div>
            <div className="p-4 bg-blue-500/20 rounded-lg text-white">
              <p className="text-sm font-medium">Component Test</p>
              <p className="text-xs mt-2">
                Test component'i renderlanıyor.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default SimpleTestWidget
