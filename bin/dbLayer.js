const config = require('./../config/config');
const glob = require('glob');
const mongoose = require('mongoose');

async function connectDB() {

    mongoose.connect(config.db, {
        useNewUrlParser: true
    });
    const db = mongoose.connection;

    db.on('error', () => {
        throw new Error('unable to connect to database at ' + config.db);
    });

    const models = glob.sync(config.root + '/app/models/*.js');
    models.forEach(function (model) {
        require(model);
    });

    console.log('DB: models init');
}

module.exports = connectDB;