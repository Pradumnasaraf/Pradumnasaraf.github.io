import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hashnodeDir = path.join(__dirname, '../../hashnode-blog-temp');
const blogDir = path.join(__dirname, '../src/content/blog');

// Parse Hashnode date format: "Wed Jan 19 2022 14:43:03 GMT+0000 (Coordinated Universal Time)"
function parseHashnodeDate(dateString) {
  if (!dateString) return null;

  // Extract the date part before GMT
  const datePart = dateString.split(' GMT')[0];
  const date = new Date(datePart);

  if (isNaN(date.getTime())) {
    // Fallback: try to parse the full string
    return new Date(dateString);
  }

  return date;
}

// Format date to YYYY-MM-DD
function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Convert tags from comma-separated string to array
function parseTags(tags) {
  if (!tags) return [];
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  }
  if (Array.isArray(tags)) {
    return tags;
  }
  return [];
}

// Clean up markdown content
function cleanContent(content) {
  // Remove Hashnode-specific image align attributes
  return content.replace(/ align="(left|right|center)"/g, '');
}

// Process a single Hashnode post file
function processPost(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Skip if no title or slug
  if (!data.title || !data.slug) {
    console.log(`Skipping ${path.basename(filePath)} - missing title or slug`);
    return null;
  }

  // Parse date
  const publishedDate = parseHashnodeDate(data.datePublished);
  const formattedDate = formatDate(publishedDate);

  // Build new frontmatter
  const newFrontmatter = {
    title: data.title,
    excerpt: data.seoDescription || data.title,
    date: formattedDate || '2022-01-01', // Fallback date
    author: 'Pradumna Saraf',
    category: data.tags ? parseTags(data.tags)[0] || 'General' : 'General',
    tags: parseTags(data.tags),
    thumbnail: data.cover || '/media/pradumna-saraf-og.png',
    draft: false,
  };

  // Clean content
  const cleanedContent = cleanContent(content);

  // Build new markdown file
  const frontmatterString = Object.entries(newFrontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.map((v) => `'${v}'`).join(', ')}]`;
      }
      return `${key}: '${String(value).replace(/'/g, "''")}'`;
    })
    .join('\n');

  const newContent = `---\n${frontmatterString}\n---\n\n${cleanedContent}`;

  // Use slug as filename
  const slug = data.slug;
  const outputPath = path.join(blogDir, `${slug}.md`);

  return {
    slug,
    outputPath,
    content: newContent,
  };
}

// Main function
function importPosts() {
  if (!fs.existsSync(hashnodeDir)) {
    console.error(`Hashnode directory not found: ${hashnodeDir}`);
    return;
  }

  // Ensure blog directory exists
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  // Get all markdown files
  const files = fs
    .readdirSync(hashnodeDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(hashnodeDir, file));

  console.log(`Found ${files.length} posts to import...`);

  let imported = 0;
  let skipped = 0;
  const errors = [];

  for (const filePath of files) {
    try {
      const result = processPost(filePath);

      if (result) {
        // Check if file already exists
        if (fs.existsSync(result.outputPath)) {
          console.log(`Skipping ${result.slug} - already exists`);
          skipped++;
          continue;
        }

        fs.writeFileSync(result.outputPath, result.content, 'utf8');
        console.log(`✓ Imported: ${result.slug}`);
        imported++;
      } else {
        skipped++;
      }
    } catch (error) {
      errors.push({ file: path.basename(filePath), error: error.message });
      console.error(
        `✗ Error processing ${path.basename(filePath)}:`,
        error.message
      );
    }
  }

  console.log(`\nImport complete!`);
  console.log(`✓ Imported: ${imported}`);
  console.log(`⊘ Skipped: ${skipped}`);
  if (errors.length > 0) {
    console.log(`✗ Errors: ${errors.length}`);
    errors.forEach((e) => console.log(`  - ${e.file}: ${e.error}`));
  }
}

// Run import
importPosts();
