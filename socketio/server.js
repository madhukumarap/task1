const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection',(socket)=>{
    console.log('A user Connected')
    socket.on('message',(msg)=>{
        console.log('Message received: ' + msg);
        io.emit()  // Broadcast the message to all clients
    });
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    });
})
server.listen(3000,()=>{
    console.log('Server is running on port 3000');

})



