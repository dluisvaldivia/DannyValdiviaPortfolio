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
                "rates": "Rates",
                "skip": "Skip to content"
            },
            "hero": {
                "name": "Danny Valdivia",
                "headline": "User experience that works for everyone",
                "tagline1": "Full Stack Developer - UI/UX & Accessibility",
                "tagline2": ""
            },
            "about": {
                "eyebrow": "Get to know me",
                "bio": "Web developer focused on interfaces, user experience, and accessibility.\nI started young, repairing computers and installing operating systems. Later I studied graphic design, then systems administration, and spent several years training professionals. Today I build web applications, where the visual and the technical come together as one.\nI learn fast. When something doesn't work the way it should, I dig into it until I understand it, and when I need to explain it to someone, I do it without jargon.\nI currently live in Málaga, Spain, and work in English and Spanish.",
                "linkedin_cta": "Visit me on LinkedIn"
            },
            "headings": {
                "about": "About me",
                "projects": "Work & Projects",
                "contact": "Let's build something"
            },
            "projects": {
                "eyebrow": "What I've built",
                "github_cta": "View more on GitHub",
                "github_cta_aria": "Danny's GitHub - open source work"
            },
            "contact": {
                "eyebrow": "Contact me",
                "form_aria": "Contact form",
                "name_label": "Your Name",
                "name_placeholder": "Jane Smith",
                "email_label": "Email Address",
                "email_placeholder": "jane@example.com",
                "message_label": "Your Message",
                "message_placeholder": "Tell me about your project or question...",
                "send": "Send Message",
                "sending": "Sending message...",
                "sent": "Sent!",
                "sent_aria": "Message sent",
                "success": "Message sent! I'll be in touch soon.",
                "error": "Something went wrong. Please try again or email me directly.",
                "privacy": "Your data is used solely to respond to your message and will never be shared with third parties."
            },
            "social": {
                "find_me": "or find me on",
                "linkedin_title": "LinkedIn",
                "linkedin_sub": "Professional profile",
                "linkedin_label": "Danny's LinkedIn",
                "github_title": "GitHub",
                "github_sub": "Code & projects",
                "github_label": "Danny's GitHub",
                "calendly_title": "Calendly",
                "calendly_sub": "Book a 30-min call",
                "calendly_label": "Schedule time with Danny"
            },
            "cards": {
                "visit": "Visit {{title}}",
                "visit_aria": "Visit {{title}}, opens in new tab",
                "1": { "title": "Bloom", "description": "Growth Hacking Teams Platform that connects freelancers and companies to form high-performing collaborative teams. The platform enables skill-based team formation, project collaboration, and transparent performance tracking.", "status": "Pre-MVP - login unavailable" },
                "2": { "title": "The Yoga Game", "description": "Colorful and engaging yoga app for kids. Features multiple game modes, pose timers, and fun countdown sounds to keep children motivated and engaged." },
                "4": { "title": "ExpenseVue", "description": "Expense management application with integration to banking data." },
                "5": { "title": "TuneBuddy", "description": "Elegant instrument tuning app with standard tuning presets for guitar and ukulele, plus a built-in metronome tool." }
            },
            "accessibility_checker": {
                "title": "Accessibility Checker",
                "description": "A website should be usable by everyone, including people who have a disability, whether congenital or acquired.",
                "description_scan": "This checker, with the help of WAVE API, scans any public website and shows you exactly what might be blocking people from using it, in plain English, no technical knowledge needed.",
                "why_matters": "Why does it matter? Aside from being the right thing to do, accessibility is now a legal requirement in many countries under laws like the European Accessibility Act (EAA) and the Americans with Disabilities Act (ADA). Fixing these issues improves the experience for all your users, not just those with disabilities.",
                "url_label": "Website URL to check",
                "check_cta": "Check your site",
                "checking": "Checking...",
                "fetch_error": "Failed to fetch report. Please check the URL and try again."
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
                "rates": "Tarifas",
                "skip": "Saltar al contenido"
            },
            "hero": {
                "name": "Danny Valdivia",
                "headline": "Experiencia de usuario que funciona para todos",
                "tagline1": "Desarrollador Full Stack - UI/UX y Accesibilidad",
                "tagline2": ""
            },
            "about": {
                "eyebrow": "Conóceme",
                "bio": "Desarrollador web centrado en interfaces, experiencia de usuario y accesibilidad.\nEmpecé de joven reparando equipos e instalando sistemas operativos. Luego estudié diseño gráfico, más tarde administración de sistemas, y pasé varios años formando a profesionales. Hoy construyo aplicaciones web, donde lo visual y lo técnico van en la misma pieza.\nAprendo rápido. Cuando algo no funciona como debería, lo investigo hasta entenderlo, y cuando hay que explicárselo a alguien, lo hago sin tecnicismos.\nActualmente resido en Málaga, España, y trabajo en inglés y español.",
                "linkedin_cta": "Visítame en LinkedIn"
            },
            "headings": {
                "about": "Sobre mí",
                "projects": "Proyectos",
                "contact": "Construyamos algo"
            },
            "projects": {
                "eyebrow": "Lo que he construido",
                "github_cta": "Ver más en GitHub",
                "github_cta_aria": "GitHub de Danny - proyectos open source"
            },
            "contact": {
                "eyebrow": "Contáctame",
                "form_aria": "Formulario de contacto",
                "name_label": "Tu nombre",
                "name_placeholder": "María García",
                "email_label": "Correo electrónico",
                "email_placeholder": "maria@ejemplo.com",
                "message_label": "Tu mensaje",
                "message_placeholder": "Cuéntame sobre tu proyecto o consulta...",
                "send": "Enviar mensaje",
                "sending": "Enviando mensaje...",
                "sent": "¡Enviado!",
                "sent_aria": "Mensaje enviado",
                "success": "¡Mensaje enviado! Te responderé pronto.",
                "error": "Algo salió mal. Inténtalo de nuevo o escríbeme directamente por correo.",
                "privacy": "Tus datos se usan únicamente para responder a tu mensaje y nunca se compartirán con terceros."
            },
            "social": {
                "find_me": "o encuéntrame en",
                "linkedin_title": "LinkedIn",
                "linkedin_sub": "Perfil profesional",
                "linkedin_label": "LinkedIn de Danny",
                "github_title": "GitHub",
                "github_sub": "Código y proyectos",
                "github_label": "GitHub de Danny",
                "calendly_title": "Calendly",
                "calendly_sub": "Reserva una llamada de 30 min",
                "calendly_label": "Agenda una llamada con Danny"
            },
            "cards": {
                "visit": "Visitar {{title}}",
                "visit_aria": "Visitar {{title}}, se abre en una pestaña nueva",
                "1": { "title": "Bloom", "description": "Plataforma de equipos de Growth Hacking que conecta freelancers y empresas para formar equipos colaborativos de alto rendimiento. La plataforma permite la formación de equipos basada en habilidades, la colaboración en proyectos y el seguimiento transparente del rendimiento.", "status": "Pre-MVP - inicio de sesión no disponible" },
                "2": { "title": "The Yoga Game", "description": "App de yoga colorida y dinámica para niños. Incluye varios modos de juego, temporizadores de posturas y divertidos sonidos de cuenta regresiva para mantener a los niños motivados y entretenidos." },
                "4": { "title": "ExpenseVue", "description": "Aplicación de gestión de gastos con integración a datos bancarios." },
                "5": { "title": "TuneBuddy", "description": "Elegante app de afinación de instrumentos con presets de afinación estándar para guitarra y ukelele, además de un metrónomo incorporado." }
            },
            "accessibility_checker": {
                "title": "Comprobador de Accesibilidad",
                "description": "Un sitio web debería poder usarlo cualquier persona, incluyendo quienes tienen una discapacidad, ya sea congénita o adquirida.",
                "description_scan": "Este comprobador, con la ayuda de WAVE API, analiza cualquier sitio web público y te muestra exactamente qué podría estar impidiendo que la gente lo use, en un lenguaje sencillo, sin necesidad de conocimientos técnicos.",
                "why_matters": "¿Por qué es importante? Además de ser lo correcto, la accesibilidad es ahora un requisito legal en muchos países bajo leyes como la Ley Europea de Accesibilidad (EAA) y la Ley de Estadounidenses con Discapacidades (ADA). Corregir estos problemas mejora la experiencia para todos tus usuarios, no solo para los que tienen discapacidades.",
                "url_label": "URL del sitio web a analizar",
                "check_cta": "Analiza tu sitio",
                "checking": "Analizando...",
                "fetch_error": "No se pudo obtener el informe. Comprueba la URL e inténtalo de nuevo."
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

// Keep <html lang> in sync with the active language (WCAG 3.1.1)
const syncHtmlLang = (lng: string) => {
    document.documentElement.lang = lng.split('-')[0];
};
syncHtmlLang(i18n.language || 'en');
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
