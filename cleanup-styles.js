#!/usr/bin/env node

/**
 * Boston Mountain Pawpaw Festival - CSS Cleanup Script
 * This script consolidates the CSS workflow from multiple files to a single compiled main.css
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n${'='.repeat(50)}`)
};

// Configuration
const config = {
  cssDir: 'css',
  scssDir: 'scss',
  archiveDir: 'css/_archive',
  backupDir: 'backup_' + new Date().toISOString().slice(0, 10),
  htmlFiles: [],
  cssFilesToArchive: [
    'css/utilities/variables.css',
    'css/utilities/reset.css',
    'css/utilities/base.css',
    'css/utilities/responsive.css',
    'css/components/header.css',
    'css/components/hero.css',
    'css/components/footer.css',
    'css/components/schedule.css',
    'css/components/activities.css',
    'css/components/gallery.css',
    'css/components/sponsors.css'
  ]
};

// Find all HTML files
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, .git, backup and archive directories
      if (!file.startsWith('.') &&
          file !== 'node_modules' &&
          file !== config.backupDir &&
          !file.startsWith('backup_') &&
          file !== '_archive') {
        findHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Step 1: Create backup
function createBackup() {
  log.header('Step 1: Creating Backup');

  try {
    // Create backup directory
    if (!fs.existsSync(config.backupDir)) {
      fs.mkdirSync(config.backupDir, { recursive: true });
    }

    // Backup CSS directory
    if (fs.existsSync('css')) {
      execSync(`cp -r css ${config.backupDir}/`, { stdio: 'ignore' });
      log.success(`Backed up CSS files to ${config.backupDir}/css`);
    }

    // Backup SCSS directory
    if (fs.existsSync('scss')) {
      execSync(`cp -r scss ${config.backupDir}/`, { stdio: 'ignore' });
      log.success(`Backed up SCSS files to ${config.backupDir}/scss`);
    }

    // Find and backup HTML files
    config.htmlFiles = findHtmlFiles('.');
    const htmlBackupDir = path.join(config.backupDir, 'html_files');
    fs.mkdirSync(htmlBackupDir, { recursive: true });

    config.htmlFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const backupPath = path.join(htmlBackupDir, file.replace(/\//g, '_'));
      fs.writeFileSync(backupPath, content);
    });

    log.success(`Backed up ${config.htmlFiles.length} HTML files`);
    log.info(`Backup location: ${path.resolve(config.backupDir)}`);

  } catch (error) {
    log.error(`Backup failed: ${error.message}`);
    process.exit(1);
  }
}

// Step 2: Archive individual CSS files
function archiveCssFiles() {
  log.header('Step 2: Archiving Individual CSS Files');

  try {
    // Create archive directory structure
    const archiveDirs = [
      'css/_archive',
      'css/_archive/components',
      'css/_archive/utilities'
    ];

    archiveDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Move CSS files to archive
    let archivedCount = 0;
    config.cssFilesToArchive.forEach(file => {
      if (fs.existsSync(file)) {
        const fileName = path.basename(file);
        const archivePath = file.includes('/components/')
          ? `css/_archive/components/${fileName}`
          : `css/_archive/utilities/${fileName}`;

        fs.renameSync(file, archivePath);
        log.success(`Archived: ${file} → ${archivePath}`);
        archivedCount++;
      }
    });

    // Clean up empty directories
    ['css/components', 'css/utilities'].forEach(dir => {
      if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
        fs.rmdirSync(dir);
        log.info(`Removed empty directory: ${dir}`);
      }
    });

    log.success(`Archived ${archivedCount} CSS files`);

  } catch (error) {
    log.error(`Archive failed: ${error.message}`);
  }
}

// Step 3: Update HTML files
function updateHtmlFiles() {
  log.header('Step 3: Updating HTML Files');

  const oldCssPattern = /<link\s+rel="stylesheet"\s+href="[^"]*\/css\/(utilities|components)\/[^"]+\.css"[^>]*>/gi;
  const mainCssLink = '<link rel="stylesheet" href="/css/main.css">';

  let updatedCount = 0;

  config.htmlFiles.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      const originalContent = content;

      // Check if file has old CSS links
      const matches = content.match(oldCssPattern);
      if (matches && matches.length > 0) {
        // Find the first CSS link to replace it with main.css
        const firstMatch = matches[0];
        const firstMatchIndex = content.indexOf(firstMatch);

        // Insert main.css link at the position of the first old CSS link
        let newContent = content.substring(0, firstMatchIndex) + mainCssLink;

        // Remove all old CSS links
        let remainingContent = content.substring(firstMatchIndex);
        remainingContent = remainingContent.replace(oldCssPattern, '');

        // Combine the content
        newContent += remainingContent;

        // Clean up any duplicate main.css links
        const mainCssCount = (newContent.match(/\/css\/main\.css/g) || []).length;
        if (mainCssCount > 1) {
          // Keep only the first occurrence
          const parts = newContent.split(mainCssLink);
          newContent = parts[0] + mainCssLink + parts.slice(1).join('');
        }

        // Write the updated content
        fs.writeFileSync(file, newContent);
        log.success(`Updated: ${file} (removed ${matches.length} old CSS links)`);
        updatedCount++;
      } else if (!content.includes('/css/main.css')) {
        // File doesn't have old CSS links but also doesn't have main.css
        // Find where to insert it (after the last font link or in head)
        const fontLinkPattern = /<link[^>]*fonts[^>]*>/gi;
        const fontMatches = content.match(fontLinkPattern);

        if (fontMatches) {
          const lastFontLink = fontMatches[fontMatches.length - 1];
          const insertIndex = content.lastIndexOf(lastFontLink) + lastFontLink.length;
          content = content.substring(0, insertIndex) + '\n\n  <!-- Main Stylesheet -->\n  ' + mainCssLink + content.substring(insertIndex);
        } else {
          // Insert before </head>
          content = content.replace('</head>', `  <!-- Main Stylesheet -->\n  ${mainCssLink}\n</head>`);
        }

        fs.writeFileSync(file, content);
        log.success(`Updated: ${file} (added main.css link)`);
        updatedCount++;
      } else {
        log.info(`Skipped: ${file} (already using main.css)`);
      }

    } catch (error) {
      log.error(`Failed to update ${file}: ${error.message}`);
    }
  });

  log.success(`Updated ${updatedCount} HTML files`);
}

// Step 4: Compile SCSS
function compileSass() {
  log.header('Step 4: Compiling SCSS to CSS');

  try {
    // Check if sass is installed
    try {
      execSync('npx sass --version', { stdio: 'ignore' });
    } catch {
      log.warning('Sass not found. Installing sass...');
      execSync('npm install --save-dev sass', { stdio: 'inherit' });
    }

    // Compile SCSS
    log.info('Compiling scss/main.scss → css/main.css');
    execSync('npx sass scss/main.scss css/main.css --style=compressed --source-map', { stdio: 'inherit' });

    // Check if main.css was created
    if (fs.existsSync('css/main.css')) {
      const stats = fs.statSync('css/main.css');
      const fileSizeKB = (stats.size / 1024).toFixed(2);
      log.success(`Successfully compiled main.css (${fileSizeKB} KB)`);
    } else {
      throw new Error('main.css was not created');
    }

  } catch (error) {
    log.error(`SCSS compilation failed: ${error.message}`);
    log.info('You can manually compile by running: npm run build:css');
  }
}

// Step 5: Verify and report
function verifyAndReport() {
  log.header('Step 5: Verification Report');

  // Check main.css exists
  if (fs.existsSync('css/main.css')) {
    const stats = fs.statSync('css/main.css');
    log.success(`✓ main.css exists (${(stats.size / 1024).toFixed(2)} KB)`);
  } else {
    log.error('✗ main.css not found');
  }

  // Check archived files
  if (fs.existsSync('css/_archive')) {
    const archivedFiles = [];
    ['components', 'utilities'].forEach(dir => {
      const archiveDir = `css/_archive/${dir}`;
      if (fs.existsSync(archiveDir)) {
        fs.readdirSync(archiveDir).forEach(file => {
          archivedFiles.push(`${dir}/${file}`);
        });
      }
    });
    log.success(`✓ ${archivedFiles.length} CSS files archived`);
  }

  // Check HTML files
  let htmlWithMainCss = 0;
  let htmlWithOldCss = 0;

  config.htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('/css/main.css')) {
      htmlWithMainCss++;
    }
    if (content.match(/<link[^>]*\/css\/(utilities|components)\/[^>]*>/)) {
      htmlWithOldCss++;
      log.warning(`Still has old CSS: ${file}`);
    }
  });

  log.success(`✓ ${htmlWithMainCss}/${config.htmlFiles.length} HTML files using main.css`);
  if (htmlWithOldCss > 0) {
    log.warning(`⚠ ${htmlWithOldCss} files still reference old CSS files`);
  }

  // Final summary
  log.header('Cleanup Complete! 🎉');
  log.info(`Backup saved to: ${colors.bright}${path.resolve(config.backupDir)}${colors.reset}`);
  log.info(`Old CSS files archived to: ${colors.bright}css/_archive/${colors.reset}`);
  log.info(`All HTML files now use: ${colors.bright}/css/main.css${colors.reset}`);

  console.log(`\n${colors.green}Next steps:${colors.reset}`);
  console.log('1. Test your site locally to ensure styles are working');
  console.log('2. Run "npm run watch:css" for development (auto-compile on SCSS changes)');
  console.log('3. Run "npm run build:css" for production builds');
  console.log(`4. To restore backup: cp -r ${config.backupDir}/* .`);
  console.log('\nYour SCSS workflow is now active! Edit files in scss/ and they\'ll compile to css/main.css');
}

// Main execution
async function main() {
  console.log(`${colors.bright}${colors.cyan}
╔══════════════════════════════════════════════════╗
║   Boston Mountain Pawpaw Festival               ║
║   CSS Cleanup & Consolidation Script            ║
╚══════════════════════════════════════════════════╝
${colors.reset}`);

  createBackup();
  archiveCssFiles();
  updateHtmlFiles();
  compileSass();
  verifyAndReport();
}

// Run the script
main().catch(error => {
  log.error(`Script failed: ${error.message}`);
  log.info(`\nTo restore your backup, run: cp -r ${config.backupDir}/* .`);
  process.exit(1);
});