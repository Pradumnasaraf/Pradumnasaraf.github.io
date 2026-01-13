import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import shell from 'highlight.js/lib/languages/shell';
import yaml from 'highlight.js/lib/languages/yaml';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import java from 'highlight.js/lib/languages/java';
import sql from 'highlight.js/lib/languages/sql';
import markdown from 'highlight.js/lib/languages/markdown';
import html from 'highlight.js/lib/languages/xml';

const allLanguages = {
  dockerfile: dockerfile,
  Dockerfile: dockerfile,
  javascript: javascript,
  js: javascript,
  json: json,
  typescript: typescript,
  ts: typescript,
  python: python,
  py: python,
  bash: bash,
  shell: shell,
  sh: shell,
  yaml: yaml,
  yml: yaml,
  xml: xml,
  html: html,
  css: css,
  go: go,
  rust: rust,
  rs: rust,
  java: java,
  sql: sql,
  markdown: markdown,
  md: markdown,
};

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

      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const wordsPerMinute = 200;
        const textContent = content
          .replace(/```[\s\S]*?```/g, '')
          .replace(/`[^`]+`/g, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/[#*[\]!]/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        const wordCount = textContent
          ? textContent.split(/\s+/).filter((word) => word.length > 0).length
          : 0;
        const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

        return {
          slug,
          ...data,
          content,
          wordCount,
          readingTime,
        };
      } catch (error) {
        console.warn(`Error reading post file ${fileName}:`, error);
        return null;
      }
    })
    .filter((post) => post && !post.draft)
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date < b.date ? 1 : -1;
    });

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

  const wordsPerMinute = 200;
  const textContent = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*[\]!]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const wordCount = textContent
    ? textContent.split(/\s+/).filter((word) => word.length > 0).length
    : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight, {
      detect: true,
      ignoreMissing: true,
      subset: false,
      languages: allLanguages,
      aliases: {
        dockerfile: ['docker', 'Dockerfile', 'DOCKERFILE'],
        javascript: ['js', 'node', 'nodejs'],
        typescript: ['ts'],
        python: ['py'],
        shell: ['sh', 'bash', 'zsh'],
        yaml: ['yml'],
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
