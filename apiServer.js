const express = require('express');
const timeout = require('connect-timeout');
const proxy = require('http-proxy-middleware');
const path = require('path');
const { port, proxy: proxyConfig } = require('./serverConfig');
const app = express();
// 超时时间
const TIME_OUT = '5s';

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 设置超时 返回超时响应
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

//将静态文件目录设置为：项目根目录+/public
app.use(express.static(__dirname + '/public/src'));
app.use('/static', express.static(__dirname + '/public/static'));

Object.keys(proxyConfig).map(key => {
  app.use(key, proxy(proxyConfig[key]));
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
