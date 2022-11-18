import { createVitePlugins } from './config/vite/plugins';
import { resolve } from 'path';
import { ConfigEnv, UserConfigExport } from 'vite';

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

// https://vitejs.dev/config/
export default function ({ command }: ConfigEnv): UserConfigExport {
  // const config = process.env.NODE_ENV;
  const isProduction = command === 'build';
  const root = process.cwd();
  return {
    root,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      host: true,
      hmr: true,
      proxy: {
        '/api': {
          target: 'https://www.hx24h.com',
          changeOrigin: true,
          secure: true,
        },
      },
    },
    plugins: createVitePlugins(isProduction),
    // define: {
    //   'process.env': {
    //     VITE_BASIC_URL: config === 'development' ? '/api' : 'https://www.hx24h.com/api/landing/v1',
    //   },
    // },
    base: isProduction ? '/landing' : '/',
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/landing-[hash].js',
          entryFileNames: 'assets/landing-[hash].js',
          assetFileNames: 'assets/landing-[hash].[ext]',
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 配置 nutui 全局 scss 变量
          additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";`,
        },
      },
    },
  };
}
