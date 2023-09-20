const io = require('socket.io')(8900, {
   //You need to add configurations here to use it in client side
   cors:{
    origin: 'http://localhost:3000',
   },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({userId, socketId})
}
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}


const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {
    console.log("User Connected");

    //Connecting new user
    socket.on("addUser", (userId) => {
        if(userId!==null){
        addUser(userId, socket.id);
        io.emit("getUsers", users);
        }
    })

    //Receiving and Sending Message
    socket.on("sendMessage", ({senderId, receiverId, text}) =>{
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        })
    })


    //Removing User
    socket.on("disconnect", ()=>{
        console.log("User Disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})