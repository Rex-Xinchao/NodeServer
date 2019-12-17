const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const { port = 8000, proxy: proxyConfig = {} } = require('./serverConfig');

const app = express();

app.use('/', express.static(path.join(__dirname, 'static')))

Object.keys(proxyConfig).map(key => {
  app.use(key, proxy(proxyConfig[key]));
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})
