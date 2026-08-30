@props([
    'pageName' => 'blog_detail',
    'orientation' => 'vertical',
    'compact' => false,
    'heroImage' => null
])

@php
    $isHorizontal = $orientation === 'horizontal';
    $whatsappPhone = $siteconfig['contact_whatsapp'] ?? config('app.contact_whatsapp', '6281282336464');
    
    $defaultImg = asset('images/bg-hero.png');
    $configImg = isset($siteconfig['hero_image']) && $siteconfig['hero_image'] ? asset('storage/' . $siteconfig['hero_image']) : null;
    $finalHeroImage = $heroImage ?? $configImg ?? $defaultImg;
@endphp

<div 
    id="quote-form-wrapper"
    class="w-full mx-auto rounded-2xl overflow-hidden relative border border-white/20 shadow-xl font-sans antialiased my-6 {{ $isHorizontal ? 'max-w-5xl' : 'max-w-md' }}"
>
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
        <img 
            src="{{ $finalHeroImage }}" 
            alt="Alumoda Sinergi Kontainer Indonesia" 
            class="w-full h-full object-cover"
            loading="lazy"
            onerror="this.onerror=null;this.src='{{ $defaultImg }}';"
        />
        <div class="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]"></div>
    </div>

    <!-- Outer Container -->
    <div class="relative z-10 w-full h-full bg-white/80 dark:bg-slate-900/85 backdrop-blur-sm flex border border-white/30 {{ $isHorizontal ? 'flex-col md:flex-row' : 'flex-col' }}">
        
        <!-- Header Card -->
        <div class="{{ $compact ? 'p-4 sm:p-5' : 'p-6 sm:p-8' }} flex flex-col justify-between bg-orange-500/5 {{ $isHorizontal ? 'w-full md:w-[38%] border-b md:border-b-0 md:border-r border-slate-200/50' : 'w-full border-b border-slate-200/50' }}">
            <div>
                <span class="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider block mb-1">
                    Segera Hubungi Kami
                </span>
                <h3 class="{{ $compact ? 'text-lg' : 'text-xl sm:text-2xl' }} font-black text-slate-900 dark:text-white tracking-wide uppercase leading-snug">
                    Dapatkan Penawaran
                </h3>
                <p class="text-sm text-slate-600 dark:text-slate-300 mt-2 font-medium leading-relaxed">
                    Kirim pesan untuk mendapatkan estimasi harga unit kontainer atau proyek kustom Anda.
                </p>
            </div>
            
            @if($isHorizontal)
                <div class="mt-6 pt-4 border-t border-slate-300/50 hidden md:block">
                    <p class="text-xs text-slate-500 font-semibold flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Terhubung ke WhatsApp Resmi
                    </p>
                </div>
            @endif
        </div>

        <!-- Form Content -->
        <div class="{{ $compact ? 'p-4' : 'p-6' }} bg-white/50 dark:bg-slate-950/25 {{ $isHorizontal ? 'w-full md:w-[62%]' : 'w-full' }}">
            <form id="quote-mini-form" class="space-y-3.5 text-left">
                
                <div class="grid gap-3 {{ $isHorizontal ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1' }}">
                    
                    <!-- Nama Lengkap -->
                    <div class="space-y-1 {{ $isHorizontal ? 'col-span-1 sm:col-span-2' : '' }}">
                        <label class="text-xs font-semibold text-slate-700 dark:text-slate-200">Nama Lengkap</label>
                        <input
                            type="text"
                            name="name"
                            required
                            class="w-full bg-white/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                            placeholder="Nama Anda"
                        />
                    </div>

                    <!-- Perusahaan -->
                    <div class="space-y-1">
                        <label class="text-xs font-semibold text-slate-700 dark:text-slate-200 flex justify-between">
                            <span>Perusahaan</span>
                            <span class="text-[10px] text-slate-400 font-normal self-center">(Opsional)</span>
                        </label>
                        <input
                            type="text"
                            name="company"
                            class="w-full bg-white/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                            placeholder="Nama Perusahaan"
                        />
                    </div>

                    <!-- Nomor Telepon/WA -->
                    <div class="space-y-1">
                        <label class="text-xs font-semibold text-slate-700 dark:text-slate-200">Nomor Telepon/WA</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            class="w-full bg-white/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                            placeholder="0812345678"
                        />
                    </div>

                    <!-- Email -->
                    <div class="space-y-1 {{ $isHorizontal ? 'col-span-1 sm:col-span-2' : '' }}">
                        <label class="text-xs font-semibold text-slate-700 dark:text-slate-200">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            class="w-full bg-white/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                            placeholder="alamat@email.com"
                        />
                    </div>

                    <!-- Jenis Kebutuhan -->
                    <div class="space-y-1 {{ $isHorizontal ? 'col-span-1 sm:col-span-2' : '' }}">
                        <label class="text-xs font-semibold text-slate-700 dark:text-slate-200">Jenis Kebutuhan</label>
                        <input
                            type="text"
                            name="subject"
                            required
                            class="w-full bg-white/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition"
                            placeholder="Contoh: Modifikasi Office Container 20ft"
                        />
                    </div>

                    <!-- Pesan Tambahan -->
                    <div class="space-y-1 {{ $isHorizontal ? 'col-span-1 sm:col-span-2' : '' }}">
                        <label class="text-xs font-semibold text-slate-700 dark:text-slate-200">Pesan Tambahan</label>
                        <textarea
                            name="message"
                            rows="{{ $compact ? 2 : 3 }}"
                            required
                            class="w-full bg-white/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition resize-none"
                            placeholder="Spesifikasi kustom atau lokasi pengiriman..."
                        ></textarea>
                    </div>

                </div>

                <!-- Checkbox Privasi -->
                <div class="pt-1 {{ $isHorizontal ? 'col-span-1 sm:col-span-2' : '' }}">
                    <div class="flex items-start gap-2">
                        <label class="relative flex items-center mt-0.5 cursor-pointer">
                            <input
                                type="checkbox"
                                name="is_approve_terms"
                                id="is_approve_terms"
                                required
                                class="peer sr-only"
                            />
                            <div class="w-4 h-4 rounded border border-slate-400 bg-white dark:bg-slate-800 peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all flex items-center justify-center">
                                <svg class="w-3 h-3 text-white stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                            </div>
                        </label>
                        <div class="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                            <span>Saya menyetujui pengumpulan data ini untuk komunikasi &amp; penawaran.</span>
                            <button
                                type="button"
                                id="btn-open-privacy-modal"
                                class="text-orange-600 dark:text-orange-400 font-bold ml-1 hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                            >
                                Detail 
                                <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="pt-2">
                    <button
                        type="submit"
                        id="btn-submit-quote"
                        disabled
                        class="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white disabled:text-slate-500 font-bold py-2.5 px-4 rounded-lg shadow-sm transition duration-150 text-xs uppercase tracking-wide cursor-pointer disabled:cursor-not-allowed"
                    >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                        <span id="btn-submit-text">Kirim Penawaran via WA</span>
                    </button>
                </div>
            </form>
        </div>

    </div>

    <!-- Modal Kebijakan Privasi -->
    <div 
        id="privacy-modal"
        class="hidden fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans"
    >
        <div 
            id="privacy-modal-card"
            class="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 relative z-10"
        >
            <button
                type="button"
                class="btn-close-privacy-modal absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <svg class="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-slate-950 dark:text-white">Komitmen Keamanan Data</h3>
                    <span class="text-xs text-slate-500 font-medium">Perlindungan Data Konsumen</span>
                </div>
            </div>

            <div class="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
                <p>Informasi pribadi Anda dikelola secara aman untuk keperluan transaksi bisnis:</p>
                
                <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-1">
                    <h4 class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        Privasi Dijamin
                    </h4>
                    <p>Data tidak akan dijual atau disebarluaskan ke pihak ketiga.</p>
                </div>

                <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-1">
                    <h4 class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        Keperluan Transaksi
                    </h4>
                    <p>Digunakan khusus untuk pengiriman proposal harga (quotation) &amp; administrasi pemesanan.</p>
                </div>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <button
                    type="button"
                    class="btn-close-privacy-modal px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
                >
                    Saya Mengerti
                </button>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        const pageName = @json($pageName);
        const whatsappPhone = @json($whatsappPhone);

        // Toggle state tombol submit berdasarkan checkbox
        $('#is_approve_terms').on('change', function() {
            $('#btn-submit-quote').prop('disabled', !this.checked);
        });

        // Buka Modal Privasi
        $('#btn-open-privacy-modal').on('click', function(e) {
            e.preventDefault();
            $('#privacy-modal').removeClass('hidden');
        });

        // Tutup Modal Privasi (Via Tombol)
        $('.btn-close-privacy-modal').on('click', function() {
            $('#privacy-modal').addClass('hidden');
        });

        // Tutup Modal Privasi (Klik di Luar Card Modal)
        $('#privacy-modal').on('click', function(e) {
            if ($(e.target).is('#privacy-modal')) {
                $('#privacy-modal').addClass('hidden');
            }
        });

        // Submit Form Handler
        $('#quote-mini-form').on('submit', async function(e) {
            e.preventDefault();

            if (!$('#is_approve_terms').is(':checked')) return;

            const $btnSubmit = $('#btn-submit-quote');
            const $btnText = $('#btn-submit-text');
            
            $btnSubmit.prop('disabled', true);
            $btnText.text('Memproses...');

            const name = $('input[name="name"]').val();
            const company = $('input[name="company"]').val();
            const email = $('input[name="email"]').val();
            const phone = $('input[name="phone"]').val();
            const subject = $('input[name="subject"]').val();
            const message = $('textarea[name="message"]').val();
            const currentUrl = window.location.href;

            const companyText = company ? '\n*Perusahaan:* ' + company : '';
            
            const text = 'Halo, saya tertarik dengan produk container Anda.\n\n' +
                '*Nama:* ' + name + companyText + '\n' +
                '*Email:* ' + email + '\n' +
                '*WhatsApp/Telp:* ' + phone + '\n' +
                '*Kebutuhan Projek:* ' + subject + '\n' +
                '*Pesan Tambahan:* ' + message + '\n\n' +
                '_(Dikirim via halaman: ' + pageName + ')_\n' +
                '_(URL Sumber: ' + currentUrl + ')_';
            
            const waUrl = 'https://api.whatsapp.com/send?phone=' + whatsappPhone + '&text=' + encodeURIComponent(text);

            const formData = {
                name: name,
                company: company,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
                is_approve_terms: true,
                source_page: pageName,
                source_url: currentUrl,
                action_type: 'whatsapp_mini_form_quote_request'
            };

            try {
                if (typeof $.ajax !== 'undefined') {
                    await $.ajax({
                        url: '/api/visitor-logs/leads',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(formData)
                    });
                }
            } catch (error) {
                console.error('Gagal menyimpan ke BE, mengalihkan langsung ke WhatsApp:', error);
            } finally {
                $btnSubmit.prop('disabled', false);
                $btnText.text('Kirim Penawaran via WA');
                
                window.open(waUrl, '_blank', 'noopener,noreferrer');
                
                // Reset Form
                $('#quote-mini-form')[0].reset();
                $('#btn-submit-quote').prop('disabled', true);
            }
        });
    });
</script>