#!/bin/bash
# Complete migration and fix script for Boston Mountain Pawpaw Festival

echo "🌿 Boston Mountain Pawpaw Festival - Complete Migration Script"
echo "=============================================================="

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        return 0
    else
        echo -e "${RED}✗${NC} $1 missing"
        return 1
    fi
}

# Function to create directory if it doesn't exist
ensure_dir() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo -e "${GREEN}✓${NC} Created directory: $1"
    fi
}

echo -e "\n${YELLOW}Step 1: Checking current structure...${NC}"
echo "======================================"

# Check for required directories
ensure_dir "pages/gallery"
ensure_dir "pages/news"
ensure_dir "pages/vendors"
ensure_dir "pages/about"
ensure_dir "pages/info"
ensure_dir "components"
ensure_dir "js/core"
ensure_dir "js/modules"

echo -e "\n${YELLOW}Step 2: Creating missing components...${NC}"
echo "======================================"

# Create footer component if it doesn't exist
if [ ! -f "components/footer.html" ]; then
    cat > components/footer.html << 'EOF'
<!-- components/footer.html -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Boston Mountain Pawpaw Festival</h3>
        <p>Celebrating Arkansas's native pawpaw fruit in the heart of the Ozarks</p>
      </div>
      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul class="footer-links">
          <li><a href="/#schedule">Schedule</a></li>
          <li><a href="/pages/vendors/">Vendors</a></li>
          <li><a href="/#tickets">Tickets</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Location</h4>
        <p>Beard & Lady Inn<br>Chester, AR 72936</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-text">&copy; 2025 Boston Mountain Pawpaw Festival · All rights reserved</p>
    </div>
  </div>
</footer>
EOF
    echo -e "${GREEN}✓${NC} Created footer.html component"
fi

echo -e "\n${YELLOW}Step 3: Fixing navigation links in index.html...${NC}"
echo "================================================"

# Fix gallery link in index.html
if [ -f "index.html" ]; then
    # Fix the gallery link
    sed -i.bak 's|href="gallery.html"|href="pages/gallery/"|g' index.html

    # Update navigation to use new paths
    sed -i 's|<li><a href="#gallery" class="nav-link">Gallery</a></li>|<li><a href="pages/gallery/" class="nav-link">Gallery</a></li>|g' index.html
    sed -i 's|<li><a href="#news" class="nav-link">News</a></li>|<li><a href="pages/news/" class="nav-link">News</a></li>|g' index.html

    echo -e "${GREEN}✓${NC} Updated navigation links in index.html"
fi

echo -e "\n${YELLOW}Step 4: Creating properly structured pages...${NC}"
echo "============================================="

# Create a proper news page
cat > pages/news/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>News & Updates - Boston Mountain Pawpaw Festival</title>
  <meta name="description" content="Latest news and updates from the Boston Mountain Pawpaw Festival. Stay informed about festival announcements, vendor spotlights, and pawpaw tips.">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://pawpawfestar.org/pages/news/">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Merriweather:wght@700&display=swap" rel="stylesheet">

  <!-- CSS Files -->
  <link rel="stylesheet" href="../../css/utilities/variables.css">
  <link rel="stylesheet" href="../../css/utilities/reset.css">
  <link rel="stylesheet" href="../../css/utilities/base.css">
  <link rel="stylesheet" href="../../css/components/header.css">
  <link rel="stylesheet" href="../../css/components/footer.css">
  <link rel="stylesheet" href="../../css/utilities/responsive.css">

  <style>
    .news-hero {
      background: linear-gradient(135deg, #2d5016 0%, #8cbf3f 100%);
      color: white;
      padding: 120px 0 60px;
      text-align: center;
      margin-top: 80px;
    }

    .news-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 1rem;
    }

    .coming-soon-message {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--color-light);
      border-radius: 12px;
      margin: 2rem auto;
      max-width: 600px;
    }

    .coming-soon-message h2 {
      color: var(--color-primary);
      margin-bottom: 1rem;
    }

    .newsletter-signup {
      margin-top: 2rem;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: var(--shadow-md);
    }

    .newsletter-form {
      display: flex;
      gap: 1rem;
      max-width: 500px;
      margin: 0 auto;
    }

    .newsletter-form input {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid var(--color-primary);
      border-radius: 4px;
    }
  </style>
</head>
<body class="page-news">
  <!-- Header Component -->
  <div data-component="header"></div>

  <!-- News Hero -->
  <section class="news-hero">
    <div class="container">
      <h1>News & Updates</h1>
      <p>Stay up to date with the latest from the Boston Mountain Pawpaw Festival</p>
    </div>
  </section>

  <!-- News Content -->
  <main class="news-container">
    <div class="coming-soon-message">
      <h2>🌿 News Section Coming Soon!</h2>
      <p>We're working on bringing you the latest updates, vendor spotlights, pawpaw growing tips, and festival announcements.</p>

      <div class="newsletter-signup">
        <h3>Get Festival Updates</h3>
        <p>Be the first to know about festival news!</p>
        <form class="newsletter-form" action="#" method="post">
          <input type="email" placeholder="Enter your email" required>
          <button type="submit" class="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </div>
  </main>

  <!-- Footer Component -->
  <div data-component="footer"></div>

  <!-- JavaScript -->
  <script src="../../js/core/component-loader.js"></script>
  <script src="../../js/core/path-resolver.js"></script>
  <script src="../../js/modules/navigation.js"></script>

  <script>
    // Initialize after components load
    document.addEventListener('componentsLoaded', () => {
      PathResolver.updatePaths();
      PathResolver.markActiveNav();

      if (typeof Navigation !== 'undefined') {
        Navigation.init();
      }
    });
  </script>
</body>
</html>
EOF
echo -e "${GREEN}✓${NC} Created news page"

# Create a proper vendors page
cat > pages/vendors/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vendors & Sponsors - Boston Mountain Pawpaw Festival</title>
  <meta name="description" content="Information for vendors and sponsors of the Boston Mountain Pawpaw Festival. Apply to be a vendor or learn about sponsorship opportunities.">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://pawpawfestar.org/pages/vendors/">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Merriweather:wght@700&display=swap" rel="stylesheet">

  <!-- CSS Files -->
  <link rel="stylesheet" href="../../css/utilities/variables.css">
  <link rel="stylesheet" href="../../css/utilities/reset.css">
  <link rel="stylesheet" href="../../css/utilities/base.css">
  <link rel="stylesheet" href="../../css/components/header.css">
  <link rel="stylesheet" href="../../css/components/footer.css">
  <link rel="stylesheet" href="../../css/utilities/responsive.css">

  <style>
    .vendors-hero {
      background: linear-gradient(135deg, #2d5016 0%, #f4a460 100%);
      color: white;
      padding: 120px 0 60px;
      text-align: center;
      margin-top: 80px;
    }

    .vendors-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 1rem;
    }

    .vendor-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .vendor-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: var(--shadow-md);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .vendor-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-hover);
    }

    .vendor-card h3 {
      color: var(--color-primary);
      margin-bottom: 1rem;
    }

    .vendor-card .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
  </style>
</head>
<body class="page-vendors">
  <!-- Header Component -->
  <div data-component="header"></div>

  <!-- Vendors Hero -->
  <section class="vendors-hero">
    <div class="container">
      <h1>Vendors & Sponsors</h1>
      <p>Join us in celebrating Arkansas's native pawpaw fruit</p>
    </div>
  </section>

  <!-- Vendors Content -->
  <main class="vendors-container">
    <div class="vendor-info-grid">
      <div class="vendor-card">
        <div class="icon">🛍️</div>
        <h3>Become a Vendor</h3>
        <p>Showcase your pawpaw products, crafts, or local goods at our festival. Limited spaces available!</p>
        <a href="mailto:vendors@pawpawfestar.org" class="btn btn-primary">Apply Now</a>
      </div>

      <div class="vendor-card">
        <div class="icon">🤝</div>
        <h3>Sponsorship Opportunities</h3>
        <p>Support the festival and gain valuable exposure for your business. Multiple sponsorship levels available.</p>
        <a href="mailto:sponsors@pawpawfestar.org" class="btn btn-primary">Learn More</a>
      </div>

      <div class="vendor-card">
        <div class="icon">📋</div>
        <h3>2025 Vendor List</h3>
        <p>Check back soon for our growing list of confirmed vendors for the 2025 festival!</p>
        <p class="coming-soon">Coming Soon</p>
      </div>
    </div>
  </main>

  <!-- Footer Component -->
  <div data-component="footer"></div>

  <!-- JavaScript -->
  <script src="../../js/core/component-loader.js"></script>
  <script src="../../js/core/path-resolver.js"></script>
  <script src="../../js/modules/navigation.js"></script>

  <script>
    // Initialize after components load
    document.addEventListener('componentsLoaded', () => {
      PathResolver.updatePaths();
      PathResolver.markActiveNav();

      if (typeof Navigation !== 'undefined') {
        Navigation.init();
      }
    });
  </script>
</body>
</html>
EOF
echo -e "${GREEN}✓${NC} Created vendors page"

echo -e "\n${YELLOW}Step 5: Creating 404 error page...${NC}"
echo "===================================="

cat > 404.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found - Boston Mountain Pawpaw Festival</title>
  <meta name="description" content="Oops! The page you're looking for doesn't exist.">
  <meta name="robots" content="noindex, follow">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Merriweather:wght@700&display=swap" rel="stylesheet">

  <!-- CSS Files -->
  <link rel="stylesheet" href="/css/utilities/variables.css">
  <link rel="stylesheet" href="/css/utilities/reset.css">
  <link rel="stylesheet" href="/css/utilities/base.css">
  <link rel="stylesheet" href="/css/components/header.css">
  <link rel="stylesheet" href="/css/components/footer.css">
  <link rel="stylesheet" href="/css/utilities/responsive.css">

  <style>
    .error-page {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      margin-top: 80px;
    }

    .error-content {
      text-align: center;
      max-width: 600px;
    }

    .error-code {
      font-size: 6rem;
      color: var(--color-primary);
      font-weight: bold;
      margin-bottom: 1rem;
      font-family: var(--font-decorative);
    }

    .error-icon {
      font-size: 4rem;
      margin-bottom: 2rem;
    }

    .error-message {
      font-size: 1.25rem;
      color: var(--color-text-light);
      margin-bottom: 2rem;
    }

    .error-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  </style>
</head>
<body class="page-404">
  <!-- Header Component -->
  <div data-component="header"></div>

  <!-- Error Content -->
  <main class="error-page">
    <div class="error-content">
      <div class="error-icon">🍂</div>
      <h1 class="error-code">404</h1>
      <p class="error-message">Oops! Looks like this pawpaw fell off the tree. The page you're looking for doesn't exist.</p>

      <div class="error-actions">
        <a href="/" class="btn btn-primary">Go Home</a>
        <a href="/#schedule" class="btn btn-secondary">View Schedule</a>
      </div>
    </div>
  </main>

  <!-- Footer Component -->
  <div data-component="footer"></div>

  <!-- JavaScript -->
  <script src="/js/core/component-loader.js"></script>
  <script src="/js/core/path-resolver.js"></script>
  <script src="/js/modules/navigation.js"></script>

  <script>
    document.addEventListener('componentsLoaded', () => {
      PathResolver.updatePaths();
      if (typeof Navigation !== 'undefined') {
        Navigation.init();
      }
    });
  </script>
</body>
</html>
EOF
echo -e "${GREEN}✓${NC} Created 404 page"

echo -e "\n${YELLOW}Step 6: Updating sitemap with new pages...${NC}"
echo "=========================================="

cat > sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://pawpawfestar.org/</loc>
    <lastmod>2025-08-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Gallery Page -->
  <url>
    <loc>https://pawpawfestar.org/pages/gallery/</loc>
    <lastmod>2025-08-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- News Page -->
  <url>
    <loc>https://pawpawfestar.org/pages/news/</loc>
    <lastmod>2025-08-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Vendors Page -->
  <url>
    <loc>https://pawpawfestar.org/pages/vendors/</loc>
    <lastmod>2025-08-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Main Sections -->
  <url>
    <loc>https://pawpawfestar.org/#about</loc>
    <lastmod>2025-08-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <url>
    <loc>https://pawpawfestar.org/#schedule</loc>
    <lastmod>2025-08-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://pawpawfestar.org/#contact</loc>
    <lastmod>2025-08-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
EOF
echo -e "${GREEN}✓${NC} Updated sitemap.xml"

echo -e "\n${YELLOW}Step 7: Cleaning up old files...${NC}"
echo "================================="

# Remove old gallery.html from root if it exists
if [ -f "gallery.html" ]; then
    rm gallery.html
    echo -e "${GREEN}✓${NC} Removed old gallery.html from root"
fi

# Remove backup files
rm -f *.bak
echo -e "${GREEN}✓${NC} Cleaned up backup files"

echo -e "\n${YELLOW}Step 8: Verification Checklist${NC}"
echo "=============================="

# Final verification
echo "Directory Structure:"
check_file "components/header.html"
check_file "components/footer.html"
check_file "pages/gallery/index.html"
check_file "pages/news/index.html"
check_file "pages/vendors/index.html"
check_file "js/core/component-loader.js"
check_file "js/core/path-resolver.js"
check_file "404.html"

echo -e "\n${GREEN}✅ Migration Complete!${NC}"
echo "===================="
echo ""
echo "Next steps:"
echo "1. Test the component loader by opening pages/gallery/index.html in a browser"
echo "2. Verify that header and footer components load correctly"
echo "3. Check that navigation links work from all pages"
echo "4. Test the 404 page by visiting a non-existent URL"
echo ""
echo "If components aren't loading, ensure you're serving the site from a web server"
echo "(not file://) due to CORS restrictions. Use:"
echo "  python -m http.server 8000"
echo "  or"
echo "  npx http-server"
echo ""
echo "🌿 Happy Pawpaw Festival Development!"