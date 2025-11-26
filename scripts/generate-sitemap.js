import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your website configuration
const SITE_URL = 'https://www.businessanddatasolutions.com';
const BUILD_DIR = path.join(__dirname, '../build');
const DIST_DIR = path.join(__dirname, '../dist');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Check which build directory exists
function getBuildDirectory() {
  if (fs.existsSync(BUILD_DIR)) {
    return BUILD_DIR;
  } else if (fs.existsSync(DIST_DIR)) {
    return DIST_DIR;
  } else {
    return BUILD_DIR;
  }
}

// All your website routes
const routes = [
  // Main pages - HIGH PRIORITY
  { url: '/', priority: 1.0, changefreq: 'weekly', lastmod: '2024-12-01' },
  { url: '/about', priority: 0.9, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/services', priority: 0.9, changefreq: 'weekly', lastmod: '2024-12-01' },
  { url: '/industries', priority: 0.8, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/contact', priority: 0.8, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/consultation', priority: 0.8, changefreq: 'monthly', lastmod: '2024-12-01' },
  
  // Service Overview & Details
  { url: '/service-detail/core-data-cloud', priority: 0.8, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/service-detail/bi-digital-transformation', priority: 0.8, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/service-detail/business-consulting', priority: 0.8, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/service-detail/market-research', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/service-detail/consumer-voice-services', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/service-detail/employee-workforce-solutions', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/service-detail/training-development', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  
  // Industry Pages
  { url: '/industries/it-cloud', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/industries/finance', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/industries/healthcare', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/industries/education', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/industries/manufacturing', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/industries/retail', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/industries/restaurants', priority: 0.6, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/industries/real-estate', priority: 0.6, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/industries/transport', priority: 0.6, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/industries/agriculture', priority: 0.6, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/industries/legal', priority: 0.6, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/industries/marketing', priority: 0.6, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/industries/startups', priority: 0.6, changefreq: 'monthly', lastmod: '2024-12-01' },
  
  // Additional Pages
  { url: '/teamandcareerspage', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/blog', priority: 0.8, changefreq: 'weekly', lastmod: '2024-12-01' },
  { url: '/care', priority: 0.6, changefreq: 'monthly', lastmod: '2024-12-01' },
  
  // Legal Pages
  { url: '/terms', priority: 0.3, changefreq: 'yearly', lastmod: '2024-12-01' },
  { url: '/privacy', priority: 0.3, changefreq: 'yearly', lastmod: '2024-12-01' },
  { url: '/cookies', priority: 0.3, changefreq: 'yearly', lastmod: '2024-12-01' },
  
  // Utility Pages
  { url: '/bdscanvas', priority: 0.4, changefreq: 'monthly', lastmod: '2024-12-01' },
];

// Function to generate sitemap XML
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${routes.map(route => `
  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${route.lastmod || today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
  `).join('')}
</urlset>`;

  return sitemap;
}

// Function to generate sitemap index
function generateSitemapIndex() {
  const today = new Date().toISOString().split('T')[0];
  
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

  return sitemapIndex;
}

// Main function
async function main() {
  try {
    const buildDir = getBuildDirectory();
    console.log(`📁 Using build directory: ${buildDir}`);
    
    // Ensure directories exist
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }
    
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }

    // Generate sitemap
    const sitemap = generateSitemap();
    const sitemapIndex = generateSitemapIndex();

    // Write sitemap to public folder (for development)
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated in public folder');

    // Write sitemap to build folder (for production)
    fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated in build folder');

    // Write sitemap index
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-index.xml'), sitemapIndex);
    fs.writeFileSync(path.join(buildDir, 'sitemap-index.xml'), sitemapIndex);
    console.log('✅ Sitemap index generated');

    console.log('\n🎉 Sitemap generation completed!');
    console.log(`📊 Total URLs: ${routes.length}`);
    console.log(`🌐 Sitemap URL: ${SITE_URL}/sitemap.xml`);
    console.log(`🔗 Submit to Google: https://search.google.com/search-console`);

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { generateSitemap, generateSitemapIndex };
