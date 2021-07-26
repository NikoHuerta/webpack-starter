const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports= {

    mode: 'production',

    output:{
        clean: true,
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                  sources: false,
                  minimize: false,  
                },
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader']

            },
            {
                test:  /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }

        ]
    },

    optimization:{
        minimize: true,
        minimizer: [
            new TerserPlugin(),
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            // filename: './index.html',
            inject: 'body',
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css', //util en produccion, para obligar a refrescar el archivo cada ves que se haga una build
            //filename: '[name].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" },
            ],
          })
    ]
}

