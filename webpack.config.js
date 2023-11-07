const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, '/build'),
      publicPath: '/',
    },
    hot: true,
    historyApiFallback: true,
    compress: true,
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  //This property defines where the application starts
  entry: [path.resolve(__dirname, 'src', 'index.tsx')],

  //This property defines the file path and the file name which will be used for deploying the bundled file
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'index.js',
    publicPath: '/',
  },
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  //Setup loaders
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },

  // Setup plugin to use a HTML file for serving bundled js files
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),

    // Or: To strip all locales except “en”, “es-us” and “ru”
    // (“en” is built into Moment and can’t be removed)
  ],
};
