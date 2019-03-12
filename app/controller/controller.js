const router = require('../../engine/Router');

router.get('/', async (req, res) => {
    console.log('receive controll');
    return res.status(200).send("hello");
});