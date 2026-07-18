import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation strings
const resources = {
    en: {
        translation: {
            "nav": {
                "projects": "Projects",
                "contact": "Contact",
                "tools": "Tools",
                "accessibility_check": "Accessibility Check",
                "rates": "Rates"
            },
            "hero": {
                "name": "Danny Valdivia",
                "tagline1": "Full Stack Developer — UI/UX & Accessibility (WCAG)",
                "tagline2": ""
            },
            "about": {
                "bio": "I'm a UI/UX web developer at Bloom Growth Solutions, where I've built the front end of a multi-portal B2B SaaS platform as the sole frontend developer — from Figma prototypes to a WCAG 2.1 AA production interface. Based in Málaga, Spain, working in English and Spanish.",
                "reducing_friction_title": "Reducing Friction",
                "reducing_friction_desc": "Translating complex business logic into intuitive, high-performance digital systems.",
                "universal_design_title": "Universal Design",
                "universal_design_desc": "Specialist capability in architecting WCAG/EAA-compliant systems for products requiring high-stakes inclusivity and universal reach.",
                "strategic_optimization_title": "Strategic Optimization",
                "strategic_optimization_desc": "Trimming technical and process \"noise\" to maximize project efficacy and team velocity."
            },
            "headings": {
                "about": "About me",
                "projects": "Work & Projects",
                "contact": "Contact me"
            },
            "cards": {
                "1": { "title": "Bloom", "description": "Growth Hacking Teams Platform that connects freelancers and companies to form high-performing collaborative teams. The platform enables skill-based team formation, project collaboration, and transparent performance tracking.", "status": "Pre-MVP — not yet accessible" },
                "2": { "title": "The Yoga Game", "description": "Colorful and engaging yoga app for kids. Features multiple game modes, pose timers, and fun countdown sounds to keep children motivated and engaged." },
                "3": { "title": "SO DIVERGENT", "description": "Interactive site simulating the limitations and strengths of neurodivergent individuals." },
                "4": { "title": "ExpenseVue", "description": "Expense management application with integration to banking data." },
                "5": { "title": "TuneBuddy", "description": "Elegant instrument tuning app with standard tuning presets for guitar and ukulele, plus a built-in metronome tool." }
            },
            "accessibility_checker": {
                "title": "Accessibility Checker",
                "description": "Every website should be usable by everyone — including people who are blind, have low vision, motor difficulties, or rely on a keyboard instead of a mouse. Accessibility issues are often invisible to sighted users, but they can make a site completely unusable for others. This tool scans any public website and shows you exactly what might be blocking people from using it, in plain English — no technical knowledge needed.",
                "why_matters": "Why does it matter? Aside from being the right thing to do, accessibility is now a legal requirement in many countries under laws like the European Accessibility Act (EAA) and the ADA. Fixing these issues improves the experience for all your users, not just those with disabilities."
            },
            "rates": {
                "heading": "Need a site?",
                "select_package": "Select a Base Package",
                "selected_package": "Selected Package:",
                "add_extras": "Add Extras",
                "whatsapp_cta": "Get in contact with me through WhatsApp",
                "packages": {
                    "basic_label": "🧱 Basic Site",
                    "basic_desc": "- Up to 5 pages (e.g., Home, About, Services, Contact)\n- Mobile-friendly responsive design\n- Clean, professional layout & typography\n- Basic SEO setup (titles, meta descriptions)\n- Contact form with email delivery\n- Includes stock images or your provided photos\n- Basic accessibility best practices (alt text, clear contrast)",
                    "accessible_label": "♿ Accessible-Friendly Site",
                    "accessible_desc": "- A fully-featured website with advanced functionality\n- Integrations for e-commerce, booking, or other services\n- Comprehensive SEO setup\n- Custom design tailored to your brand\n- Advanced accessibility features (WCAG & EAA compliant)\n- WCAG/EAA-approved label displayed on the site\n- Helps avoid fines for non-compliance with the European Accessibility Act (EAA)",
                    "full_label": "🚀 Full Package",
                    "full_desc": "- A fully-featured website with advanced functionality\n- Integrations for e-commerce, booking, or other services\n- Comprehensive SEO setup\n- Custom design tailored to your brand\n- Advanced accessibility features"
                },
                "extras": {
                    "dark_mode": "🌗 Dark/Light Mode",
                    "back_to_top": "🔝 Back to Top Button",
                    "wcag_audit": "🧑‍🦯 WCAG Deep Audit",
                    "cookie_banner": "🧾 Cookie Consent Banner",
                    "legal_pages": "📃 Legal Pages",
                    "calendly": "📅 Calendly Integration",
                    "stripe": "💳 Stripe Setup",
                    "multilingual": "🌍 Multilingual Setup",
                    "email_setup": "📧 Email Setup Help",
                    "a11y_statement": "Accessibility Statement"
                },
                "whatsapp_message": "Hi Danny! I'm interested in your {{package}}. Selected extras: {{extras}}. Total price: €{{total}}.",
                "no_extras": "No extras selected"
            }
        }
    },
    es: {
        translation: {
            "nav": {
                "projects": "Proyectos",
                "contact": "Contacto",
                "tools": "Herramientas",
                "accessibility_check": "Revisión de Accesibilidad",
                "rates": "Tarifas"
            },
            "hero": {
                "name": "Danny Valdivia",
                "tagline1": "Desarrollador Full Stack — UI/UX y Accesibilidad (WCAG)",
                "tagline2": ""
            },
            "about": {
                "bio": "Soy desarrollador web UI/UX en Bloom Growth Solutions, donde he construido el front end de una plataforma SaaS B2B multi-portal como único desarrollador frontend — desde los prototipos en Figma hasta una interfaz en producción conforme a WCAG 2.1 AA. Resido en Málaga, España, y trabajo en inglés y español.",
                "reducing_friction_title": "Reduciendo la Fricción",
                "reducing_friction_desc": "Traduciendo lógica de negocio compleja en sistemas digitales intuitivos y de alto rendimiento.",
                "universal_design_title": "Diseño Universal",
                "universal_design_desc": "Capacidad especialista en la arquitectura de sistemas compatibles con WCAG/EAA para productos que requieren alta inclusión y alcance universal.",
                "strategic_optimization_title": "Optimización Estratégica",
                "strategic_optimization_desc": "Eliminando el \"ruido\" técnico y de procesos para maximizar la eficacia del proyecto y la velocidad del equipo."
            },
            "headings": {
                "about": "Sobre mí",
                "projects": "Proyectos",
                "contact": "Contáctame"
            },
            "cards": {
                "1": { "title": "Bloom", "description": "Plataforma de equipos de Growth Hacking que conecta freelancers y empresas para formar equipos colaborativos de alto rendimiento. La plataforma permite la formación de equipos basada en habilidades, la colaboración en proyectos y el seguimiento transparente del rendimiento.", "status": "Pre-MVP — aún no accesible" },
                "2": { "title": "The Yoga Game", "description": "App de yoga colorida y dinámica para niños. Incluye varios modos de juego, temporizadores de posturas y divertidos sonidos de cuenta regresiva para mantener a los niños motivados y entretenidos." },
                "3": { "title": "SO DIVERGENT", "description": "Sitio interactivo que simula las limitaciones y fortalezas de personas neurodivergentes." },
                "4": { "title": "ExpenseVue", "description": "Aplicación de gestión de gastos con integración a datos bancarios." },
                "5": { "title": "TuneBuddy", "description": "Elegante app de afinación de instrumentos con presets de afinación estándar para guitarra y ukelele, además de un metrónomo incorporado." }
            },
            "accessibility_checker": {
                "title": "Comprobador de Accesibilidad",
                "description": "Cualquier sitio web debería poder usarlo cualquier persona — incluyendo personas ciegas, con baja visión, dificultades motoras, o que usan el teclado en lugar del ratón. Los problemas de accesibilidad suelen ser invisibles para los usuarios videntes, pero pueden hacer que un sitio sea completamente inutilizable para otros. Esta herramienta analiza cualquier sitio web público y te muestra exactamente qué podría estar impidiendo que la gente lo use, en un lenguaje sencillo — sin necesidad de conocimientos técnicos.",
                "why_matters": "¿Por qué es importante? Además de ser lo correcto, la accesibilidad es ahora un requisito legal en muchos países bajo leyes como la Ley Europea de Accesibilidad (EAA) y la ADA. Corregir estos problemas mejora la experiencia para todos tus usuarios, no solo para los que tienen discapacidades."
            },
            "rates": {
                "heading": "¿Necesitas un sitio web?",
                "select_package": "Selecciona un paquete base",
                "selected_package": "Paquete seleccionado:",
                "add_extras": "Añadir extras",
                "whatsapp_cta": "Contáctame por WhatsApp",
                "packages": {
                    "basic_label": "🧱 Sitio Básico",
                    "basic_desc": "- Hasta 5 páginas (p. ej., Inicio, Sobre mí, Servicios, Contacto)\n- Diseño responsive adaptado a móviles\n- Maquetación limpia y tipografía profesional\n- SEO básico (títulos, meta descripciones)\n- Formulario de contacto con entrega por correo\n- Incluye imágenes de stock o tus propias fotos\n- Buenas prácticas básicas de accesibilidad (texto alternativo, contraste adecuado)",
                    "accessible_label": "♿ Sitio Accesible",
                    "accessible_desc": "- Sitio web completo con funcionalidad avanzada\n- Integraciones para e-commerce, reservas u otros servicios\n- SEO completo\n- Diseño personalizado adaptado a tu marca\n- Funciones avanzadas de accesibilidad (cumplimiento WCAG y EAA)\n- Sello WCAG/EAA visible en el sitio\n- Ayuda a evitar multas por incumplimiento de la Ley Europea de Accesibilidad (EAA)",
                    "full_label": "🚀 Paquete Completo",
                    "full_desc": "- Sitio web completo con funcionalidad avanzada\n- Integraciones para e-commerce, reservas u otros servicios\n- SEO completo\n- Diseño personalizado adaptado a tu marca\n- Funciones avanzadas de accesibilidad"
                },
                "extras": {
                    "dark_mode": "🌗 Modo Oscuro/Claro",
                    "back_to_top": "🔝 Botón Volver Arriba",
                    "wcag_audit": "🧑‍🦯 Auditoría WCAG Profunda",
                    "cookie_banner": "🧾 Banner de Cookies",
                    "legal_pages": "📃 Páginas Legales",
                    "calendly": "📅 Integración con Calendly",
                    "stripe": "💳 Configuración de Stripe",
                    "multilingual": "🌍 Configuración Multilingüe",
                    "email_setup": "📧 Configuración de Correo",
                    "a11y_statement": "Declaración de Accesibilidad"
                },
                "whatsapp_message": "¡Hola Danny! Estoy interesado/a en tu {{package}}. Extras seleccionados: {{extras}}. Precio total: €{{total}}.",
                "no_extras": "Sin extras seleccionados"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // react already safes from xss
        }
    });

export default i18n;
