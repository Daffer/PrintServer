const http = require('http');
const router = require('requestManager');

const app = http.createServer(router.route);

app.listen(3000);