const {Server} =require('socket.io');

const io = new Server(8000,{
        cors:true,
});


const emailToSocketMap = new Map();
const SocketToEmailMap = new Map();
io.on('connection', (socket) => {
     console.log('a user connected',socket.id);
     socket.on('joinRoom', (data) => {
        const { email, room } = data;
        emailToSocketMap.set(email, socket.id);
        SocketToEmailMap.set(socket.id, email);
        io.to(room).emit("userJoined",{email,id:socket.id});
        socket.join(room);
        io.to(socket.id).emit("joinRoom",data);
     });

        socket.on('callUser', ({ to, offer }) => {
                io.to(to).emit('incommingCall', {
                        from: socket.id,
                        offer
                });
                
        });
 });

 
