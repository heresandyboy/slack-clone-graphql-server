module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
        "semi": [2, "never"],
        "linebreak-style": ["error", "windows"],
        "indent": [2, 4],
        "eol-last": ["error", "never"],
        "comma-dangle": ["error", "never"],
        "function-paren-newline": ["error", "never"],
        // "object-curly-newline": ["error", {
        //     "multiline": true
        // }],
        "object-curly-newline": ["error", {
            "multiline": true,
            "consistent": false,
            "minProperties": 10
        }],
        "object-curly-spacing": ["error", "always"],
        "no-use-before-define": ["error", {
            "functions": false,
            "classes": true
        }]
    },
}