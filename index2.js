const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world");
}).listen(8000);

var url='users/3'
let exp=/\/users\/([0-9]+)/
let e='users/3'
exprn=new RegExp(exp)
const v=url.match(exprn)
console.log(v)