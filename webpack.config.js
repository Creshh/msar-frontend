module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/target/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      historyApiFallback: true, 
      contentBase: './dist',
      proxy: {
        '/api': 'http://localhost:8090',
        // '/doc': 'http://localhost:8090',
        // '/assets': 'http://localhost:8090',
        // '/search': 'http://localhost:8090'
      } // proxy interferes with refreshing e.g. localhost:8080/search is redirected to 8090; test with spring not running
    },
  };