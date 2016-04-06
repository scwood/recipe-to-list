import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname,'src/client/index.html'),
  filename: 'index.html',
  inject: 'body'
});

export default {
  entry: [
    path.join(__dirname, 'src/client/index.jsx'),
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
  ],
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, 'src/client'),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
};
