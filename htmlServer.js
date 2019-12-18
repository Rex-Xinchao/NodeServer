const http = require('http'); // 引入需要的模块
const fs = require('fs'); //引入文件读取模块
const cp = require('child_process');  // 可自动打开浏览器模块
const url = require('url');
const path = require('path');

const PORT = 3300; // 端口号

http.createServer(function (req, res) {
  let pathname = __dirname + '/public' + url.parse(req.url).pathname ;  // 对于文件路径统一处理
  if ( path.extname(pathname) === '' ) {
    pathname += 'src/';  // 欲打开文件的目录
  }
  if ( pathname.charAt(pathname.length - 1) === '/' ) {
    pathname += 'index.html';  // 默认打开的文件
  }
  fs.exists(pathname, exists => {
    if ( exists ) {
      switch( path.extname(pathname) ) { // 不同文件返回不同类型
        case '.html':
          res.writeHead(200, { 'Content-Type': 'text/html' });
          break;
        case '.js':
          res.writeHead(200, { 'Content-Type': 'text/javascript' });
          break;
        case '.css':
          res.writeHead(200, { 'Content-Type': 'text/css' });
          break;
        case '.gif':
          res.writeHead(200, { 'Content-Type': 'image/gif' });
          break;
        case '.jpg':
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          break;
        case '.png':
          res.writeHead(200, { 'Content-Type': 'image/png' });
          break;
        default:
          res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
      }
      fs.readFile(pathname, function (err, data) {
        console.log((new Date()).toLocaleString() + ' ' + pathname);
        res.end(data);
      });
    } else {  // 找不到目录时的处理
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
    }
  });

}).listen(PORT, '127.0.0.1');  // 监听端口

console.log('Server is running!');

cp.exec(`start http://127.0.0.1:${PORT}/`);  // 自动打开默认浏览器
