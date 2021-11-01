const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

const source = {
  entryAppJS: './src/index.tsx',
  entryMobileJS: './src/index.mobile.tsx',
};

var build = {
  HTML1: {
    filename: 'index.html',
    title: '',
    template: './src/index.html',
  },
};

var entryApp = [resolve(__dirname, source.entryAppJS)];

const config = {
  mode: isProd ? 'production' : 'development',
  entry: {
    index: entryApp,
  },
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /pdf\.worker\.js/,
        loader: 'file-loader',
        options: {
          name: 'static/js/[name].[hash:8].[ext]',
        },
      },
      {
        test: /locales\/.*\.(json)$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[folder]/[name].[ext]',
              outputPath: 'locales/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: build.HTML1.filename,
      title: 'HandWriter - пишет от руки за тебя!',
      favicon: 'src/resources/images/common/favicon.svg',
      template: build.HTML1.template,
      chunks: ['index', 'vendors'],
      inject: 'body',
    }),
  ],
};

if (isProd) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  // for more information, see https://webpack.js.org/configuration/dev-server
  config.devServer = {
    historyApiFallback: true,
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    // allowedHosts: ['all', '192.168.1.46'],
  };
}

module.exports = config;
