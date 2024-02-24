module.exports = {
    displayName: 'frontend!',
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
    roots: ['<rootDir>'],
    testMatch: [
        '**/__tests__/**/*.test.[jt]s?(x)',
        // '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
};
