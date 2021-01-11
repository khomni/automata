module.exports = (api) => {
    api.cache(true);

    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    targets: {
                        node: "current",
                    },
                },
            ],
            [
                "@babel/preset-typescript",
                {
                    allowNamespaces: true,
                },
            ],
        ],
        plugins: [
            "babel-plugin-transform-typescript-metadata",
            [
                "@babel/plugin-proposal-decorators",
                {
                    legacy: true,
                },
            ],
            [
                "module-resolver",
                {
                    alias: {
                        "@src": "./src/",
                    },
                },
            ],
            [
                "@babel/plugin-proposal-class-properties",
                {
                    loose: true,
                },
            ],
            "@babel/plugin-proposal-optional-chaining",
        ],
    };
};
