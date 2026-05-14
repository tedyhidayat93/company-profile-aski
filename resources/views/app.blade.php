<!DOCTYPE html>
<html
    lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    @class([
        'dark' => ($appearance ?? 'light') == 'dark'
    ])
>

<head>

    {{-- BASIC --}}
    <meta charset="utf-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

    {{-- APP URL --}}
    @php
        $appUrl = config('app.url');
    @endphp

    {{-- SITE CONFIG --}}
    @php

        $siteName = config('app.name', 'Laravel');

        $siteDescription =
            'Jual & Sewa Kontainer Berkualitas';

        $siteImage =
            asset('images/og-image.jpg');

        $currentUrl =
            url()->current();

        if (isset($siteconfig)) {

            $siteName =
                collect($siteconfig)
                    ->where('key', 'site_name')
                    ->first()['value']
                    ?? $siteName;

            $siteDescription =
                collect($siteconfig)
                    ->where('key', 'meta_description')
                    ->first()['value']
                    ?? $siteDescription;
        }

    @endphp

    {{-- DARK MODE --}}
    <script>
        (function () {

            const appearance =
                '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {

                const prefersDark =
                    window.matchMedia(
                        '(prefers-color-scheme: dark)'
                    ).matches;

                if (prefersDark) {
                    document.documentElement
                        .classList
                        .add('dark');
                }
            }

        })();
    </script>

    {{-- BACKGROUND --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    {{-- TITLE --}}
    <title inertia>
        {{ $siteName }}
    </title>

    {{-- SEO --}}
    <meta
        name="description"
        content="{{ $siteDescription }}"
    >

    <meta
        name="robots"
        content="index, follow"
    >

    <meta
        name="author"
        content="{{ $siteName }}"
    >

    {{-- CANONICAL --}}
    <link
        rel="canonical"
        href="{{ $currentUrl }}"
    >

    {{-- OPEN GRAPH --}}
    <meta
        property="og:type"
        content="website"
    >

    <meta
        property="og:site_name"
        content="{{ $siteName }}"
    >

    <meta
        property="og:title"
        content="{{ $siteName }}"
    >

    <meta
        property="og:description"
        content="{{ $siteDescription }}"
    >

    <meta
        property="og:url"
        content="{{ $currentUrl }}"
    >

    <meta
        property="og:image"
        content="{{ $siteImage }}"
    >

    <meta
        property="og:image:secure_url"
        content="{{ $siteImage }}"
    >

    <meta
        property="og:image:type"
        content="image/jpeg"
    >

    <meta
        property="og:image:width"
        content="1200"
    >

    <meta
        property="og:image:height"
        content="630"
    >

    <meta
        property="og:locale"
        content="id_ID"
    >

    {{-- TWITTER --}}
    <meta
        name="twitter:card"
        content="summary_large_image"
    >

    <meta
        name="twitter:title"
        content="{{ $siteName }}"
    >

    <meta
        name="twitter:description"
        content="{{ $siteDescription }}"
    >

    <meta
        name="twitter:image"
        content="{{ $siteImage }}"
    >

    <meta
        name="twitter:url"
        content="{{ $currentUrl }}"
    >

    {{-- THEME --}}
    <meta
        name="theme-color"
        content="#f59e0b"
    >

    {{-- FAVICON --}}
    @if(isset($siteconfig))

        @php

            $siteFavicon =
                collect($siteconfig)
                    ->where('key', 'site_favicon')
                    ->first()['value']
                    ?? '/favicon.ico';

            $faviconPath =
                str_starts_with(
                    $siteFavicon,
                    'configurations/'
                )
                    ? '/storage/' . $siteFavicon
                    : $siteFavicon;

        @endphp

        <link
            rel="icon"
            href="{{ asset($faviconPath) }}"
            sizes="any"
        >

        <link
            rel="apple-touch-icon"
            href="{{ asset($faviconPath) }}"
        >

    @else

        <link
            rel="icon"
            href="{{ asset('favicon.ico') }}"
        >

        <link
            rel="apple-touch-icon"
            href="{{ asset('apple-touch-icon.png') }}"
        >

    @endif

    {{-- FONTS --}}
    <link
        rel="preconnect"
        href="https://fonts.bunny.net"
    >

    <link
        href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
        rel="stylesheet"
    />

    {{-- CSRF --}}
    @csrf

    {{-- VITE --}}
    @viteReactRefresh

    @vite([
        'resources/js/app.tsx',
        "resources/js/pages/{$page['component']}.tsx"
    ])

    {{-- INERTIA --}}
    @inertiaHead

    {{-- RECAPTCHA --}}
    <script
        src="https://www.google.com/recaptcha/api.js?render={{ env('RECAPTCHA_SITE_KEY') }}"
    ></script>

</head>

<body class="font-sans antialiased">

    @inertia

</body>

</html>
