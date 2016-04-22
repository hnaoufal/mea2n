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

	app.get('/', function(req, res){
		res.send('Hello World!');
	});

	app.listen(config.port, function(){
		console.log(`App runnig on Port ${config.port} Worker-ID: ` + cluster.worker.id);
	});
}

