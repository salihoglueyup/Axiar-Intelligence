import React from 'react'

const SitemapGenerator = () => {
  const baseUrl = 'https://axiar.io'
  const currentDate = new Date().toISOString().split('T')[0]

  const pages = [
    {
      url: '/',
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: '/portal/login',
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/portal/dashboard',
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: '/portal/projects',
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      url: '/portal/reports',
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      url: '/portal/invoices',
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      url: '/portal/settings',
      changefreq: 'monthly',
      priority: '0.7'
    }
  ]

  const generateSitemap = () => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  }

  const generateRobotsTxt = () => {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Block common bot paths
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /node_modules/
Disallow: /.git/
Disallow: /.env
`
  }

  return {
    sitemap: generateSitemap(),
    robots: generateRobotsTxt(),
    pages
  }
}

export default SitemapGenerator
