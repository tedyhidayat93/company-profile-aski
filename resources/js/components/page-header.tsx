import React from 'react';

interface PageHeaderProps {
    badge?: string;
    titleNormal: string;
    titleGradient: string;
    description: string;
    imageSrc?: string; // Opsional, jika kosong gambarnya hilang otomatis
    imageAlt?: string;
    isMonochromeImage?: boolean; // Pilihan tambahan jika ingin efek hitam-putih
}

const PageHeader: React.FC<PageHeaderProps> = ({
    badge,
    titleNormal,
    titleGradient,
    description,
    imageSrc,
    imageAlt = "Header Illustration",
    isMonochromeImage = false
}) => {
    // Kondisi pengecekan apakah gambar tersedia
    const hasImage = !!imageSrc;

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-amber-100/70 to-slate-100 py-10 md:py-24 px-2 md:px-4 border-b border-slate-200/60 select-none">
            
            {/* ================= 🛠️ EFEK GRID BACKGROUND SKETCH ================= */}
            {/* Grid 24px dengan warna slate tipis (opacity 5%-7%). Dilengkapi top-mask & bottom-mask agar memudar alami */}
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03] bg-[linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />
            
            {/* Aksen lingkaran gradient lembut di belakang konten */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
            
            {/* ================= CONTAINER UTAMA ================= */}
            <div className={`max-w-7xl px-3 mx-auto relative z-10 ${
                hasImage 
                    ? 'grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-12' 
                    : 'flex flex-col items-center text-center'
            }`}>
                
                {/* SISI TEKS KONTEN */}
                <div className={`space-y-4 ${
                    hasImage 
                        ? 'md:col-span-7 text-center md:text-left' 
                        : 'max-w-3xl w-full text-center'
                }`}>
                    {/* Badge Atas */}
                    {badge && (
                        <span className="inline-block px-3 py-1 text-xs font-extrabold tracking-widest text-orange-600 uppercase bg-orange-50 rounded-xl border border-orange-200/50 relative z-10">
                            {badge}
                        </span>
                    )}
                    
                    {/* Judul Utama */}
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                        {titleNormal}{' '}
                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent block md:inline">
                            {titleGradient}
                        </span>
                    </h1>
                    
                    {/* Divider Minimalis */}
                    <div className={`flex ${hasImage ? 'justify-center md:justify-start' : 'justify-center'}`}>
                        <div className="h-1 w-12 bg-orange-500 rounded-full" />
                    </div>
                    
                    {/* Deskripsi */}
                    <p className={`text-slate-600 dark:text-slate-300 text-sm md:text-base font-semibold leading-relaxed ${
                        hasImage ? 'max-w-xl mx-auto md:mx-0' : 'max-w-2xl mx-auto'
                    }`}>
                        {description}
                    </p>
                </div>

                {/* SISI GAMBAR (Hanya dirender jika imageSrc dikirimkan) */}
                {hasImage && (
                    <div className="md:col-span-5 flex justify-center items-center relative">
                        {/* Efek Bayangan Belakang Gambar */}
                        <div className="absolute w-72 h-32 bg-slate-900/10 dark:bg-slate-950/20 rounded-full blur-2xl bottom-4 transform skew-x-12 pointer-events-none" />
                        
                        <img 
                            src={imageSrc} 
                            alt={imageAlt} 
                            className={`w-full monochrome max-w-[340px] md:max-w-full h-auto object-contain drop-shadow-2xl animate-fade-in transition-transform duration-500 hover:scale-105 ${
                                isMonochromeImage ? 'grayscale contrast-125 brightness-100' : ''
                            }`}
                            draggable="false"
                        />
                    </div>
                )}

            </div>
        </section>
    );
};

export default PageHeader;