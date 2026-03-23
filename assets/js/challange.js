
        // ==================== 1. DATA & STATE ====================
        const challengesData = [
            { id: 1, title: '30 Hari Hemat', levelID: 'Pemula', levelEN: 'Beginner', levelIcon: 'smile', levelBadge: 'badge-easy', targetAmount: 500000, dailyAmount: 16700, participants: 1234, color: 'text-emerald-500' },
            { id: 2, title: '30 Hari Konsisten', levelID: 'Menengah', levelEN: 'Medium', levelIcon: 'zap', levelBadge: 'badge-medium', targetAmount: 1500000, dailyAmount: 50000, participants: 892, color: 'text-amber-500' },
            { id: 3, title: '30 Hari Ekstrim', levelID: 'Berat', levelEN: 'Hard', levelIcon: 'flame', levelBadge: 'badge-hard', targetAmount: 3000000, dailyAmount: 100000, participants: 456, color: 'text-red-500' },
            { id: 4, title: 'Jumat Berkah', levelID: 'Spesial', levelEN: 'Special', levelIcon: 'heart', levelBadge: 'badge-easy', targetAmount: 1000000, dailyAmount: 33333, participants: 2100, color: 'text-emerald-500' },
            { id: 5, title: 'Weekend Saver', levelID: 'Menengah', levelEN: 'Medium', levelIcon: 'coffee', levelBadge: 'badge-medium', targetAmount: 800000, dailyAmount: 26667, participants: 1800, color: 'text-amber-500' },
            { id: 6, title: 'Family Goal', levelID: 'Keluarga', levelEN: 'Family', levelIcon: 'users', levelBadge: 'badge-hard', targetAmount: 5000000, dailyAmount: 166667, participants: 234, color: 'text-red-500' }
        ];

        let currentChallenge = null;

        // ==================== 2. CORE UTILITIES ====================
        function formatRupiah(number) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
        }

        function refreshIcons() {
            try {
                if (typeof lucide !== 'undefined') lucide.createIcons();
            } catch(e) {
                console.warn('Lucide icons pending or blocked.');
            }
        }

        function showToast(message, type = 'info', duration = 3000) {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            const toastIcon = toast.querySelector('i');
            if(!toast || !toastMessage || !toastIcon) return;

            toastMessage.textContent = message;
            toast.className = `toast ${type} show`;
            
            if(type === 'success') toastIcon.setAttribute('data-lucide', 'check-circle');
            else if(type === 'error') toastIcon.setAttribute('data-lucide', 'alert-circle');
            else toastIcon.setAttribute('data-lucide', 'info');
            refreshIcons();

            setTimeout(() => { toast.classList.remove('show'); }, duration);
        }

        // ==================== 3. UI RENDERERS ====================
        function generateDailyTrackerHTML() {
            if (!currentChallenge || !currentChallenge.days) return '';
            let html = '';
            for (let i = 1; i <= 30; i++) {
                const day = currentChallenge.days.find(d => d.day === i);
                html += `<div class="day-circle ${day.status}" onclick="window.markDay(${i})">${i}</div>`;
            }
            return html;
        }

        function updateChallengeDisplay() {
            const section = document.getElementById('activeChallengeSection');
            if (!section) return;
            const isID = document.documentElement.lang === 'id';

            if (!currentChallenge) {
                section.innerHTML = `
                    <div class="max-w-7xl mx-auto px-6">
                        <div class="spotlight-card bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-10 shadow-sm text-center">
                            <div class="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 text-zinc-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <i data-lucide="trophy" class="w-10 h-10"></i>
                            </div>
                            <h3 class="text-2xl font-bold mb-3 tracking-tight text-zinc-900 dark:text-white">${isID ? 'Belum Ada Challenge Aktif' : 'No Active Challenge'}</h3>
                            <p class="text-sm text-zinc-500 max-w-md mx-auto">${isID ? 'Pilih challenge di bawah untuk memulai perjalanan menabungmu!' : 'Select a challenge below to start your saving journey!'}</p>
                        </div>
                    </div>
                `;
                refreshIcons();
                return;
            }

            const progress = Math.min(Math.round((currentChallenge.collectedAmount / currentChallenge.targetAmount) * 100), 100) || 0;
            const daysRemaining = 30 - currentChallenge.currentDay;
            const levelStr = isID ? currentChallenge.levelID : currentChallenge.levelEN;

            section.innerHTML = `
                <div class="max-w-7xl mx-auto px-6">
                    <div class="spotlight-card bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 lg:p-10 shadow-sm">
                        
                        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 border-b border-zinc-100 dark:border-zinc-800/80 pb-6">
                            <div>
                                <h2 class="text-2xl md:text-3xl font-bold mb-2 tracking-tight text-zinc-900 dark:text-white">${currentChallenge.title}</h2>
                                <p class="text-sm font-mono text-zinc-500"><i data-lucide="calendar" class="w-4 h-4 inline-block -mt-1 mr-1"></i> ${isID ? 'Mulai:' : 'Started:'} ${new Date(currentChallenge.startDate).toLocaleDateString(isID ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div class="flex gap-3">
                                <span class="challenge-badge ${currentChallenge.levelBadge}">
                                    <i data-lucide="${currentChallenge.levelIcon}" class="w-3.5 h-3.5"></i> ${levelStr}
                                </span>
                                <span class="challenge-badge bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                    <i data-lucide="clock" class="w-3.5 h-3.5"></i> ${isID ? 'Hari ke-' : 'Day '}${currentChallenge.currentDay}
                                </span>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                            <div class="bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center">
                                <div class="text-2xl font-bold text-emerald-500 mb-1">${formatRupiah(currentChallenge.collectedAmount)}</div>
                                <p class="text-xs text-zinc-500 font-mono uppercase tracking-widest">${isID ? 'Terkumpul' : 'Collected'}</p>
                            </div>
                            <div class="bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center">
                                <div class="text-2xl font-bold text-brand mb-1">${formatRupiah(currentChallenge.targetAmount)}</div>
                                <p class="text-xs text-zinc-500 font-mono uppercase tracking-widest">Target</p>
                            </div>
                            <div class="bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center">
                                <div class="text-2xl font-bold text-violet-500 mb-1">${progress}%</div>
                                <p class="text-xs text-zinc-500 font-mono uppercase tracking-widest">Progress</p>
                            </div>
                            <div class="bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center">
                                <div class="text-2xl font-bold text-amber-500 mb-1">${daysRemaining} ${isID ? 'Hari' : 'Days'}</div>
                                <p class="text-xs text-zinc-500 font-mono uppercase tracking-widest">${isID ? 'Sisa Waktu' : 'Remaining'}</p>
                            </div>
                        </div>

                        <div class="mb-10">
                            <div class="flex justify-between text-sm font-bold mb-3 text-zinc-900 dark:text-white">
                                <span>Progress</span>
                                <span>${progress}%</span>
                            </div>
                            <div class="progress-bar-container">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                        </div>

                        <h3 class="text-lg font-bold mb-5 tracking-tight text-zinc-900 dark:text-white">Daily Tracker (30 ${isID ? 'Hari' : 'Days'})</h3>
                        <div class="grid grid-cols-5 xs:grid-cols-7 sm:grid-cols-10 gap-3 mb-10">
                            ${generateDailyTrackerHTML()}
                        </div>

                        <div class="flex flex-col sm:flex-row gap-4">
                            <button class="btn-magnetic flex-1 bg-brand text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.2)]" onclick="window.markToday()">
                                <i data-lucide="plus-circle" class="w-5 h-5"></i>
                                ${isID ? 'Tandai Hari Ini' : 'Mark Today'}
                            </button>
                            <div class="grid grid-cols-2 gap-4 flex-1 lg:flex-none lg:w-1/3">
                                <button onclick="window.downloadResult()" class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-bold transition-colors">
                                    <i data-lucide="download" class="w-4 h-4"></i> Download
                                </button>
                                <button onclick="window.printResult()" class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-xs font-bold transition-colors">
                                    <i data-lucide="printer" class="w-4 h-4"></i> Print
                                </button>
                            </div>
                            <button class="flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 text-xs font-bold transition-colors" onclick="window.resetChallenge()">
                                <i data-lucide="refresh-cw" class="w-4 h-4"></i> Reset
                            </button>
                        </div>
                    </div>
                </div>
            `;

            const activeCard = section.querySelector('.spotlight-card');
            if (activeCard) {
                activeCard.addEventListener('mousemove', e => {
                    const rect = activeCard.getBoundingClientRect();
                    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                    activeCard.style.setProperty('--mouse-x', `${x}px`); activeCard.style.setProperty('--mouse-y', `${y}px`);
                });
            }

            setTimeout(refreshIcons, 0);
        }

        function renderChallenges() {
            const container = document.getElementById('challengesContainer');
            if (!container) return;
            const isID = document.documentElement.lang === 'id';

            let html = '';
            challengesData.forEach((challenge, index) => {
                const levelStr = isID ? challenge.levelID : challenge.levelEN;
                
                html += `
                    <div class="spotlight-card bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 lg:p-8 shadow-sm group" data-aos="fade-up" data-aos-delay="${index * 50}">
                        <div class="flex justify-between items-start mb-6">
                            <span class="challenge-badge ${challenge.levelBadge}">
                                <i data-lucide="${challenge.levelIcon}" class="w-3.5 h-3.5"></i> ${levelStr}
                            </span>
                            <span class="text-xl font-bold ${challenge.color} tracking-tight">${formatRupiah(challenge.targetAmount)}</span>
                        </div>
                        <h3 class="text-xl font-bold mb-1 tracking-tight text-zinc-900 dark:text-white">${challenge.title}</h3>
                        <p class="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-6">${isID ? 'Tantangan Level' : 'Level'} ${levelStr}</p>
                        
                        <div class="space-y-3 mb-8 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                            <div class="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                <i data-lucide="check-circle" class="w-4 h-4 text-emerald-500"></i>
                                <span>Target: <b class="text-zinc-900 dark:text-white">${formatRupiah(challenge.targetAmount)}</b></span>
                            </div>
                            <div class="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                <i data-lucide="calendar" class="w-4 h-4 text-brand"></i>
                                <span><b class="text-zinc-900 dark:text-white">${formatRupiah(challenge.dailyAmount)}</b> / ${isID ? 'hari' : 'day'}</span>
                            </div>
                            <div class="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                <i data-lucide="users" class="w-4 h-4 text-amber-500"></i>
                                <span><b class="text-zinc-900 dark:text-white">${challenge.participants.toLocaleString()}</b> ${isID ? 'peserta' : 'participants'}</span>
                            </div>
                        </div>

                        <button class="btn-magnetic w-full bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2" onclick="window.startChallenge(${challenge.id})">
                            ${isID ? 'Mulai Challenge' : 'Start Challenge'} <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </div>
                `;
            });

            container.innerHTML = html;

            container.querySelectorAll('.spotlight-card').forEach(card => {
                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                    card.style.setProperty('--mouse-x', `${x}px`); card.style.setProperty('--mouse-y', `${y}px`);
                });
            });

            refreshIcons();
        }

        function updateClock() {
            const now = new Date();
            const isID = document.documentElement.lang === 'id';
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const clockTime = document.getElementById('clock-time');
            const clockDate = document.getElementById('clock-date');
            
            if(clockTime) clockTime.textContent = `${hours}.${minutes}.${seconds}`;
            
            const daysID = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
            const monthsID = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
            const daysEN = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
            const monthsEN = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
            
            if (clockDate) {
                if (isID) {
                    clockDate.textContent = `${daysID[now.getDay()]}, ${now.getDate()} ${monthsID[now.getMonth()]} ${now.getFullYear()}`;
                } else {
                    clockDate.textContent = `${daysEN[now.getDay()]}, ${monthsEN[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
                }
            }
        }

        function applyLanguage(lang) {
            document.documentElement.lang = lang;
            const btn1 = document.getElementById('langToggleBtn');
            const btn2 = document.getElementById('langToggleBtnMobile');
            if(btn1) btn1.innerText = lang.toUpperCase();
            if(btn2) btn2.innerText = lang.toUpperCase();
            document.title = lang === 'id' ? "Saving Challenge - Monetra" : "Saving Challenge - Monetra";
            localStorage.setItem('lang', lang);
            
            updateClock();
            renderChallenges();
            updateChallengeDisplay();
        }

        // ==================== 4. WINDOW EXPORT (ACTIONS) ====================
        window.startChallenge = function(challengeId) {
            const challenge = challengesData.find(c => c.id === challengeId);
            if (!challenge) return;
            const isID = document.documentElement.lang === 'id';

            currentChallenge = {
                id: challenge.id,
                title: challenge.title,
                levelID: challenge.levelID,
                levelEN: challenge.levelEN,
                levelIcon: challenge.levelIcon,
                levelBadge: challenge.levelBadge,
                startDate: new Date().toISOString().split('T')[0],
                targetAmount: challenge.targetAmount,
                collectedAmount: 0,
                currentDay: 1,
                dailyAmount: challenge.dailyAmount,
                days: []
            };

            for (let i = 1; i <= 30; i++) {
                currentChallenge.days.push({
                    day: i,
                    status: i === 1 ? 'current' : 'upcoming',
                    amount: 0
                });
            }

            localStorage.setItem('monetra_activeChallenge', JSON.stringify(currentChallenge));
            showToast(`${isID ? 'Challenge' : 'Challenge'} "${challenge.title}" ${isID ? 'berhasil dimulai!' : 'started successfully!'}`, 'success');

            updateChallengeDisplay();
            setTimeout(() => {
                const section = document.getElementById('activeChallengeSection');
                if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        };

        window.markDay = function(day) {
            if (!currentChallenge) return;
            const isID = document.documentElement.lang === 'id';
            const dayObj = currentChallenge.days.find(d => d.day === day);

            if (dayObj.status === 'upcoming') {
                showToast(isID ? 'Hari ini belum bisa ditandai!' : 'Cannot mark this day yet!', 'error');
                return;
            }

            if (dayObj.status === 'completed') {
                showToast(isID ? 'Hari ini sudah ditandai!' : 'This day is already marked!', 'info');
                return;
            }

            if (dayObj.status === 'current') {
                dayObj.status = 'completed';
                dayObj.amount = currentChallenge.dailyAmount;
                currentChallenge.collectedAmount += currentChallenge.dailyAmount;

                if (currentChallenge.currentDay < 30) {
                    currentChallenge.currentDay++;
                    const nextDay = currentChallenge.days.find(d => d.day === currentChallenge.currentDay);
                    if (nextDay) nextDay.status = 'current';
                }

                localStorage.setItem('monetra_activeChallenge', JSON.stringify(currentChallenge));
                updateChallengeDisplay();
                showToast(`${isID ? 'Hari ke-' : 'Day '}${day} ${isID ? 'berhasil ditandai!' : 'marked successfully!'} +${formatRupiah(currentChallenge.dailyAmount)}`, 'success');

                if (currentChallenge.currentDay > 30 || currentChallenge.collectedAmount >= currentChallenge.targetAmount) {
                    setTimeout(() => { window.celebrateCompletion(); }, 500);
                }
            }
        };

        window.markToday = function() {
            if (!currentChallenge) {
                const isID = document.documentElement.lang === 'id';
                showToast(isID ? 'Belum ada challenge aktif!' : 'No active challenge!', 'error');
                return;
            }
            window.markDay(currentChallenge.currentDay);
        };

        window.resetChallenge = function() {
            if (!currentChallenge) return;
            const isID = document.documentElement.lang === 'id';

            if (confirm(isID ? 'Yakin ingin mereset challenge ini? Progress akan hilang.' : 'Are you sure you want to reset? Progress will be lost.')) {
                currentChallenge = null;
                localStorage.removeItem('monetra_activeChallenge');
                updateChallengeDisplay();
                showToast(isID ? 'Challenge berhasil direset' : 'Challenge reset successfully', 'info');
            }
        };

        window.celebrateCompletion = function() {
            for (let i = 0; i < 60; i++) {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '8px';
                confetti.style.height = '8px';
                confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '2px';
                confetti.style.zIndex = '10002';
                confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s ease-in-out forwards`;
                confetti.style.animationDelay = Math.random() * 1.5 + 's';
                document.body.appendChild(confetti);
                setTimeout(() => { if (confetti.parentNode) confetti.remove(); }, 4000);
            }

            const style = document.createElement('style');
            style.textContent = `@keyframes confettiFall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }`;
            document.head.appendChild(style);

            const isID = document.documentElement.lang === 'id';
            setTimeout(() => { showToast(isID ? '🎉 Selamat! Challenge selesai! 🎉' : '🎉 Congratulations! Challenge complete! 🎉', 'success', 5000); }, 500);
        };

        window.generatePrintContent = function() {
            if (!currentChallenge) return '';
            const isID = document.documentElement.lang === 'id';
            const progress = Math.min(Math.round((currentChallenge.collectedAmount / currentChallenge.targetAmount) * 100), 100) || 0;
            const daysRemaining = 30 - currentChallenge.currentDay;
            const dateStr = new Date().toLocaleDateString(isID ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            const levelStr = isID ? currentChallenge.levelID : currentChallenge.levelEN;

            let dayGridHTML = '';
            for (let i = 1; i <= 30; i++) {
                const day = currentChallenge.days.find(d => d.day === i);
                dayGridHTML += `<div class="day-circle-print ${day.status}">${i}<\/div>`;
            }

            return `
                <div class="print-report" style="display: block; font-family: 'Inter', sans-serif;">
                    <div class="print-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #3b82f6;">
                        <div class="print-logo-section" style="display: flex; align-items: center; gap: 15px;">
                            <img src="assets/img/image.jpeg" alt="Monetra Logo" style="width: 50px; height: 50px; border-radius: 10px;">
                            <div>
                                <h2 style="margin:0; font-size: 18px; font-weight: 800;">Monetra<\/h2>
                                <p style="margin:0; font-size: 9px; color: #64748b;">Financial Intelligence<\/p>
                            <\/div>
                        <\/div>
                        <div class="print-title">
                            <h1 style="font-size: 20px; font-weight: 900; margin: 0; color: #0f172a;">${isID ? 'Laporan Saving Challenge' : 'Saving Challenge Report'}<\/h1>
                        <\/div>
                        <div class="print-meta" style="text-align: right; font-size: 9px; color: #475569;">
                            <p>${isID ? 'Dicetak pada:' : 'Printed on:'} ${dateStr}<\/p>
                        <\/div>
                    <\/div>

                    <div style="margin-bottom: 25px;">
                        <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 5px; color: #0f172a;">${currentChallenge.title}<\/h2>
                        <p style="font-size: 12px; color: #64748b;">${isID ? 'Challenge dimulai' : 'Challenge started'}: ${new Date(currentChallenge.startDate).toLocaleDateString(isID ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}<\/p>
                    <\/div>

                    <div class="summary-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 35px;">
                        <div class="summary-item">
                            <div style="font-size: 9px; text-transform: uppercase; color: #64748b; margin-bottom: 4px; font-weight: 700;">Level<\/div>
                            <div style="font-size: 14px; font-weight: 800; color: #0f172a;">${levelStr}<\/div>
                        <\/div>
                        <div class="summary-item">
                            <div style="font-size: 9px; text-transform: uppercase; color: #64748b; margin-bottom: 4px; font-weight: 700;">${isID ? 'Terkumpul' : 'Collected'}<\/div>
                            <div style="font-size: 14px; font-weight: 800; color: #10b981;">${formatRupiah(currentChallenge.collectedAmount)}<\/div>
                        <\/div>
                        <div class="summary-item">
                            <div style="font-size: 9px; text-transform: uppercase; color: #64748b; margin-bottom: 4px; font-weight: 700;">Target<\/div>
                            <div style="font-size: 14px; font-weight: 800; color: #3b82f6;">${formatRupiah(currentChallenge.targetAmount)}<\/div>
                        <\/div>
                        <div class="summary-item">
                            <div style="font-size: 9px; text-transform: uppercase; color: #64748b; margin-bottom: 4px; font-weight: 700;">Progress<\/div>
                            <div style="font-size: 14px; font-weight: 800; color: #8b5cf6;">${progress}%<\/div>
                        <\/div>
                    <\/div>

                    <div class="details-section">
                        <div style="font-size: 16px; font-weight: 800; margin-bottom: 15px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Daily Tracker Progress (30 ${isID ? 'Hari' : 'Days'})<\/div>
                        <div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 10px; margin-bottom: 30px;">
                            ${dayGridHTML}
                        <\/div>
                    <\/div>

                    <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin-top: 30px; border: 1px solid #e2e8f0;">
                        <h3 style="font-size: 14px; margin-bottom: 10px; color: #0f172a;">${isID ? 'Ringkasan Pencapaian' : 'Achievement Summary'}<\/h3>
                        <p style="font-size: 12px; line-height: 1.6; color: #334155;">
                            ${isID ? 
                            `Selamat! Anda berada di hari ke-<b>${currentChallenge.currentDay}<\/b>. Sejauh ini Anda telah berhasil mengumpulkan <b>${formatRupiah(currentChallenge.collectedAmount)}<\/b>. Tinggal <b>${daysRemaining} hari<\/b> lagi untuk mencapai target utama Anda sebesar <b>${formatRupiah(currentChallenge.targetAmount)}<\/b>. Teruskan konsistensi Anda!` : 
                            `Congratulations! You are on day <b>${currentChallenge.currentDay}<\/b>. So far you have successfully collected <b>${formatRupiah(currentChallenge.collectedAmount)}<\/b>. Only <b>${daysRemaining} days<\/b> left to reach your main target of <b>${formatRupiah(currentChallenge.targetAmount)}<\/b>. Keep up the consistency!`}
                        <\/p>
                    <\/div>

                    <div style="margin-top: 50px; padding-top: 15px; border-top: 1px dashed #cbd5e1; text-align: center; font-size: 9px; color: #94a3b8; font-family: 'JetBrains Mono', monospace;">
                        <p>© ${new Date().getFullYear()} Monetra. ${isID ? 'Sistem Laporan Otomatis.' : 'Automated Report System.'}<\/p>
                    <\/div>
                <\/div>
            `;
        };

        window.downloadResult = function() {
            if (!currentChallenge) return;
            const printContent = window.generatePrintContent();
            const printWindow = window.open('', '_blank');
            const isID = document.documentElement.lang === 'id';

            // Menambahkan "\" (escape) sebelum tanda "/" pada tag penutup 
            // agar ekstensi Live Server VS Code tidak salah menyuntikkan script di sini!
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${isID ? 'Laporan' : 'Report'} Saving Challenge - Monetra<\/title>
                    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
                    <style>
                        body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 40px; background: white; margin: 0; }
                        @media print { body { padding: 0; } .no-print { display: none !important; } }
                        .day-circle-print { width: 35px; height: 35px; border-radius: 50%; border: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; font-family: 'JetBrains Mono', monospace; }
                        .day-circle-print.completed { background-color: #3b82f6 !important; color: white !important; border-color: #3b82f6 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                        .day-circle-print.current { border: 2px solid #3b82f6 !important; color: #3b82f6 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    <\/style>
                <\/head>
                <body>
                    ${printContent}
                    <div style="text-align: center; margin-top: 40px;" class="no-print">
                        <button onclick="window.print()" style="padding: 12px 30px; background: #3b82f6; color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: bold; cursor: pointer; margin-right: 10px; font-family: 'Plus Jakarta Sans', sans-serif;">${isID ? 'Cetak Laporan' : 'Print Report'}<\/button>
                        <button onclick="window.close()" style="padding: 12px 30px; background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 14px; font-weight: bold; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;">${isID ? 'Tutup' : 'Close'}<\/button>
                    <\/div>
                <\/body>
                <\/html>
            `);
            printWindow.document.close();
        };

        window.printResult = function() {
            if (!currentChallenge) return;
            const printReport = document.getElementById('printReport');
            printReport.innerHTML = window.generatePrintContent();
            printReport.style.display = 'block';
            window.print();
            setTimeout(() => { printReport.style.display = 'none'; }, 1000);
        };

        // ==================== 5. INITIALIZATION ====================
        document.addEventListener('DOMContentLoaded', () => {

            // 1. Load State from LocalStorage
            try {
                const savedData = localStorage.getItem('monetra_activeChallenge');
                if (savedData) {
                    currentChallenge = JSON.parse(savedData);
                }
            } catch (e) {
                console.error("Storage Error:", e);
                localStorage.removeItem('monetra_activeChallenge');
            }

            // 2. Init Animations
            try {
                if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true });
            } catch(e) {}

            // 3. Setup Theme
            const themeToggleBtn = document.getElementById('themeToggle');
            const themeToggleMobileBtn = document.getElementById('themeToggleMobile');
            
            function toggleThemeLogic() {
                const isDark = document.documentElement.classList.toggle('dark');
                document.documentElement.classList.toggle('light', !isDark);
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                refreshIcons();
            }

            if(themeToggleBtn) themeToggleBtn.addEventListener('click', toggleThemeLogic);
            if(themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleThemeLogic);
            
            if (localStorage.getItem('theme') === 'light') {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            } else {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            }

            // 4. Setup Language & Render
            const langBtn1 = document.getElementById('langToggleBtn');
            const langBtn2 = document.getElementById('langToggleBtnMobile');

            if(langBtn1) langBtn1.addEventListener('click', () => {
                applyLanguage(document.documentElement.lang === 'id' ? 'en' : 'id');
            });
            if(langBtn2) langBtn2.addEventListener('click', () => {
                applyLanguage(document.documentElement.lang === 'id' ? 'en' : 'id');
            });

            const savedLang = localStorage.getItem('lang') || 'id';
            applyLanguage(savedLang); 

            // 5. Setup UI Interaksi
            window.addEventListener('scroll', () => {
                const navbar = document.getElementById('navbar');
                if(!navbar) return;
                if (window.scrollY > 40) navbar.classList.add('nav-scrolled');
                else navbar.classList.remove('nav-scrolled');
            });

            const mobileMenu = document.getElementById('mobileMenu');
            const overlay = document.getElementById('mobileMenuOverlay');
            const openBtn = document.getElementById('mobileMenuBtn');
            const closeBtn = document.getElementById('closeMobileMenu');
            const clock = document.getElementById('floating-clock');

            const toggleMobileMenu = (show) => {
                if(!mobileMenu || !overlay) return;
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

            if(openBtn) openBtn.addEventListener('click', () => toggleMobileMenu(true));
            if(closeBtn) closeBtn.addEventListener('click', () => toggleMobileMenu(false));
            if(overlay) overlay.addEventListener('click', () => toggleMobileMenu(false));

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

            updateClock();
            setInterval(updateClock, 1000);
        });
