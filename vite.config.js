import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `
        //   @use "${path.resolve(__dirname, 'src/styles/__border-radius.module.scss')}";
        //   @use "${path.resolve(__dirname, 'src/styles/__colors.module.scss')}";
        //   @use "${path.resolve(__dirname, 'src/styles/__fonts.module.scss')}";
        //   @use "${path.resolve(__dirname, 'src/styles/__spacers.module.scss')}";
        // `,
        additionalData: `
          @use "${path.resolve(__dirname, 'src/styles/main.scss')}" as *;
        `,
      },
    },
  },
});
