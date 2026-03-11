(function () {

    // Tunggu DOM + Lucide siap
    function safeCreateIcons() {
        if (typeof lucide !== 'undefined') {
            try { lucide.createIcons(); } catch (e) { console.warn('Lucide:', e); }
        }
    }

    // =============================================
    // PERSONALITY TEST DATA
    // =============================================
    const questions = [
        {
            id: 1,
            question: "Ketika menerima uang, apa yang pertama kamu pikirkan?",
            options: [
                { text: "Langsung ditabung", value: "saver", score: { saver: 3, spender: 0, investor: 0, security: 1 } },
                { text: "Langsung dibelanjakan", value: "spender", score: { saver: 0, spender: 3, investor: 0, security: 0 } },
                { text: "Dicari cara untuk dikembangkan", value: "investor", score: { saver: 0, spender: 0, investor: 3, security: 0 } },
                { text: "Disimpan untuk kebutuhan darurat", value: "security", score: { saver: 1, spender: 0, investor: 0, security: 3 } }
            ]
        },
        {
            id: 2,
            question: "Bagaimana pandanganmu tentang investasi?",
            options: [
                { text: "Risiko tinggi, lebih baik tabungan biasa", value: "saver", score: { saver: 3, spender: 0, investor: 0, security: 1 } },
                { text: "Investasi itu membosankan, lebih baik belanja", value: "spender", score: { saver: 0, spender: 3, investor: 0, security: 0 } },
                { text: "Peluang untuk mengembangkan uang", value: "investor", score: { saver: 0, spender: 0, investor: 3, security: 0 } },
                { text: "Hanya instrumen yang aman seperti deposito", value: "security", score: { saver: 1, spender: 0, investor: 0, security: 3 } }
            ]
        },
        {
            id: 3,
            question: "Apa reaksimu saat melihat diskon besar-besaran?",
            options: [
                { text: "Tetap berpikir apakah benar-benar butuh", value: "saver", score: { saver: 3, spender: 0, investor: 0, security: 1 } },
                { text: "Langsung beli sebelum kehabisan", value: "spender", score: { saver: 0, spender: 3, investor: 0, security: 0 } },
                { text: "Membeli barang yang bisa dijual kembali", value: "investor", score: { saver: 0, spender: 0, investor: 3, security: 0 } },
                { text: "Membeli kebutuhan pokok dalam jumlah banyak", value: "security", score: { saver: 1, spender: 0, investor: 0, security: 3 } }
            ]
        },
        {
            id: 4,
            question: "Bagaimana persiapanmu untuk masa pensiun?",
            options: [
                { text: "Menabung secara rutin setiap bulan", value: "saver", score: { saver: 3, spender: 0, investor: 0, security: 1 } },
                { text: "Belum terpikirkan sama sekali", value: "spender", score: { saver: 0, spender: 3, investor: 0, security: 0 } },
                { text: "Berinvestasi jangka panjang", value: "investor", score: { saver: 0, spender: 0, investor: 3, security: 0 } },
                { text: "Ikut program asuransi dan dana pensiun", value: "security", score: { saver: 1, spender: 0, investor: 0, security: 3 } }
            ]
        },
        {
            id: 5,
            question: "Saat memiliki uang lebih, apa yang kamu lakukan?",
            options: [
                { text: "Menambah tabungan", value: "saver", score: { saver: 3, spender: 0, investor: 0, security: 1 } },
                { text: "Traktir teman atau family", value: "spender", score: { saver: 0, spender: 3, investor: 0, security: 0 } },
                { text: "Beli saham atau emas", value: "investor", score: { saver: 0, spender: 0, investor: 3, security: 0 } },
                { text: "Simpan di rekening terpisah", value: "security", score: { saver: 1, spender: 0, investor: 0, security: 3 } }
            ]
        },
        {
            id: 6,
            question: "Bagaimana perasaanmu tentang utang?",
            options: [
                { text: "Harus dihindari sebisa mungkin", value: "saver", score: { saver: 3, spender: 0, investor: 0, security: 1 } },
                { text: "Wajar untuk gaya hidup", value: "spender", score: { saver: 0, spender: 3, investor: 0, security: 0 } },
                { text: "Bisa jadi alat untuk bisnis", value: "investor", score: { saver: 0, spender: 0, investor: 3, security: 0 } },
                { text: "Hanya untuk kebutuhan mendesak", value: "security", score: { saver: 1, spender: 0, investor: 0, security: 3 } }
            ]
        },
        {
            id: 7,
            question: "Kamu mendapatkan bonus besar. Apa yang kamu lakukan?",
            options: [
                { text: "90% ditabung, 10% untuk reward", value: "saver", score: { saver: 3, spender: 0, investor: 0, security: 1 } },
                { text: "Beli barang impian", value: "spender", score: { saver: 0, spender: 3, investor: 0, security: 0 } },
                { text: "Cari peluang investasi baru", value: "investor", score: { saver: 0, spender: 0, investor: 3, security: 0 } },
                { text: "Buat dana darurat", value: "security", score: { saver: 1, spender: 0, investor: 0, security: 3 } }
            ]
        },
        {
            id: 8,
            question: "Bagaimana kebiasaan catatan keuanganmu?",
            options: [
                { text: "Mencatat setiap pemasukan & pengeluaran", value: "saver", score: { saver: 3, spender: 0, investor: 0, security: 1 } },
                { text: "Jarang mencatat, yang penting cukup", value: "spender", score: { saver: 0, spender: 3, investor: 0, security: 0 } },
                { text: "Mencatat untuk evaluasi investasi", value: "investor", score: { saver: 0, spender: 0, investor: 3, security: 0 } },
                { text: "Mencatat pengeluaran penting saja", value: "security", score: { saver: 1, spender: 0, investor: 0, security: 3 } }
            ]
        },
        {
            id: 9,
            question: "Saat harga barang naik, apa yang kamu lakukan?",
            options: [
                { text: "Mengurangi konsumsi", value: "saver", score: { saver: 3, spender: 0, investor: 0, security: 1 } },
                { text: "Tetap beli karena butuh", value: "spender", score: { saver: 0, spender: 3, investor: 0, security: 0 } },
                { text: "Cari alternatif investasi", value: "investor", score: { saver: 0, spender: 0, investor: 3, security: 0 } },
                { text: "Stok barang dari sekarang", value: "security", score: { saver: 1, spender: 0, investor: 0, security: 3 } }
            ]
        },
        {
            id: 10,
            question: "Apa tujuan keuangan utamamu?",
            options: [
                { text: "Memiliki tabungan besar", value: "saver", score: { saver: 3, spender: 0, investor: 0, security: 1 } },
                { text: "Menikmati hidup tanpa mikir uang", value: "spender", score: { saver: 0, spender: 3, investor: 0, security: 0 } },
                { text: "Mencapai financial freedom", value: "investor", score: { saver: 0, spender: 0, investor: 3, security: 0 } },
                { text: "Keuangan stabil dan aman", value: "security", score: { saver: 1, spender: 0, investor: 0, security: 3 } }
            ]
        }
    ];

    const resultTypes = {
        saver: {
            name: "The Saver",
            description: "Kamu adalah tipe yang suka menabung dan hemat. Kamu selalu memikirkan masa depan dan tidak mudah tergoda oleh gaya hidup konsumtif.",
            strengths: [
                "Bijak dalam mengelola keuangan",
                "Disiplin menabung",
                "Tidak mudah tergoda diskon",
                "Memiliki tujuan finansial jelas"
            ],
            weaknesses: [
                "Kadang terlalu pelit pada diri sendiri",
                "Takut mengambil risiko",
                "Kesulitan menikmati hasil jerih payah"
            ],
            recommendations: [
                "Mulai belajar investasi rendah risiko seperti reksadana pasar uang",
                "Sisihkan dana untuk 'reward' diri sendiri",
                "Coba saving challenge untuk menambah motivasi"
            ]
        },
        spender: {
            name: "The Spender",
            description: "Kamu adalah tipe yang menikmati hidup dan tidak ragu membelanjakan uang untuk hal-hal yang kamu suka.",
            strengths: [
                "Menghargai hasil kerja keras",
                "Pandai mencari kesenangan",
                "Tidak pelit pada diri sendiri",
                "Mudah bersosialisasi"
            ],
            weaknesses: [
                "Sulit menabung",
                "Mudah tergoda diskon",
                "Kurang persiapan masa depan"
            ],
            recommendations: [
                "Gunakan metode 50-30-20 untuk budgeting",
                "Buat rekening tabungan terpisah",
                "Ikut saving challenge untuk melatih disiplin"
            ]
        },
        investor: {
            name: "The Investor",
            description: "Kamu memiliki jiwa investor sejati. Kamu selalu mencari peluang untuk mengembangkan uang dan berpikir jangka panjang.",
            strengths: [
                "Berpikir jangka panjang",
                "Berani mengambil risiko",
                "Paham instrumen investasi",
                "Selalu update informasi keuangan"
            ],
            weaknesses: [
                "Bisa terlalu agresif dalam investasi",
                "Kurang memikirkan dana darurat",
                "Mengabaikan kebutuhan jangka pendek"
            ],
            recommendations: [
                "Seimbangkan portofolio investasi",
                "Siapkan dana darurat 6 bulan",
                "Diversifikasi instrumen investasi"
            ]
        },
        security: {
            name: "The Security Seeker",
            description: "Kamu adalah tipe yang mengutamakan keamanan finansial. Kamu selalu siap menghadapi situasi darurat dan tidak suka risiko.",
            strengths: [
                "Siap menghadapi darurat",
                "Memiliki proteksi diri",
                "Perencanaan matang",
                "Tidak ceroboh dalam finansial"
            ],
            weaknesses: [
                "Terlalu protektif",
                "Melewatkan peluang investasi",
                "Kurang fleksibel"
            ],
            recommendations: [
                "Mulai eksplorasi investasi rendah risiko",
                "Evaluasi proteksi asuransi secara berkala",
                "Belajar tentang inflasi dan dampaknya"
            ]
        }
    };

    // =============================================
    // TEST STATE
    // =============================================
    let currentQuestion = 0;
    let answers = new Array(questions.length).fill(null);
    let scores = { saver: 0, spender: 0, investor: 0, security: 0 };
    let currentResult = null;

    const questionContainer = document.getElementById('questionContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const questionCounter = document.getElementById('questionCounter');
    const progressFill = document.getElementById('progressFill');
    const testSection = document.getElementById('testSection');
    const resultSection = document.getElementById('resultSection');

    // =============================================
    // RENDER QUESTION
    // =============================================
    function renderQuestion() {
        const q = questions[currentQuestion];
        const selectedAnswer = answers[currentQuestion];

        let markup = `
            <div class="question-card">
                <div class="mb-8">
                    <span class="text-sm font-medium text-violet-400 mb-2 block">Pertanyaan ${currentQuestion + 1}</span>
                    <h3 class="text-2xl md:text-3xl font-bold">${q.question}</h3>
                </div>
                <div class="space-y-4">
        `;

        q.options.forEach((option, index) => {
            const isSelected = selectedAnswer === index;
            markup += `
                <div class="personality-card p-6 rounded-2xl ${isSelected ? 'selected' : ''}" data-index="${index}">
                    <div class="flex items-center justify-between">
                        <span class="text-lg">${option.text}</span>
                        <div class="option-circle w-6 h-6 rounded-full border-2 ${isSelected ? 'border-violet-500 bg-violet-500' : 'border-white/20'} flex items-center justify-center">
                            ${isSelected ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        markup += `</div></div>`;
        questionContainer.innerHTML = markup;

        // Attach click handlers langsung — tidak pakai window.selectAnswer
        questionContainer.querySelectorAll('.personality-card').forEach((card) => {
            card.addEventListener('click', function () {
                selectAnswer(parseInt(this.dataset.index));
            });
        });

        safeCreateIcons();
        updateNavigationButtons();
    }

    function selectAnswer(optionIndex) {
        answers[currentQuestion] = optionIndex;

        // Update visual in-place — no re-render
        questionContainer.querySelectorAll('.personality-card').forEach((card, i) => {
            const isSelected = i === optionIndex;
            card.classList.toggle('selected', isSelected);

            const circle = card.querySelector('.option-circle');
            if (circle) {
                circle.className = `option-circle w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-violet-500 bg-violet-500' : 'border-white/20'}`;
                circle.innerHTML = isSelected
                    ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
                    : '';
            }
        });

        updateNavigationButtons();
    }

    // =============================================
    // NAVIGATION
    // =============================================
    function updateNavigationButtons() {
        prevBtn.disabled = currentQuestion === 0;

        const hasAnswer = answers[currentQuestion] !== null;

        if (currentQuestion === questions.length - 1) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
            submitBtn.disabled = !hasAnswer;
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
            nextBtn.disabled = !hasAnswer;
        }

        questionCounter.textContent = `${currentQuestion + 1}/${questions.length}`;
        progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    }

    function nextQuestion() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
            window.scrollTo({ top: testSection.offsetTop - 100, behavior: 'smooth' });
        }
    }

    function prevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
            window.scrollTo({ top: testSection.offsetTop - 100, behavior: 'smooth' });
        }
    }

    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    submitBtn.addEventListener('click', showResult);

    // =============================================
    // CALCULATE & SHOW RESULT
    // =============================================
    function calculateResult() {
        scores = { saver: 0, spender: 0, investor: 0, security: 0 };

        questions.forEach((q, index) => {
            const answerIndex = answers[index];
            if (answerIndex !== null) {
                const option = q.options[answerIndex];
                Object.keys(option.score).forEach(key => {
                    scores[key] += option.score[key];
                });
            }
        });

        let dominantType = 'saver';
        let maxScore = 0;
        Object.keys(scores).forEach(key => {
            if (scores[key] > maxScore) {
                maxScore = scores[key];
                dominantType = key;
            }
        });

        return dominantType;
    }

    function showResult() {
        const type = calculateResult();
        currentResult = resultTypes[type];

        document.getElementById('resultType').textContent = currentResult.name;
        document.getElementById('resultDescription').textContent = currentResult.description;

        document.getElementById('strengthsList').innerHTML = currentResult.strengths.map(s => `
            <li class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>${s}</span>
            </li>
        `).join('');

        document.getElementById('weaknessesList').innerHTML = currentResult.weaknesses.map(w => `
            <li class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1" fill="#fb923c"/></svg>
                <span>${w}</span>
            </li>
        `).join('');

        document.getElementById('recommendationsList').innerHTML = currentResult.recommendations.map(r => `
            <li class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                <span>${r}</span>
            </li>
        `).join('');

        testSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        window.scrollTo({ top: resultSection.offsetTop - 100, behavior: 'smooth' });
    }

    function restartTest() {
        currentQuestion = 0;
        answers = new Array(questions.length).fill(null);
        scores = { saver: 0, spender: 0, investor: 0, security: 0 };
        currentResult = null;

        testSection.classList.remove('hidden');
        resultSection.classList.add('hidden');

        renderQuestion();
        window.scrollTo({ top: testSection.offsetTop - 100, behavior: 'smooth' });
    }

    // =============================================
    // PRINT / DOWNLOAD
    // =============================================
    function generateScoreMeter() {
        const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
        const types = {
            saver: { name: 'The Saver', color: '#8b5cf6' },
            spender: { name: 'The Spender', color: '#f43f5e' },
            investor: { name: 'The Investor', color: '#06b6d4' },
            security: { name: 'The Security Seeker', color: '#10b981' }
        };
        return Object.keys(scores).map(key => {
            const percentage = Math.round((scores[key] / total) * 100);
            return `
                <div style="margin-bottom:12px;">
                    <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
                        <span>${types[key].name}</span>
                        <span style="font-weight:600;color:${types[key].color};">${percentage}%</span>
                    </div>
                    <div style="background:#e2e8f0;border-radius:999px;height:8px;overflow:hidden;">
                        <div style="width:${percentage}%;height:100%;background:${types[key].color};border-radius:999px;"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function generatePrintContent() {
        const date = new Date();
        const formattedDate = date.toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });

        return `
            <div style="font-family:Inter,sans-serif;max-width:800px;margin:0 auto;background:white;color:#0f172a;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px;padding-bottom:20px;border-bottom:3px solid #8b5cf6;">
                    <div>
                        <h2 style="font-size:28px;font-weight:900;color:#8b5cf6;margin:0;">Monetra</h2>
                        <p style="margin:4px 0 0;font-size:12px;color:#64748b;">Financial Intelligence Platform</p>
                    </div>
                    <div style="text-align:right;">
                        <p style="font-size:11px;color:#64748b;margin:0;">Tanggal: ${formattedDate}</p>
                        <p style="font-size:11px;color:#64748b;margin:2px 0 0;">Laporan Hasil Tes Kepribadian Finansial</p>
                    </div>
                </div>

                <div style="background:linear-gradient(135deg,#ede9fe,#e0f2fe);border-radius:16px;padding:24px;margin-bottom:24px;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;color:#7c3aed;margin-bottom:8px;">HASIL TES KAMU</div>
                    <div style="font-size:32px;font-weight:900;color:#4c1d95;margin-bottom:8px;">${currentResult.name}</div>
                    <div style="font-size:14px;color:#334155;line-height:1.6;">${currentResult.description}</div>
                </div>

                <div style="background:#f8fafc;border-radius:12px;padding:20px;margin-bottom:24px;">
                    <div style="font-size:13px;font-weight:700;margin-bottom:14px;color:#0f172a;">Skor Kepribadian Finansial</div>
                    ${generateScoreMeter()}
                </div>

                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;">
                    <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
                        <div style="font-size:12px;font-weight:700;color:#059669;margin-bottom:10px;">✅ Kelebihan</div>
                        ${currentResult.strengths.map(s => `<div style="font-size:11px;color:#334155;margin-bottom:6px;padding-left:8px;border-left:2px solid #10b981;">• ${s}</div>`).join('')}
                    </div>
                    <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
                        <div style="font-size:12px;font-weight:700;color:#dc2626;margin-bottom:10px;">⚠️ Tantangan</div>
                        ${currentResult.weaknesses.map(w => `<div style="font-size:11px;color:#334155;margin-bottom:6px;padding-left:8px;border-left:2px solid #f59e0b;">• ${w}</div>`).join('')}
                    </div>
                    <div style="border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
                        <div style="font-size:12px;font-weight:700;color:#2563eb;margin-bottom:10px;">💡 Rekomendasi</div>
                        ${currentResult.recommendations.map(r => `<div style="font-size:11px;color:#334155;margin-bottom:6px;padding-left:8px;border-left:2px solid #3b82f6;">• ${r}</div>`).join('')}
                    </div>
                </div>

                <div style="margin-bottom:24px;">
                    <div style="font-size:13px;font-weight:700;margin-bottom:12px;color:#0f172a;">Analisis Jawaban</div>
                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">
                        ${questions.map((q, i) => `
                            <div style="background:#f8fafc;border-radius:8px;padding:10px;border-left:3px solid #8b5cf6;">
                                <div style="font-size:10px;color:#64748b;margin-bottom:4px;">${i + 1}. ${q.question}</div>
                                <div style="font-size:11px;font-weight:600;color:#0f172a;">✓ ${q.options[answers[i]].text}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-top:32px;padding-top:12px;border-top:1px dashed #cbd5e1;text-align:center;">
                    <p style="font-size:9px;color:#94a3b8;">© ${new Date().getFullYear()} Monetra - Financial Intelligence Platform. Laporan ini dihasilkan secara otomatis dan valid sebagai referensi pengelolaan keuangan pribadi.</p>
                </div>
            </div>
        `;
    }

    function downloadResult() {
        if (!currentResult) return;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Laporan Hasil Tes Kepribadian - Monetra</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
                <style>
                    body { font-family: 'Inter', sans-serif; padding: 40px; background: white; margin: 0; }
                    @media print { body { padding: 0; } }
                </style>
            </head>
            <body>${generatePrintContent()}</body>
            </html>
        `);
        printWindow.document.close();
        setTimeout(() => { printWindow.print(); }, 500);
    }

    function printResult() {
        if (!currentResult) return;
        const printReport = document.getElementById('printReport');
        printReport.innerHTML = generatePrintContent();
        printReport.style.display = 'block';
        window.print();
        setTimeout(() => { printReport.style.display = 'none'; }, 1000);
    }

    // =============================================
    // EXPOSE GLOBALS
    // =============================================
    window.restartTest = restartTest;
    window.downloadResult = downloadResult;
    window.printResult = printResult;

    // =============================================
    // INIT
    // =============================================
    renderQuestion();

})();