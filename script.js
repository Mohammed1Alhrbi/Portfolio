document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Translations Data ---
    const translations = {
        en: {
            title: "Mohammed Al-Harbi | Portfolio",
            nav_home: "Home",
            nav_about: "About Me",
            nav_skills: "Skills",
            nav_tools: "Tools",
            nav_projects: "Projects",
            nav_contact: "Contact",
            btn_cv: "Download CV",
            hero_name_1: "MOHAMMED",
            hero_name_2: "AL-HARBI",
            hero_title: "Full Stack Developer",
            hero_subtitle: "Network Systems Management Graduate",
            about_title: "About Me",
            about_text: "I have a background in Network Systems Management and Web Development. I work on building Full Stack applications using modern technologies, with a strong focus on application security and input validation.",
            skills_title: "Technical Skills",
            skill_cat_backend: "Backend Development",
            skill_cat_frontend: "Frontend Development",
            skill_cat_api: "API Development",
            skill_cat_security: "Web Security (Basics)",
            tools_title: "Tools",
            projects_title: "Projects",
            proj_status: "Work In Progress / Under Development",
            proj_1_title: "Admin Dashboard for Real Estate Management",
            proj_1_desc: "A real estate management dashboard displaying property details and statistics in a clear and organized way.",
            view_code: "View Code",
            contact_title: "Get In Touch",
            btn_send: "SEND MESSAGE",
            placeholder_name: "Your Name",
            placeholder_email: "Your Email",
            placeholder_message: "Your Message"
        },
        ar: {
            title: "محمد الحربي | معرض الأعمال",
            nav_home: "الرئيسية",
            nav_about: "من أنا",
            nav_skills: "المهارات",
            nav_tools: "الأدوات",
            nav_projects: "المشاريع",
            nav_contact: "تواصل معي",
            btn_cv: "تحميل السيرة الذاتية",
            hero_name_1: "محمد",
            hero_name_2: "الحربي",
            hero_title: "مطور ويب متكامل (Full Stack)",
            hero_subtitle: "خريج إدارة أنظمة الشبكات",
            about_title: "من أنا",
            about_text: "لدي خلفية في إدارة أنظمة الشبكات وتطوير الويب، وأعمل على بناء تطبيقات Full Stack باستخدام تقنيات حديثة، مع الاهتمام بأمن التطبيقات والتحقق من المدخلات.",
            skills_title: "المهارات التقنية",
            skill_cat_backend: "تطوير الباك اند (Backend)",
            skill_cat_frontend: "تطوير الفرونت اند (Frontend)",
            skill_cat_api: "تطوير الـ APIs",
            skill_cat_security: "أمن الويب (أساسيات)",
            tools_title: "الأدوات",
            projects_title: "المشاريع",
            proj_status: "قيد التقدم / تحت التطوير",
            proj_1_title: "  لوحة تحكم لأدارة العقارات",
            proj_1_desc: "لوحة تحكم لإدارة الأراضي والعقارات: تعرض قائمة العقارات، تفاصيلها، أسعارها، المساحات، والموقع، مع إمكانية إضافة وتعديل وحذف البيانات، وعرض إحصائيات عامة عن عدد العقارات، المساحات، أو أسعار البيع/الإيجار.",
            view_code: "عرض الكود",
            contact_title: "تواصل معي",
            btn_send: "إرسال الرسالة",
            placeholder_name: "الاسم",
            placeholder_email: "البريد الإلكتروني",
            placeholder_message: "رسالتك"
        }
    };

    let currentLang = localStorage.getItem('lang') || 'ar';

    // --- 2. Scroll Reveal ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        revealObserver.observe(el);
    });

    // --- 4. Language Switching Logic ---
    const updateLanguage = (lang) => {
        const html = document.documentElement;
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (el.classList.contains('glitch')) {
                    el.setAttribute('data-text', translations[lang][key]);
                }
                el.innerText = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        const langBtn = document.querySelector('#lang-toggle');
        if (langBtn) langBtn.innerText = lang === 'en' ? 'AR' : 'EN';
        
        currentLang = lang;
        localStorage.setItem('lang', lang);
    };

    const langToggle = document.querySelector('#lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            updateLanguage(currentLang === 'en' ? 'ar' : 'en');
        });
    }

    // Initialize Language
    updateLanguage(currentLang);
});
