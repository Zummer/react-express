import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev'

let app = module.exports = express();
const compiler = webpack(webpackConfig);
app.use(webpackMiddleWare(compiler))

app.get("/*", (req, res) => { 
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(3001, () => {
  console.log('Runnig on localhost: 3001');
});

