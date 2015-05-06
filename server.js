'use strict';

var http = require('http');
var url = require('url');
var server = http.createServer(function (req, res) {
//Class: http.ClientRequest# goes into req
//Server: http.Response goes into res

	if(req.url === '/time') {
		res.writeHead(200, {
			'Content-Type' : 'application/json'
		});
			var body = new Date();
			var hours = body.getHours();
			var minutes = body.getMinutes();
			var writein = JSON.stringify({Current_time: hours + ":" + minutes});
			res.write(writein);
			return res.end();
	}
	
	if(req.url.substring(0,6) === '/greet') {
	var pathArray = req.url.split("/");
	var name = pathArray[pathArray.length - 1];
	res.writeHead(200, {
		'Content-Type' : 'application/json'
	});
		if(req.method === "POST") {
			req.on('data', function(data) {
				var body = JSON.parse(data.toString());
				res.write(JSON.stringify({msg: 'hello ' + body.name}));
				return res.end();
			});
		} else {
			res.write(JSON.stringify({hello: name}));
			return res.end();
			}
	} else {

		res.writeHead(404, {
		'Content-Type' : 'application/json'
	});

		res.write(JSON.stringify({msg: '404 could not find page'}));
		res.end();
		}
	});

	server.listen(3000, function() {
	console.log('server started');
});