interface JoinRoomProps {
    setRoomId: (roomId: string) => void
    setUsername: (username: string) => void
    handleJoin: () => void
}

export default function JoinRoom({ setRoomId, setUsername, handleJoin }: JoinRoomProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Join a Room</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        onChange={(e) => setRoomId(e.target.value)}
                        placeholder="Enter room code"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Room code"
                    />
                    <button
                        onClick={handleJoin}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        aria-label="Join room"
                    >
                        Join
                    </button>
                </div>
            </div>
        </div>
    )
}
