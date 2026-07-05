import { Head } from '@inertiajs/react';
import { useConfig } from '@/utils/config';

export type SeoHeadProps = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  robots?: 'index,follow' | 'noindex,nofollow';
  contentType?: 'website' | 'page' | 'article' | 'news' | 'product' | 'service';
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
};

export default function SeoHead({
    title,
    description,
    keywords,
    image,
    url,
    robots = 'index,follow',
    contentType = 'website',
    publishedAt,
    updatedAt,
    author,
}: SeoHeadProps) {

    /*
    |--------------------------------------------------------------------------
    | CONFIG
    |--------------------------------------------------------------------------
    */
    const { getConfig } = useConfig();

    /*
    |--------------------------------------------------------------------------
    | BASIC CONFIG
    |--------------------------------------------------------------------------
    */
    const siteName = getConfig(
        'site_name',
        import.meta.env.VITE_APP_NAME || 'Your Site'
    );

    const siteTagline = getConfig(
        'site_tagline',
        'Your Site Tagline'
    );

    const metaDescription =
        description ||
        getConfig(
            'meta_description',
            `${siteName} | ${siteTagline}`
        );

    const metaKeywords =
        keywords ||
        getConfig(
            'meta_keywords',
            siteName
        );

    /*
    |--------------------------------------------------------------------------
    | STORAGE FILES
    |--------------------------------------------------------------------------
    */
    const siteLogo = getConfig('site_logo', '');
    const siteFavicon = getConfig('site_favicon', '');

    /*
    |--------------------------------------------------------------------------
    | URL LOGIC
    |--------------------------------------------------------------------------
    */
    const baseUrl =
        typeof window !== 'undefined'
            ? window.location.origin
            : import.meta.env.VITE_APP_URL || 'http://localhost';

    const currentUrl =
        url ||
        (typeof window !== 'undefined'
            ? window.location.href
            : baseUrl);

    /*
    |--------------------------------------------------------------------------
    | FILE URL HELPER
    |--------------------------------------------------------------------------
    */
    const getFileUrl = (path?: string, fallback = '/favicon.png') => {
        if (!path) {
            return `${baseUrl}${fallback}`;
        }

        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }

        return path.startsWith('configurations/')
            ? `${baseUrl}/storage/${path}`
            : `${baseUrl}/${path}`;
    };

    /*
    |--------------------------------------------------------------------------
    | IMAGE LOGIC
    |--------------------------------------------------------------------------
    */
    const defaultLogo = getFileUrl(siteLogo);
    const faviconUrl = getFileUrl(siteFavicon);
    const imageUrl = image || defaultLogo;

    /*
    |--------------------------------------------------------------------------
    | SEO TITLE
    |--------------------------------------------------------------------------
    */
    const fullTitle = title
        ? `${title} | ${siteName}`
        : `${siteName} | ${siteTagline}`;

    /*
    |--------------------------------------------------------------------------
    | SOCIAL MEDIA & SCHEMA ORG
    |--------------------------------------------------------------------------
    */
    const socialLinks = [
        getConfig('social_facebook', ''),
        getConfig('social_twitter', ''),
        getConfig('social_instagram', ''),
        getConfig('social_youtube', ''),
        getConfig('social_tiktok', ''),
    ].filter(Boolean);

    // Schema data dasar
    const structuredData: any = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        url: baseUrl,
        logo: defaultLogo,
        image: imageUrl,
        description: metaDescription,
        keywords: metaKeywords,
        sameAs: socialLinks,
    };

    // Jika tipe konten adalah artikel atau produk, buat skema data lebih spesifik
    if (contentType === 'article' || contentType === 'news') {
        structuredData['@type'] = 'Article';
        structuredData['headline'] = title || fullTitle;
        structuredData['datePublished'] = publishedAt || new Date().toISOString();
        if (updatedAt) structuredData['dateModified'] = updatedAt;
        if (author) {
            structuredData['author'] = {
                '@type': 'Organization',
                'name': author
            };
        }
    }

    return (
        <Head title={fullTitle}>
            {/* BASIC SEO */}
            <meta head-key="robots" name="robots" content={robots} />
            <meta head-key="description" name="description" content={metaDescription} />
            <meta head-key="keywords" name="keywords" content={metaKeywords} />
            <link head-key="canonical" rel="canonical" href={currentUrl} />

            {/* OPEN GRAPH (FACEBOOK / WHATSAPP) */}
            <meta head-key="og:type" property="og:type" content={contentType} />
            <meta head-key="og:site_name" property="og:site_name" content={siteName} />
            <meta head-key="og:title" property="og:title" content={fullTitle} />
            <meta head-key="og:description" property="og:description" content={metaDescription} />
            <meta head-key="og:url" property="og:url" content={currentUrl} />
            <meta head-key="og:locale" property="og:locale" content="id_ID" />
            
            {/* OG IMAGE MANAGEMENT (DURABLE & UNIQUE) */}
            <meta head-key="og:image" property="og:image" content={imageUrl} />
            <meta head-key="og:image:secure_url" property="og:image:secure_url" content={imageUrl} />
            <meta head-key="og:image:type" property="og:image:type" content="image/png" />
            <meta head-key="og:image:width" property="og:image:width" content="1200" />
            <meta head-key="og:image:height" property="og:image:height" content="630" />

            {/* TWITTER CARD */}
            <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta head-key="twitter:title" name="twitter:title" content={fullTitle} />
            <meta head-key="twitter:description" name="twitter:description" content={metaDescription} />
            <meta head-key="twitter:image" name="twitter:image" content={imageUrl} />
            <meta head-key="twitter:url" name="twitter:url" content={currentUrl} />

            {/* FAVICON & INDICATION */}
            <link rel="icon" type="image/png" href={faviconUrl} />
            <link rel="apple-touch-icon" href={faviconUrl} />
            <meta name="theme-color" content="#f59e0b" />

            {/* JSON-LD STRUCTURED DATA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
        </Head>
    );
}