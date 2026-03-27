import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSEO } from './SEOProvider'
import MetaTags from './MetaTags'
import StructuredData from './StructuredData'

const PageSEO = ({ 
  title, 
  description, 
  keywords,
  image,
  type = 'website',
  noIndex = false,
  structuredDataType,
  structuredDataProps
}) => {
  const location = useLocation()
  const { generatePageSEO } = useSEO()

  const pageSEO = generatePageSEO({
    title,
    description,
    keywords,
    image,
    type,
    noIndex,
    path: location.pathname
  })

  // Generate breadcrumb data
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const breadcrumbs = [
      { name: 'Ana Sayfa', url: '/' }
    ]

    let currentPath = ''
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`
      const segmentName = segment.charAt(0).toUpperCase() + segment.slice(1)
      breadcrumbs.push({ name: segmentName, url: currentPath })
    })

    return breadcrumbs
  }

  return (
    <>
      <MetaTags {...pageSEO} />
      
      {/* Organization Structured Data */}
      <StructuredData 
        type="organization" 
        data={{
          name: "Axiar Intelligence",
          description: "Yapay zeka destekli siber güvenlik ve sistem entegrasyon platformu"
        }}
      />

      {/* Website Structured Data */}
      <StructuredData 
        type="website" 
        data={{
          name: title,
          description
        }}
      />

      {/* Page-specific Structured Data */}
      {structuredDataType && (
        <StructuredData 
          type={structuredDataType}
          data={structuredDataProps}
        />
      )}

      {/* Breadcrumb Structured Data */}
      {location.pathname !== '/' && (
        <StructuredData 
          type="breadcrumb"
          data={{
            items: generateBreadcrumbs()
          }}
        />
      )}
    </>
  )
}

export default PageSEO
