const router = require('koa-router')();

router.get('/', async (ctx) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    });
});

router.post('/scan', async (ctx) => {
    const settings = ctx.request.body;
    console.log(settings);
    ctx.body = 'ok';
});

router.get('/json', async (ctx) => {
    ctx.body = {
        title: 'koa2 json'
    };
});

module.exports = router;