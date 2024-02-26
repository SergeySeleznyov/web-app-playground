/** @type {import('jest').Config} */
module.exports = {
    displayName: 'WebApp Backend',
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
    coverageReporters: [
        'cobertura',
        'text-summary',
        'html',
    ],
    roots: ['<rootDir>/src/'],
    testEnvironment: 'node',
    testMatch: [
        '**/__tests__/**/*.test.[jt]s?(x)',
        // '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
};
