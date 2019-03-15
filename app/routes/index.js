const router = require('koa-router')();
const scan = require('./../controllers/scan').ScanController;

router.get('/', async (ctx) => {
    let settings = await scan.getDefault();
    await ctx.render('main', {
        settings: settings
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