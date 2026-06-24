import { useState, useEffect } from 'react';
import { useConfig } from '@/utils/config';
import { Play, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Helper Regex untuk mengekstrak URL src dari iframe string TinyMCE
const extractVideoSrc = (htmlString: string): string | null => {
  if (!htmlString) return null;
  
  const iframeMatch = htmlString.match(/src=["']([^"']+)["']/);
  if (iframeMatch && iframeMatch[1]) {
    return iframeMatch[1];
  }
  
  const plainText = htmlString.replace(/<[^>]*>/g, '').trim();
  if (plainText.startsWith('http')) {
    return plainText;
  }
  
  return null;
};

// Helper khusus untuk mengambil gambar thumbnail dari URL YouTube atau Vimeo
const getVideoThumbnail = (url: string | null): string | null => {
  if (!url) return null;

  // 1. Cek jika YouTube (Embed maupun URL biasa)
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
  if (youtubeMatch && youtubeMatch[1]) {
    // Menggunakan hqdefault atau maxresdefault untuk kualitas tinggi
    return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
  }

  // 2. Cek jika Vimeo (Embed)
  const vimeoMatch = url.match(/video\/(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    // Karena Vimeo dinamis, alternatif static fallback atau placeholder premium
    return `https://vumbnail.com/${vimeoMatch[1]}.jpg`;
  }

  return null;
};

export default function ProfileVideoHandler() {
  const { getConfig } = useConfig();
  const [isOpen, setIsOpen] = useState(false);

  const videoHtml = getConfig('profile_video', '');
  const isAutoPopupEnabled = getConfig('auto_modal_popup_video_homepage', 'false') === 'true';

  const videoUrl = extractVideoSrc(videoHtml);
  const thumbnailUrl = getVideoThumbnail(videoUrl);

  // Efek tunggal terpadu dengan proteksi localStorage
  useEffect(() => {
    if (isAutoPopupEnabled && videoUrl) {
      const hasSeenPopup = localStorage.getItem('has_seen_profile_video_popup');

      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1500);

        return () => clearTimeout(timer);
      }
    }
  }, [isAutoPopupEnabled, videoUrl]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      localStorage.setItem('has_seen_profile_video_popup', 'true');
    }
  };

  if (!videoUrl) return null;

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        
        {/* DESIGN BANNER DENGAN PREVIEW VIDEO SEBAGAI BACKGROUND */}
        <DialogTrigger asChild>
          <button 
            type="button"
            className="group relative w-full h-64 md:h-96 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-950 shadow-xl flex flex-col items-center justify-center text-center p-6 transition-all duration-300 hover:shadow-orange-500/10 hover:border-orange-500/40"
          >
            {/* Latar Belakang Gambar Preview Video (Thumbnail) */}
            {thumbnailUrl ? (
              <>
                <img 
                  src={thumbnailUrl} 
                  alt="Video Thumbnail" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback jika gambar maxresdefault gagal dimuat
                    (e.target as HTMLImageElement).src = thumbnailUrl.replace('maxresdefault', 'hqdefault');
                  }}
                />
                {/* Overlay Gelap agar Teks Tetap Mudah Dibaca */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-950/50 group-hover:via-slate-900/60 transition-all duration-300" />
              </>
            ) : (
              // Fallback Default Gradient jika link bukan YouTube/Vimeo
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black" />
            )}

            {/* Efek Glow Ornamen di Belakang Tombol Play */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl group-hover:bg-orange-500/30 transition-all duration-500" />
            
            {/* Tombol Play Besar */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/40 transform group-hover:scale-110 transition-all duration-300">
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>

            <div className="relative z-10 mt-4 space-y-1">
                <h3 className="text-white font-extrabold text-lg md:text-xl tracking-tight flex items-center justify-center gap-2 drop-shadow-md">
                    <Video className="w-5 h-5 text-orange-400" />
                    Tonton Video Profil Utama
                </h3>
                <p className="text-slate-200 font-medium text-xs max-w-sm mx-auto drop-shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                    Klik untuk melihat tayangan singkat mengenai latar belakang, visi, dan layanan terbaik kami.
                </p>
            </div>
          </button>
        </DialogTrigger>

        {/* CONTAINER POPUP MODAL VIDEO LAYER */}
        <DialogContent className="sm:max-w-4xl p-0 bg-black overflow-hidden border-none rounded-2xl shadow-2xl">
          <DialogHeader className="p-4 bg-slate-900 border-b border-slate-800 flex flex-row items-center justify-between text-white">
            <DialogTitle className="text-sm font-bold tracking-tight flex items-center gap-2">
              <Video className="w-4 h-4 text-orange-500" /> Video Profil
            </DialogTitle>
          </DialogHeader>

          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={videoUrl}
              title="Profile Video Player"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </DialogContent>

      </Dialog>
    </div>
  );
}