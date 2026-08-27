import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import enFlag from '../../assets/EN.png';
import esFlag from '../../assets/SP.png';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isEnglish = i18n.language.startsWith('en');
  const toggleLanguage = () => i18n.changeLanguage(isEnglish ? 'es' : 'en');

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/#contact', label: t('nav.contact') },
    { to: '/free-tools/accessibility-checker', label: t('nav.accessibility_check') },
  ];

  const handleNavClick = (to: string) => {
    if (!to.includes('#')) window.scrollTo(0, 0);
  };

  return (
    <>
      {/* ── Desktop nav (≥640px) ── */}
      <nav className="nav-wrapper hidden sm:flex w-full items-center">
        <Link to="/" className="nav-item" aria-label="Home" onClick={() => window.scrollTo(0, 0)}>
          <FaHome style={{ fontSize: '1.25rem' }} aria-hidden="true" />
        </Link>

        {navLinks.map(link => (
          <Link key={link.to} to={link.to} className="nav-item" onClick={() => handleNavClick(link.to)}>
            {link.label}
          </Link>
        ))}

        <button
          className="nav-item flex items-center gap-2"
          onClick={toggleLanguage}
          title={isEnglish ? 'Switch to Spanish' : 'Switch to English'}
        >
          <img
            src={isEnglish ? enFlag : esFlag}
            alt={isEnglish ? 'English' : 'Spanish'}
            style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
          <span>{isEnglish ? 'EN' : 'ES'}</span>
        </button>
      </nav>

      {/* ── Mobile nav (<640px) ── */}
      <nav className="nav-wrapper sm:hidden flex w-full items-center justify-between px-4">
        <Link to="/" aria-label="Home" onClick={() => { window.scrollTo(0, 0); setIsOpen(false); }}
          className="nav-item flex-none w-auto px-2 h-[60px]">
          <FaHome style={{ fontSize: '1.25rem' }} aria-hidden="true" />
        </Link>

        <div className="flex items-center gap-1">
          <button
            className="nav-item flex-none w-auto px-3 h-[60px] flex items-center gap-2"
            onClick={toggleLanguage}
            title={isEnglish ? 'Switch to Spanish' : 'Switch to English'}
          >
            <img
              src={isEnglish ? enFlag : esFlag}
              alt={isEnglish ? 'English' : 'Spanish'}
              style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }}
            />
          </button>

          <button
            className="nav-item flex-none w-auto px-3 h-[60px] flex items-center"
            onClick={() => setIsOpen(v => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {isOpen ? <FaTimes style={{ fontSize: '1.1rem' }} /> : <FaBars style={{ fontSize: '1.1rem' }} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu sm:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="nav-item"
                onClick={() => handleNavClick(link.to)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
