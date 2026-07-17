import { useEffect, useState, useMemo, useRef } from 'react';

interface SocialProfileEmbedProps {
    platform: 'tiktok' | 'youtube';
    urlConfig: string;
    youtubeType?: 'subscribe' | 'latest-video';
}

// 🌟 Pindahkan fungsi ekstraksi ke luar komponen agar tidak dibuat ulang tiap render
const getTargetId = (input: string, type: 'tiktok' | 'youtube') => {
    if (!input) return '';
    const cleanInput = input.trim();

    if (type === 'tiktok') {
        const match = cleanInput.match(/@([a-zA-Z0-9_\-\.]+)/);
        return match ? match[1] : cleanInput.replace('@', '');
    }

    if (type === 'youtube') {
        const idMatch = cleanInput.match(/(UC[a-zA-Z0-0_\-]{22})/);
        if (idMatch) return idMatch[1];

        const handleMatch = cleanInput.match(/@([a-zA-Z0-9_\-\.]+)/);
        if (handleMatch) return handleMatch[1];
    }

    return cleanInput;
};

export const SocialProfileEmbed = ({
    platform,
    urlConfig,
    youtubeType = 'subscribe',
}: SocialProfileEmbedProps) => {
    const [isMounted, setIsMounted] = useState(false);
    
    // 🌟 Menggunakan useRef untuk menandai apakah script eksternal sudah pernah dimuat
    const scriptLoadedRef = useRef<Record<string, boolean>>({ tiktok: false, youtube: false });

    // 🌟 OPTIMASI 1: Bungkus dengan useMemo agar Regex hanya berjalan saat input berubah
    const targetId = useMemo(() => {
        return getTargetId(urlConfig, platform);
    }, [urlConfig, platform]);
    
    const isYoutubeChannelId = platform === 'youtube' && targetId.startsWith('UC');

    useEffect(() => {
        setIsMounted(true);

        // 🌟 OPTIMASI 2: Cek dulu di useRef, jika script sudah ada di halaman, jangan disuntik ulang!
        if (platform === 'tiktok' && targetId && !scriptLoadedRef.current.tiktok) {
            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
            scriptLoadedRef.current.tiktok = true;
        } else if (platform === 'youtube' && youtubeType === 'subscribe' && targetId && !scriptLoadedRef.current.youtube) {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/platform.js';
            script.async = true;
            document.body.appendChild(script);
            scriptLoadedRef.current.youtube = true;
        }
        
        // Cukup hapus efek pembersihan (cleanup) append/remove script yang brutal tadi.
        // Biarkan script berada di global window demi performa optimal.
    }, [platform, youtubeType, targetId]);

    if (!isMounted || !targetId) return null;

    return (
        <>
            {/* TIKTOK RAW EMBED */}
            {platform === 'tiktok' && (
                <blockquote 
                    className="tiktok-embed w-full m-0" 
                    cite={`https://www.tiktok.com/@${targetId}`}
                    data-unique-id={targetId}
                    data-embed-type="creator" 
                    style={{ maxWidth: '100%', minWidth: '288px' }}
                >
                    <section className="text-center p-2 text-xs text-zinc-400">
                        <a target="_blank" rel="noreferrer" href={`https://www.tiktok.com/@${targetId}`}>
                            Loading @{targetId}...
                        </a>
                    </section>
                </blockquote>
            )}

            {/* YOUTUBE RAW EMBED */}
            {platform === 'youtube' && (
                <div className="w-full flex justify-center">
                    {youtubeType === 'subscribe' ? (
                        <div 
                            className="g-ytsubscribe" 
                            {...(isYoutubeChannelId ? { 'data-channelid': targetId } : { 'data-channel': targetId })}
                            data-layout="default" 
                            data-count="default"
                        />
                    ) : (
                        <div className="w-full aspect-video">
                            <iframe
                                src={`https://www.youtube.com/embed?listType=${isYoutubeChannelId ? 'playlist' : 'user_uploads'}&list=${isYoutubeChannelId ? targetId.replace('UC', 'UU') : targetId}`}
                                title="YouTube Feed"
                                className="w-full h-full border-0 transform-gpu" // 🌟 Tambahkan akselerasi hardware GPU
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy" // 🌟 Pastikan iframe di-load malas-malasan (hanya saat mau terlihat di layar)
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};