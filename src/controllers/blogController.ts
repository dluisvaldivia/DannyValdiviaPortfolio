import { blogPosts, BlogPost } from '../models/blogData';

const LS_KEY = 'dv_blog_posts';

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getLocalPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as BlogPost[]) : [];
  } catch {
    return [];
  }
}

export function savePost(post: BlogPost): void {
  const posts = getLocalPosts();
  const idx = posts.findIndex(p => p.slug === post.slug);
  if (idx >= 0) {
    posts[idx] = post;
  } else {
    posts.unshift(post);
  }
  localStorage.setItem(LS_KEY, JSON.stringify(posts));
}

export function deletePost(slug: string): void {
  const posts = getLocalPosts().filter(p => p.slug !== slug);
  localStorage.setItem(LS_KEY, JSON.stringify(posts));
}

export function getAllPosts(publishedOnly = false): BlogPost[] {
  const local = getLocalPosts();
  const localSlugs = new Set(local.map(p => p.slug));

  // Static posts that haven't been overridden locally
  const staticRemainder = blogPosts.filter(p => !localSlugs.has(p.slug));

  const merged = [...local, ...staticRemainder];

  return publishedOnly
    ? merged.filter(p => p.published !== false)
    : merged;
}

export function isBuiltIn(slug: string): boolean {
  return blogPosts.some(p => p.slug === slug) && !getLocalPosts().some(p => p.slug === slug);
}
