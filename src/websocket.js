const socket = io();
window.onload = () => {
	socket.on('news', (data) => {
		console.log(data);
		socket.emit('my other event', {
			my: 'data',
		});
	});
};
