import React from 'react'

const StructuredData = ({ type, data }) => {
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      ...data
    }

    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Axiar Intelligence",
          "url": "https://axiar.io",
          "logo": "https://axiar.io/logo.png",
          "description": "Yapay zeka destekli siber güvenlik ve sistem entegrasyon platformu",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "TR",
            "addressLocality": "İstanbul"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+90-212-555-0123",
            "contactType": "customer service",
            "email": "info@axiar.io"
          },
          "sameAs": [
            "https://twitter.com/axiar_io",
            "https://linkedin.com/company/axiar-intelligence"
          ]
        }

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Axiar Intelligence Platform",
          "url": "https://axiar.io",
          "description": "Yapay zeka destekli siber güvenlik ve sistem entegrasyon platformu",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://axiar.io/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name,
          "description": data.description,
          "provider": {
            "@type": "Organization",
            "name": "Axiar Intelligence",
            "url": "https://axiar.io"
          },
          "serviceType": data.serviceType,
          "areaServed": "TR",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Hizmetler",
            "itemListElement": data.offers?.map(offer => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": offer.name,
                "description": offer.description
              }
            }))
          }
        }

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image,
          "datePublished": data.datePublished,
          "dateModified": data.dateModified,
          "author": {
            "@type": "Organization",
            "name": "Axiar Intelligence"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Axiar Intelligence",
            "logo": {
              "@type": "ImageObject",
              "url": "https://axiar.io/logo.png"
            }
          }
        }

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items?.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        }

      default:
        return baseData
    }
  }

  const structuredData = generateStructuredData()

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData, null, 2)}
    </script>
  )
}

export default StructuredData
