import { motion } from "framer-motion";

interface JoinRoomProps {
    setRoomId: (roomId: string) => void
    setUsername: (username: string) => void
    handleJoin: () => void
}

export default function JoinRoom({ setRoomId, setUsername, handleJoin }: JoinRoomProps) {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            }
        }
    };

    const fadeUpVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            filter: "blur(10px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#1E2222] overflow-hidden px-4">
            {/* Animated Background Gradient */}
            <motion.div
                className="absolute -top-64 w-full h-full z-0 flex justify-center items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 0.8,
                    rotate: [0, 1, -1, 0]
                }}
                transition={{
                    scale: { duration: 2, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 1.5 },
                    rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }}
            >
                <img
                    src="/mainCircleGradient.svg"
                    alt="gradient"
                    className="max-w-[900px]"
                />
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="z-10 w-full max-w-md"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="p-8 bg-[#2A2F2F]/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[#3A3F3F]"
                    variants={fadeUpVariants}
                >
                    <motion.h2 
                        className="text-3xl font-bold mb-8 text-center text-[#DACDB6] babylonica"
                        variants={fadeUpVariants}
                    >
                        Connect
                    </motion.h2>

                    <div className="space-y-6">
                        <motion.div variants={fadeUpVariants}>
                            <input
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full px-6 py-3 bg-[#1E2222]/50 border border-[#3A3F3F] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent transition duration-200"
                            />
                        </motion.div>

                        <motion.div variants={fadeUpVariants}>
                            <input
                                type="text"
                                onChange={(e) => setRoomId(e.target.value)}
                                placeholder="Enter room code"
                                className="w-full px-6 py-3 bg-[#1E2222]/50 border border-[#3A3F3F] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent transition duration-200"
                                aria-label="Room code"
                            />
                        </motion.div>

                        <motion.button
                            onClick={handleJoin}
                            className="w-full px-8 py-4 bg-lime-600 text-white font-semibold rounded-xl hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-[#1E2222] transition duration-200 relative overflow-hidden group"
                            variants={fadeUpVariants}
                        >
                            <motion.span
                                className="relative z-10 text-lg cal-sans"
                                initial={{ opacity: 1 }}
                            >
                                Join Room
                            </motion.span>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
