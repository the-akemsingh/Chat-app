import { useEffect, useRef, useState } from "react"
import JoinRoom from "./components/JoinRoom";
import Chat from "./components/Chat";


export interface Message{
    message:string,
    name:string,
    userId:string
}

export default function JoinChat() {

    const [roomId, setRoomId] = useState<string | null>(null)
    const [inputText, setInputText] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [connected, setConnected] = useState<boolean>(false);
    const [roomjoined, setRoomjoined] = useState<boolean>(false);
    const [userName,setUsername]=useState<string | null>(null);

    const wss = useRef<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000")
        ws.onopen = () => {
            setConnected(true);

            ws.onmessage = (messages) => {
                const receivedMsg:Message = JSON.parse(messages.data);
                console.log(messages.data)
                setMessages((m) => [...m, receivedMsg])
            }

            const token = localStorage.getItem("roomId")
            const userName = localStorage.getItem("userName")
            if (token && token != null) {
                ws.send(JSON.stringify({
                    type: "join",
                    payload: {
                        roomId: token,
                        name:userName
                    }
                }))
                setRoomjoined(true);
                setRoomId(token);
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
                                <Chat userName={userName as string} messages={messages} inputText={inputText} setInputText={setInputText} handleSend={handleSend} ></Chat>
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