import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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

export default function Blog() {
  const sorted = getAllPosts(true).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div
      className="px-4 md:px-8 py-12 mx-auto w-full max-w-[860px]"
      style={{ position: 'relative', zIndex: 1 }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0}
        className="mb-12"
      >
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: 'var(--accent-color)' }}
        >
          Writing
        </p>
        <h1
          className="font-bold leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-color)' }}
        >
          Blog
        </h1>
        <p className="mt-4 text-base" style={{ color: 'rgba(232,232,240,0.6)', maxWidth: '540px' }}>
          Thoughts on frontend development, accessibility, and building with AI.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6">
        {sorted.map((post, i) => (
          <motion.article
            key={post.slug}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={i + 1}
          >
            <Link
              to={`/blog/${post.slug}`}
              className="block"
              style={{ textDecoration: 'none' }}
              onClick={() => window.scrollTo(0, 0)}
            >
              <div
                className="p-6 md:p-8 rounded-xl transition-all duration-300"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.border =
                    '1px solid rgba(0,103,79,0.4)';
                  (e.currentTarget as HTMLDivElement).style.background =
                    'rgba(0,103,79,0.06)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.border =
                    '1px solid var(--glass-border)';
                  (e.currentTarget as HTMLDivElement).style.background =
                    'var(--glass-bg)';
                }}
              >
                <div className="flex flex-wrap gap-2 mb-3">
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

                <h2
                  className="font-bold mb-2 leading-snug"
                  style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: 'var(--text-color)' }}
                >
                  {post.title}
                </h2>

                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: 'rgba(232,232,240,0.65)' }}
                >
                  {post.excerpt}
                </p>

                <div
                  className="flex items-center gap-3 text-xs"
                  style={{ color: 'rgba(232,232,240,0.4)' }}
                >
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>·</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
