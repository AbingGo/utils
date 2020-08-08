module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "newline-before-return": 'error',
        "key-spacing": [
            "warn",
            {
                "beforeColon": false,
                "afterColon": true
            }
        ],
        "comma-dangle": ["error", "never"],
        "indent": [1, 4]
    }
};