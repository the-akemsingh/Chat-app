'use client'

import { useEffect, useRef, useState } from "react"

export default function Chat() {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    try {
      wsRef.current!.send(JSON.stringify({
        type: "chat",
        payload: {
          message: inputText
        }
      }))
      setInputText('');
    } catch (e) {
      console.log(e)
      alert("Error occurred while sending message")
    }
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000")
    wsRef.current = ws;

    wsRef.current.onopen = () => {
      wsRef.current!.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "123"
        }
      }));
      setIsConnected(true);
      wsRef.current!.onmessage = (event) => {
        const recMessage = JSON.parse(event.data).message
        setMessages(m => [...m, recMessage])
      }
    }
    wsRef.current.onclose = () => {
      setIsConnected(false);
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        {isConnected ? (
          <>
            <div className="p-4 bg-blue-500 text-white">
              <h2 className="text-xl font-semibold">Chat Room</h2>
            </div>
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-blue-100 text-blue-800 max-w-xs ml-auto"
                >
                  {message}
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4 text-center">
            <p className="text-gray-600">Connecting to WebSocket...</p>
          </div>
        )}
      </div>
    </div>
  )
}

