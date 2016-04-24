'use strict'

const cluster = require('cluster'),
    http = require('http'),
    numCPUs = require('os').cpus().length


if (cluster.isMaster) {
    let i
    for (i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died, spawn new one:`)
        cluster.fork()
    })

} else {

    const config = require('./config/default.js'),
        express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        morgan = require('morgan')

    app.set('views',__dirname)
    app.set('view engine', 'ejs')
    app.use('/', express.static(__dirname + '/app'))

    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(bodyParser.json())
    app.use(morgan('combined'))

    app.get('/', function(req, res) {
      res.render('app/index')
    })

    app.listen(config.port, function() {
        console.log(`App runnig on Port ${config.port} Worker-ID: ` + cluster.worker.id)
    })
}
