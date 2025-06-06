import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const messages = [
  {sender:"Gal Gadot",message:"Hey, Superman wassup?"},
  {sender:"Bro",message:"Coming today?"},
  {sender:"Babe",message:"Did you have dinner yet?"},
  {sender:"Friend",message:"Just checking in..."},
  {sender:"Angelina",message:"Miss you already!"}
];

const TextPopUp = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first message after a delay
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Cycle through messages
    const messageTimer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-4 sm:bottom-7 left-4 sm:left-10 right-4 sm:right-auto z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 w-full sm:w-auto sm:min-w-[300px] max-w-[400px] shadow-lg border border-white/20 mx-auto sm:mx-0"
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="cal-sans w-full">
                <p className="text-yellow-600 font-medium mb-1 text-sm sm:text-base">{messages[currentMessageIndex].sender}</p>
                <p className="text-white/90 text-sm sm:text-base break-words">{messages[currentMessageIndex].message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TextPopUp;