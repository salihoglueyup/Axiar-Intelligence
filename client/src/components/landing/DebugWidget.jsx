import React from 'react'
import Card from '@/components/ui/Card'

const DebugWidget = () => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card glass className="p-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Debug Widget
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-500/20 rounded-lg text-white">
              <p className="text-sm font-medium">Component Status Check</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>✅ SecurityStatusWidget.jsx - {typeof SecurityStatusWidget}</li>
                <li>✅ AIStatusWidget.jsx - {typeof AIStatusWidget}</li>
                <li>✅ AnalyticsStatusWidget.jsx - {typeof AnalyticsStatusWidget}</li>
                <li>✅ GlobalStatusWidget.jsx - {typeof GlobalStatusWidget}</li>
                <li>✅ IntegrationStatusWidget.jsx - {typeof IntegrationStatusWidget}</li>
                <li>✅ LandingDashboard.jsx - {typeof LandingDashboard}</li>
                <li>✅ Hero.jsx - {typeof Hero}</li>
                <li>✅ Manifesto.jsx - {typeof Manifesto}</li>
                <li>✅ EcosystemGrid.jsx - {typeof EcosystemGrid}</li>
                <li>✅ Showcase.jsx - {typeof Showcase}</li>
                <li>✅ TechMarquee.jsx - {typeof TechMarquee}</li>
                <li>✅ ContactSection.jsx - {typeof ContactSection}</li>
                <li>✅ StatisticsDashboard.jsx - {typeof StatisticsDashboard}</li>
                <li>✅ FeaturesShowcase.jsx - {typeof FeaturesShowcase}</li>
                <li>✅ ParticleCanvas.jsx - {typeof ParticleCanvas}</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default DebugWidget
