import { Message } from "../Join&Chat";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Chat({ userId, userName, messages, setInputText, handleSend, inputText }: { userId: number, userName: string, messages: Message[], setInputText: (a: string) => void, handleSend: () => void, inputText: string }) {
    const roomId = localStorage.getItem("roomId")
    const navigate = useNavigate()
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    function exitRoom() {
        localStorage.removeItem("roomId")
        navigate('/')
    }

    const extractCodeBlock = (text: string) => {
        const codeBlockRegex = /\`\`\`[\w]*\n?([\s\S]*?)\`\`\`/;
        const langSpecificRegex = /#include[\s\S]*?int\s+main$$$$[\s\S]*?}/;

        const markdownMatch = text.match(codeBlockRegex);
        if (markdownMatch) {
            return markdownMatch[1].trim();
        }

        const langMatch = text.match(langSpecificRegex);
        if (langMatch) {
            return langMatch[0].trim();
        }
        return text.trim();
    }

    const toHuggingFace = async () => {
        if (prompt) {
            setIsLoading(true);
            const B_URL = import.meta.env.VITE_BACKEND_URL
            try {
                const response = await axios.post(B_URL, { prompt });
                //@ts-ignore
                const answer = response.data.choices[0].message.content;
                const codeBlock = extractCodeBlock(answer);
                setAiResponse(codeBlock);
                setPrompt("");
            } catch (e) {
                console.error("Error fetching AI response:", e);
                setAiResponse("Error fetching AI response");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 lg:p-10 bg-gray-100 min-h-screen">
            <div className="lg:col-span-2 flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 bg-blue-500 text-white">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-semibold">Chat Room</h2>
                        <button onClick={exitRoom} className="px-4 py-1 bg-red-500 rounded hover:bg-red-600 transition-colors">
                            Exit Room
                        </button>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between text-sm">
                        <div>Joined as {userName}</div>
                        <div>Room Id: {roomId}</div>
                    </div>
                </div>
                <div className="flex-grow h-[300px] sm:h-[400px] lg:h-[500px] overflow-y-auto p-4 space-y-2">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`rounded-lg ${message.userId === userId ? 'bg-blue-100 ml-auto' : 'bg-gray-100'} max-w-[300px] break-words`}
                        >
                            <div className="px-3 pt-2 text-xs text-gray-600 flex justify-between">
                                <span>{message.name}</span>
                                <span>ID:{message.userId}</span>
                            </div>
                            <div className="px-3 pb-2 text-base">{message.message}</div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t">
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>

            <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 bg-blue-500 text-white">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-semibold">AI Chat Assistant</h2>
                    </div>
                </div>
                <div className="flex-grow p-4 h-[200px] sm:h-[300px] lg:h-[400px] overflow-y-auto">
                    {aiResponse ? (
                        <div className="bg-blue-100 rounded-lg p-4 mb-4">
                            <pre className="whitespace-pre-wrap font-mono text-sm">{aiResponse}</pre>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 mt-8">
                            Ask the AI anything and the response will appear here.
                        </div>
                    )}
                </div>
                <div className="p-4 border-t">
                    <form onSubmit={(e) => { e.preventDefault(); toHuggingFace(); }} className="flex space-x-2">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Ask for code assistance..."
                            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                    Send
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

