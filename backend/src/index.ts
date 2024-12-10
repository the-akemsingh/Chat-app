import {  WebSocketServer } from "ws";
import { webSocketServerManager } from "./utils/webSocketManager";
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import userRouter from './routes/user'

const app=express()
app.listen(3001,()=>console.log("express server listening on port 3001"))

const wss = new WebSocketServer({ port: 3000 });
webSocketServerManager(wss)

app.use(express.json())
app.use('/api/v1/user',userRouter)