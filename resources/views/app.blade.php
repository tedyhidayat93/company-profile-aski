<!DOCTYPE html>
<html
    lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    @class([
        'dark' => ($appearance ?? 'light') === 'dark',
    ])
>

<head>

    {{-- BASIC --}}
    <meta charset="utf-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

    {{-- DARK MODE --}}
    <script>
        (() => {

            const appearance =
                '{{ $appearance ?? "system" }}';

            if (appearance !== 'system') {
                return;
            }

            const prefersDark =
                window.matchMedia(
                    '(prefers-color-scheme: dark)'
                ).matches;

            if (prefersDark) {
                document.documentElement
                    .classList
                    .add('dark');
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

    {{-- DEFAULT THEME --}}
    <meta
        name="theme-color"
        content="#f59e0b"
    >

    {{-- FONTS --}}
    <link
        rel="preconnect"
        href="https://fonts.bunny.net"
    >

    <link
        href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
        rel="stylesheet"
    >

    {{-- CSRF --}}
    @csrf

    {{-- VITE --}}
    @viteReactRefresh

    @vite([
        'resources/js/app.tsx',
        "resources/js/pages/{$page['component']}.tsx"
    ])

    {{-- INERTIA HEAD --}}
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