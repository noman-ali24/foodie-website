import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Prevent Vitest's pre-flight installer check from walking above workspace root
process.env.VITEST_SKIP_INSTALL_CHECKS = '1';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    testTimeout: 15000,
    setupFiles: ['./tests/setup/vitest.setup.js'],
    include: [
      'tests/unit/**/*.test.{js,jsx}',
      'tests/integration/**/*.test.{js,jsx}',
    ],
    exclude: ['node_modules/**', 'dist/**', 'tests/e2e/**'],
  },
});

