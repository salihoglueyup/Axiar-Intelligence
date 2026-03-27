import React, { createContext, useContext } from 'react'
import MetaTags from './MetaTags'
import Analytics from './Analytics'
import StructuredData from './StructuredData'

const SEOContext = createContext()

export const useSEO = () => {
  const context = useContext(SEOContext)
  if (!context) {
    throw new Error('useSEO must be used within SEOProvider')
  }
  return context
}

const SEOProvider = ({ children }) => {
  const seoConfig = {
    siteName: 'Axiar Intelligence Platform',
    siteUrl: 'https://axiar.io',
    defaultImage: 'https://axiar.io/og-image.jpg',
    twitterHandle: '@axiar_io',
    gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || ''
  }

  const generatePageSEO = (pageConfig) => {
    return {
      title: pageConfig.title,
      description: pageConfig.description,
      keywords: pageConfig.keywords,
      image: pageConfig.image || seoConfig.defaultImage,
      url: `${seoConfig.siteUrl}${pageConfig.path || ''}`,
      type: pageConfig.type || 'website',
      noIndex: pageConfig.noIndex || false
    }
  }

  const value = {
    config: seoConfig,
    generatePageSEO
  }

  return (
    <SEOContext.Provider value={value}>
      <Analytics measurementId={seoConfig.gaMeasurementId} />
      {children}
    </SEOContext.Provider>
  )
}

export default SEOProvider
