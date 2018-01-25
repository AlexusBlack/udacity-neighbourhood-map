const path = require('path');

module.exports = env => {
  if(env.production) {
    console.log('Production build.');
  } else {
    console.log('Development build.');
  }

  return {
    entry: './src/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    watch: env.production ? false : true,
    devtool: env.production ? 'source-maps' : 'eval',
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
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            }
          }
        }
      ]
    }   
  };
};