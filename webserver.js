//webserver.js
//load module http
const http = require('http');
//create a new instance of http.Server 
//Reference https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
const app = require('./serverside/app');


const server = http.createServer(app);
server.listen(process.env.PORT || 8080);
console.log('Server running on port 8080.');