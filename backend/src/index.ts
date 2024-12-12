import {  WebSocketServer } from "ws";
import { webSocketServerManager } from "./utils/webSocketManager";
import cors from 'cors'

const wss = new WebSocketServer({ port: 3000 });
webSocketServerManager(wss)

