const path = require('path');
const Dotenv = require('dotenv-webpack');

var config = {
  entry:'./main.js',
  output:{
    path: path.resolve(__dirname, './'),
    filename:'index.js'
  },
  devServer:{
    inline: true,
    port: 8080,
    historyApiFallback: true
  },
  module:{
    rules:[
      {
        test:/\.jsx?$/,
        loader:'babel-loader',
        exclude: /node_modules/,
        query:{
          presets:['es2015','react']
        }
      },
      { 
        test: /\.scss/, 
        exclude: /node_modules/, 
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap&includePaths[]=node_modules/compass-mixins/lib'
      },
      { 
        test: /\.css$/, 
        loader: 'style-loader!css-loader' 
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: path.resolve(__dirname, './'),
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    mimetype: 'application/font-woff'
                }
            }
        ]
      },{
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: path.resolve(__dirname, './'),
        loader: 'file-loader'
      },{
        test: /\.(jpe?g|png|gif|mp3)$/i,
        include: path.resolve(__dirname, './'),
        loaders: ['file-loader']
      },{
        test: /\.ico$/,
        include: path.resolve(__dirname, './'),
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
      },
    ]
  },
  plugins: [
    new Dotenv()
  ]
};

module.exports = config;
