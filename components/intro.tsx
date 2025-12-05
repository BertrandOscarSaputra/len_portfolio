"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Home from "@/app/page";

export default function IntroPage() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return <IntroScreen />;
  }

  return <Home />;
}

function IntroScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: [0.5, 1, 0.5],
      scale: [0.8, 1.2, 0.8],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  const fadeOutVariants = {
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeOutVariants}
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-black flex flex-col items-center justify-center z-[9999] overflow-hidden"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen blur-3xl"
        ></motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center"
      >
        {/* Top Line */}
        <motion.div
          variants={lineVariants}
          className="h-1 w-24 bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-8 mx-auto"
        ></motion.div>

        {/* Subtitle */}
        <motion.p
          variants={textVariants}
          className="text-cyan-400 text-sm font-light tracking-[0.3em] mb-6 uppercase"
        >
          Welcome to
        </motion.p>

        {/* Main Title with Glow */}
        <div className="relative mb-8">
          <motion.div
            variants={glowVariants}
            className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-2xl"
            style={{ filter: "blur(30px)" }}
          ></motion.div>

          <motion.h1
            variants={textVariants}
            className="relative text-6xl md:text-7xl font-black tracking-tight"
          >
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Fallen
            </span>
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          variants={textVariants}
          className="text-slate-300 text-lg font-light tracking-wide mb-2"
        >
          Motion Graphic Designer
        </motion.p>

        {/* Bottom Line */}
        <motion.div
          variants={lineVariants}
          className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-8 mx-auto"
        ></motion.div>
      </motion.div>

      {/* Loading Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-16 flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500"
          ></motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
