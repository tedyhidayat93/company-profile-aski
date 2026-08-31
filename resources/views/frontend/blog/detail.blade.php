@extends('layouts.frontend')

@section('content')
<div class="bg-white dark:bg-zinc-950 min-h-screen antialiased">
    
    <!-- 🗺️ BREADCRUMB -->
    <div class="w-full bg-white dark:bg-zinc-900 text-sm text-zinc-500 dark:text-zinc-400 py-3.5 font-medium">
        <div class="max-w-7xl mx-auto px-3 md:px-7 flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
            <a href="/" class="hover:text-orange-600 transition-colors">Beranda</a>
            <span class="text-zinc-300 dark:text-zinc-700">/</span>
            <a href="/info" class="hover:text-orange-600 transition-colors">Pusat Informasi</a>
            @if($post->category)
                <span class="text-zinc-300 dark:text-zinc-700">/</span>
                <a href="/info?category={{ $post->category->slug }}" class="text-orange-600 font-bold hover:underline">
                    {{ $post->category->name }}
                </a>
            @endif
            <span class="text-zinc-300 dark:text-zinc-700">/</span>
            <span class="text-zinc-800 dark:text-zinc-200 max-w-xs">{{ $post->title }}</span>
        </div>
    </div>

    <!-- MAIN CONTAINER -->
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <!-- KOLOM KIRI: KONTEN UTAMA -->
            <article class="lg:col-span-8 bg-white dark:bg-zinc-900 sm:p-2 space-y-6">
                
                <!-- Judul & Meta Informasi -->
                <div class="space-y-4">
                    <h1 class="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-950 dark:text-white leading-snug">
                        {{ $post->title }}
                    </h1>

                    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <span>Oleh: <strong class="text-zinc-900 dark:text-zinc-100">{{ $post->author->name ?? 'Tim Redaksi' }}</strong></span>
                        <span class="text-zinc-300 dark:text-zinc-700">•</span>
                        <span>{{ \Carbon\Carbon::parse($post->published_at)->translatedFormat('d M Y') }}</span>
                        <span class="text-zinc-300 dark:text-zinc-700">•</span>
                        <span>{{ ceil(str_word_count(strip_tags($post->content)) / 200) }} mnt baca</span>
                        <span class="text-zinc-300 dark:text-zinc-700">•</span>
                        <span>{{ $post->views_count }} dilihat</span>
                        
                        @if($post->category)
                            <span class="text-zinc-300 dark:text-zinc-700">•</span>
                            <a href="/info?category={{ $post->category->slug }}" class="inline-flex text-xs font-bold tracking-wider bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-lg">
                                {{ $post->category->name }}
                            </a>
                        @endif
                    </div>
                </div>

                <!-- Gambar Utama -->
                @if($post->featured_image)
                    <div class="overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 w-full h-auto">
                        <img 
                            src="{{ $post->featured_image }}" 
                            alt="{{ $post->title }}"
                            class="w-full h-full object-cover"
                            onerror="this.onerror=null;this.src='/images/placeholder.png';"
                        />
                    </div>
                @endif

                <!-- Tombol Share -->
                <div x-data="{ copied: false }" class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-t border-b border-dashed border-zinc-100 dark:border-zinc-800/60">
                    <span class="text-xs font-bold uppercase tracking-wider text-zinc-400">Bagikan:</span>
                    <div class="flex flex-wrap gap-1.5">
                        <button onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href))" class="px-3 py-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-bold">Facebook</button>
                        <button onclick="window.open('https://x.com/intent/tweet?url=' + encodeURIComponent(window.location.href))" class="px-3 py-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-bold">X/Twitter</button>
                        <button onclick="window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href))" class="px-3 py-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-bold">LinkedIn</button>
                        <button onclick="window.open('https://wa.me/?text=' + encodeURIComponent('{{ $post->title }} - ' + window.location.href))" class="px-3 py-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-bold">WhatsApp</button>
                        
                        <button 
                            @click="navigator.clipboard.writeText(window.location.href); copied = true; setTimeout(() => copied = false, 2000)" 
                            class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                            :class="copied ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950' : 'bg-zinc-50 text-zinc-800 dark:bg-zinc-900 hover:bg-zinc-100'"
                        >
                            <span x-text="copied ? 'Tersalin' : 'Salin Link'"></span>
                        </button>
                    </div>
                </div>

                <!-- Isi Konten Artikel (Render HTML langsung dari database) -->
                <div class="tinymce-content prose prose-zinc prose-lg max-w-none text-zinc-900 dark:text-zinc-100 leading-relaxed font-normal text-lg">
                    {!! $post->content !!}
                </div>

                <!-- Tag Artikel -->
                @if(!empty($post->tags) && is_array($post->tags))
                    <div class="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                        <div class="text-xs font-bold uppercase tracking-wider text-zinc-400">Topik Artikel</div>
                        <div class="flex flex-wrap gap-2">
                            @foreach($post->tags as $tag)
                                <span class="text-xs font-semibold bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 px-3 py-1.5 rounded-lg">
                                    #{{ $tag }}
                                </span>
                            @endforeach
                        </div>
                    </div>
                @endif

            </article>

            <!-- KOLOM KANAN: SIDEBAR -->
            <aside class="lg:col-span-4 lg:sticky lg:top-24 space-y-8 w-full">

                <x-quote-mini-form-card 
                    pageName="blog_detail" 
                />
                
                <!-- Rekomendasi Unit Pilihan -->
                @if(count($products) > 0)
                    <div class="space-y-4 pt-2">
                        <div class="border-b border-zinc-100 dark:border-zinc-800 pb-3">
                            <h3 class="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                                Rekomendasi Unit Pilihan
                            </h3>
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            @foreach($products as $product)
                                <a href="/katalog/{{ $product['slug'] }}" class="group flex flex-col bg-zinc-50 dark:bg-zinc-900/40 rounded-xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800 p-2 hover:bg-zinc-100 transition-all">
                                    <div class="aspect-[4/3] w-full rounded-lg overflow-hidden relative bg-zinc-200 dark:bg-zinc-800 mb-2">
                                        <img src="{{ $product['image'] }}" alt="{{ $product['name'] }}" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
                                    </div>
                                    <h4 class="text-xs font-extrabold text-zinc-900 dark:text-zinc-200 line-clamp-2 leading-tight group-hover:text-orange-500 transition-colors">
                                        {{ $product['name'] }}
                                    </h4>
                                </a>
                            @endforeach
                        </div>
                    </div>
                @endif

                <!-- Artikel Terkait -->
                @if(count($relatedPosts) > 0)
                    <div class="bg-white dark:bg-zinc-900 p-2 space-y-4">
                        <div class="border-b border-zinc-100 dark:border-zinc-800 pb-3">
                            <h3 class="font-bold text-sm uppercase tracking-wider text-zinc-400">Rekomendasi Artikel</h3>
                        </div>
                        <div class="flex flex-col gap-3">
                            @foreach($relatedPosts as $item)
                                <a href="/{{ $item->slug }}" class="group flex gap-3 p-1.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                                    <div class="w-16 h-16 shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden relative">
                                        <img src="{{ $item->featured_image }}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="{{ $item->title }}" onerror="this.onerror=null;this.src='/images/placeholder.png';">
                                    </div>
                                    <div class="min-w-0 flex flex-col justify-center">
                                        <h4 class="font-bold text-sm text-zinc-900 dark:text-zinc-200 group-hover:text-orange-600 line-clamp-2 leading-snug transition-colors">
                                            {{ $item->title }}
                                        </h4>
                                        <p class="text-xs text-orange-600 font-bold mt-1">Baca Sekarang ➔</p>
                                    </div>
                                </a>
                            @endforeach
                        </div>
                    </div>
                @endif

            </aside>

        </div>
    </div>
</div>
@endsection