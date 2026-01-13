import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import dockerfile from 'highlight.js/lib/languages/dockerfile';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

/**
 * Get all blog posts sorted by date
 */
export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        ...data,
        content,
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPostsData;
}

/**
 * Get all post slugs
 */
export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''));
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);

  let filePath;
  if (fs.existsSync(fullPath)) {
    filePath = fullPath;
  } else if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Calculate reading time (average reading speed: 200 words per minute)
  const wordsPerMinute = 200;
  // Remove markdown syntax and normalize whitespace more efficiently
  const textContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/[#*[\]!]/g, '') // Remove markdown syntax
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  const wordCount = textContent
    ? textContent.split(/\s+/).filter((word) => word.length > 0).length
    : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute)); // Minimum 1 minute

  // Use remark to convert markdown to HTML, then rehype for syntax highlighting
  // Configure rehype-highlight to support ALL languages from highlight.js
  // subset: false loads all available languages automatically
  // We explicitly register dockerfile to handle both lowercase and capitalized versions
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight, {
      detect: true, // Auto-detect language when not specified
      ignoreMissing: true, // Don't throw errors for unknown languages
      subset: false, // Include ALL languages from highlight.js (not just a subset)
      // Explicitly register dockerfile variants to handle capitalization
      languages: {
        dockerfile: dockerfile,
        Dockerfile: dockerfile, // Support capitalized version
      },
      // Add aliases for common variations
      aliases: {
        dockerfile: ['docker', 'Dockerfile', 'DOCKERFILE'],
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    wordCount,
    readingTime,
    ...data,
  };
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category) {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag) {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags && post.tags.includes(tag));
}
