const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log("Connected with ID: ", socket.id);

    socket.on('send-name', (data) => {
        console.log('name', data);
        socket.broadcast.emit('get-name', data);
    });
    
    socket.on('send-toast', (data) => {
        console.log(data.sender);
        socket.broadcast.emit('get-toast', data.sender);
    });

    // Join room
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
    });

    // Send message to a specific room
    socket.on('send-message', ({ roomId, message }) => {
        io.to(roomId).emit('receive-message', {
            senderId: socket.id,
            message
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log("server running")
})