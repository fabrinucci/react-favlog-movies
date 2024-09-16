import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testRegex: ['((\\.|/*.)(spec))\\.ts?$', '((\\.|/*.)(spec))\\.tsx?$'],
};

export default createJestConfig(config);
