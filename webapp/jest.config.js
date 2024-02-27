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
        'cobertura', /* For GitLab integration */
        'text-summary', /* For the summary in console */
        'html', /* For manual observe */
        'lcov', /* For VS Code plugin */
    ],
    roots: ['<rootDir>/src/'],
    setupFiles: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'node',
    testMatch: [
        '**/__tests__/**/*.test.[jt]s?(x)',
        // '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
};
