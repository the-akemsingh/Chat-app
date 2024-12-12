import { Message } from "../Join&Chat";

export default function Chat({ userId,userName, messages, setInputText, handleSend, inputText }: { userId:number,userName: string, messages: Message[], setInputText: (a: string) => void, handleSend: () => void, inputText: string }) {

    const roomId = localStorage.getItem("roomId")

    function Exitroom() {
        localStorage.removeItem("roomId")
        window.location.reload()
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-md overflow-hidden">
                <>
                    <div className="p-4 flex-col bg-blue-500 text-white">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl">Chat Room</h2>
                            <button onClick={Exitroom} className="text-xl hover:scale-105 transition-transform">
                                Exit Room
                            </button>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                            <div>
                                Joined as {userName}
                            </div>
                            <div>
                                Room Id: {roomId}
                            </div>
                        </div>
                    </div>
                    <div className="h-[500px] overflow-y-auto p-4 space-y-2">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`rounded-lg ${message.userId === userId ? 'bg-blue-100 ml-auto' : 'bg-gray-100'} max-w-[200px]`}
                            >
                                <span className="px-3 pt-2 text-xs text-gray-600">{message.name}</span><span className="pt-2 text-xs text-gray-600" >ID:{message.userId}</span>
                                <div className="px-3 pb-2 text-base">{message.message}</div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSend();
                                        setInputText("");
                                    }
                                }}
                            />
                            <button
                                onClick={handleSend}
                                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </>
            </div>
            <div className="mt-5">~Share room id to add new members~</div>
        </div>
    )
}