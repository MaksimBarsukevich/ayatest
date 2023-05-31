import basicSsl from '@vitejs/plugin-basic-ssl'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        basicSsl(),
        legacy({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),
    ],

    server: {
        open: true,
        host: true,
        https: false,
        hmr: {
            overlay: false,
        },
        port: 3000,
    },
    build: {
        outDir: 'build',
        emptyOutDir: true,
        modulePreload: {
            polyfill: true,
        },
        commonjsOptions: {
            include: [/linked-dep/, /node_modules/],
            transformMixedEsModules: true,
        },
    },
    optimizeDeps: {
        include: ['linked-dep'],
    },
})
