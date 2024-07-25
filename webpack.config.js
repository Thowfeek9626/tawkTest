const path = require('path');
const dataObj = require('./data/data.json');

module.exports = {
  entry: {
    polyfills: './src/polyfills.js',
    index: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      fonts: path.resolve(__dirname, 'src/assets/fonts'),
      'vue$': 'vue/dist/vue.esm.js', // Add this alias for Vue runtime + compiler
    },
    extensions: ['.js', '.vue', '.json'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        bypass: function (req, res, proxyOptions) {
          if (req.url.startsWith('/api/categories')) {
            res.json(dataObj.categories);
            return;
          }
          if (req.url.startsWith('/api/category')) {
            res.json(dataObj.articles);
            return;
          }
          if (req.url.startsWith('/api/author')) {
            let author = {};
            const authorId = req.url.split('/').pop();

            for (let index = 0; index < dataObj.authors.length; index++) {
              if (dataObj.authors[index].id === authorId) {
                author = dataObj.authors[index];
                break;
              }
            }
            res.json(author);
            return;
          }
          if (req.url.startsWith('/api/search')) {
            res.json(dataObj.articles);
            return;
          }
        },
      },
    },
  },
};
