/** @type {import('jest').Config} */
module.exports = {
    displayName: 'backend-tests',
    verbose: true,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        '**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        'coverage',
        '/node_modules/',
    ],
    coverageProvider: 'babel',
    coverageReporters: ['cobertura'],
    roots: ['<rootDir>/src/'],
    testEnvironment: 'node',
    testMatch: [
        '**/__tests__/**/*.test.[jt]s?(x)',
        // '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
};
