        const questions = [
            {
                id: 1,
                question: { id: "Ketika menerima uang, apa yang pertama kamu pikirkan?", en: "When receiving money, what is the first thing you think about?" },
                options: [
                    { text: { id: "Langsung ditabung", en: "Save it immediately" }, type: "saver" },
                    { text: { id: "Langsung dibelanjakan", en: "Spend it immediately" }, type: "spender" },
                    { text: { id: "Dicari cara untuk dikembangkan", en: "Find a way to grow it" }, type: "investor" },
                    { text: { id: "Disimpan untuk kebutuhan darurat", en: "Keep it for emergencies" }, type: "security" }
                ]
            },
            {
                id: 2,
                question: { id: "Bagaimana pandanganmu tentang investasi?", en: "What is your view on investment?" },
                options: [
                    { text: { id: "Risiko tinggi, lebih baik tabungan biasa", en: "High risk, better use regular savings" }, type: "saver" },
                    { text: { id: "Investasi itu membosankan, lebih baik belanja", en: "Investment is boring, better go shopping" }, type: "spender" },
                    { text: { id: "Peluang untuk mengembangkan uang", en: "Opportunity to grow money" }, type: "investor" },
                    { text: { id: "Hanya instrumen yang aman seperti deposito", en: "Only safe instruments like deposits" }, type: "security" }
                ]
            },
            {
                id: 3,
                question: { id: "Apa reaksimu saat melihat diskon besar-besaran?", en: "What's your reaction to massive discounts?" },
                options: [
                    { text: { id: "Tetap berpikir apakah benar-benar butuh", en: "Still think if I really need it" }, type: "saver" },
                    { text: { id: "Langsung beli sebelum kehabisan", en: "Buy immediately before it's gone" }, type: "spender" },
                    { text: { id: "Membeli barang yang bisa dijual kembali", en: "Buy items that can be resold" }, type: "investor" },
                    { text: { id: "Membeli kebutuhan pokok dalam jumlah banyak", en: "Buy basic needs in bulk" }, type: "security" }
                ]
            },
            {
                id: 4,
                question: { id: "Bagaimana persiapanmu untuk masa pensiun?", en: "How are your preparations for retirement?" },
                options: [
                    { text: { id: "Menabung secara rutin setiap bulan", en: "Saving regularly every month" }, type: "saver" },
                    { text: { id: "Belum terpikirkan sama sekali", en: "Haven't thought about it at all" }, type: "spender" },
                    { text: { id: "Berinvestasi jangka panjang", en: "Investing for the long term" }, type: "investor" },
                    { text: { id: "Ikut program asuransi dan dana pensiun", en: "Join insurance and pension fund programs" }, type: "security" }
                ]
            },
            {
                id: 5,
                question: { id: "Saat memiliki uang lebih, apa yang kamu lakukan?", en: "When you have extra money, what do you do?" },
                options: [
                    { text: { id: "Menambah tabungan", en: "Add to savings" }, type: "saver" },
                    { text: { id: "Traktir teman atau keluarga", en: "Treat friends or family" }, type: "spender" },
                    { text: { id: "Beli saham atau emas", en: "Buy stocks or gold" }, type: "investor" },
                    { text: { id: "Simpan di rekening terpisah", en: "Keep it in a separate account" }, type: "security" }
                ]
            },
            {
                id: 6,
                question: { id: "Bagaimana perasaanmu tentang utang?", en: "How do you feel about debt?" },
                options: [
                    { text: { id: "Harus dihindari sebisa mungkin", en: "Avoid it at all costs" }, type: "saver" },
                    { text: { id: "Wajar untuk gaya hidup", en: "Normal for lifestyle" }, type: "spender" },
                    { text: { id: "Bisa jadi alat untuk bisnis", en: "Can be a tool for business" }, type: "investor" },
                    { text: { id: "Hanya untuk kebutuhan mendesak", en: "Only for urgent needs" }, type: "security" }
                ]
            },
            {
                id: 7,
                question: { id: "Kamu mendapatkan bonus besar. Apa yang kamu lakukan?", en: "You got a big bonus. What do you do?" },
                options: [
                    { text: { id: "90% ditabung, 10% untuk reward", en: "Save 90%, 10% for reward" }, type: "saver" },
                    { text: { id: "Beli barang impian", en: "Buy a dream item" }, type: "spender" },
                    { text: { id: "Cari peluang investasi baru", en: "Search for new investment opportunities" }, type: "investor" },
                    { text: { id: "Gunakan untuk dana darurat", en: "Use it for emergency fund" }, type: "security" }
                ]
            },
            {
                id: 8,
                question: { id: "Bagaimana kebiasaan catatan keuanganmu?", en: "How is your financial tracking habit?" },
                options: [
                    { text: { id: "Mencatat setiap pemasukan & pengeluaran", en: "Recording every income & expense" }, type: "saver" },
                    { text: { id: "Jarang mencatat, yang penting cukup", en: "Rarely record, as long as it's enough" }, type: "spender" },
                    { text: { id: "Mencatat untuk evaluasi investasi", en: "Record for investment evaluation" }, type: "investor" },
                    { text: { id: "Mencatat pengeluaran penting saja", en: "Record important expenses only" }, type: "security" }
                ]
            },
            {
                id: 10,
                question: { id: "Apa tujuan keuangan utamamu?", en: "What is your main financial goal?" },
                options: [
                    { text: { id: "Memiliki tabungan besar", en: "Having big savings" }, type: "saver" },
                    { text: { id: "Menikmati hidup tanpa mikir uang", en: "Enjoy life without thinking about money" }, type: "spender" },
                    { text: { id: "Mencapai kebebasan finansial", en: "Reach financial freedom" }, type: "investor" },
                    { text: { id: "Keuangan stabil dan aman", en: "Stable and secure finances" }, type: "security" }
                ]
            }
        ];

        const resultTypes = {
            saver: {
                name: { id: "The Saver", en: "The Saver" },
                description: { id: "Kamu adalah tipe yang suka menabung dan hemat. Kamu selalu memikirkan masa depan dan tidak mudah tergoda oleh gaya hidup konsumtif.", en: "You are a saver type who loves to save and be frugal. You always think about the future and are not easily tempted by consumerist lifestyles." },
                strengths: { id: ["Bijak dalam mengelola keuangan", "Disiplin menabung", "Tidak mudah tergoda diskon"], en: ["Wise in managing finances", "Disciplined in saving", "Not easily tempted by discounts"] },
                weaknesses: { id: ["Kadang terlalu pelit pada diri sendiri", "Takut mengambil risiko", "Sulit menikmati hasil jerih payah"], en: ["Sometimes too stingy with oneself", "Afraid of taking risks", "Difficulty enjoying the fruits of labor"] },
                recommendations: { id: ["Mulai belajar investasi rendah risiko", "Sisihkan dana untuk reward diri", "Coba saving challenge"], en: ["Start learning low-risk investments", "Set aside funds for self-reward", "Try a saving challenge"] }
            },
            spender: {
                name: { id: "The Spender", en: "The Spender" },
                description: { id: "Kamu adalah tipe yang menikmati hidup dan tidak ragu membelanjakan uang untuk hal-hal yang kamu suka.", en: "You are the type who enjoys life and doesn't hesitate to spend money on things you like." },
                strengths: { id: ["Menghargai hasil kerja keras", "Pandai mencari kesenangan", "Tidak pelit"], en: ["Appreciates hard work", "Good at finding joy", "Not stingy"] },
                weaknesses: { id: ["Sulit menabung", "Mudah tergoda diskon", "Kurang persiapan masa depan"], en: ["Difficult to save", "Easily tempted by discounts", "Lack of future preparation"] },
                recommendations: { id: ["Gunakan metode 50-30-20", "Buat rekening tabungan terpisah", "Cari hobi yang gratis"], en: ["Use the 50-30-20 method", "Create separate savings accounts", "Find free hobbies"] }
            },
            investor: {
                name: { id: "The Investor", en: "The Investor" },
                description: { id: "Kamu memiliki jiwa investor sejati. Kamu selalu mencari peluang untuk mengembangkan uang dan berpikir jangka panjang.", en: "You have a true investor spirit. You always look for opportunities to grow money and think long term." },
                strengths: { id: ["Berpikir jangka panjang", "Berani mengambil risiko", "Paham instrumen investasi"], en: ["Long-term thinking", "Daring to take risks", "Understands investment instruments"] },
                weaknesses: { id: ["Bisa terlalu agresif", "Kurang dana darurat", "Mengabaikan kebutuhan pendek"], en: ["Can be too aggressive", "Lack of emergency fund", "Ignoring short-term needs"] },
                recommendations: { id: ["Seimbangkan portofolio", "Siapkan dana darurat 6 bulan", "Diversifikasi investasi"], en: ["Balance the portfolio", "Prepare a 6-month emergency fund", "Diversify investments"] }
            },
            security: {
                name: { id: "The Security Seeker", en: "The Security Seeker" },
                description: { id: "Kamu adalah tipe yang mengutamakan keamanan finansial. Kamu selalu siap menghadapi situasi darurat.", en: "You are the type who prioritizes financial security. You are always ready for emergency situations." },
                strengths: { id: ["Siap menghadapi darurat", "Memiliki proteksi diri", "Perencanaan matang"], en: ["Ready for emergencies", "Has self-protection", "Thorough planning"] },
                weaknesses: { id: ["Terlalu protektif", "Melewatkan peluang untung", "Kurang fleksibel"], en: ["Too protective", "Missing profit opportunities", "Lacks flexibility"] },
                recommendations: { id: ["Eksplorasi investasi stabil", "Evaluasi proteksi berkala", "Belajar tentang inflasi"], en: ["Explore stable investments", "Periodic protection evaluation", "Learn about inflation"] }
            }
        };

        let currentStep = 0;
        let answers = [];
        let dominantType = '';

        function renderQuestion() {
            const isID = document.documentElement.lang === 'id';
            const q = questions[currentStep];
            if (!q) return;
            const container = document.getElementById('questionContainer');

            container.innerHTML = `
                <div class="question-card" data-aos="fade-left">
                    <h2 class="text-xl md:text-2xl font-bold mb-8">${isID ? q.question.id : q.question.en}</h2>
                    <div class="space-y-4">
                        ${q.options.map(opt => `
                            <div class="personality-card ${answers[currentStep] === opt.type ? 'selected' : ''}" 
                                 onclick="selectOption('${opt.type}')">
                                <span class="font-medium">${isID ? opt.text.id : opt.text.en}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            document.getElementById('questionCounter').innerText = `${currentStep + 1}/${questions.length}`;
            document.getElementById('progressFill').style.width = `${((currentStep + 1) / questions.length) * 100}%`;
            document.getElementById('prevBtn').disabled = currentStep === 0;
            
            const nextBtn = document.getElementById('nextBtn');
            const submitBtn = document.getElementById('submitBtn');
            
            if (currentStep === questions.length - 1) {
                nextBtn.classList.add('hidden');
                submitBtn.classList.remove('hidden');
            } else {
                nextBtn.classList.remove('hidden');
                submitBtn.classList.add('hidden');
            }
            
            nextBtn.disabled = !answers[currentStep];
            submitBtn.disabled = !answers[currentStep];
        }

        window.selectOption = function(type) {
            answers[currentStep] = type;
            renderQuestion();
            setTimeout(() => {
                if (currentStep < questions.length - 1) {
                    currentStep++;
                    renderQuestion();
                }
            }, 400);
        };

        document.getElementById('prevBtn').onclick = () => {
            if (currentStep > 0) {
                currentStep--;
                renderQuestion();
            }
        };

        document.getElementById('nextBtn').onclick = () => {
            if (currentStep < questions.length - 1) {
                currentStep++;
                renderQuestion();
            }
        };

        document.getElementById('submitBtn').onclick = () => {
            showResults();
        };

        function showResults() {
            const counts = answers.reduce((acc, val) => {
                acc[val] = (acc[val] || 0) + 1;
                return acc;
            }, {});
            
            dominantType = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
            const result = resultTypes[dominantType];
            const isID = document.documentElement.lang === 'id';

            document.getElementById('testSection').classList.add('hidden');
            document.getElementById('testHeader').classList.add('hidden');
            document.getElementById('resultSection').classList.remove('hidden');

            document.getElementById('resultType').innerText = result.name.id;
            document.getElementById('resultTypeEn').innerText = result.name.en;
            document.getElementById('resultDescription').innerText = isID ? result.description.id : result.description.en;

            const populateList = (id, items) => {
                document.getElementById(id).innerHTML = items.map(item => `<li>• ${item}</li>`).join('');
            };

            populateList('strengthsList', isID ? result.strengths.id : result.strengths.en);
            populateList('weaknessesList', isID ? result.weaknesses.id : result.weaknesses.en);
            populateList('recommendationsList', isID ? result.recommendations.id : result.recommendations.en);

            window.scrollTo({ top: 0, behavior: 'smooth' });
            lucide.createIcons();
        }

        window.restartTest = () => {
            currentStep = 0;
            answers = [];
            dominantType = '';
            document.getElementById('resultSection').classList.add('hidden');
            document.getElementById('testHeader').classList.remove('hidden');
            document.getElementById('testSection').classList.remove('hidden');
            renderQuestion();
        };

        window.downloadResult = () => {
            const isID = document.documentElement.lang === 'id';
            const typeName = isID ? document.getElementById('resultType').innerText : document.getElementById('resultTypeEn').innerText;
            const desc = document.getElementById('resultDescription').innerText;
            const date = new Date().toLocaleString();
            const logContent = `MONETRA TEST LOG\n----------------------\nTimestamp: ${date}\nDetected Type: ${typeName}\nDescription: ${desc}\n\nDIAGNOSTIC STATUS: Systems Normal.`;
            const blob = new Blob([logContent], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `Monetra_Diagnostic_Log.txt`;
            a.click();
        };

        window.printResult = () => {
            const isID = document.documentElement.lang === 'id';
            const result = resultTypes[dominantType];
            const typeName = isID ? result.name.id : result.name.en;
            const typeDesc = isID ? result.description.id : result.description.en;
            const date = new Date().toLocaleDateString(isID ? 'id-ID' : 'en-US');
            const printArea = document.getElementById('printReport');
            printArea.innerHTML = `
                <div style="border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; font-family: sans-serif;">
                    <h1 style="color: #3b82f6; margin: 0;">Monetra Diagnostic</h1>
                    <p style="margin: 0;">Date: ${date}</p>
                </div>
                <h2 style="margin-bottom: 5px;">Type: <span style="color: #3b82f6;">${typeName}</span></h2>
                <p style="font-style: italic; color: #666;">${typeDesc}</p>
            `;
            window.print();
        };

        renderQuestion();
