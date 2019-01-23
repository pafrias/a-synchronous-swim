const handler = require('./js/httpHandler');

const http = require('http');
const server = http.createServer(handler);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);