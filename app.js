const Koa = require('koa');
const app = new Koa();
let less = require('koa-less2x');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const path = require('path');

const index = require('./app/routes/index');
const users = require('./app/routes/users');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(less(path.normalize(__dirname + '/public/'), {
    debug: true,
    dest: path.normalize(__dirname + '/public/')
}));
app.use(require('koa-static')(__dirname + '/public'));
app.use(views(__dirname + '/app/views', {
    extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

module.exports = app;