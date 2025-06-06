import { Message } from "../Join&Chat";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat({ userId, userName, messages, setInputText, handleSend, inputText }: { userId: number, userName: string, messages: Message[], setInputText: (a: string) => void, handleSend: () => void, inputText: string }) {
    const roomId = localStorage.getItem("roomId")
    const navigate = useNavigate()

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
            }
        }
    };

    function exitRoom() {
        localStorage.removeItem("roomId")
        navigate('/')
    }


    return (
        <div className="flex justify-center p-2 sm:p-3 lg:p-6 bg-[#1E2222] min-h-screen">
            {/* Main Chat Section */}
            <motion.div
                className={`flex flex-col bg-[#2A2F2F]/80 backdrop-blur-sm w-[95%] sm:w-[90%] md:min-w-[500px] md:max-w-[800px] rounded-2xl shadow-xl border border-[#3A3F3F] overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="p-3 sm:p-4 bg-[#1E2222] border-b border-[#3A3F3F]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-2">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#DACDB6] babylonica">Chat Room</h2>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <motion.button
                                onClick={exitRoom}
                                className="w-full sm:w-auto px-3 py-1.5 bg-red-500/90 text-white rounded-lg hover:bg-red-600 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Exit Room
                            </motion.button>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-300 gap-1 sm:gap-0">
                        <div>Joined as <span className="text-lime-500">{userName}</span></div>
                        <div>Room: <span className="text-lime-500">{roomId}</span></div>
                    </div>
                </div>

                <motion.div
                    className="flex-grow h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-y-auto p-3 sm:p-4 space-y-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence>
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                variants={messageVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className={`flex ${message.userId === userId ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`rounded-2xl px-3 sm:px-4 py-2 max-w-[85%] sm:max-w-[300px] break-words ${
                                    message.userId === userId
                                        ? 'bg-lime-600/20 border border-lime-600/30'
                                        : 'bg-[#1E2222]/50 border border-[#3A3F3F]'
                                }`}>
                                    <div className="text-xs text-gray-400 flex flex-wrap justify-between gap-1 mb-1">
                                        <span className="text-lime-500">{message.name}</span>
                                        <span className="text-gray-500">ID:{message.userId}</span>
                                    </div>
                                    <div className="text-sm sm:text-base text-gray-200">{message.message}</div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="p-3 sm:p-4 border-t border-[#3A3F3F] bg-[#1E2222]">
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow px-3 sm:px-4 py-2 bg-[#2A2F2F] border border-[#3A3F3F] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent transition duration-200 text-sm sm:text-base"
                        />
                        <motion.button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-[#1E2222] transition duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Send
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

