import { Message } from "../Join&Chat";

export default function Chat({ userName, messages, setInputText, handleSend, inputText }: {
    userName: string,
    messages: Message[],
    setInputText: (a: string) => void,
    handleSend: () => void,
    inputText: string
}) {


    function Exitroom() {
        localStorage.removeItem("roomId")
        window.location.reload()
    }
    const roomId = localStorage.getItem("roomId")
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">

                <>
                    <div className="p-4 flex-col bg-blue-500 text-white">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold">Chat Room</h2>
                            <button onClick={Exitroom} className="text-xl font-semibold  hover:scale-110 hover:transition ease-in ">Exit Room</button>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                Joined as {userName}
                            </div>
                            <div>
                                Room Id:{roomId}
                            </div>
                        </div>
                    </div>
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className="p-3 rounded-lg bg-blue-100 text-blue-800 max-w-xs ml-auto"
                            >
                                {message.message}
                                {message.name}
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
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSend();
                                        setInputText("");
                                    }
                                }}
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
            </div>
        </div>
    )
}