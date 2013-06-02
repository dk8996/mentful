var http = require('http').createServer(handler);
var fs = require('fs');
var io = require('socket.io').listen(http);

var port = 9123;
http.listen(port);

function handler(req, res) {
        fs.readFile('index.html', function(err,data) {
	 res.writeHead(200, {'Content-Type' : 'text/html'});
         res.end(data);
	});
};

console.log('Listening on port',port);

io.sockets.on('connection', function (socket) {
console.log('Someone Connected');
// when the client emits 'sendchat', this listens and executes
socket.on('sendEvent', function (data) {
console.log('Someone sent a event');
// we tell the client to execute 'updatechat' with 2 parameters
io.sockets.emit('update', data);
});

});

