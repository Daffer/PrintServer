/* eslint-disable require-atomic-updates */
const router = require('koa-router')({
    prefix: '/device'
});
const deviceManager = {};
const authenticator = {};

router
    .get('/', async (ctx) => {
        try {
            let list = await deviceManager.list();
            ctx.status = 200;
            ctx.body = list;
            return;
        } catch (err) {
            ctx.throw(500, err.message);
            return;
        }
    })
    .get('/:id', async (ctx) => {
        try {
            const devId = ctx.params.id;
            let authData = await authenticator.check(ctx);
            let settings;
            if (authData) {
                settings = await deviceManager.getPersonalSettings(devId, authData.id);
            } else {
                settings = await deviceManager.getDefaultSettings(devId);
            }

            ctx.status = 200;
            ctx.body = settings;
            return;
        } catch (err) {
            ctx.throw(500, err.message);
            return;
        }
    })
    .put('/:id', async (ctx) => {
        try {
            const devId = ctx.params.id;
            let authData = await authenticator.check(ctx);
            if (!authData) {
                ctx.status = 401;
                ctx.body = '';
                return;
            }
            const data = deviceManager.parseSettings(ctx.req.body);
            const settings = await deviceManager.updatePersonalSettings(devId, authData.id, data);

            ctx.status = 202;
            ctx.body = settings;
            return;
        } catch (err) {
            ctx.throw(500, err.message);
            return;
        }
    });

module.exports = router;