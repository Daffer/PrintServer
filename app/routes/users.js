const router = require('koa-router')();

router.prefix('/users');

router.get('/', function (ctx) {
    ctx.body = 'this is a users response!';
});

router.get('/:id/bar', function (ctx) {
    const id = ctx.params.id;
    ctx.body = 'this is a user with id : ' + id;
});

router.get('/bar', function (ctx) {
    ctx.body = 'this is a users/bar response';
});

module.exports = router;