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
        "function-paren-newline": ["error", "never"],
        "no-use-before-define": ["error", {
            "functions": false,
            "classes": true
        }]
    },
}