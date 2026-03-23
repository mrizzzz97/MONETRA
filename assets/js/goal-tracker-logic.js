        let goals = JSON.parse(localStorage.getItem('monetra_goals_full')) || [];
        let selectedColorHex = '#8b5cf6'; // Default violet
        let milestoneCounter = 0;

        // Sync initial state language
        const savedLang = localStorage.getItem('lang') || 'id';
        applyLanguage(savedLang);

        function formatRupiah(num) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
        }

        function formatNumberInput(value) {
            const number = value.replace(/\D/g, '');
            return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }

        function parseFormattedNumber(value) {
            return parseInt(value.replace(/\./g, '') || '0');
        }

        // Add Number Formatting for Inputs
        function setupNumberFormatting(inputId) {
            const input = document.getElementById(inputId);
            if (!input) return;
            
            input.addEventListener('input', function(e) {
                const cursorPosition = this.selectionStart;
                const oldLength = this.value.length;
                this.value = formatNumberInput(this.value);
                const newLength = this.value.length;
                const diff = newLength - oldLength;
                this.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
            });

            input.addEventListener('blur', function () {
                if (!this.value || this.value === '0') this.value = '0';
            });

            input.addEventListener('focus', function () {
                if (this.value === '0') this.value = '';
            });
        }
        
        setupNumberFormatting('goalTarget');
        setupNumberFormatting('goalCurrent');

        function openAddGoalModal() {
            const modal = document.getElementById('addGoalModal');
            const content = document.getElementById('modalContent');
            modal.classList.remove('hidden');
            setTimeout(() => {
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
            }, 10);
            document.body.style.overflow = 'hidden';
        }

        function closeAddGoalModal() {
            const modal = document.getElementById('addGoalModal');
            const content = document.getElementById('modalContent');
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }

        function selectColor(hex, btnElement) {
            selectedColorHex = hex;
            document.querySelectorAll('.color-option').forEach(btn => {
                btn.classList.remove('selected');
            });
            btnElement.classList.add('selected');
        }

        function addMilestoneInput() {
            milestoneCounter++;
            const container = document.getElementById('milestonesContainer');
            if (!container) return;

            const isID = document.documentElement.lang === 'id';
            const placeholder = isID ? "Contoh: Booking Tiket" : "Example: Book Flight";

            const milestoneDiv = document.createElement('div');
            milestoneDiv.className = 'flex gap-2 items-center';
            milestoneDiv.id = `milestone-${milestoneCounter}`;
            milestoneDiv.innerHTML = `
                <input type="text" class="sys-input flex-1 !py-2" placeholder="${placeholder}">
                <button type="button" onclick="removeMilestoneInput(${milestoneCounter})" class="p-2 text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            `;
            container.appendChild(milestoneDiv);
            lucide.createIcons();
        }

        function removeMilestoneInput(id) {
            const element = document.getElementById(`milestone-${id}`);
            if (element) element.remove();
        }

        function getMilestonesFromInputs() {
            const milestones = [];
            const container = document.getElementById('milestonesContainer');
            if (!container) return milestones;

            const inputs = container.querySelectorAll('input[type="text"]');
            inputs.forEach((input, index) => {
                const text = input.value.trim();
                if (text) {
                    milestones.push({ id: index + 1, text: text, completed: false });
                }
            });
            return milestones;
        }

        function clearMilestoneInputs() {
            const container = document.getElementById('milestonesContainer');
            if (container) container.innerHTML = '';
            milestoneCounter = 0;
        }

        function addNewGoal() {
            const name = document.getElementById('goalName').value;
            const target = parseFormattedNumber(document.getElementById('goalTarget').value);
            const current = parseFormattedNumber(document.getElementById('goalCurrent').value);
            const category = document.getElementById('goalCategory').value;
            const deadline = document.getElementById('goalDeadline').value;
            const milestones = getMilestonesFromInputs();
            const isID = document.documentElement.lang === 'id';

            if(!name || target <= 0) {
                alert(isID ? 'Nama target dan nominal target tidak valid!' : 'Goal name and target amount are invalid!');
                return;
            }

            const newGoal = {
                id: Date.now(),
                name: name,
                category: category,
                target: target,
                current: current || 0,
                deadline: deadline || null,
                colorHex: selectedColorHex,
                milestones: milestones,
                createdAt: new Date().toISOString()
            };

            goals.push(newGoal);
            localStorage.setItem('monetra_goals_full', JSON.stringify(goals));
            
            renderGoals();
            updateRecentMilestones();
            closeAddGoalModal();
            
            // Clear inputs
            document.getElementById('goalName').value = '';
            document.getElementById('goalTarget').value = '';
            document.getElementById('goalCurrent').value = '0';
            document.getElementById('goalDeadline').value = '';
            clearMilestoneInputs();
        }

        function deleteGoal(id) {
            const isID = document.documentElement.lang === 'id';
            if(confirm(isID ? 'Apakah Anda yakin ingin menghapus target ini?' : 'Are you sure you want to delete this goal?')){
                goals = goals.filter(g => g.id !== id);
                localStorage.setItem('monetra_goals_full', JSON.stringify(goals));
                renderGoals();
                updateRecentMilestones();
            }
        }

        function updateProgress(id) {
            const inputId = `update-input-${id}`;
            const input = document.getElementById(inputId);
            if (!input) return;

            const val = parseFormattedNumber(input.value);
            if(val <= 0) return;
            
            const goal = goals.find(g => g.id === id);
            if (goal) {
                const oldCurrent = goal.current;
                goal.current += val;
                
                if (oldCurrent < goal.target && goal.current >= goal.target) {
                    celebrateGoal();
                }

                localStorage.setItem('monetra_goals_full', JSON.stringify(goals));
                renderGoals();
                input.value = ''; // clear input
            }
        }

        function toggleMilestone(goalId, milestoneId) {
            const goal = goals.find(g => g.id === goalId);
            if (goal && goal.milestones) {
                const milestone = goal.milestones.find(m => m.id === milestoneId);
                if (milestone) {
                    milestone.completed = !milestone.completed;
                    
                    if (milestone.completed) {
                        milestone.completedAt = new Date().toISOString();
                    } else {
                        delete milestone.completedAt;
                    }

                    localStorage.setItem('monetra_goals_full', JSON.stringify(goals));
                    renderGoals();
                    updateRecentMilestones();

                    const allCompleted = goal.milestones.every(m => m.completed);
                    const isID = document.documentElement.lang === 'id';
                    if (allCompleted && milestone.completed) {
                        celebrateGoal();
                        setTimeout(() => alert(isID ? 'Semua milestone selesai! 🎉' : 'All milestones completed! 🎉'), 500);
                    }
                }
            }
        }

        function getDaysLeft(deadline) {
            if (!deadline) return null;
            const today = new Date();
            const targetDate = new Date(deadline);
            const diffTime = targetDate - today;
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        function celebrateGoal() {
            for (let i = 0; i < 60; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
                confetti.style.animationDelay = Math.random() * 1.5 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                document.body.appendChild(confetti);

                setTimeout(() => { if (confetti.parentNode) confetti.remove(); }, 4000);
            }
        }

        function renderGoals() {
            const container = document.getElementById('goalsContainer');
            const empty = document.getElementById('emptyState');
            const isID = document.documentElement.lang === 'id';
            
            container.innerHTML = '';

            if(goals.length === 0) {
                empty.classList.remove('hidden');
                return;
            }
            empty.classList.add('hidden');

            const categoryLabels = {
                'vacation': isID ? 'Liburan' : 'Vacation',
                'education': isID ? 'Pendidikan' : 'Education',
                'vehicle': isID ? 'Kendaraan' : 'Vehicle',
                'house': isID ? 'Properti' : 'Property',
                'emergency': isID ? 'Dana Darurat' : 'Emergency Fund',
                'other': isID ? 'Lainnya' : 'Other'
            };

            const categoryIcons = {
                'vacation': 'plane',
                'education': 'graduation-cap',
                'vehicle': 'car',
                'house': 'home',
                'emergency': 'alert-triangle',
                'other': 'target'
            };

            goals.forEach(goal => {
                const percent = Math.min(Math.round((goal.current / goal.target) * 100), 100);
                const displayCat = categoryLabels[goal.category] || goal.category;
                const iconName = categoryIcons[goal.category] || 'target';
                const daysLeft = getDaysLeft(goal.deadline);
                
                const milestoneCompleted = goal.milestones ? goal.milestones.filter(m => m.completed).length : 0;
                const totalMilestones = goal.milestones ? goal.milestones.length : 0;
                
                const cardColor = goal.colorHex || '#3b82f6';

                const card = document.createElement('div');
                card.className = 'spotlight-card bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 lg:p-8 shadow-sm group flex flex-col h-full';
                
                let deadlineHTML = '';
                if(goal.deadline) {
                    const deadlineDate = new Date(goal.deadline);
                    const formattedDeadline = deadlineDate.toLocaleDateString(isID ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                    
                    let daysText = '';
                    if (daysLeft > 0) daysText = `<span class="text-emerald-500 font-bold ml-1">(${daysLeft} ${isID ? 'hari lagi' : 'days left'})</span>`;
                    else if (daysLeft < 0) daysText = `<span class="text-red-500 font-bold ml-1">(${isID ? 'Terlewat' : 'Overdue'})</span>`;

                    deadlineHTML = `
                        <div class="mb-4 flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono bg-zinc-100 dark:bg-zinc-800/50 w-max px-2.5 py-1.5 rounded-md">
                            <i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${formattedDeadline} ${daysText}
                        </div>
                    `;
                }

                let milestonesHTML = '';
                if (totalMilestones > 0) {
                    milestonesHTML = `
                        <div class="mt-5 border-t border-zinc-100 dark:border-zinc-800/80 pt-4 flex-1">
                            <div class="flex justify-between items-center mb-3">
                                <span class="text-xs font-bold uppercase tracking-wider text-zinc-500">Milestones</span>
                                <span class="text-xs font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">${milestoneCompleted}/${totalMilestones}</span>
                            </div>
                            <div class="space-y-2 max-h-36 overflow-y-auto custom-scroll pr-1">
                                ${goal.milestones.map(m => `
                                    <div class="milestone-item ${m.completed ? 'is-completed' : ''}" onclick="toggleMilestone(${goal.id}, ${m.id})">
                                        <div class="milestone-check" style="${m.completed ? `background-color: ${cardColor}; border-color: ${cardColor};` : ''}">
                                            ${m.completed ? '<i data-lucide="check" class="w-3.5 h-3.5 text-white"></i>' : ''}
                                        </div>
                                        <span class="milestone-text text-sm font-medium leading-tight pt-0.5">${m.text}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }

                card.innerHTML = `
                    <div class="flex justify-between items-start mb-5">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md" style="background-color: ${cardColor};">
                            <i data-lucide="${iconName}" class="w-5 h-5"></i>
                        </div>
                        <button onclick="deleteGoal(${goal.id})" class="text-zinc-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 -mt-2 -mr-2">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                    
                    <h3 class="text-xl font-bold mb-1 tracking-tight truncate" title="${goal.name}">${goal.name}</h3>
                    <p class="text-xs text-zinc-500 font-mono mb-4 uppercase tracking-wider">${displayCat}</p>
                    
                    ${deadlineHTML}
                    
                    <div class="space-y-2.5 mb-2 ${totalMilestones === 0 ? 'flex-1' : ''}">
                        <div class="flex justify-between text-sm font-bold items-end">
                            <span class="text-2xl" style="color: ${cardColor};">${percent}%</span>
                            <div class="text-right">
                                <div class="text-zinc-900 dark:text-white">${formatRupiah(goal.current)}</div>
                                <div class="text-[10px] text-zinc-400 font-mono">/ ${formatRupiah(goal.target)}</div>
                            </div>
                        </div>
                        <div class="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                            <div class="h-full transition-all duration-1000 relative" style="width: ${percent}%; background-color: ${cardColor};">
                                <div class="absolute inset-0 bg-white/20 w-full animate-[shine_2s_ease-out_infinite] skew-x-[-20deg]"></div>
                            </div>
                        </div>
                    </div>

                    ${milestonesHTML}

                    <div class="mt-6 flex gap-2 shrink-0">
                        <input type="text" id="update-input-${goal.id}" class="sys-input !py-2.5 flex-1" placeholder="${isID ? 'Nominal (Rp)' : 'Amount (IDR)'}">
                        <button onclick="updateProgress(${goal.id})" class="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 rounded-xl text-sm font-bold hover:scale-[1.02] transition-transform active:scale-95 shadow-md flex items-center justify-center shrink-0">
                            ${isID ? 'Update' : 'Add'}
                        </button>
                    </div>
                `;
                container.appendChild(card);
                
                // Add input formatter for this specific dynamic input
                setTimeout(() => setupNumberFormatting(`update-input-${goal.id}`), 0);
                
                // Add Tilt Physics
                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                    card.style.setProperty('--mouse-x', `${x}px`); card.style.setProperty('--mouse-y', `${y}px`);
                    const rotateX = ((y - rect.height/2) / (rect.height/2)) * -3;
                    const rotateY = ((x - rect.width/2) / (rect.width/2)) * 3;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
                });
                card.addEventListener('mouseleave', () => card.style.transform = 'none');
            });
            lucide.createIcons();
        }

        function updateRecentMilestones() {
            const container = document.getElementById('recentMilestones');
            if (!container) return;
            const isID = document.documentElement.lang === 'id';

            let allMilestones = [];
            goals.forEach(goal => {
                if (goal.milestones) {
                    goal.milestones.forEach(m => {
                        if (m.completed) {
                            allMilestones.push({
                                goalName: goal.name, milestoneText: m.text, completedAt: m.completedAt || new Date().toISOString(), color: goal.colorHex || '#3b82f6'
                            });
                        }
                    });
                }
            });

            allMilestones.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
            const recent = allMilestones.slice(0, 5);

            if (recent.length === 0) {
                container.innerHTML = `<p class="text-zinc-500 text-sm italic text-center py-4">${isID ? 'Belum ada milestone yang dicapai.' : 'No milestones achieved yet.'}</p>`;
                return;
            }

            container.innerHTML = recent.map(m => {
                const timeStr = new Date(m.completedAt).toLocaleDateString(isID ? 'id-ID' : 'en-US', { month: 'short', day: 'numeric' });
                return `
                    <div class="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style="background-color: ${m.color}20; color: ${m.color};">
                            <i data-lucide="check" class="w-4 h-4"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight">${m.milestoneText}</p>
                            <p class="text-[11px] text-zinc-500 font-mono mt-1">${m.goalName} • ${timeStr}</p>
                        </div>
                    </div>
                `;
            }).join('');
            lucide.createIcons();
        }

        function updateTips() {
            const container = document.getElementById('tipsContainer');
            if (!container) return;
            const isID = document.documentElement.lang === 'id';

            const tipsID = [
                { icon: 'zap', title: 'Konsisten Itu Kunci', text: 'Menabung rutin meski nominal kecil jauh lebih berdampak daripada besar tapi jarang dilakukan.' },
                { icon: 'pie-chart', title: 'Aturan 50/30/20', text: 'Alokasikan 50% untuk kebutuhan, 30% keinginan, dan 20% khusus untuk tabungan & investasi.' },
                { icon: 'trending-up', title: 'Lawan Inflasi', text: 'Untuk target di atas 3 tahun, pertimbangkan instrumen investasi reksa dana atau obligasi.' },
                { icon: 'shield-alert', title: 'Pondasi Darurat', text: 'Pastikan Anda sudah membangun Dana Darurat (3-6x pengeluaran bulanan) terlebih dahulu.' }
            ];

            const tipsEN = [
                { icon: 'zap', title: 'Consistency is Key', text: 'Saving regularly, even small amounts, is much more impactful than large, infrequent deposits.' },
                { icon: 'pie-chart', title: '50/30/20 Rule', text: 'Allocate 50% for needs, 30% for wants, and 20% strictly for savings & investments.' },
                { icon: 'trending-up', title: 'Beat Inflation', text: 'For goals beyond 3 years, consider investment instruments like mutual funds or bonds.' },
                { icon: 'shield-alert', title: 'Emergency Foundation', text: 'Ensure you build an Emergency Fund (3-6x monthly expenses) before other goals.' }
            ];

            const tips = isID ? tipsID : tipsEN;
            const randomTip = tips[Math.floor(Math.random() * tips.length)];

            container.innerHTML = `
                <div class="flex flex-col gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <i data-lucide="${randomTip.icon}" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h4 class="text-base font-bold mb-2 text-zinc-900 dark:text-white">${randomTip.title}</h4>
                        <p class="text-sm text-zinc-500 leading-relaxed">${randomTip.text}</p>
                    </div>
                </div>
            `;
            lucide.createIcons();
        }

        // Setup Interval for Tips
        setInterval(updateTips, 30000);
