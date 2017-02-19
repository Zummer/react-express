import path from 'path'
import webpack from 'webpack';

export default {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: '/',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        loader: 'babel',
        query: {
          presets: ["es2015", "react", "stage-0"],
          plugins: ["react-hot-loader/babel"],
          babelrc: false
        }
      },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      actions: 'client/actions',
      validations: 'server/shared/validations'
    },
    extentions: [ '', '.js'  ]
  }
}
