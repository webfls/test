'use strict';

const path = require('path');

const webpack = require('webpack');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// BundleAnalyzerPlugin - Analise weight of libraries
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
// .BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const srcVar = path.resolve(__dirname, 'src')
const distVar = path.resolve(__dirname, 'dist')

const isDev = process.env.NODE_ENV === 'development'

const filename = (ext) => {
  let filenameExt
  if (isDev) {
    if ((ext === 'js') | (ext === 'css')) {
      filenameExt = `${ext}/[name].${ext}`
    } else {
      filenameExt = `[name].${ext}`
    }
  }
  if (!isDev) {
    if ((ext === 'js') | (ext === 'css')) {
      filenameExt = `${ext}/[name].[contenthash].${ext}`
    } else {
      filenameExt = `[name].[contenthash].${ext}`
    }
  }
  return filenameExt
}

const devServer = () => {
  let devOptions = {}

  if (isDev) {
    devOptions = {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist'),
      publicPath: '/',
      open: true,
      compress: true,
      hot: true,
      port: 3000,
      index: 'test.html',
    }
  }
  return devOptions
}

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  }

  if (!isDev) {
    config.minimizer = [
      new TerserPlugin({
        parallel: true,
      }),
      // new ImageMinimizerPlugin({
      //   minimizerOptions: {
      //     plugins: [
      //       ['jpegtran', {
      //         progressive: true,
      //         optimizationLevel: 7
      //       }],
      //       ['optipng', {
      //         optimizationLevel: 7
      //       }],
      //       [
      //         'svgo',
      //         {
      //           plugins: [{
      //             removeViewBox: true,
      //           }, ],
      //         },
      //       ],
      //       ['imagemin-webp', {
      //         optimizationLevel: 10
      //       }],
      //     ],
      //   },
      // }),
    ]
  }
  return config
}

const allPlugins = () => {
  const plugins = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: srcVar + '/img',
        to: distVar + '/img',
      }, ],
    }),
    new HtmlWebpackPlugin({
      favicon: srcVar + '/favicon.ico',
      template: srcVar + '/test.pug',
      filename: 'test.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
      chunkFilename: '[id].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ]

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
    // } else {
    // plugins.push(new BundleAnalyzerPlugin())
  }
  return plugins
}

const jsLoaders = () => {
  // let loaders
  const loaders = []
  if (isDev) {
    loaders.push('eslint-loader')
  }
  return loaders
}

module.exports = {
  mode: !isDev ? 'production' : 'development',
  devtool: !isDev ? false : 'inline-source-map',
  context: srcVar,
  entry: {
    testPage: [
      './test.js',
    ],
  },
  output: {
    path: distVar,
    filename: filename('js'),
    publicPath: './',
  },
  devServer: devServer(),
  optimization: optimization(),
  stats: {
    logging: 'warn',
    builtAt: true,
    assetsSpace: 0,
    modulesSpace: 0,
    moduleAssets: false,
    dependentModules: false,
    runtimeModules: false,
    errorDetails: true,
    errorStack: true,
    timings: true,
  },
  plugins: allPlugins(),
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: jsLoaders(),
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath: '../',
          },
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            publicPath: '../',
          },
        },
      },
      {
        test: /\.pug$/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true,
          },
        },
      },
    ],
  },
}
