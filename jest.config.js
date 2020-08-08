module.exports = {
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'reports/coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ],
    coverageThreshold: {
        global: {
            branches: 10,
            functions: 10,
            lines: 10,
            statements: 10
        }
    },

    // 输出单元测试报告
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'Test Report',
                outputPath: 'reports/unittest/index.html'
            }
        ]
    ],
    testEnvironment: 'jest-environment-jsdom-global',
    modulePaths: ['src']
};
