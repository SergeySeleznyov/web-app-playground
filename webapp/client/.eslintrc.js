module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': [
        'google',
        'plugin:react/recommended',
    ],
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
        'sourceType': 'module',
    },
    'plugins': [
        'react',
        'react-hooks',
    ],
    'rules': {
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'max-len': ['error', 120],
        'object-curly-spacing': ['error', 'always'],
    },
};
