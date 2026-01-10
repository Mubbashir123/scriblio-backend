const express=require("express");
const http= require("http");

const {Server, Socket}=require("socket.io");
const cors=require("cors");
const connectDB= require("./config/db");
require("dotenv").config();

connectDB();
const app=express();
app.use(cors());
app.use(express.json());
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
