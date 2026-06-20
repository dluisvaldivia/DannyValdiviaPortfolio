import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { getAllPosts } from '../../controllers/blogController';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getAllPosts().find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div
      className="px-4 md:px-8 py-12 mx-auto w-full max-w-[760px]"
      style={{ position: 'relative', zIndex: 1 }}
    >
      <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors duration-200"
          style={{ color: 'rgba(232,232,240,0.45)', textDecoration: 'none' }}
          onClick={() => window.scrollTo(0, 0)}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-color)')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(232,232,240,0.45)')}
        >
          <FaArrowLeft style={{ fontSize: '0.75rem' }} aria-hidden="true" />
          All posts
        </Link>
      </motion.div>

      <motion.header
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
        className="mb-10"
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(0,103,79,0.15)',
                color: 'var(--accent-color)',
                border: '1px solid rgba(0,103,79,0.25)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1
          className="font-bold leading-tight mb-4"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: 'var(--text-color)' }}
        >
          {post.title}
        </h1>

        <div
          className="flex items-center gap-3 text-sm"
          style={{ color: 'rgba(232,232,240,0.4)' }}
        >
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readTime} min read</span>
        </div>
      </motion.header>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
