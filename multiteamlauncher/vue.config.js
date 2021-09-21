module.exports = {
    configureWebpack: (config) => {
        config.module.rules.push({
            resourceQuery: /blockType=fluent/,
            loader: 'fluent-vue-loader'
        })

        config.module.rules.push({
            test: /\.ftl$/,
            loader: 'raw-loader'
        })
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                // options placed here will be merged with default configuration and passed to electron-builder
                linux: {
                    target: [
                        {
                            target: "AppImage",
                            arch: "x64"
                        },
                        {
                            target: "snap",
                            arch: "x64"
                        },
                        {
                            target: "deb",
                            arch: "x64"
                        },
                        {
                            target: "rpm",
                            arch: "x64"
                        },
                        {
                            target: "pacman",
                            arch: "x64"
                        },
                        {
                            target: "tar.xz",
                            arch: "x64"
                        }
                    ],
                    category: "Game"
                }
            }
        }
    }
}