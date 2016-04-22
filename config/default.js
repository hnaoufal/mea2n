'use strict'

const configurator = {
    development: {
        server: {
            host: "localhost",
            port: 8000,
        },
        database: {
            host: "localhost",
            port: 8000,
            dbName: "customers"
        }
    },
    production: {
        server: {
            host: "localhost",
            port: 8000,
        },
        database: {
            host: "localhost",
            port: 8000,
            dbName: "customers"
        }
    }
}

let port, host, dbport, dbhost, dbName
let config = {}

const env = process.env.NODE_ENV || 'development'

if ('development' == env) {
    config.port = configurator.development.server.port
    config.host = configurator.development.server.host
    config.dbport = configurator.development.database.port
    config.dbhost = configurator.development.database.host
    config.dbName = configurator.development.database.dbName
} else {
    config.port = configurator.production.server.port
    config.host = configurator.production.server.host
    config.dbport = configurator.production.database.port
    config.dbhost = configurator.production.database.host
    config.dbName = configurator.production.database.dbName
}

module.exports = config
