// import {  WebSocketServer } from "ws";
// import { webSocketServerManager } from "./utils/webSocketManager";
// import cors from 'cors'

// const wss = new WebSocketServer({ port: 3000 });
// webSocketServerManager(wss)

import {  WebSocketServer } from "ws";
import { webSocketServerManager } from "./utils/webSocketManager";
import cors from 'cors'
import express from 'express'
const app=express();

app.use(cors());

app.get('/',(req,res)=>{
        res.send("hello from backend");
});

const httpServer=app.listen(8080,()=>{
console.log("server listening on port 8080");
});


const wss = new WebSocketServer({port:8443, host: 'your-domain.com', server: httpServer})

webSocketServerManager(wss)