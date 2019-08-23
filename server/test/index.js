
var Koa = require('koa');
var app = new Koa();
var HelloController = require('./route');
 
app
    .use(HelloController.routes())
    .use(HelloController.allowedMethods());
 
app.listen(3000)