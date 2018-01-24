const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      { 
        test: /\.css$/, 
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      { 
        test: /\.svg$/, 
        loader: 'file-loader',
        options: {
          outputPath: 'assets/',
          publicPath: 'dist/'
        }
      }
    ]
  }
};