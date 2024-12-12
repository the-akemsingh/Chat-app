import { WebSocket } from "ws";

interface User {
  roomId: string;
  socket: WebSocket;
  userId: number;
  name: string;
}

let userId=0;
let records: User[] = [];


//@ts-ignore
export const webSocketServerManager = (wss: WebSocket.Server<typeof WebSocket, typeof IncomingMessage>) => {

  wss.on("connection", (socket: WebSocket) => {
    try {
      socket.on("message", (message) => {
        // @ts-ignore
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === "join") {
          if (parsedMessage.payload.roomId) {
            const newUserId=userId++;
            records.push({
              socket,
              roomId: parsedMessage.payload.roomId,
              userId: newUserId,
              name:parsedMessage.payload.name
            });
            console.log("a user joined a room");
            socket.send(JSON.stringify({
              type:"join",
              payload:{
                userId:newUserId
              }
            }))
          }
        }

        if (parsedMessage.type === "chat") {
          const currentUser = records.find((record) => record.socket === socket);
      
          if (!currentUser || currentUser.roomId !== parsedMessage.payload.roomId) {
              console.log("Invalid user or room");
              return; 
          }
      
          if (parsedMessage.payload.message) {
              records.forEach((record) => {
                  if (record.roomId === currentUser.roomId) {
                      record.socket.send(
                          JSON.stringify({
                            type:"chat",
                            payload:{
                              userId: currentUser.userId,
                              name: currentUser.name,
                              message: parsedMessage.payload.message,
                            }
                          })
                      );
                  }
              });
          }
      }
      });

      socket.on("close", () => {
        records = records.filter(record => record.socket !== socket);
        console.log("A user disconnected");
      });
    
    } catch (error) {
      console.log(error);
    }
  });
};