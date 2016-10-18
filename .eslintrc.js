module.exports = {
    "extends": "eslint:recommended",
    "plugins": [
        "import"
    ],
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "rules": {
        "no-unused-vars": [1, { "vars": "all", "args": "none" }],
        "no-extra-semi": 1,
        "no-undef": 1,
        "no-console": 1,
        "no-unused-vars": 1
    }
};
