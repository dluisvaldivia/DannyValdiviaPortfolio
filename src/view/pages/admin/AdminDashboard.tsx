import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../../controllers/authController';
import { getAllPosts, deletePost, isBuiltIn } from '../../../controllers/blogController';
import { BlogPost } from '../../../models/blogData';
import usePageTitle from '../../../hooks/usePageTitle';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function AdminDashboard() {
  usePageTitle('Dashboard');
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>(() => getAllPosts());
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);

  function handleLogout() {
    logout();
    navigate('/admin', { replace: true });
  }

  function handleDelete(slug: string) {
    deletePost(slug);
    setPosts(getAllPosts());
    setConfirmSlug(null);
  }

  return (
    <div
      className="px-4 md:px-8 py-10 mx-auto w-full max-w-[1000px]"
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}
      >
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--accent-color)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>
            Admin
          </p>
          <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--text-color)', margin: 0, fontWeight: 700 }}>
            Blog Dashboard
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link
            to="/admin/post/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '10px 18px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #00674F, #004d3a)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 0 18px rgba(0,103,79,0.3)',
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 28px rgba(0,103,79,0.55)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 18px rgba(0,103,79,0.3)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            <FaPlus style={{ fontSize: '0.75rem' }} />
            New Post
          </Link>

          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(232,232,240,0.6)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#ff6b6b';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,107,107,0.3)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(232,232,240,0.6)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Post count */}
      <p style={{ color: 'rgba(232,232,240,0.4)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
        {posts.length} {posts.length === 1 ? 'post' : 'posts'} total
      </p>

      {/* Post list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {posts.length === 0 && (
          <div
            style={{
              padding: '3rem',
              textAlign: 'center',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              color: 'rgba(232,232,240,0.4)',
            }}
          >
            No posts yet. Create your first one!
          </div>
        )}

        {posts.map((post, i) => {
          const builtin = isBuiltIn(post.slug);
          return (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '10px',
                flexWrap: 'wrap',
              }}
            >
              {/* Status dot */}
              <span
                title={post.published === false ? 'Draft' : 'Published'}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: post.published === false ? 'rgba(255,200,0,0.7)' : '#00a87e',
                  boxShadow: post.published === false ? 'none' : '0 0 6px rgba(0,168,126,0.5)',
                }}
              />

              {/* Title + meta */}
              <div style={{ flex: 1, minWidth: '180px' }}>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-color)', fontSize: '0.95rem', lineHeight: 1.3 }}>
                  {post.title}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.3rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(232,232,240,0.4)' }}>{formatDate(post.date)}</span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(232,232,240,0.25)' }}>·</span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(232,232,240,0.4)' }}>{post.readTime} min</span>
                  {builtin && (
                    <>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(232,232,240,0.25)' }}>·</span>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(34,34,247,0.8)', background: 'rgba(34,34,247,0.1)', border: '1px solid rgba(34,34,247,0.2)', padding: '1px 7px', borderRadius: '20px' }}>
                        built-in
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {post.tags.map(t => (
                  <span
                    key={t}
                    style={{
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                      borderRadius: '20px',
                      background: 'rgba(0,103,79,0.12)',
                      color: 'var(--accent-color)',
                      border: '1px solid rgba(0,103,79,0.2)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <Link
                  to={`/admin/post/${post.slug}`}
                  title="Edit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '34px',
                    height: '34px',
                    borderRadius: '7px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(232,232,240,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-color)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,103,79,0.4)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(232,232,240,0.6)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <FaEdit style={{ fontSize: '0.8rem' }} />
                </Link>

                {!builtin && (
                  confirmSlug === post.slug ? (
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        title="Confirm delete"
                        style={{
                          padding: '0 10px',
                          height: '34px',
                          borderRadius: '7px',
                          background: 'rgba(255,80,80,0.15)',
                          border: '1px solid rgba(255,80,80,0.3)',
                          color: '#ff6b6b',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setConfirmSlug(null)}
                        style={{
                          padding: '0 10px',
                          height: '34px',
                          borderRadius: '7px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(232,232,240,0.5)',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmSlug(post.slug)}
                      title="Delete"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '34px',
                        height: '34px',
                        borderRadius: '7px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(232,232,240,0.4)',
                        cursor: 'pointer',
                        transition: 'color 0.2s, border-color 0.2s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.color = '#ff6b6b';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,107,107,0.3)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.color = 'rgba(232,232,240,0.4)';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      }}
                    >
                      <FaTrash style={{ fontSize: '0.75rem' }} />
                    </button>
                  )
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View public blog link */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link
          to="/blog"
          style={{ color: 'rgba(232,232,240,0.35)', fontSize: '0.82rem', textDecoration: 'none' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-color)')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(232,232,240,0.35)')}
        >
          View public blog →
        </Link>
      </div>
    </div>
  );
}
