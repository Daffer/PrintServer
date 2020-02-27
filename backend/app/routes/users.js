/* eslint-disable require-atomic-updates */
const router = require('koa-router')({
    prefix: '/users'
});
const userManager = {};
const authenticator = {};

router
    .use(async (ctx, next) => {
        let authData = await authenticator.check();
        if (!authData) {
            ctx.throw(401);
        }
        ctx.user = authData;
        return next();
    })
    .get('/', async (ctx) => {
        try {
            ctx.status = 200;
            ctx.body = ctx.user;
        } catch (err) {
            ctx.throw(500, err.message);
        }
        return;
    })
    .patch('/:id', async (ctx) => {
        try {
            const id = ctx.params.id;
            let data = userManager.parseUser(ctx.req.body);
            let user = await userManager.update(id, data);

            ctx.status = 200;
            ctx.body = user;
        } catch (err) {
            ctx.throw(500, err.message);
        }
        return;
    })
    .delete('/:id', async (ctx) => {
        try {
            const id = ctx.params.id;
            await userManager.delete(id);

            ctx.status = 202;
        } catch (err) {
            ctx.throw(500, err.message);
        }
        return;
    });

router
    .post('/', async (ctx) => {
        try {
            let data = userManager.parseUser(ctx.req.body);
            if (!data.login || !data.password) {
                ctx.throw(400, 'login or password is incorrect');
                return;
            }
            let check = userManager.checkByLogin(data.login);
            if (!check) {
                ctx.throw(400, 'login is busy');
                return;
            }

            let user = userManager.create(data);

            ctx.status = 202;
            ctx.body = user;
            return;
        } catch (err) {
            ctx.throw(500, err.message);
        }
    });

module.exports = router;