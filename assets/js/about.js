
        lucide.createIcons();

        // Fast Boot Loader Logic
        window.addEventListener('load', () => {
            const bar = document.getElementById('bootProgress');
            const loader = document.getElementById('loader');
            setTimeout(() => { if(bar) bar.style.width = '100%'; }, 100);
            setTimeout(() => { if(loader) loader.classList.add('booted'); }, 600);
        });

        // Init Animations
        AOS.init({ duration: 800, once: true, offset: 50, easing: 'ease-out-cubic' });

        // Theme System
        const toggleTheme = () => {
            const html = document.documentElement;
            html.classList.toggle('dark'); html.classList.toggle('light');
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
            lucide.createIcons();
        };
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);
        document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);
        if (localStorage.getItem('theme') === 'light') { document.documentElement.classList.remove('dark'); document.documentElement.classList.add('light'); }

        // Language System
        const langToggleBtn = document.getElementById('langToggleBtn');
        const langToggleBtnMobile = document.getElementById('langToggleBtnMobile');
        let currentLang = localStorage.getItem('lang') || 'id';

        const applyLanguage = (lang) => {
            document.documentElement.lang = lang; 
            langToggleBtn.innerText = lang.toUpperCase();
            if (langToggleBtnMobile) langToggleBtnMobile.innerText = lang.toUpperCase();
            localStorage.setItem('lang', lang);
            updateClock();
        };

        langToggleBtn.addEventListener('click', () => { currentLang = currentLang === 'id' ? 'en' : 'id'; applyLanguage(currentLang); });
        if (langToggleBtnMobile) langToggleBtnMobile.addEventListener('click', () => { currentLang = currentLang === 'id' ? 'en' : 'id'; applyLanguage(currentLang); });
        applyLanguage(currentLang);

        // Island Navbar
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) navbar.classList.add('nav-scrolled');
            else navbar.classList.remove('nav-scrolled');
        });

        // 3D Spotlight Cards
        document.querySelectorAll('.spotlight-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`); card.style.setProperty('--mouse-y', `${y}px`);
                const centerX = rect.width / 2; const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5; const rotateY = ((x - centerX) / centerX) * 5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            card.addEventListener('mouseleave', () => card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
        });

        // Magnetic Buttons
        document.querySelectorAll('.btn-magnetic').forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const position = btn.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            btn.addEventListener('mouseout', () => btn.style.transform = 'translate(0px, 0px)');
        });

        // Mobile Menu
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileMenuOverlay');
        const openBtn = document.getElementById('mobileMenuBtn');
        const closeBtn = document.getElementById('closeMobileMenu');
        const floatingClock = document.getElementById('floating-clock'); // Added for hiding clock

        const toggleMobileMenu = (show) => {
            if (show) {
                mobileMenu.classList.remove('translate-x-full'); overlay.classList.remove('opacity-0', 'pointer-events-none');
                document.body.style.overflow = 'hidden'; 
                // Hide clock smoothly
                if (floatingClock) {
                    floatingClock.style.opacity = '0';
                    floatingClock.style.transform = 'translateY(20px) scale(0.9)';
                    floatingClock.style.pointerEvents = 'none';
                }
            } else {
                mobileMenu.classList.add('translate-x-full'); overlay.classList.add('opacity-0', 'pointer-events-none');
                document.body.style.overflow = '';
                // Show clock smoothly
                if (floatingClock) {
                    floatingClock.style.opacity = '1';
                    floatingClock.style.transform = 'translateY(0) scale(1)';
                    floatingClock.style.pointerEvents = 'auto';
                }
            }
        };
        openBtn.addEventListener('click', () => toggleMobileMenu(true));
        closeBtn.addEventListener('click', () => toggleMobileMenu(false));
        overlay.addEventListener('click', () => toggleMobileMenu(false));

        // Clock Logic
        function updateClock() {
            const now = new Date();
            const isID = document.documentElement.lang === 'id';
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            document.getElementById('clock-time').textContent = `${hours}.${minutes}.${seconds}`;
            
            const daysID = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
            const monthsID = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
            const daysEN = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
            const monthsEN = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
            
            if (isID) {
                document.getElementById('clock-date').textContent = `${daysID[now.getDay()]}, ${now.getDate()} ${monthsID[now.getMonth()]} ${now.getFullYear()}`;
            } else {
                document.getElementById('clock-date').textContent = `${daysEN[now.getDay()]}, ${monthsEN[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
            }
        }
        setInterval(updateClock, 1000);
        updateClock();