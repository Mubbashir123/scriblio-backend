const express=require("express");
const http= require("http");

const {Server, Socket}=require("socket.io");
const cors=require("cors");
const connectDB= require("./config/db");
const boardRoutes=require("./routes/boardRoutes");
require("dotenv").config();

connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/boards",boardRoutes);
const server=http.createServer(app);

const io=new Server(server,
    {
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    }
)

app.get("/",(req,res)=>
{
    res.send("Scriblio server up");
})

io.on("connection",(socket=>
{

    console.log("User Connected",socket.id);
    socket.on('join',(roomId)=>
    {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    })

    socket.on('drawing', (data) => {
        
        console.log("Drawing received on server:", data.roomId); 
        
        socket.to(data.roomId).emit('drawing', data.element);
    });
    socket.on("disconnect",()=>
    {
        console.log("User disconnect",socket.id);
    })
}
))

server.listen(5000,()=>
{
    console.log("Server is running");
})
