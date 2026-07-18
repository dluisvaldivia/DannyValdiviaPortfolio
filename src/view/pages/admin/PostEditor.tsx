import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { savePost, getAllPosts, slugify, estimateReadTime } from '../../../controllers/blogController';
import { BlogPost } from '../../../models/blogData';
import RichEditor from '../../components/admin/RichEditor';
import usePageTitle from '../../../hooks/usePageTitle';

// ── Focused textarea (used for excerpt only) ─────────────────────────────────

function FocusedTextarea({
  value,
  onChange,
  placeholder,
  rows,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      rows={rows ?? 4}
      spellCheck
      style={{
        width: '100%',
        padding: '10px 14px',
        borderRadius: '7px',
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${focused ? '#00674F' : 'rgba(255,255,255,0.09)'}`,
        boxShadow: focused ? '0 0 0 3px rgba(0,103,79,0.15)' : 'none',
        color: '#e8e8f0',
        fontSize: '0.9rem',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        resize: 'vertical',
        lineHeight: 1.6,
        boxSizing: 'border-box',
      }}
    />
  );
}

// ── Shared input styles ──────────────────────────────────────────────────────

const baseInput: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '7px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  color: '#e8e8f0',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
};

const focusIn: React.CSSProperties = { borderColor: '#00674F', boxShadow: '0 0 0 3px rgba(0,103,79,0.15)' };

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.75rem', color: 'rgba(232,232,240,0.5)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
          {label}
        </label>
        {hint && <span style={{ fontSize: '0.7rem', color: 'rgba(232,232,240,0.3)' }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        ...baseInput,
        ...(focused && !disabled ? focusIn : {}),
        ...(disabled ? { opacity: 0.45, cursor: 'not-allowed' } : {}),
      }}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PostEditor() {
  usePageTitle('Post Editor');
  const { slug: editSlug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isNew = !editSlug;

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [readTime, setReadTime] = useState(1);
  const [readTimeManual, setReadTimeManual] = useState(false);
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load existing post when editing
  useEffect(() => {
    if (editSlug) {
      const post = getAllPosts().find(p => p.slug === editSlug);
      if (post) {
        setTitle(post.title);
        setSlug(post.slug);
        setSlugManual(true);
        setExcerpt(post.excerpt);
        setTagsInput(post.tags.join(', '));
        setCoverImage(post.coverImage ?? '');
        setDate(post.date);
        setReadTime(post.readTime);
        setReadTimeManual(true);
        setContent(post.content);
        setPublished(post.published !== false);
      }
    }
  }, [editSlug]);

  // Auto-slug from title
  const handleTitleChange = useCallback((val: string) => {
    setTitle(val);
    if (!slugManual) setSlug(slugify(val));
  }, [slugManual]);

  // Auto read-time from content
  const handleContentChange = useCallback((val: string) => {
    setContent(val);
    if (!readTimeManual) setReadTime(estimateReadTime(val));
  }, [readTimeManual]);

  function handleSave() {
    const tags = tagsInput
      .split(/[,\s]+/)
      .map(t => t.trim())
      .filter(Boolean);

    const post: BlogPost = {
      slug: slug || slugify(title),
      title: title.trim(),
      date,
      excerpt: excerpt.trim(),
      content,
      tags,
      readTime,
      published,
      ...(coverImage.trim() ? { coverImage: coverImage.trim() } : {}),
    };

    savePost(post);
    setSaved(true);
    setTimeout(() => {
      navigate('/admin/dashboard');
    }, 600);
  }

  const canSave = title.trim().length > 0 && content.trim().length > 0;

  return (
    <div
      className="px-4 md:px-8 py-10 mx-auto w-full max-w-[1200px]"
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            to="/admin/dashboard"
            style={{ color: 'rgba(232,232,240,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-color)')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(232,232,240,0.4)')}
          >
            <FaArrowLeft style={{ fontSize: '0.7rem' }} />
            Dashboard
          </Link>
          <span style={{ color: 'rgba(232,232,240,0.2)' }}>/</span>
          <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-color)' }}>
            {isNew ? 'New Post' : 'Edit Post'}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          {/* Published toggle */}
          <button
            onClick={() => setPublished(v => !v)}
            style={{
              padding: '8px 14px',
              borderRadius: '7px',
              background: published ? 'rgba(0,103,79,0.15)' : 'rgba(255,200,0,0.1)',
              border: published ? '1px solid rgba(0,103,79,0.3)' : '1px solid rgba(255,200,0,0.25)',
              color: published ? '#00a87e' : 'rgba(255,200,0,0.8)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {published ? 'Published' : 'Draft'}
          </button>

          {/* Preview toggle */}
          <button
            onClick={() => setShowPreview(v => !v)}
            title={showPreview ? 'Hide preview' : 'Show preview'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '8px 14px',
              borderRadius: '7px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(232,232,240,0.55)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
          >
            {showPreview ? <FaEyeSlash style={{ fontSize: '0.8rem' }} /> : <FaEye style={{ fontSize: '0.8rem' }} />}
            {showPreview ? 'Hide preview' : 'Preview'}
          </button>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={!canSave || saved}
            style={{
              padding: '9px 22px',
              borderRadius: '7px',
              border: 'none',
              background: saved
                ? 'rgba(0,168,126,0.2)'
                : canSave
                ? 'linear-gradient(135deg, #00674F, #004d3a)'
                : 'rgba(255,255,255,0.05)',
              color: saved ? '#00a87e' : canSave ? '#fff' : 'rgba(232,232,240,0.3)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: canSave && !saved ? 'pointer' : 'not-allowed',
              boxShadow: canSave && !saved ? '0 0 18px rgba(0,103,79,0.3)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {saved ? 'Saved!' : 'Save'}
          </button>
        </div>
      </motion.div>

      {/* Split pane: editor | preview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr',
          gap: '1.5rem',
          alignItems: 'start',
        }}
      >
        {/* ── Editor column ── */}
        <motion.div
          layout
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
        >
          {/* Title */}
          <Field label="Title">
            <TextInput value={title} onChange={handleTitleChange} placeholder="Post title…" />
          </Field>

          {/* Slug */}
          <Field label="Slug" hint="auto-generated from title">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={slug}
                onChange={e => { setSlug(e.target.value); setSlugManual(true); }}
                placeholder="url-friendly-slug"
                style={{ ...baseInput, fontFamily: 'monospace', fontSize: '0.82rem' }}
                onFocus={e => { Object.assign(e.target.style, focusIn); }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.boxShadow = 'none'; }}
              />
              {slugManual && (
                <button
                  onClick={() => { setSlug(slugify(title)); setSlugManual(false); }}
                  title="Reset to auto"
                  style={{
                    flexShrink: 0,
                    padding: '0 10px',
                    borderRadius: '7px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(232,232,240,0.45)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </Field>

          {/* Excerpt */}
          <Field label="Excerpt" hint="shown in listing + used as meta description">
            <FocusedTextarea
              value={excerpt}
              onChange={setExcerpt}
              placeholder="One or two sentences summarising the post…"
              rows={2}
            />
          </Field>

          {/* Tags + Date + Read time (row) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.75rem', alignItems: 'end' }}>
            <Field label="Tags" hint="comma or space separated">
              <TextInput value={tagsInput} onChange={setTagsInput} placeholder="Accessibility, UX, React" />
            </Field>

            <Field label="Date">
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{ ...baseInput, width: '140px', colorScheme: 'dark' }}
                onFocus={e => Object.assign(e.target.style, focusIn)}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.boxShadow = 'none'; }}
              />
            </Field>

            <Field label="Read time" hint="min">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <input
                  type="number"
                  min={1}
                  value={readTime}
                  onChange={e => { setReadTime(Number(e.target.value)); setReadTimeManual(true); }}
                  style={{ ...baseInput, width: '72px', textAlign: 'center' }}
                  onFocus={e => Object.assign(e.target.style, focusIn)}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.boxShadow = 'none'; }}
                />
                {readTimeManual && (
                  <button
                    onClick={() => { setReadTime(estimateReadTime(content)); setReadTimeManual(false); }}
                    title="Recalculate"
                    style={{
                      padding: '0 8px',
                      height: '36px',
                      borderRadius: '7px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(232,232,240,0.4)',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                    }}
                  >
                    Auto
                  </button>
                )}
              </div>
            </Field>
          </div>

          {/* Cover image */}
          <Field label="Cover image URL" hint="optional">
            <TextInput value={coverImage} onChange={setCoverImage} placeholder="https://…" />
          </Field>

          {/* Content */}
          <Field label="Content">
            <RichEditor value={content} onChange={handleContentChange} />
          </Field>
        </motion.div>

        {/* ── Preview column ── */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'sticky',
              top: '80px',
              padding: '1.5rem',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
            }}
          >
            <p style={{ fontSize: '0.7rem', color: 'rgba(232,232,240,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem', marginTop: 0 }}>
              Preview
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
              {tagsInput.split(/[,\s]+/).filter(Boolean).map(t => (
                <span
                  key={t}
                  style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '20px', background: 'rgba(0,103,79,0.12)', color: 'var(--accent-color)', border: '1px solid rgba(0,103,79,0.2)' }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Title preview */}
            <h2 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: 'var(--text-color)', marginTop: 0, marginBottom: '0.4rem', lineHeight: 1.3 }}>
              {title || <span style={{ opacity: 0.3 }}>Post title</span>}
            </h2>

            {/* Meta */}
            <p style={{ fontSize: '0.78rem', color: 'rgba(232,232,240,0.35)', marginBottom: '1.2rem' }}>
              {date} · {readTime} min read
            </p>

            {/* Cover image preview */}
            {coverImage && (
              <img
                src={coverImage}
                alt="Cover"
                style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem', objectFit: 'cover', maxHeight: '220px' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}

            {/* Content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: content || '<p style="opacity:0.3">Content preview…</p>' }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
