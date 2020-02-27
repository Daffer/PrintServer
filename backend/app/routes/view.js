const router = require('koa-router')();

router.get('/', async (ctx) => {
    return ctx.render('main');
});

router.get('/printer', async (ctx) => {
    return ctx.render('printer');
});

router.get('/scan', async (ctx) => {
    return ctx.render('scan');
});

module.exports = router;