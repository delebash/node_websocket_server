const server = require('http').createServer()
const io = require('socket.io')(server)
io.set('transports', ['websocket'])

hostname = "localhost"
port = 5000

io.on('connection', function (socket) {
    console.log('client connected...', socket.id)
    // once a client has connected, we expect to get a ping from them saying what room they want to join

    // client.on('register', handleRegister)
    // client.on('join', handleJoin)
    // client.on('leave', handleLeave)
    // client.on('chatrooms', handleGetChatrooms)
    // client.on('availableUsers', handleGetAvailableUsers)

    socket.on('room', function (room) {
        socket.join(room);
        socket.emit('join', room)
        console.log('joined room  ' + room)
    });

    socket.on('disconnect', function () {
        console.log('client disconnect...', socket.id)
    })

    socket.on('error', function (err) {
        console.log('received error from client:', socket.id)
        console.log(err)
    })
})

server.listen(port, hostname, function (err) {
    if (err) throw err
    console.log('listening on port ' + port)
})

