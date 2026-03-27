import React from 'react'
import { Helmet } from 'react-helmet-async'

const MetaTags = ({ 
  title, 
  description, 
  keywords,
  image,
  url,
  type = 'website',
  noIndex = false,
  additionalMeta = []
}) => {
  const siteTitle = 'Axiar Intelligence Platform'
  const siteDescription = 'Yapay zeka destekli siber güvenlik ve sistem entegrasyon platformu. Modern teknolojilerle geleceği bugünden inşa edin.'
  const siteUrl = 'https://axiar.io'
  const siteImage = 'https://axiar.io/og-image.jpg'

  const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const finalDescription = description || siteDescription
  const finalImage = image || siteImage
  const finalUrl = url || siteUrl

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords || 'yapay zeka, siber güvenlik, sistem entegrasyonu, AI, cybersecurity, platform'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content="@axiar_io" />
      <meta name="twitter:creator" content="@axiar_io" />
      
      {/* Additional Meta Tags */}
      {additionalMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
      
      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? 'Article' : 'WebSite',
          "name": finalTitle,
          "description": finalDescription,
          "url": finalUrl,
          "image": finalImage,
          "publisher": {
            "@type": "Organization",
            "name": "Axiar Intelligence",
            "url": siteUrl,
            "logo": {
              "@type": "ImageObject",
              "url": `${siteUrl}/logo.png`
            }
          }
        })}
      </script>
    </Helmet>
  )
}

export default MetaTags
