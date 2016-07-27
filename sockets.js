// SOCKET.IO
module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log(`${socket} has joined.`);
		socket.emit('news', 'fat chance');
		socket.on('my other event', (data) => {
			console.log('got it');
		});
	});
};
