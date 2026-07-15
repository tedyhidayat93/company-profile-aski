import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isProduction = mode === 'production';
    
    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react({
                babel: {
                    plugins: ['babel-plugin-react-compiler'],
                },
            }),
            tailwindcss(),
            wayfinder({
                formVariants: true,
            }),
        ],
        
        // ⚡ OPTIMASI BUILD PRODUKSI
        build: {
            // Memastikan CSS dikompresi maksimal menggunakan Lightningcss bawaan Vite baru
            cssMinify: true,
            // Mengurangi beban overhead memori saat rendering sourcemap di production
            sourcemap: !isProduction,
            // Optimasi chunking agar browser tidak memuat satu file JS raksasa yang bikin lag
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vendor-react': ['react', 'react-dom'],
                        'vendor-icons': ['lucide-react'],
                    }
                }
            }
        },

        // 🧹 MEMBERSIHKAN CONSOLE.LOG PADA MODE PRODUKSI
        esbuild: {
            jsx: 'automatic',
            // Jika dalam mode production, drop semua console dan debugger agar menghemat RAM & CPU browser
            drop: isProduction ? ['console', 'debugger'] : [],
        },

        optimizeDeps: {
            exclude: ['react-image-gallery'],
            include: ['react', 'react-dom'],
        },
        // define: {
        //     'import.meta.env.VITE_JWT_TINYMCE': JSON.stringify(env.JWT_TINYMCE),
        // },
    };
});