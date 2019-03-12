const http = require('http');
const url = require('url');
const staticHandler = require('./static');

let _getHandleDicrionary = [];
let _postHandleDictionary = [];


function DictionaryItem(path, handler) {
    return {
        path: path,
        handler: handler
    };
}


class Router {
    static async handle(req, res) {
        await prepareRequest(req);
        await prepareResponse(res);
        let staticPath = staticHandler.checkStatic(req);
        if (staticPath) {
            return staticHandler.sendStatic(req, res);
        }

        let finded = findHandler(req, res);
        if (!finded) {
            console.log("Not found handler");
        }
        return;
    }

    static async get(path, handler) {
        _getHandleDicrionary.push(DictionaryItem(path, handler));
        return;
    }

    static async post(path, handler) {
        _postHandleDictionary(DictionaryItem(path, handler));
        return;
    }
}

async function prepareRequest(req) {
    try {
        req.path = url.parse(req.url).pathname;
        
    } catch (err) {
        console.log(err.message);
        return;
    }
}

async function prepareResponse(res) {
    res.status = function (code) {
        if (typeof(code) != 'number') {
            throw new Error('status code is not number');
        }
        res.statusCode = code;

        return res;
    }

    res.send = function (argument) {
        switch (typeof(argument)) {
            case 'string':
                res.write(argument);
                break;
            case 'object':
            case 'number':
                res.write(argument.toString());
                break;
            default:
                res.write(argument);
                break;
        }

        res.end();
    }
    return;
}

async function findHandler(req, res) {
    let pointerToDictionary;
    switch (req.method.toLowerCase()) {
        case 'get': 
            pointerToDictionary = _getHandleDicrionary;
            break;
        case 'post': 
            pointerToDictionary = _getHandleDicrionary;
            break;
        default:
            return;
    }    

    for (let i = 0; i < pointerToDictionary.length; i++) {
        if (pointerToDictionary[i].path === req.path) {
            pointerToDictionary[i].handler(req, res);
            break;
        }
    }

    return;
}


module.exports = Router;