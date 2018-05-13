/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);


