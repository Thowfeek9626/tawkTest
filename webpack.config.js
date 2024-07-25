const path = require('path');
const dataObj = require('./data/data.json');

module.exports = {
  entry: {
    polyfills: './src/polyfills.js',
    index: './src/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts/', // Ensure this matches your project's structure
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader',   // Resolves @import and url() in CSS
          {
            loader: 'postcss-loader', // Add this loader if using PostCSS and Autoprefixer
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({
                    // Customize target browsers if necessary
                    overrideBrowserslist: ['> 1%', 'last 2 versions', 'IE 10']
                  }),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
              publicPath: 'assets/images/',
            },
          },
        ],
      },
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
    ],
  },
  resolve: {
    alias: {
      fonts: path.resolve(__dirname, 'src/assets/fonts'),
      'vue$': 'vue/dist/vue.esm.js', // Vue with template compiler
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
