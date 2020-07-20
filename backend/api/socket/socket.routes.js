
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        // console.log('connection made!');
        socket.on('boardchanged', ()=>{
            // console.log('board socket update')
            socket.broadcast.to(socket.boardId).emit('updateboard')
        })
        socket.on('setBoardId', newBoardId=>{
            if (socket.boardId) {
                socket.leave(socket.boardId)
            }
            socket.join(newBoardId)
            socket.boardId = newBoardId;
            
        })
    })
}