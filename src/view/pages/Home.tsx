import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CardsList from '../components/cardList';
import linkedinIcon from '../../assets/linkedin.svg';
import githubIcon from '../../assets/github-light.svg';
import calendlyIcon from '../../assets/calendly.svg';
import { LuExternalLink } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import laptopBg from '../../assets/image-of-laptop-screen-with-computer-code.webp';
import DataGridHero from '../../components/data-grid-hero';
import usePageTitle from '../../hooks/usePageTitle';

declare global {
  interface Window { Calendly: any; }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

type SocialLink = {
  key: 'linkedin' | 'github' | 'calendly';
  href: string;
  icon?: string;
  IconComp?: IconType;
  isCalendly?: boolean;
};

const socialLinks: SocialLink[] = [
  { key: 'linkedin', href: 'https://www.linkedin.com/in/dannyvaldivia/', icon: linkedinIcon },
  { key: 'github', href: 'https://github.com/dluisvaldivia', icon: githubIcon },
  { key: 'calendly', href: 'https://calendly.com/dluis-valdivia/30min', icon: calendlyIcon, isCalendly: true },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const { t } = useTranslation();
  usePageTitle();
  const location = useLocation();

  // Scroll to #projects / #contact when navigated to via a hash link
  useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (!el) return;
    const behavior: ScrollBehavior =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    requestAnimationFrame(() => el.scrollIntoView({ behavior }));
  }, [location]);

  // Bio is authored as one string per locale; each line is its own paragraph
  const aboutParagraphs = t('about.bio').split('\n').map(p => p.trim()).filter(Boolean);

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === 'loading') return;
    if (!formValues.name.trim() || !formValues.email.trim() || !formValues.message.trim()) return;
    setFormStatus('loading');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formValues.name,
          email: formValues.email,
          message: formValues.message,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setFormStatus('success');
      setFormValues({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 6000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 6000);
    }
  };

  const openCalendly = (e: React.MouseEvent) => {
    if (!window.Calendly) return; // widget blocked/unavailable, follow the plain link instead
    e.preventDefault();
    window.Calendly.initPopupWidget({ url: 'https://calendly.com/dluis-valdivia/30min' });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') window.Calendly?.closePopupWidget();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="px-4 md:px-8 py-8 mx-auto w-full max-w-[1400px]" style={{ position: 'relative', zIndex: 1 }}>

      {/* ── HERO ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '2rem' }}
      >
        <DataGridHero
          rows={22}
          cols={40}
          spacing={3}
          duration={5.0}
          color="#00674F"
          animationType="pulse"
          pulseEffect={true}
          mouseGlow={true}
          opacityMin={0.05}
          opacityMax={0.55}
          background="#0a0a0f"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h1hero gradient-text font-bold tracking-tight mb-8 text-left w-fit self-start mx-2 px-4 md:mx-10 md:px-10"
            style={{ fontFamily: "'Zen Dots', sans-serif", textTransform: 'uppercase' }}
          >
            {t('hero.name')}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-4xl font-semibold uppercase tracking-wide mb-3 pt-2 text-left w-fit self-start mx-2 px-4 md:mx-10 md:px-10"
            style={{ color: '#ffffff' }}
          >
            <span className="inline-block origin-bottom scale-y-125">
              {t('hero.headline')}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl font-light mb-3 text-left w-fit self-start mx-2 px-4 md:mx-10 md:px-10"
            style={{ color: 'rgba(255,255,255,0.72)' }}
          >
            {t('hero.tagline1')}
          </motion.p>

        </DataGridHero>
      </motion.div>

<div className="shimmer-line" />

      {/* ── PROJECTS ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mb-14 relative overflow-hidden"
        style={{ borderRadius: '6px' }}
        aria-labelledby="projects"
      >
        <div
          aria-hidden
          style={{
            backgroundImage: `url(${laptopBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px) brightness(0.12) saturate(0.4)',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            transform: 'scale(1.05)',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(135deg, rgba(0,103,79,0.07) 0%, rgba(34,34,247,0.05) 100%)',
          }}
        />
        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          <motion.p variants={fadeUp} className="section-eyebrow">
            {t('projects.eyebrow')}
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} id="projects" className="section-heading">
            {t('headings.projects')}
          </motion.h2>
          <div className="shimmer-line" />
          <CardsList />
          <div className="flex justify-center mt-10 my-5">
            <a
              href="https://github.com/dluisvaldivia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('projects.github_cta_aria')}
              className="button-primary cursor-pointer no-underline flex items-center gap-3 text-base px-8 py-4"
            >
              <img src={githubIcon} alt="GitHub" className="w-6 h-6" />
              {t('projects.github_cta')}
              <LuExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.section>

      <div className="shimmer-line" />

      {/* ── ABOUT ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="about-section mb-14"
        aria-labelledby="about"
      >
        <div className="about-bg-glow" aria-hidden="true" />

        <div className="about-inner">
          <motion.p variants={fadeUp} className="section-eyebrow">
            {t('about.eyebrow')}
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} id="about" className="section-heading">
            {t('headings.about')}
          </motion.h2>
          <div className="shimmer-line" />

          <motion.div variants={fadeUp} custom={2} className="about-bio">
            {aboutParagraphs.map((para, i) => (
              <p key={i} className={i === 0 ? 'about-lede' : undefined}>{para}</p>
            ))}
          </motion.div>

          <div className="flex justify-center">
            <motion.a
              variants={fadeUp}
              custom={3}
              href="https://www.linkedin.com/in/dannyvaldivia/"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary cursor-pointer no-underline inline-flex items-center gap-3 text-base px-8 py-4 w-fit"
            >
              <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
              {t('about.linkedin_cta')}
              <LuExternalLink className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </motion.section>

      <div className="shimmer-line" />

      {/* ── CONTACT ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="contact-section mb-8"
        aria-labelledby="contact"
      >
        <div className="contact-bg-glow" aria-hidden="true" />

        <div className="contact-inner">
          <motion.div variants={fadeUp} className="contact-heading-block">
            <p className="contact-eyebrow">{t('contact.eyebrow')}</p>
            <h2 id="contact" className="contact-heading">{t('headings.contact')}</h2>
          </motion.div>

          <div className="shimmer-line" />

          <motion.div variants={fadeUp} custom={1} className="contact-form-card">
            <form onSubmit={handleContactSubmit} aria-label={t('contact.form_aria')}>
              <div className="contact-fields-row">
                <div className="contact-field-group">
                  <label htmlFor="contact-name" className="contact-label">{t('contact.name_label')}</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder={t('contact.name_placeholder')}
                    required
                    autoComplete="name"
                    value={formValues.name}
                    onChange={handleFieldChange}
                    disabled={formStatus === 'loading' || formStatus === 'success'}
                    className="contact-input"
                  />
                </div>
                <div className="contact-field-group">
                  <label htmlFor="contact-email" className="contact-label">{t('contact.email_label')}</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder={t('contact.email_placeholder')}
                    required
                    autoComplete="email"
                    value={formValues.email}
                    onChange={handleFieldChange}
                    disabled={formStatus === 'loading' || formStatus === 'success'}
                    className="contact-input"
                  />
                </div>
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-message" className="contact-label">{t('contact.message_label')}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder={t('contact.message_placeholder')}
                  rows={7}
                  required
                  value={formValues.message}
                  onChange={handleFieldChange}
                  disabled={formStatus === 'loading' || formStatus === 'success'}
                  className="contact-input contact-textarea"
                />
              </div>

              {formStatus === 'success' && (
                <motion.div
                  role="status"
                  aria-live="polite"
                  className="contact-feedback contact-feedback--success"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <span aria-hidden="true">✓</span> {t('contact.success')}
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  role="alert"
                  aria-live="assertive"
                  className="contact-feedback contact-feedback--error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <span aria-hidden="true">⚠</span> {t('contact.error')}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={formStatus === 'loading' || formStatus === 'success'}
                className="contact-submit"
                aria-label={
                  formStatus === 'loading' ? t('contact.sending') :
                  formStatus === 'success' ? t('contact.sent_aria') : t('contact.send')
                }
              >
                {formStatus === 'loading'
                  ? <span className="contact-spinner" aria-hidden="true" />
                  : formStatus === 'success'
                  ? t('contact.sent')
                  : t('contact.send')}
              </button>
            </form>

            <p className="contact-privacy">
              {t('contact.privacy')}
            </p>
          </motion.div>
        </div>

        {/* ── SOCIAL LINKS ── */}
        <div className="mt-16 mb-4">
          <p
            className="text-center text-xs uppercase tracking-widest mb-8"
            style={{ color: '#ffffff' }}
          >
            {t('social.find_me')}
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {socialLinks.map((s, i) => (
              <motion.a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(`social.${s.key}_label`)}
                onClick={s.isCalendly ? openCalendly : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: 'easeOut' }}
                className="flex items-center gap-4 px-6 py-4 w-full sm:w-auto sm:min-w-[180px]"
                style={{
                  background: '#111118',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(0,103,79,0.7)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 0 1px rgba(0,103,79,0.15), 0 4px 24px rgba(0,103,79,0.12)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                }}
              >
                {s.IconComp ? (
                  <s.IconComp aria-hidden="true" className="w-9 h-9 shrink-0" style={{ color: '#00a880' }} />
                ) : (
                  <img src={s.icon} alt={t(`social.${s.key}_title`)} className="w-9 h-9 shrink-0" />
                )}
                <div>
                  <p className="font-bold text-white text-sm">{t(`social.${s.key}_title`)}</p>
                  <p className="text-xs" style={{ color: 'rgba(232,232,240,0.7)' }}>{t(`social.${s.key}_sub`)}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
