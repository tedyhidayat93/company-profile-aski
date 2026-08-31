<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- SEO Meta Tags -->
    <title>{{ $seo['title'] ?? ($siteconfig['site_name'] ?? config('app.name')) }}</title>
    <meta name="description" content="{{ $seo['description'] ?? ($siteconfig['meta_description'] ?? '') }}">
    <meta name="keywords" content="{{ $seo['keywords'] ?? ($siteconfig['meta_keywords'] ?? '') }}">
    <link rel="canonical" href="{{ $seo['url'] ?? request()->url() }}">
    <meta name="robots" content="index, follow">

    <!-- Open Graph (Facebook / WhatsApp / LinkedIn) -->
    <meta property="og:type" content="{{ $seo['type'] ?? 'website' }}">
    <meta property="og:title" content="{{ $seo['title'] ?? ($siteconfig['site_name'] ?? config('app.name')) }}">
    <meta property="og:description" content="{{ $seo['description'] ?? ($siteconfig['meta_description'] ?? '') }}">
    <meta property="og:image" content="{{ $seo['image'] ?? asset('images/logo-main.png') }}">
    <meta property="og:url" content="{{ $seo['url'] ?? request()->url() }}">
    <meta property="og:site_name" content="{{ $siteconfig['site_name'] ?? config('app.name') }}">
    @if(isset($seo['published_at']))
        <meta property="article:published_time" content="{{ $seo['published_at'] }}">
    @endif

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $seo['title'] ?? ($siteconfig['site_name'] ?? config('app.name')) }}">
    <meta name="twitter:description" content="{{ $seo['description'] ?? ($siteconfig['meta_description'] ?? '') }}">
    <meta name="twitter:image" content="{{ $seo['image'] ?? asset('images/logo-main.png') }}">

    <!-- Google Tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-BC4R74R2S8"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-BC4R74R2S8');
    </script>

    <!-- Google Translate Init -->
    <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({
                pageLanguage: 'id',
                includedLanguages: 'id,en,zh-CN,ja,ko,ar',
                autoDisplay: false,
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
        }
    </script>
    <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async defer></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <!-- Styling & Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    <style>
        /* Styling untuk menyembunyikan banner atas bawaan Google Translate */
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0px !important; }
        .goog-te-gadget-simple {
            background-color: transparent !important;
            border: none !important;
            padding: 0 !important;
            font-size: 0.75rem !important;
        }
        .goog-te-gadget-icon { display: none !important; }
    </style>

    @stack('styles')
</head>
<body class="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased selection:bg-orange-500 selection:text-white flex flex-col min-h-screen overflow-x-hidden">

    @php
        $siteName = $siteconfig['site_name'] ?? 'Alumoda Sinergi Kontainer Indonesia';
        $logoImage = !empty($siteconfig['site_logo']) ? '/storage/'.$siteconfig['site_logo'] : '/images/logo-main.png';
        $phone = $siteconfig['contact_phone'] ?? '0812-8233-6464';
        $email = $siteconfig['contact_email'] ?? 'info@alumoda.co.id';
        $address = strip_tags($siteconfig['address'] ?? 'Bekasi, Jawa Barat');
        $cleanPhone = preg_replace('/\D/', '', $phone);
        $cleanWa = preg_replace('/\D/', '', $siteconfig['contact_whatsapp'] ?? $phone);
        $waMessage = rawurlencode(($siteconfig['whatsapp_message'] ?? 'Halo Alumoda, saya ingin bertanya') . "\n\n_(URL: " . request()->url() . ")_");
        $waLink = "https://wa.me/{$cleanWa}?text={$waMessage}";
    @endphp

    <!-- Flash Messages (Toaster Notification Replacement) -->
    @if (session('success') || session('error') || session('status'))
        <div 
            x-data="{ show: true }" 
            x-show="show" 
            x-init="setTimeout(() => show = false, 5000)"
            class="fixed bottom-20 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 border"
            :class="{'bg-emerald-600 text-white border-emerald-500': '{{ session('success') }}', 'bg-red-600 text-white border-red-500': '{{ session('error') }}', 'bg-slate-900 text-white border-slate-700': '{{ session('status') }}'}"
            style="display: none;"
        >
            <span class="text-sm font-semibold">{{ session('success') ?? session('error') ?? session('status') }}</span>
            <button @click="show = false" class="text-white/80 hover:text-white">&times;</button>
        </div>
    @endif

    <!-- HEADER / NAVIGATION SECTION -->
    <header 
        x-data="{ 
            isScrolled: false, 
            isMenuOpen: false,
            openDropdown: null,
            scrollProgress: 0
        }" 
        @scroll.window="
            isScrolled = (window.scrollY > 20);
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            scrollProgress = (winScroll / height) * 100;
        "
        class="sticky top-0 left-0 right-0 z-50 transition-all duration-300"
    >
        <!-- 1. Reading Progress Bar (Khas Blog/Artikel) -->
        <div 
            class="h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 transition-all duration-150 ease-out"
            :style="`width: ${scrollProgress}%`"
        ></div>

        <!-- 2. Main Navbar with Glassmorphism Effect -->
        <nav 
            class="transition-all duration-300 border-b relative"
            :class="isScrolled 
                ? 'bg-white/85 dark:bg-gray-900/85 backdrop-blur-md border-gray-200/80 dark:border-gray-800 shadow-sm' 
                : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800'"
        >
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16 lg:h-20">
                    
                    <!-- Brand Logo & Blog Badge -->
                    <div class="flex items-center gap-3">
                        <a href="/" class="flex-shrink-0 h-8 lg:h-10 w-auto">
                            <img src="{{ $logoImage }}" alt="{{ $siteName }}" class="max-h-full max-w-full object-contain" onerror="this.onerror=null;this.src='/images/logo-main.png';">
                        </a>
                        
                        <!-- Badge Penanda Halaman Blog -->
                        <a href="/info" class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/50 hover:bg-orange-100 transition-colors">
                            <span class="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                            Blog & Insights
                        </a>
                    </div>

                    <!-- Navigasi Utama Desktop -->
                    <div class="hidden lg:flex items-center space-x-1">
                        
                        <!-- Layanan Dropdown -->
                        <div class="py-4" @mouseenter="openDropdown = 'services'" @mouseleave="openDropdown = null">
                            <a href="/layanan" class="inline-flex items-center gap-1 rounded-full border font-bold px-4 py-1.5 text-sm transition-colors cursor-pointer outline-none {{ request()->is('layanan*') ? 'border-orange-300 text-orange-600 bg-orange-400/10' : 'border-transparent text-gray-700 dark:text-gray-200 hover:border-gray-200 hover:text-orange-600' }}">
                                <span>Layanan</span>
                                <svg class="h-4 w-4 transition-transform duration-200" :class="openDropdown === 'services' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                            </a>

                            <!-- Mega Menu Layanan -->
                            <div 
                                x-show="openDropdown === 'services'"
                                x-transition:enter="transition ease-out duration-200"
                                x-transition:enter-start="opacity-0 translate-y-2"
                                x-transition:enter-end="opacity-100 translate-y-0"
                                class="absolute left-0 right-0 top-full w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-2xl z-50 p-6"
                                style="display: none;"
                            >
                                <div class="container mx-auto grid grid-cols-12 gap-6">
                                    <div class="col-span-4 border-r border-slate-100 dark:border-slate-800 pr-6 space-y-2">
                                        <span class="text-xl font-black uppercase tracking-wider text-orange-500">
                                            {{ $siteconfig['services_meta_title'] ?? 'Layanan Kami' }}
                                        </span>
                                        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                            {{ $siteconfig['services_meta_description'] ?? 'Kami melayani fabrikasi kustom, modifikasi arsitektural, hingga penyediaan unit tangguh untuk operasional logistik berskala nasional.' }}
                                        </p>
                                        <a href="/layanan" class="inline-block text-sm font-bold text-orange-500 hover:underline pt-2">Lihat Semua Layanan →</a>
                                    </div>
                                    <div class="col-span-8 grid grid-cols-2 gap-4">
                                        @foreach($footerServices ?? [] as $item)
                                            <a href="/layanan/{{ $item['slug'] ?? $item->slug }}" class="group flex gap-4 p-3 rounded-xl hover:bg-orange-50/60 dark:hover:bg-slate-800/60 transition-all items-center">
                                                <div class="w-14 h-14 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200/60 dark:border-slate-700">
                                                    <img src="{{ resolve_image_path($item['image'] ?? $item->image) }}" alt="{{ $item['name'] ?? $item->name }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.onerror=null;this.src='/images/placeholder.png';">
                                                </div>
                                                <div class="min-w-0 flex-1">
                                                    <span class="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-orange-500 transition-colors truncate">
                                                        {{ $item['name'] ?? $item->name }}
                                                    </span>
                                                    <p class="block text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 font-medium leading-relaxed">
                                                        {{ $item['short_description'] ?? $item->short_description ?? '' }}
                                                    </p>
                                                </div>
                                            </a>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Produk Dropdown -->
                        <div class="py-4" @mouseenter="openDropdown = 'products'" @mouseleave="openDropdown = null">
                            <a href="/katalog" class="inline-flex items-center gap-1 rounded-full border font-bold px-4 py-1.5 text-sm transition-colors cursor-pointer outline-none {{ request()->is('katalog*') || request()->is('produk*') ? 'border-orange-300 text-orange-600 bg-orange-400/10' : 'border-transparent text-gray-700 dark:text-gray-200 hover:border-gray-200 hover:text-orange-600' }}">
                                <span>Produk</span>
                                <svg class="h-4 w-4 transition-transform duration-200" :class="openDropdown === 'products' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                            </a>

                            <!-- Mega Menu Produk -->
                            <div 
                                x-show="openDropdown === 'products'"
                                x-transition:enter="transition ease-out duration-200"
                                x-transition:enter-start="opacity-0 translate-y-2"
                                x-transition:enter-end="opacity-100 translate-y-0"
                                class="absolute left-0 right-0 top-full w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-2xl z-50 p-8"
                                style="display: none;"
                            >
                                <div class="container mx-auto grid grid-cols-12 gap-8">
                                    <div class="col-span-3 border-r border-slate-100 dark:border-slate-800 pr-6 space-y-3">
                                        <h3 class="text-xl font-black tracking-tight text-slate-900 dark:text-white">{{ $siteconfig['catalog_meta_title'] ?? 'Katalog Kontainer' }}</h3>
                                        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{{ $siteconfig['catalog_meta_description'] ?? 'Temukan pilihan dimensi kontainer kargo dan kreasi unit modifikasi custom standar internasional.' }}</p>
                                        <a href="/katalog" class="text-sm font-bold text-orange-500 hover:underline block pt-2">Lihat Semua Katalog →</a>
                                    </div>
                                    <div class="col-span-9 grid grid-cols-3 gap-6">
                                        @foreach($productCategories ?? [] as $cat)
                                            <div class="space-y-3 p-4 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                                                <a href="/produk/{{ $cat['slug'] }}" class="block">
                                                    <span class="text-base font-black italic tracking-wider text-orange-600 uppercase">{{ $cat['title'] }}</span>
                                                </a>
                                                <ul class="space-y-1.5 border-t border-slate-100 dark:border-slate-800/60 pt-2">
                                                    @foreach($cat['items'] ?? [] as $subItem)
                                                        <li>
                                                            <a href="{{ $subItem['href'] }}" class="flex items-center justify-between text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-orange-500 transition-colors">
                                                                <span>{{ $subItem['name'] }}</span>
                                                            </a>
                                                        </li>
                                                    @endforeach
                                                </ul>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Portofolio -->
                        {{-- <a href="/portofolio" class="inline-flex items-center rounded-full border font-bold px-4 py-1.5 text-sm transition-colors cursor-pointer outline-none {{ request()->is('portofolio*') ? 'border-orange-300 text-orange-600 bg-orange-400/10' : 'border-transparent text-gray-700 dark:text-gray-200 hover:border-gray-200 hover:text-orange-600' }}">
                            Portofolio
                        </a> --}}

                        <!-- Navigasi Blog Utama (Diberi Highlight) -->
                        <a href="/info" class="inline-flex items-center gap-1.5 rounded-full border font-bold px-4 py-1.5 text-sm transition-colors cursor-pointer outline-none {{ request()->is('info*') ? 'border-orange-500 bg-orange-500 text-white shadow-sm' : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-orange-400 hover:text-orange-600' }}">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
                            Blog
                        </a>

                    </div>

                    <!-- Tombol Pencarian Artikel & CTA -->
                    <div class="hidden lg:flex items-center space-x-3">
                        <!-- Form / Icon Pencarian Cepat Artikel -->
                        <form action="/info" method="GET" class="relative">
                            <input 
                                type="text" 
                                name="q" 
                                placeholder="Cari artikel..." 
                                class="w-40 focus:w-56 transition-all duration-300 pl-8 pr-3 py-1.5 text-xs rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-orange-500"
                            >
                            <svg class="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </form>

                        <a href="{{ $waLink }}" target="_blank" rel="noopener noreferrer" class="flex h-9 items-center px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm gap-1.5">
                            <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.14 4.162 4.283-1.123z"/></svg>
                            <span>Tanya WA</span>
                        </a>
                    </div>

                    <!-- Mobile Hamburger Button -->
                    <button class="lg:hidden p-2 text-gray-700 dark:text-white" @click="isMenuOpen = !isMenuOpen">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                    </button>

                </div>
            </div>

            <!-- 3. Secondary Sub-Bar: Kategori Artikel Populer (Tampil Khusus Halaman Blog) -->
            @if(request()->is('info*'))
                <div class="border-t border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-950/50 backdrop-blur-sm overflow-x-auto scrollbar-none py-2 px-4">
                    <div class="container mx-auto flex items-center gap-2 text-xs font-semibold whitespace-nowrap">
                        <span class="text-gray-400 uppercase tracking-wider text-[10px] font-bold mr-2">Topik:</span>
                        <a href="/info" class="px-3 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-orange-400 hover:text-orange-500 shadow-2xs">Semua Artikel</a>
                        <a href="/info?category=modifikasi" class="px-3 py-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">Modifikasi Kontainer</a>
                        <a href="/info?category=logistik" class="px-3 py-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">Tips Logistik</a>
                        <a href="/info?category=spesifikasi" class="px-3 py-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">Panduan Ukuran</a>
                        <a href="/info?category=harga" class="px-3 py-1 rounded-full text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">Update Harga</a>
                    </div>
                </div>
            @endif

            <!-- Mobile Drawer -->
            <div class="lg:hidden overflow-hidden transition-all duration-300" x-show="isMenuOpen" style="display: none;">
                <div class="p-4 space-y-3 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                    <form action="/info" method="GET" class="mb-3">
                        <input type="text" name="q" placeholder="Cari artikel..." class="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none">
                    </form>
                    <a href="/info" class="block px-4 py-2 text-sm font-bold text-orange-600 bg-orange-50 dark:bg-slate-800 rounded-lg">Blog & Insights</a>
                    <a href="/layanan" class="block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-slate-200">Layanan</a>
                    <a href="/katalog" class="block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-slate-200">Produk</a>
                    <a href="/portofolio" class="block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-slate-200">Portofolio</a>
                    <a href="/kontak" class="block px-4 py-2 text-sm font-semibold text-gray-700 dark:text-slate-200">Minta Penawaran</a>
                    
                    <div class="pt-2">
                        <a href="{{ $waLink }}" target="_blank" class="w-full inline-flex justify-center items-center py-2.5 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">Hubungi via WhatsApp</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <!-- MAIN CONTENT SLOT -->
    <main class="grow bg-white dark:bg-gray-950">
        @yield('content')
    </main>

    <!-- FLOATING WHATSAPP CTA -->
    <a 
        href="{{ $waLink }}" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Chat via WhatsApp"
        class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none group"
    >
        <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.14 4.162 4.283-1.123z"/>
        </svg>
        <span class="absolute right-16 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            Hubungi via WhatsApp
        </span>
    </a>

    <!-- FOOTER SECTION -->
    <footer class="bg-gray-950 text-gray-300 mt-16">
        <div class="container mx-auto px-4 py-14">

            <!-- Top Section: Brand & Socials -->
            <div class="flex flex-col gap-8 border-b border-gray-800 pb-10 md:flex-row md:items-start md:justify-between">
                
                <div class="max-w-2xl">
                    <a href="/" class="inline-block h-12 w-auto">
                        <img src="{{ $logoImage }}" alt="{{ $siteName }}" class="max-h-full max-w-72 object-contain" onerror="this.onerror=null;this.src='/images/logo-main.png';">
                    </a>
                    <p class="mt-4 text-base leading-relaxed text-gray-400">
                        {{ $siteconfig['meta_description'] ?? 'Solusi terpercaya untuk kebutuhan kontainer Anda dengan layanan profesional dan berkualitas.' }}
                    </p>
                </div>

                <div class="flex flex-col gap-4 sm:min-w-[300px]">
                    <div>
                        <p class="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Ikuti Kami</p>
                        <div class="flex flex-wrap gap-2">
                            @php
                                $socials = [
                                    'Facebook'  => $siteconfig['social_facebook'] ?? null,
                                    'X/Twitter' => $siteconfig['social_twitter'] ?? null,
                                    'Instagram' => $siteconfig['social_instagram'] ?? null,
                                    'YouTube'   => $siteconfig['social_youtube'] ?? null,
                                    'TikTok'    => $siteconfig['social_tiktok'] ?? null,
                                ];
                            @endphp

                            @foreach($socials as $name => $url)
                                @if($url)
                                    <a href="{{ $url }}" target="_blank" rel="noopener noreferrer" class="flex h-9 w-auto px-3 text-xs gap-2 items-center justify-center rounded-lg border border-gray-800 bg-gray-900 text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500 hover:bg-orange-600 hover:text-white">
                                        <span>{{ $name }}</span>
                                    </a>
                                @endif
                            @endforeach
                        </div>
                    </div>

                    @if(!empty($siteconfig['company_profile_pdf']))
                        <div class="mt-2">
                            <a href="/storage/{{ $siteconfig['company_profile_pdf'] }}" target="_blank" rel="noopener noreferrer" class="inline-flex w-full justify-center items-center gap-2 text-xs font-semibold text-gray-300 hover:text-orange-400 bg-gray-900 border border-gray-800 hover:border-orange-500/50 px-3 py-2 rounded-lg transition duration-300">
                                <svg class="h-3.5 w-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                Unduh Company Profile (PDF)
                            </a>
                        </div>
                    @endif
                </div>
            </div>

            <!-- Main Footer Grid -->
            <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">

                <!-- Kolom 1 -->
                <div>
                    <h3 class="mb-4 text-sm font-bold uppercase tracking-widest text-white">Informasi Perusahaan</h3>
                    <ul class="space-y-2.5">
                        <li><a href="/" class="text-sm text-gray-400 hover:text-orange-400 transition-colors">Beranda</a></li>
                        <li><a href="/tentang-kami" class="text-sm text-gray-400 hover:text-orange-400 transition-colors">Tentang Kami</a></li>
                        <li><a href="/layanan" class="text-sm text-gray-400 hover:text-orange-400 transition-colors">Layanan</a></li>
                        <li><a href="/katalog" class="text-sm text-gray-400 hover:text-orange-400 transition-colors">Katalog Unit</a></li>
                        <li><a href="/portofolio" class="text-sm text-gray-400 hover:text-orange-400 transition-colors">Portofolio</a></li>
                        <li><a href="/info" class="text-sm text-gray-400 hover:text-orange-400 transition-colors">Pusat Informasi / Blog</a></li>
                        <li><a href="/kontak" class="text-sm text-gray-400 hover:text-orange-400 transition-colors">Hubungi Kami</a></li>
                    </ul>
                </div>

                <!-- Kolom 2 -->
                <div>
                    <h3 class="mb-4 text-sm font-bold uppercase tracking-widest text-white">Layanan Kami</h3>
                    <ul class="space-y-2.5">
                        @foreach($footerServices ?? [] as $service)
                            <li>
                                <a href="/layanan/{{ $service['slug'] ?? $service->slug }}" class="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                                    {{ $service['name'] ?? $service->name }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </div>

                <!-- Kolom 3 -->
                <div>
                    <h3 class="mb-4 text-sm font-bold uppercase tracking-widest text-white">Daftar Unit Container</h3>
                    <ul class="space-y-2.5">
                        @if(isset($productCategories))
                            @foreach($productCategories as $cat)
                                @if(($cat['slug'] ?? '') === 'container')
                                    @foreach($cat['items'] ?? [] as $item)
                                        <li>
                                            <a href="{{ $item['href'] }}" class="text-sm text-gray-400 hover:text-orange-400 transition-colors block truncate">
                                                {{ $item['name'] }}
                                            </a>
                                        </li>
                                    @endforeach
                                @endif
                            @endforeach
                        @endif
                    </ul>
                </div>

                <!-- Kolom 4 -->
                <div>
                    <h3 class="mb-4 text-sm font-bold uppercase tracking-widest text-white">Kontak & Alamat</h3>
                    <ul class="space-y-3 text-sm text-gray-400">
                        <li class="flex gap-2.5 items-start">
                            <span class="text-xs leading-relaxed">{{ $address }}</span>
                        </li>
                        <li class="flex gap-2.5 items-center">
                            <a href="mailto:{{ $email }}" class="hover:text-orange-400 transition-colors truncate text-xs">{{ $email }}</a>
                        </li>
                        <li class="flex gap-2.5 items-center">
                            <a href="tel:{{ $cleanPhone }}" class="hover:text-orange-400 transition-colors text-xs">{{ $phone }}</a>
                        </li>
                        <li class="flex gap-2.5 items-start">
                            <div class="text-xs">{!! $siteconfig['site_operational_hour'] ?? 'Senin - Jumat | 09:00 - 17:00 WIB' !!}</div>
                        </li>
                        <li class="pt-1">
                            <a href="{{ $waLink }}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-2 rounded-lg transition-colors w-full justify-center">
                                Hubungi via WhatsApp
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            <!-- Bottom Copyright Section -->
            <div class="mt-14 flex flex-col gap-4 border-t border-gray-900 pt-6 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
                <div class="space-y-1 text-sm">
                    <p class="text-gray-400 font-medium">
                        © {{ date('Y') }} <span class="text-orange-500">{{ $siteName }}</span>. All Rights Reserved.
                    </p>
                </div>
                <p class="text-gray-400 font-medium text-sm italic">
                    {{ $siteconfig['site_tagline'] ?? '' }}
                </p>
            </div>

        </div>
    </footer>

    @stack('scripts')
</body>
</html>