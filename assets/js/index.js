        lucide.createIcons();
        
        // 1. Preloader & AOS Safe Init
        window.addEventListener('DOMContentLoaded', () => {
            const preloader = document.getElementById('preloader');
            const loaderText = document.getElementById('loader-text');
            const isId = document.documentElement.lang === 'id';

            setTimeout(() => {
                loaderText.innerHTML = isId ? "Sistem Siap" : "System Ready";
                loaderText.classList.add('text-brand', 'font-bold');
                
                setTimeout(() => {
                    preloader.classList.add('preloader-hidden');
                    // Inisialisasi AOS setelah preloader hilang
                    AOS.init({ 
                        duration: 800, 
                        once: true, 
                        offset: 50, 
                        easing: 'ease-out-cubic' 
                    });
                    setTimeout(() => { preloader.remove(); }, 700);
                }, 400); 
            }, 1500); 
        });

        // 2. Tema Gelap/Terang
        const toggleTheme = () => {
            const html = document.documentElement;
            html.classList.toggle('dark');
            html.classList.toggle('light');
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
            lucide.createIcons();
        };
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);
        document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);
        
        if (localStorage.getItem('theme') === 'light') { 
            document.documentElement.classList.remove('dark'); 
            document.documentElement.classList.add('light'); 
        }

        // 3. Sistem Bahasa
        const langToggleBtn = document.getElementById('langToggleBtn');
        const langToggleBtnMobile = document.getElementById('langToggleBtnMobile');
        let currentLang = localStorage.getItem('lang') || 'id';

        const applyLanguage = (lang) => {
            document.documentElement.lang = lang; 
            langToggleBtn.innerText = lang.toUpperCase();
            langToggleBtnMobile.innerText = lang.toUpperCase();
            localStorage.setItem('lang', lang);
        };

        const switchLanguage = () => {
            currentLang = currentLang === 'id' ? 'en' : 'id';
            applyLanguage(currentLang);
            const loaderText = document.getElementById('loader-text');
            if(loaderText && loaderText.innerText.includes('System')) {
                 loaderText.innerHTML = currentLang === 'id' ? '<span class="lang-id">Inisialisasi Sistem...</span>' : '<span class="lang-en">Initializing Systems...</span>';
            }
        };

        langToggleBtn.addEventListener('click', switchLanguage);
        langToggleBtnMobile.addEventListener('click', switchLanguage);
        applyLanguage(currentLang);

        // 4. Island Navbar Scroll Event
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) { 
                navbar.classList.add('nav-scrolled'); 
            } else { 
                navbar.classList.remove('nav-scrolled'); 
            }
        });

        // 5. Magnetic Button Physics
        const magneticBtns = document.querySelectorAll('.btn-magnetic');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const position = btn.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            btn.addEventListener('mouseout', function() {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });

        // 6. 3D Parallax Tilt & Spotlight Card Logic
        document.querySelectorAll('.spotlight-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Set Spotlight variables
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                // 3D Tilt Math
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5; // Max miring 5 derajat
                const rotateY = ((x - centerX) / centerX) * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                // Reset tilt ketika mouse keluar
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });

        // 7. Mobile Menu
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileMenuOverlay');
        const openBtn = document.getElementById('mobileMenuBtn');
        const closeBtn = document.getElementById('closeMobileMenu');

        const toggleMobileMenu = (show) => {
            if (show) {
                mobileMenu.classList.remove('translate-x-full');
                overlay.classList.remove('opacity-0', 'pointer-events-none');
                document.body.style.overflow = 'hidden'; 
            } else {
                mobileMenu.classList.add('translate-x-full');
                overlay.classList.add('opacity-0', 'pointer-events-none');
                document.body.style.overflow = '';
            }
        };

        openBtn.addEventListener('click', () => {
            toggleMobileMenu(true);
            document.getElementById('floating-clock').classList.add('clock-hidden');
        });
        closeBtn.addEventListener('click', () => {
            toggleMobileMenu(false);
            document.getElementById('floating-clock').classList.remove('clock-hidden');
        });
        overlay.addEventListener('click', () => {
            toggleMobileMenu(false);
            document.getElementById('floating-clock').classList.remove('clock-hidden');
        });

        // 8. FAQ Accordion
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                const content = this.nextElementSibling;
                document.querySelectorAll('.accordion-item').forEach(otherItem => {
                    if(otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.accordion-content').style.maxHeight = '0px';
                    }
                });
                item.classList.toggle('active');
                if (item.classList.contains('active')) { content.style.maxHeight = content.scrollHeight + "px"; } 
                else { content.style.maxHeight = "0px"; }
            });
        });