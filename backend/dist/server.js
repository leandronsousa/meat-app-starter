"use strict";
exports.__esModule = true;
var auth_1 = require("./auth");
var fs = require("fs");
var https = require("https");
var jsonServer = require('json-server');
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.post('/login', auth_1.handleAuthentication);
// Use default router
server.use(router);
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(options, server).listen(3001, function () {
    console.log('Json server is running on https://localhost:3001');
});
server.listen(3000, function () {
    console.log('JSON Server is running');
});
