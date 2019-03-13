const env = process.env.NODE_ENV || 'development';


const config = {
    test: {
        db: 'mongodb://127.0.0.1:27017/print-test'
    },
    development: {
        db: 'mongodb://127.0.0.1:27017/print-dev'
    },
    production: {
        db: 'mongodb://127.0.0.1:27017/print-prod'
    }
};

module.exports = config[env];