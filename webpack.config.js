const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src/js'),
    entry: {
        app: './main.js',
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'main.bundle.js',
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
