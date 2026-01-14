#!/usr/bin/env node

/**
 * Validation script to check if all referenced images exist
 *
 * This script:
 * 1. Scans all markdown files for image references
 * 2. Checks if all referenced images exist in public/blog-images/
 * 3. Exits with error code if any images are missing (prevents build)
 *
 * This runs automatically before build via the "prebuild" npm script
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const blogDir = path.join(rootDir, 'src/content/blog');
const publicDir = path.join(rootDir, 'public');

/**
 * Recursively find all markdown files
 */
function findMarkdownFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Extract all image URLs from markdown content
 */
function extractImageUrls(content) {
  const urls = new Set();

  // Pattern for markdown images: ![alt](url)
  const markdownImagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;

  while ((match = markdownImagePattern.exec(content)) !== null) {
    const url = match[2].trim();
    // Only check local blog-images URLs (skip external URLs)
    if (url.startsWith('/blog-images/')) {
      urls.add(url);
    }
  }

  return Array.from(urls);
}

/**
 * Check if image file exists
 */
function imageExists(imageUrl) {
  // Remove leading slash and check in public directory
  const imagePath = path.join(publicDir, imageUrl);
  return fs.existsSync(imagePath);
}

/**
 * Main validation function
 */
function validateImages() {
  console.log('🔍 Validating blog images...\n');

  const markdownFiles = findMarkdownFiles(blogDir);
  console.log(`📄 Checking ${markdownFiles.length} blog posts\n`);

  const missingImages = [];
  let totalImages = 0;
  let validImages = 0;

  // Process each blog post
  for (const filePath of markdownFiles) {
    const slug = path.basename(filePath, path.extname(filePath));
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(content);

    const images = new Set();

    // Check frontmatter thumbnail
    if (frontmatter.thumbnail) {
      const thumbnail = frontmatter.thumbnail;
      // Only check local blog-images URLs
      if (thumbnail.startsWith('/blog-images/')) {
        images.add(thumbnail);
      }
    }

    // Extract images from markdown content
    const contentImages = extractImageUrls(markdownContent);
    contentImages.forEach((img) => images.add(img));

    totalImages += images.size;

    // Validate each image
    for (const imageUrl of images) {
      if (imageExists(imageUrl)) {
        validImages++;
      } else {
        missingImages.push({
          post: slug,
          image: imageUrl,
          file: path.relative(rootDir, filePath),
        });
      }
    }
  }

  // Report results
  console.log(`📊 Validation Results:`);
  console.log(`   ✅ Valid images: ${validImages}`);
  console.log(`   ❌ Missing images: ${missingImages.length}`);
  console.log(`   📦 Total images checked: ${totalImages}\n`);

  // Report missing images
  if (missingImages.length > 0) {
    console.log('❌ Missing Images Found:\n');
    missingImages.forEach(({ post, image, file }) => {
      console.log(`   Post: ${post}`);
      console.log(`   Image: ${image}`);
      console.log(`   File: ${file}\n`);
    });

    console.log('⚠️  Build will fail until all images are present.\n');
    console.log('💡 To fix:');
    console.log('   1. Check if images were moved or renamed');
    console.log(
      '   2. Ensure the referenced file exists under public/ at the same path'
    );
    console.log(
      '   3. Update the blog markdown frontmatter/content to point to the correct local path\n'
    );

    process.exit(1);
  }

  console.log('✅ All images validated successfully!\n');
  process.exit(0);
}

// Run validation
validateImages();
