const config = require('./index');

module.exports ={
    "development": {
        "username": config.DB_USERNAME,
        "password": config.DB_PASSWORD,
        "database": config.DB_DATABASE,
        "host": config.DB_HOST,
        "dialect": config.DB_DIALECT,
    }
}
