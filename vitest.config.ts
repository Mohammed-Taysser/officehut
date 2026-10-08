import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: { __OH_VERSION__: JSON.stringify('test') },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'tests/**/*.test.{ts,tsx}'],
    css: false,
    coverage: {
      provider: 'v8',
      include: ['src/js/**', 'src/react/**', 'src/shared/**'],
      exclude: ['**/*.test.*', '**/index.ts'],
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
