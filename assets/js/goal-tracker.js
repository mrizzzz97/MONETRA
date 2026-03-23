        // UI & Common Logic
        lucide.createIcons();
        AOS.init({ duration: 800, once: true });

        // Fast Boot Loader
        window.addEventListener('load', () => {
            const bar = document.getElementById('bootProgress');
            const loader = document.getElementById('loader');
            setTimeout(() => { if(bar) bar.style.width = '100%'; }, 100);
            setTimeout(() => { if(loader) loader.classList.add('booted'); }, 600);
        });

        // Theme System
        const themeToggle = () => {
            const isDark = document.documentElement.classList.toggle('dark');
            document.documentElement.classList.toggle('light', !isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            lucide.createIcons();
        };
        document.getElementById('themeToggle').addEventListener('click', themeToggle);
        if (localStorage.getItem('theme') === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }

        // Language System
        const applyLanguage = (lang) => {
            document.documentElement.lang = lang;
            document.getElementById('langToggleBtn').innerText = lang.toUpperCase();
            document.getElementById('langToggleBtnMobile').innerText = lang.toUpperCase();
            document.title = lang === 'id' ? "Target Tabungan - Monetra" : "Savings Goal - Monetra";
            localStorage.setItem('lang', lang);
            updateClock();
            if (typeof renderGoals === 'function') {
                renderGoals();
                updateRecentMilestones();
                updateTips();
            }
        };

        document.getElementById('langToggleBtn').addEventListener('click', () => {
            const target = document.documentElement.lang === 'id' ? 'en' : 'id';
            applyLanguage(target);
        });

        // Island Navbar
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 40) navbar.classList.add('nav-scrolled');
            else navbar.classList.remove('nav-scrolled');
        });

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

        // Mobile Menu
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileMenuOverlay');
        const openBtn = document.getElementById('mobileMenuBtn');
        const closeBtn = document.getElementById('closeMobileMenu');
        const clock = document.getElementById('floating-clock');

        const toggleMobileMenu = (show) => {
            if (show) {
                mobileMenu.classList.remove('translate-x-full');
                overlay.classList.remove('opacity-0', 'pointer-events-none');
                document.body.style.overflow = 'hidden';
                if (clock) clock.classList.add('clock-hidden');
            } else {
                mobileMenu.classList.add('translate-x-full');
                overlay.classList.add('opacity-0', 'pointer-events-none');
                document.body.style.overflow = '';
                if (clock) clock.classList.remove('clock-hidden');
            }
        };

        openBtn.addEventListener('click', () => toggleMobileMenu(true));
        closeBtn.addEventListener('click', () => toggleMobileMenu(false));
        overlay.addEventListener('click', () => toggleMobileMenu(false));

        // Mobile Language & Theme
        const langToggleBtnMobile = document.getElementById('langToggleBtnMobile');
        langToggleBtnMobile.addEventListener('click', () => {
            const target = document.documentElement.lang === 'id' ? 'en' : 'id';
            applyLanguage(target);
        });
        document.getElementById('themeToggleMobile').addEventListener('click', themeToggle);

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