import { useEffect, useState } from 'react';

interface SocialProfileEmbedProps {
    platform: 'tiktok' | 'youtube';
    urlConfig: string; // 👈 Bisa diisi URL penuh atau langsung string Channel ID / Username
    youtubeType?: 'subscribe' | 'latest-video';
}

export const SocialProfileEmbed = ({
    platform,
    urlConfig,
    youtubeType = 'subscribe',
}: SocialProfileEmbedProps) => {
    const [isMounted, setIsMounted] = useState(false);

    // 🛠️ Fungsi pengekstrak cerdas untuk mengambil ID atau Username
    const getTargetId = (input: string, type: 'tiktok' | 'youtube') => {
        if (!input) return '';
        const cleanInput = input.trim();

        // 1. Jika untuk TikTok
        if (type === 'tiktok') {
            const match = cleanInput.match(/@([a-zA-Z0-9_\-\.]+)/);
            return match ? match[1] : cleanInput.replace('@', '');
        }

        // 2. Jika untuk YouTube
        if (type === 'youtube') {
            // Cek apakah input mengandung Channel ID langsung (Pattern: UC + 22 karakter alfanumerik)
            const idMatch = cleanInput.match(/(UC[a-zA-Z0-0_\-]{22})/);
            if (idMatch) return idMatch[1];

            // Jika tidak ada Channel ID, cek apakah menggunakan handle username (@name)
            const handleMatch = cleanInput.match(/@([a-zA-Z0-9_\-\.]+)/);
            if (handleMatch) return handleMatch[1];
        }

        // Jika input dikirim dalam bentuk teks ID polos (bukan URL)
        return cleanInput;
    };

    const targetId = getTargetId(urlConfig, platform);
    
    // Cek apakah string targetId berupa Channel ID resmi YouTube (berawalan 'UC')
    const isYoutubeChannelId = platform === 'youtube' && targetId.startsWith('UC');

    useEffect(() => {
        setIsMounted(true);

        if (platform === 'tiktok' && targetId) {
            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            document.body.appendChild(script);
            return () => { document.body.removeChild(script); };
        } else if (platform === 'youtube' && youtubeType === 'subscribe' && targetId) {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/platform.js';
            script.async = true;
            document.body.appendChild(script);
            return () => { document.body.removeChild(script); };
        }
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
                            // 💡 Otomatis pakai atribut yang tepat sesuai tipe ID-nya
                            {...(isYoutubeChannelId ? { 'data-channelid': targetId } : { 'data-channel': targetId })}
                            data-layout="default" 
                            data-count="default"
                        />
                    ) : (
                        <div className="w-full aspect-video">
                            <iframe
                                // 💡 Query list parameter akan mendeteksi apakah itu ID ('UC...') atau user biasa
                                src={`https://www.youtube.com/embed?listType=${isYoutubeChannelId ? 'playlist' : 'user_uploads'}&list=${isYoutubeChannelId ? targetId.replace('UC', 'UU') : targetId}`}
                                title="YouTube Feed"
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};