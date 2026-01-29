import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const isOffline = mode === 'offline'

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(isOffline ? [viteSingleFile({ removeViteModuleLoader: true })] : []),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: isOffline ? 'dist-offline' : 'dist',
      ...(isOffline && {
        cssCodeSplit: false,
        assetsInlineLimit: 100_000_000,
        chunkSizeWarningLimit: 100_000_000,
        rollupOptions: {
          output: {
            manualChunks: undefined,
            inlineDynamicImports: true,
          },
        },
      }),
    },
    base: isOffline ? '' : '/',
  }
})
