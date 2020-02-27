const router = require('koa-router')({
    prefix: '/auth'
});

const authenticator = {};
const userManager = {};

router
    .post('/', async (ctx) => {
        try {
            let data = ctx.req.body;
            data = { login: data.login, password: data.password };
            if (!data.login || !data.password) {
                ctx.throw(400, 'login or password is undefined');
                return;
            }
            let user = await userManager.getByLoginAndPassword(data);
            if (!user) {
                ctx.throw(404, 'User not found');
                return;
            }

            ctx.status = 200;
            ctx.body = user;
        } catch (err) {
            ctx.throw(500, err.message);
        }
        return;
    })
    .post('/reset', async (ctx) => {
        ctx.status = 200;
    });

router
    .get('/logout', async (ctx) => {
        ctx.status = 200;
    });