import { WebSocket } from "ws";

interface User {
    roomId: string;
    socket: WebSocket;
    // userId:number
  }
  
  let records: User[] = [];
  
  // message={
  //     type:"chat" | "join",
  //     payload:{
  //         message:"skhdfbsdbf" ,
  //         roomId:"sdhbfsjdbf"
  //     }
  // }
  
  //@ts-ignore
export const webSocketServerManager=(wss:WebSocket.Server<typeof WebSocket, typeof IncomingMessage>)=>{

  wss.on("connection", (socket:WebSocket) => {
        try {
          socket.on("message", (message) => {
            // @ts-ignore
            const parsedMessage = JSON.parse(message);
            console.log(parsedMessage);
      
            if (parsedMessage.type === "join") {
              if (parsedMessage.payload.roomId) {
                records.push({ socket, roomId: parsedMessage.payload.roomId});
                console.log("a user joined a room");
              }
            }
      
            if (parsedMessage.type == "chat") {
              const currentRoomId = records.find(
                (record) => record.socket === socket
              )?.roomId;
              if (parsedMessage.payload.message) {
                records.forEach((record) => {
                  if (record.roomId === currentRoomId ) {
                    record.socket.send(JSON.stringify({message:parsedMessage.payload.message}));
                  }
                });
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      });
      
}