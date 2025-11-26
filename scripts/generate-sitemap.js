import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.businessanddatasolutions.com';
const DIST_DIR = path.join(__dirname, '../dist');
const PUBLIC_DIR = path.join(__dirname, '../public');

// All your website routes
const routes = [
  // Main pages - HIGH PRIORITY
  { url: '/', priority: 1.0, changefreq: 'weekly', lastmod: '2024-12-01' },
  { url: '/about', priority: 0.9, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/services', priority: 0.9, changefreq: 'weekly', lastmod: '2024-12-01' },
  { url: '/industries', priority: 0.8, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/contact', priority: 0.8, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/consultation', priority: 0.8, changefreq: 'monthly', lastmod: '2024-12-01' },
  
  // Service pages
  { url: '/service-detail/core-data-cloud', priority: 0.8, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/service-detail/bi-digital-transformation', priority: 0.8, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/service-detail/business-consulting', priority: 0.8, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/service-detail/market-research', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/service-detail/consumer-voice-services', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/service-detail/employee-workforce-solutions', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/service-detail/training-development', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  
  // Industry pages
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
  
  // Additional pages
  { url: '/teamandcareerspage', priority: 0.7, changefreq: 'monthly', lastmod: '2024-12-01' },
  { url: '/blog', priority: 0.8, changefreq: 'weekly', lastmod: '2024-12-01' },
  { url: '/care', priority: 0.6, changefreq: 'monthly', lastmod: '2024-12-01' },
  
  // Legal pages
  { url: '/terms', priority: 0.3, changefreq: 'yearly', lastmod: '2024-12-01' },
  { url: '/privacy', priority: 0.3, changefreq: 'yearly', lastmod: '2024-12-01' },
  { url: '/cookies', priority: 0.3, changefreq: 'yearly', lastmod: '2024-12-01' },
  
  // Utility pages
  { url: '/bdscanvas', priority: 0.4, changefreq: 'monthly', lastmod: '2024-12-01' },
];

// Function to generate sitemap XML with proper encoding
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${route.lastmod || today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return sitemap;
}

// Main function
async function main() {
  try {
    console.log('🚀 Generating sitemap...');
    
    // Ensure directories exist
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }
    
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR, { recursive: true });
    }

    // Generate sitemap
    const sitemap = generateSitemap();

    // Write to public and dist folders
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated successfully!');

    // Generate simple robots.txt
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml

# Block AI bots
User-agent: ChatGPT-User
Disallow: /
User-agent: GPTBot
Disallow: /`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt);
    fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt);
    console.log('✅ Robots.txt generated successfully!');

    console.log('\n📊 Sitemap Statistics:');
    console.log(`   • Total URLs: ${routes.length}`);
    console.log(`   • Domain: ${SITE_URL}`);
    console.log(`   • Sitemap URL: ${SITE_URL}/sitemap.xml`);
    console.log(`   • Robots.txt: ${SITE_URL}/robots.txt`);
    
    console.log('\n🔧 Next Steps:');
    console.log('   1. Push changes to GitHub');
    console.log('   2. Wait for Vercel deployment');
    console.log('   3. Test sitemap at: https://www.xml-sitemaps.com/validate-xml-sitemap.html');
    console.log('   4. Submit to Google Search Console');

  } catch (error) {
    console.error('❌ Error generating SEO files:', error);
    process.exit(1);
  }
}

// Run the script
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { generateSitemap };
