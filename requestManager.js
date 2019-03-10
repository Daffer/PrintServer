const router = new class{
    constructor(){};

    
    route(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Ok");
    }


}();

module.exports = router;