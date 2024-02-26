module.exports = {
    displayName: 'WebApp Frontend',
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
    roots: ['<rootDir>'],
    testEnvironment: 'jsdom',
    testMatch: [
        '**/__tests__/**/*.test.[jt]s?(x)',
        // '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
};
