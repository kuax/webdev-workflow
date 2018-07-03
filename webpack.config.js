const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src/js'),
    entry: {
        main: './main.js',
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
        {
            test: /\.js$/i,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader',
                options: { presets: ['env'] },
        }],
      },
    ],
  },
};
