        lucide.createIcons();

        // Mobile Menu
        const mobileMenuEl = document.getElementById('mobileMenu');
        const overlayEl = document.getElementById('mobileMenuOverlay');
        const openBtnEl = document.getElementById('mobileMenuBtn');
        const closeBtnEl = document.getElementById('closeMobileMenu');
        const clockEl = document.getElementById('floatingClock');

        const toggleMobileMenu = (show) => {
            if (show) {
                mobileMenuEl.classList.remove('translate-x-full');
                overlayEl.classList.remove('opacity-0', 'pointer-events-none');
                document.body.style.overflow = 'hidden';
                if (clockEl) clockEl.classList.add('clock-hidden');
            } else {
                mobileMenuEl.classList.add('translate-x-full');
                overlayEl.classList.add('opacity-0', 'pointer-events-none');
                document.body.style.overflow = '';
                if (clockEl) clockEl.classList.remove('clock-hidden');
            }
        };

        openBtnEl.addEventListener('click', () => toggleMobileMenu(true));
        closeBtnEl.addEventListener('click', () => toggleMobileMenu(false));
        overlayEl.addEventListener('click', () => toggleMobileMenu(false));

        // Mobile Language & Theme
        const langToggleBtnMobile = document.getElementById('langToggleBtnMobile');
        langToggleBtnMobile.addEventListener('click', () => {
            const current = document.documentElement.lang;
            const target = current === 'id' ? 'en' : 'id';
            document.documentElement.lang = target;
            document.getElementById('langToggleBtn').innerText = target.toUpperCase();
            langToggleBtnMobile.innerText = target.toUpperCase();
            document.title = target === 'id' ? "Simulator Budget - Monetra" : "Budget Simulator - Monetra";
            updateValues();
            updateClock();
        });
        document.getElementById('themeToggleMobile').addEventListener('click', () => {
            document.getElementById('themeToggle').click();
        });

        // Sync lang button initial state
        langToggleBtnMobile.innerText = (document.documentElement.lang || 'id').toUpperCase();

        // Navbar Logic
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
            document.getElementById('clockTime').textContent = `${hours}.${minutes}.${seconds}`;
            
            const daysID = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
            const monthsID = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
            
            const daysEN = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
            const monthsEN = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
            
            if (isID) {
                document.getElementById('clockDate').textContent = `${daysID[now.getDay()]}, ${now.getDate()} ${monthsID[now.getMonth()]} ${now.getFullYear()}`;
            } else {
                document.getElementById('clockDate').textContent = `${daysEN[now.getDay()]}, ${monthsEN[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
            }
        }
        setInterval(updateClock, 1000);
        updateClock();

        // Boot Loader
        document.addEventListener('DOMContentLoaded', () => {
            const bar = document.getElementById('bootProgress');
            const loader = document.getElementById('loader');
            if (bar) bar.style.width = '100%';
            setTimeout(() => { if (loader) loader.classList.add('booted'); }, 600);
            initChart();
        });

        // App Logic
        let budgetChart;
        const mainIncome = document.getElementById('mainIncome');
        const additionalIncome = document.getElementById('additionalIncome');
        const passiveIncome = document.getElementById('passiveIncome');
        const tipEl = document.getElementById('budgetTip');
        
        const sliders = [
            document.getElementById('needsSlider'),
            document.getElementById('transportSlider'),
            document.getElementById('entertainmentSlider'),
            document.getElementById('savingsSlider'),
            document.getElementById('othersSlider')
        ];

        const formatRupiah = (n) => 'Rp ' + Math.abs(Math.round(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        const parseInputRupiah = (input) => parseInt(input.value.replace(/\D/g, '') || '0');

        function generateAIAdvice(income, expenses, categories) {
            const isID = document.documentElement.lang === 'id';
            const remaining = income - expenses;
            const savings = categories[3];
            const lifestyle = categories[2];

            if (income === 0) return isID ? 'Masukkan pemasukan untuk menganalisa arsitektur finansial Anda.' : 'Enter income to analyze your financial architecture.';
            if (expenses > income) return isID ? 'Deteksi Defisit! Pengeluaran melebihi pemasukan. Kurangi alokasi lifestyle segera.' : 'Deficit Detected! Expenses exceed income. Reduce lifestyle allocation immediately.';
            if (savings < (0.1 * income)) return isID ? 'Alokasi Tabungan Terlalu Rendah. Idealnya sisihkan minimal 10% untuk node masa depan.' : 'Savings Allocation Too Low. Ideally set aside at least 10% for future nodes.';
            if (lifestyle > (0.2 * income)) return isID ? 'Node Hiburan Terlalu Dominan. Pertimbangkan untuk memindahkan dana ke node investasi.' : 'Entertainment Node Too Dominant. Consider shifting funds to investment nodes.';
            if (remaining > (0.4 * income)) return isID ? 'Topologi Sangat Sehat. Anda memiliki surplus besar yang bisa diinvestasikan.' : 'Very Healthy Topology. You have a large surplus that can be invested.';
            
            return isID ? 'Konfigurasi seimbang. Arsitektur finansial Anda berada dalam parameter aman.' : 'Balanced configuration. Your financial architecture is within safe parameters.';
        }

        function updateValues() {
            const income = parseInputRupiah(mainIncome) + parseInputRupiah(additionalIncome) + parseInputRupiah(passiveIncome);
            const expenseValues = sliders.map(s => Number(s.value));
            const expenses = expenseValues.reduce((sum, v) => sum + v, 0);
            const remaining = income - expenses;

            document.getElementById('totalIncome').textContent = formatRupiah(income);
            document.getElementById('totalExpenses').textContent = formatRupiah(expenses);
            
            const remEl = document.getElementById('remainingBudget');
            remEl.textContent = (remaining < 0 ? '-' : '') + formatRupiah(remaining);
            remEl.style.color = remaining < 0 ? '#ef4444' : (document.documentElement.classList.contains('dark') ? '#3b82f6' : '#1e40af');

            const pct = income > 0 ? Math.min((expenses / income) * 100, 100) : 0;
            const barColor = pct >= 100 ? '#ef4444' : pct > 80 ? '#f59e0b' : '#3b82f6';
            
            document.getElementById('budgetPercentage').style.width = pct + '%';
            document.getElementById('budgetPercentage').style.backgroundColor = barColor;
            document.getElementById('percentageText').textContent = Math.round(pct) + '%';

            document.getElementById('needsValue').textContent = formatRupiah(expenseValues[0]);
            document.getElementById('transportValue').textContent = formatRupiah(expenseValues[1]);
            document.getElementById('entertainmentValue').textContent = formatRupiah(expenseValues[2]);
            document.getElementById('savingsValue').textContent = formatRupiah(expenseValues[3]);
            document.getElementById('othersValue').textContent = formatRupiah(expenseValues[4]);

            tipEl.innerHTML = `<span>${generateAIAdvice(income, expenses, expenseValues)}</span>`;

            if (budgetChart) {
                budgetChart.data.datasets[0].data = expenseValues;
                budgetChart.update();
            }
        }

        function initChart() {
            const ctx = document.getElementById('budgetChart').getContext('2d');
            budgetChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Pokok', 'Transport', 'Hiburan', 'Tabungan', 'Lainnya'],
                    datasets: [{
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: ['#3b82f6', '#06b6d4', '#f59e0b', '#10b981', '#71717a'],
                        borderWidth: 2,
                        borderColor: document.documentElement.classList.contains('dark') ? '#18181b' : '#ffffff'
                    }]
                },
                options: { cutout: '75%', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
            });
        }

        [mainIncome, additionalIncome, passiveIncome].forEach(input => {
            input.addEventListener('input', function() {
                let v = this.value.replace(/\D/g, '');
                this.value = v ? parseInt(v).toLocaleString('id-ID') : '0';
                updateValues();
            });
        });

        sliders.forEach(s => s.addEventListener('input', updateValues));

        document.getElementById('themeToggle').onclick = () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            if (budgetChart) {
                budgetChart.data.datasets[0].borderColor = isDark ? '#18181b' : '#ffffff';
                budgetChart.update();
            }
        };

        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        }

        // LANGUAGE TOGGLE FUNCTIONALITY
        document.getElementById('langToggleBtn').onclick = function() {
            const current = document.documentElement.lang;
            const target = current === 'id' ? 'en' : 'id';
            document.documentElement.lang = target;
            this.innerText = target.toUpperCase();
            
            // Sync page title (tab name)
            document.title = target === 'id' ? "Simulator Budget - Monetra" : "Budget Simulator - Monetra";
            
            // Re-render content that depends on language logic
            updateValues();
            updateClock();
        };

        function preparePrintContent() {
            const isID = document.documentElement.lang === 'id';
            const date = new Date().toLocaleDateString(isID ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            document.getElementById('printReport').innerHTML = `
                <div style="font-family: sans-serif; padding: 40px; color: black; background: white;">
                    <h1 style="color: #3b82f6; border-bottom: 2px solid #3b82f6;">Monetra Financial Architecture</h1>
                    <p>LOG DATE: ${date}</p>
                    <p>TOTAL INCOME: ${document.getElementById('totalIncome').textContent}</p>
                    <p>TOTAL EXPENSE: ${document.getElementById('totalExpenses').textContent}</p>
                    <p>REMAINING: ${document.getElementById('remainingBudget').textContent}</p>
                    <hr>
                    <p>AI ADVICE: ${tipEl.textContent}</p>
                </div>
            `;
        }
        function printResult() { preparePrintContent(); window.print(); }
        function downloadResult() { preparePrintContent(); window.print(); }
