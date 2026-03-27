import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Hero from '@/components/landing/Hero'
import StatisticsDashboard from '@/components/landing/StatisticsDashboard'
import FeaturesShowcase from '@/components/landing/FeaturesShowcase'
import SecurityStatusWidget from '@/components/landing/SecurityStatusWidget'
import AIStatusWidget from '@/components/landing/AIStatusWidget'
import AnalyticsStatusWidget from '@/components/landing/AnalyticsStatusWidget'
import GlobalStatusWidget from '@/components/landing/GlobalStatusWidget'
import IntegrationStatusWidget from '@/components/landing/IntegrationStatusWidget'
import Pricing from '@/components/landing/Pricing'
import FAQ from '@/components/landing/FAQ'
import Manifesto from '@/components/landing/Manifesto'
import EcosystemGrid from '@/components/landing/EcosystemGrid'
import Showcase from '@/components/landing/Showcase'
import TechMarquee from '@/components/landing/TechMarquee'
import ContactSection from '@/components/landing/ContactSection'

const Home = () => {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Çapa linkini bulmak için # işaretini kaldırıyoruz
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      
      if (element) {
        // Bileşenlerin render olması için küçük bir gecikme veriyoruz
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }, 100)
      }
    }
  }, [hash])

  return (
    <div className="min-h-screen bg-gray-900 text-white scroll-smooth">
      <Helmet>
        <title>Axiar Intelligence | AI Güvenlik ve Analiz Platformu</title>
        <meta name="description" content="Yapay zeka destekli siber güvenlik, gerçek zamanlı analiz ve kurumsal çözümlerle işletmenizi geleceğe taşıyın." />
        <meta property="og:title" content="Axiar Intelligence Platform" />
        <meta property="og:description" content="Modern AI altyapısıyla verinizi koruyun ve sisteminizi optimize edin." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />
      <StatisticsDashboard />
      <FeaturesShowcase />
      
      {/* Platform Status Widgets */}
      <SecurityStatusWidget />
      <AIStatusWidget />
      <AnalyticsStatusWidget />
      <GlobalStatusWidget />
      <IntegrationStatusWidget />
      
      <Pricing />
      <FAQ />
      
      <Manifesto />
      <EcosystemGrid />
      <Showcase />
      <TechMarquee />
      <ContactSection />
    </div>
  )
}

export default Home
