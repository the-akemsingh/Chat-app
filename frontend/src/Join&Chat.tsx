import { useEffect, useRef, useState } from "react"
import JoinRoom from "./components/JoinRoom";
import Chat from "./components/Chat";


export interface Message{
    message:string,
    name:string,
    userId:number
}

export default function JoinChat() {

    const [inputText, setInputText] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [connected, setConnected] = useState<boolean>(false);
    const [roomjoined, setRoomjoined] = useState<boolean>(false);
    const [roomId, setRoomId] = useState<string | null>(null)
    const [userName,setUsername]=useState<string | null>(null);
    const [userId,setUserId]=useState<number | null >(null);

    const wss = useRef<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket(import.meta.env.REACT_APP_WS_URL || "ws://localhost:3000")
        ws.onopen = () => {
            setConnected(true);
            ws.onmessage = (messages) => {
                const data=JSON.parse(messages.data);
                if(data.type==="join"){
                    const userId=data.payload.userId;
                    setUserId(userId);
                }
                else if(data.type==="chat"){
                    setMessages(m=>[...m,data.payload])
                }
            }
            const roomId = localStorage.getItem("roomId")
            const userName = localStorage.getItem("userName")
            if (roomId && roomId != null) {
                ws.send(JSON.stringify({
                    type: "join",
                    payload: {
                        roomId: roomId,
                        name:userName
                    }
                }))
                setRoomjoined(true);
                setRoomId(roomId);
                setUsername(userName);
            }
        }
        ws.onerror = () => {
            console.log("Error Connecting to ws server");
            setConnected(false);
        }
        ws.close = () => {
            setConnected(false)
            setRoomId(null)
            setUsername(null)
            setUserId(null)
        }
        wss.current = ws
        return () => {
            ws.close();
        }

    }, [])


    function handleJoin() {
        if (wss.current?.readyState == WebSocket.OPEN) {
            wss.current!.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId,
                    name:userName
                }
            }))
            localStorage.setItem("roomId", roomId as string)
            localStorage.setItem("userName", userName as string)

            setRoomjoined(true);
        }
    }

    const handleSend = () => {
        try {
            wss.current!.send(JSON.stringify({
                type: "chat",
                payload: {
                    roomId,
                    message: inputText,
                    name:userName
                }
            }))
            setInputText('');
        } catch (e) {
            console.log(e)
            alert("Error occurred while sending message")
        }
    }
    return (
        <div>
            {connected ? (
                <>
                    <div>
                        {roomjoined ? (
                            <>
                                <Chat userId={userId as number} userName={userName as string} messages={messages} inputText={inputText} setInputText={setInputText} handleSend={handleSend} ></Chat>
                            </>
                        ) : (
                            <>
                                <JoinRoom setUsername={setUsername} setRoomId={setRoomId} handleJoin={handleJoin} ></JoinRoom>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                    Connecting...
                </>
            )}

        </div>
    )
} 