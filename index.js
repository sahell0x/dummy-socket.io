const io = require('socket.io')(3000, {
  cors: {
    origin: '*',
  }
});

console.log('Socket.IO server running on http://localhost:3000');

// When a client connects
io.on('connection', (socket) => {
  console.log('Client connected');
  
  // Send a message periodically
  const interval = setInterval(() => {
    socket.emit('message', 'Hello from server!');
  }, 1000);

  // Simulate random disconnect every few seconds
  const disconnectInterval = setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance to disconnect randomly
      console.log('Random disconnection');
      socket.disconnect(); // Disconnect the Socket.IO connection
      clearInterval(interval); // Clear the message interval
    }
  }, 5000);

  // When a client sends a message
  socket.on('message', (message) => {
    console.log('Received: ' + message);
    socket.emit('message', 'Echo: ' + message);
  });

  // When client disconnects
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(disconnectInterval);
  });
});
