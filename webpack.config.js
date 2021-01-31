const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  mode: env,
  module: {
    rules: 
    [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader',
                'css-loader'
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
              {
              loader: 'ts-loader',
              options: {
                  appendTsSuffixTo: [/\.vue$/] /* .vueファイルをTSとして読み込むようにする */
              }
              }
          ]
        }
      ]
  },
  resolve: {
    alias: {
      '@src': path.join(__dirname, 'src'),
      '@lib': path.join(__dirname, 'src/lib'),
      '@pages': path.join(__dirname, 'src/pages'),
      vue: 'vue/dist/vue.esm.js',
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ],
}