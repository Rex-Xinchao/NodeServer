const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const { port, proxy: proxyConfig } = require('./serverConfig');
const app = express();

//将静态文件目录设置为：项目根目录+/public
app.use(express.static(__dirname + '/public'));

Object.keys(proxyConfig).map(key => {
  app.use(key, proxy(proxyConfig[key]));
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
