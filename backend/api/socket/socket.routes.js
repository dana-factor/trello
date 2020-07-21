
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        // console.log('connection made!');
        socket.on('boardChanged', (board)=>{
            // console.log('board socket update')
            socket.broadcast.to(socket.boardId).emit('updateBoard',board)
        })
        socket.on('setBoardId', newBoardId=>{
            // console.log('setting boardid')
            if (socket.boardId) {
                socket.leave(socket.boardId)
            }
            socket.join(newBoardId)
            socket.boardId = newBoardId;
            
        })
    })
}