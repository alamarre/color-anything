const HtmlWebpackPlugin = require("html-webpack-plugin");

const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
    mode: "development",

    
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    
    output: {
        filename: '[name].js?t=' + new Date().getTime(),
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                use: "url-loader",
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: "file-loader",
            },
            {
                test: /\.(s?css)$/,
                use: [{
                    loader: "style-loader", // inject CSS to page
                }, {
                    loader: "css-loader", // translates CSS into CommonJS modules
                }, {
                    loader: "postcss-loader", // Run post css actions
                options: {
                    plugins: function () { // post css plugins, can be exported to postcss.config.js
                    return [
                        require("precss"),
                        require("autoprefixer"),
                    ];
                    },
                },
                }, {
                loader: "sass-loader", // compiles SASS to CSS
                },],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        "title": "Color Anything",
        template: "index.html",
        }),
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {

    }
};
