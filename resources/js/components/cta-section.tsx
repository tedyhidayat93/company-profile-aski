import { useConfig } from "@/utils/config";
import { PhoneCall } from "lucide-react";

export default function CtaSection () {
    const { getConfig } = useConfig();

    return (
        <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-orange-800 to-slate-950 px-2 py-24 text-white">
            {/* Efek Dekoratif Background */}
            <div className="absolute top-0 left-1/4 h-64 w-64 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 h-64 w-64 translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl"></div>

            <div className="container relative z-10 mx-auto px-4 text-center flex flex-col justify-center items-center">
            {/* Badge Kecil di Atas */}
            <span className="mb-4 rounded-full bg-orange-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-orange-400 uppercase border border-orange-500/20">
                Hubungi Kami
            </span>
            
            <h2 className="mb-6 text-3xl md:text-4xl font-extrabold tracking-tight text-white xl:max-w-6xl leading-tight">
                {getConfig('cta_title', 'Butuh Kontainer untuk Bisnis Anda?')}
            </h2>
            
            <p className="mx-auto mb-10 text-base font-medium md:text-lg lg:text-xl text-slate-200 xl:max-w-6xl leading-relaxed">
                {getConfig('cta_description', 'Dapatkan penawaran terbaik untuk sewa atau beli kontainer berkualitas. Cocok untuk berbagai kebutuhan usaha mulai dari gudang, kantor, hingga ruang komersial.')}
            </p>
            
            {/* Tombol yang Lebih Elegan & Interaktif */}
            <a 
                target='_blank' 
                aria-label='contact us to getting best products'
                href={`https://wa.me/${getConfig('contact_whatsapp', '6281282336464').replace(/\D/g, '')}?text=${getConfig('whatsapp_message', 'Halo%20Alumoda%2C%20saya%20ingin%20bertanya')}`}  
                className="group flex w-full items-center justify-center max-w-xl gap-2 bg-gradient-to-r animate-pulse from-green-500 to-emerald-600 px-8 py-4 rounded-full text-white text-center font-medium shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/20"
            > 
                <PhoneCall className="h-5 w-5 transition-transform group-hover:rotate-12" /> 
                <span>{getConfig('cta_button_text', 'Hubungi Kami via WhatsApp')}</span>
            </a>
            </div>
        </section>
    )
}