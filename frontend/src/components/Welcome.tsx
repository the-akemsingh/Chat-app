import { motion } from "framer-motion";
// import { useTypingEffect } from "../hooks/typingEffects";
import TextPopUp from "./textPopUp";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  // const typedText = useTypingEffect(['QUIET.', 'WARM.', 'ENCRYPTED.'], 100, 100, 1500);
  const router = useNavigate()
  // Animation variants
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

  const scaleInVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
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
        className="z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Script Title */}
        <motion.h1
          className="text-5xl mt-5 md:text-6xl lg:text-7xl text-[#DACDB6] babylonica mb-4"
          variants={fadeUpVariants}
        >
          {"They say we shouldn't hold it all in.".split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              custom={i}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-2xl md:text-3xl cal-sans text-white font-medium mt-8 mb-4"
          variants={fadeUpVariants}
        >
          So here's a space –
        </motion.p>

        {/* Main Highlighted Text with staggered animation */}
        <motion.div
          className="text-4xl md:text-6xl cal-sans lg:text-7xl font-extrabold leading-tight"
          variants={scaleInVariants}
        >
          <motion.div
            className="text-white"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(255,255,255,0.5)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            QUITE,  <span> WARM</span> &
          </motion.div>
          <motion.div
            className="text-lime-600"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 30px rgba(132,204,22,0.8)",
              color: "#84cc16"
            }}
            transition={{ type: "spring", stiffness: 300 }}
            animate={{
              textShadow: ["0 0 10px rgba(132,204,22,0.3)", "0 0 20px rgba(132,204,22,0.5)"]
            }}
            style={{
              animationDuration: "3s",
              animationIterationCount: "infinite",
              animationDirection: "alternate"
            }}
          >
            ENCRYPTED
          </motion.div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          className="text-xl md:text-2xl cal-sans mt-6 font-medium text-white"
          variants={fadeUpVariants}
        >
          – for every thought you never said out loud.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          className="mt-12 mb-5"
          variants={fadeUpVariants}
        >
          <motion.button
            className="px-8 py-4 bg-lime-600 text-white font-semibold rounded-full text-lg cal-sans relative overflow-hidden group"
            // whileHover={{ scale: 1.05 }}
            // whileTap={{ scale: 0.95 }}
            onClick={() => {
              router('/join-chat')
            }
            }
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.span
              className="relative z-10"
              initial={{ opacity: 1 }}
            // whileHover={{ opacity: 0.9 }}
            >
              Start Chatting
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      <TextPopUp></TextPopUp>

    </div>
  );
}
