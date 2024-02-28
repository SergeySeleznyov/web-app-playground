module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
    },
    'extends': 'google',
    'overrides': [
        {
            'env': {
                'node': true,
            },
            'files': [
                '.eslintrc.{js,cjs}',
            ],
            'parserOptions': {
                'sourceType': 'script',
            },
        },
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
    },
    'rules': {
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'max-len': ['error', 120],
        'object-curly-spacing': ['error', 'always'],
    },
};
