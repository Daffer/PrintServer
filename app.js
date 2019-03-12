const http = require('http');
const router = require('./engine/Router');

router.initControllers('/app/controll');
const app = http.createServer(router.handle);

app.listen(3000);
console.log("Start server");