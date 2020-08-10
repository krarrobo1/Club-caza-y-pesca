const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry:'./main.js',
    plugins: [
    new HtmlWebpackPlugin({
        template:  path.resolve('./index.html'),
    }),
    ],
    output:{
    path: path.resolve(__dirname, 'dist'),
    filename:'index.js',
    publicPath: '/static/'
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
        }
    ]
    }
};