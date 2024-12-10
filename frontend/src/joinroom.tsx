import { useState } from "react"

export default function Joinroom() {
    const [roomId, setRoomId] = useState<string | null>(null)


    function handleJoin() {
        const ws = new WebSocket("ws://localhost:3000")
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId
                }
            }))
            
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Join a Room</h2>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        onChange={(e) => { setRoomId(e.target.value) }}
                        placeholder="Enter room code"
                        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Room code"
                    />
                    <button
                        onClick={handleJoin}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        aria-label="Join room"
                    >
                        Join
                    </button>
                </div>
            </div>
        </div>
    )
}