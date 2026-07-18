import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import whatsappIcon from '../../assets/icons8-whatsapp.svg';
import usePageTitle from '../../hooks/usePageTitle';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const CATEGORY_META: Record<string, { label: string; description: string }> = {
    error:     { label: 'Broken things',          description: 'Elements that completely block users with assistive technology.' },
    contrast:  { label: 'Hard to read',           description: 'Text with colour contrast too low for many people to read.' },
    alert:     { label: 'Possible issues',         description: 'Things that might be barriers — a human needs to confirm.' },
    feature:   { label: 'Accessibility features', description: 'Good stuff already helping people who use assistive technology.' },
    structure: { label: 'Page structure',          description: 'Headings and landmarks — how screen readers navigate your page.' },
    aria:      { label: 'Screen reader support',  description: 'Code giving extra context to screen readers. Missing values confuse blind users.' },
};

const AccessibilityChecker = () => {
    const { t } = useTranslation();
    usePageTitle('Accessibility Checker');
    const [url, setUrl] = useState('');
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);

    const handleCheck = async () => {
        if (!url) return;
        setLoading(true);
        setError(null);
        setReport(null);
        setDetailOpen(false);

        const apiKey = import.meta.env.VITE_WAVE_API_KEY;
        const apiUrl = `https://wave.webaim.org/api/request?key=${apiKey}&url=${encodeURIComponent(url)}&reporttype=2`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.status?.success === false) {
                setError(data.status.error || "An error occurred");
            } else {
                setReport(data);
            }
        } catch (err) {
            setError("Failed to fetch report. Please check the URL and try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const scrollToSection = (id: string) => {
        const el = document.getElementById(`section-${id}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const openAndScrollTo = (id: string) => {
        setDetailOpen(true);
        setTimeout(() => scrollToSection(id), 350);
    };

    const colors: any = {
        error: "border-red-500 text-red-500 hover:bg-red-500/10",
        contrast: "border-orange-500 text-orange-500 hover:bg-orange-500/10",
        alert: "border-yellow-500 text-yellow-500 hover:bg-yellow-500/10",
        feature: "border-green-500 text-green-500 hover:bg-green-500/10",
        structure: "border-blue-500 text-blue-500 hover:bg-blue-500/10",
        aria: "border-purple-500 text-purple-500 hover:bg-purple-500/10"
    };

    const sectionAccent: any = {
        error: "text-red-400",
        contrast: "text-orange-400",
        alert: "text-yellow-400",
        feature: "text-green-400",
        structure: "text-blue-400",
        aria: "text-purple-400"
    };

    const totalIssues = report
        ? ['error', 'contrast', 'alert'].reduce((sum, key) => sum + (report.categories?.[key]?.count ?? 0), 0)
        : 0;

    const summaryHeadline = totalIssues === 0
        ? 'Great news — no critical issues were detected on this page.'
        : `This page has ${totalIssues} issue${totalIssues !== 1 ? 's' : ''} that could prevent people from using it.`;

    const whatsappClick = () => {
        const cats = report.categories;
        const summary = Object.entries(cats)
            .map(([k, v]: [string, any]) => `${v.count} ${k}`)
            .join(', ');
        const message = `Hi Danny! I just scanned ${url} with your Accessibility Checker. The report returned: ${summary}. Can you help me improve it?`;
        window.open(`https://wa.me/34615193280?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Ambient glow */}
            <div
                aria-hidden
                style={{
                    position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1,
                    background: 'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(0,103,79,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 35% at 20% 80%, rgba(34,34,247,0.06) 0%, transparent 70%)',
                }}
            />

            <motion.div
                initial="hidden"
                animate="visible"
                className="px-4 md:px-8 py-8 mx-auto w-full max-w-[900px]"
            >
                <div className="accessibility-checker-container">
                    <motion.h1
                        variants={fadeUp}
                        custom={0}
                        className="gradient-text font-black tracking-tight text-center"
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1, marginBottom: '0.5rem', color: '#ffffff' }}
                    >
                        {t('accessibility_checker.title')}
                    </motion.h1>
                    <div className="shimmer-line mb-10" />

                    <div className="ac-description">
                        <p>{t('accessibility_checker.description')}</p>
                        <p className="ac-description-why">{t('accessibility_checker.why_matters')}</p>
                    </div>

                    <div className="ac-input-group">
                        <label htmlFor="site-url" className="sr-only">Website URL to check</label>
                        <input
                            id="site-url"
                            type="text"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                        />
                        <button className="button-primary" onClick={handleCheck} disabled={loading}>
                            {loading ? "Checking..." : "Check your site"}
                        </button>
                    </div>

                    {loading && (
                        <div className="flex flex-col items-center justify-center mt-12 gap-4 text-text">
                            <div className="w-14 h-14 rounded-full border-4 border-gray-700 border-t-accent animate-spin"></div>
                            <p className="text-lg text-gray-400 animate-pulse">Scanning accessibility…</p>
                        </div>
                    )}

                    {error && <div className="ac-error-message">{error}</div>}

                    {report && report.categories && (
                        <div className="mt-8 w-full max-w-5xl mx-auto">
                            <h2 className="text-2xl font-bold mb-6 text-center text-text">
                                Report for: <span className="font-normal" style={{ color: '#00674F' }}>{url}</span>
                            </h2>

                            {/* Plain-language summary banner */}
                            <motion.div
                                className="ac-plain-banner"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            >
                                <p className="ac-plain-summary">{summaryHeadline}</p>
                                <button className="whatsapp-button" onClick={whatsappClick}>
                                    <img
                                        src={whatsappIcon}
                                        alt="WhatsApp"
                                        style={{ width: '28px', height: '28px', marginRight: '12px' }}
                                    />
                                    See how I can help you
                                </button>
                            </motion.div>

                            {/* Summary grid — grouped */}
                            {(() => {
                                const groups = [
                                    {
                                        keys: ['error', 'contrast', 'alert'],
                                        label: 'Issues',
                                        sublabel: 'Things that may prevent people from using this page.',
                                        labelColor: 'text-red-400',
                                    },
                                    {
                                        keys: ['feature'],
                                        label: "What's working",
                                        sublabel: 'Accessibility features already helping your users.',
                                        labelColor: 'text-green-400',
                                    },
                                    {
                                        keys: ['structure', 'aria'],
                                        label: 'Page details',
                                        sublabel: "An overview of your page's structure and screen reader support. More items isn't bad — it just means more to review.",
                                        labelColor: 'text-blue-400',
                                    },
                                ];

                                const renderCard = (key: string, category: any) => {
                                    const colorClass = colors[key] || "border-gray-500 text-gray-500 hover:bg-gray-500/10";
                                    const hasItems = category.items && Object.keys(category.items).length > 0;
                                    const meta = CATEGORY_META[key];
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => hasItems && openAndScrollTo(key)}
                                            disabled={!hasItems}
                                            title={hasItems ? `Jump to ${key} details` : `No ${key} items found`}
                                            className={`border p-5 flex flex-col items-center justify-center text-center transition-all duration-200 ${colorClass} ${hasItems ? 'cursor-pointer' : 'opacity-60 cursor-default'}`}
                                            style={{ background: '#111118', borderRadius: '6px' }}
                                        >
                                            <h4 className="text-base font-bold mb-1">{meta?.label ?? key}</h4>
                                            <p className="text-4xl font-black my-1">{category.count || 0}</p>
                                            {meta && (
                                                <p className="text-xs mt-1 leading-snug px-1" style={{ color: 'rgba(232,232,240,0.45)' }}>
                                                    {meta.description}
                                                </p>
                                            )}
                                            {hasItems && <span className="text-xs mt-2 opacity-60">↓ See details</span>}
                                        </button>
                                    );
                                };

                                return groups.map(group => (
                                    <div key={group.label} className="mb-6">
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <span className={`text-sm font-bold uppercase tracking-widest ${group.labelColor}`}>{group.label}</span>
                                            <span className="text-xs" style={{ color: 'rgba(232,232,240,0.4)' }}>{group.sublabel}</span>
                                        </div>
                                        <div className={`grid gap-4 ${group.keys.length === 1 ? 'grid-cols-1' : group.keys.length === 2 ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-3'}`}>
                                            {group.keys.map(key => report.categories[key] ? renderCard(key, report.categories[key]) : null)}
                                        </div>
                                    </div>
                                ));
                            })()}

                            {/* Collapsible detail toggle */}
                            <button
                                className="ac-detail-toggle"
                                onClick={() => setDetailOpen(v => !v)}
                                aria-expanded={detailOpen}
                            >
                                Technical details
                                <motion.span
                                    animate={{ rotate: detailOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ display: 'inline-flex' }}
                                >
                                    ▾
                                </motion.span>
                            </button>

                            <AnimatePresence>
                                {detailOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <h3 className="text-xl font-bold mb-4 mt-6 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            Detailed Breakdown
                                        </h3>
                                        <div className="space-y-6 mb-8">
                                            {Object.entries(report.categories).map(([catKey, category]: [string, any]) => {
                                                if (!category.items || Object.keys(category.items).length === 0) return null;
                                                const accent = sectionAccent[catKey] || "text-gray-300";

                                                return (
                                                    <div
                                                        id={`section-${catKey}`}
                                                        key={catKey}
                                                        className="p-5 scroll-mt-20"
                                                        style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px' }}
                                                    >
                                                        <h4 className={`text-lg font-bold capitalize mb-4 flex items-center ${accent}`}>
                                                            <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                                                            {CATEGORY_META[catKey]?.label ?? catKey.replace('_', ' ')} Issues ({category.count})
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {Object.entries(category.items).map(([itemKey, item]: [string, any]) => (
                                                                <div
                                                                    key={itemKey}
                                                                    className="p-4"
                                                                    style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', background: 'rgba(255,255,255,0.02)' }}
                                                                >
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <strong className="text-gray-100 text-sm font-mono">{item.id || itemKey.replace(/_/g, ' ')}</strong>
                                                                        <span className="text-xs px-2 py-1 font-mono ml-2 shrink-0" style={{ background: 'rgba(255,255,255,0.06)', color: '#e8e8f0', borderRadius: '3px' }}>×{item.count}</span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-400">{item.description}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AccessibilityChecker;
