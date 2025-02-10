import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "https://msarfer.github.io/tienda-comida-firebase-redux",
    build: {
        outDir: 'docs'
    }
});