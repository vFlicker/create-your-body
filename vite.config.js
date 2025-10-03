import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      svgr(),
      checker({
        typescript: {
          tsconfigPath: './tsconfig.app.json',
        },
      }),
    ],
    resolve: {
      alias: {
        '~': '/src',
      },
    },
    base: env.VITE_BASE_PATH || '/',
  };
});
