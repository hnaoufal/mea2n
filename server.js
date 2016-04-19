'use strict';

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;


if (cluster.isMaster){
	let i;
	for (i=0; i< numCPUs; i++){
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal)=>{
		console.log(`worker ${worker.process.pid} died, spawn new one:`);
		cluster.fork();
	}); 
}else {

  const config = require ('./config/default.js');
	const express= require('express');
	const app = express();
	const bodyParser = require('body-parser');
	const morgan = require('morgan');

	app.use(bodyParser.urlencoded({ extended: false}));
	app.use(bodyParser.json());
	app.use(morgan('combined'));

	app.get('/', function(req, res){
		res.setHeader('Content-Type', 'text/plain')
	  res.write('you posted:\n')
		res.end(JSON.stringify(req.body, null, 2))
	});

	app.listen(config.port, function(){
		console.log(`App runnig on Port ${config.port} Worker-ID: ` + cluster.worker.id);
	});
}

