"use client";

import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import AnimatedAvatar from "@/components/animatedAvatar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative text-white w-full min-h-screen overflow-hidden">
      {/* ENHANCED HEADER / HERO */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/portfolio.mp4" type="video/mp4" />
        </video>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-[-1]" />

        {/* Dynamic Light Effects */}
        <motion.div
          className="absolute inset-0 z-[-1]"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Subtle Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] h-[1px] bg-white/20 rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
              }}
              animate={{
                y: [null, "-100vh"],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
          {/* Title with Original Styling */}
          <div className="relative mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mt-4 text-4xl font-extrabold tracking-widest text-white font-bonheur sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            >
              Len Licht
            </motion.h1>

            {/* Subtle Glow Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl -z-10"
            />
          </div>

          {/* Enhanced Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 font-light tracking-wide">
              Creating{" "}
              <span className="text-blue-300 font-medium">
                cinematic animations
              </span>
              ,{" "}
              <span className="text-purple-300 font-medium">
                dynamic visuals
              </span>
              , and{" "}
              <span className="text-blue-300 font-medium">
                impactful motion graphics
              </span>
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto"
            >
              Crafting visual stories that move, inspire, and transform ideas
              into unforgettable experiences
            </motion.p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-6 h-10 border border-gray-400/50 rounded-full flex justify-center pt-2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1 h-3 bg-gray-400 rounded-full"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
                className="mt-2 text-xs text-gray-400 tracking-wider"
              >
                Explore
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 bg-black relative overflow-hidden">
        <GravityStarsBackground
          className="absolute inset-0"
          mouseGravity="attract"
          gravityStrength={80}
          starsInteraction={true}
        />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-20 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        {/* BLOCK 1 — Avatar with Box (Interactive) */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16 max-w-6xl mx-auto mb-20 sm:mb-32">
          <div className="lg:w-1/2 flex justify-center">
            <AnimatedAvatar
              src="/images/len_avatar.png"
              alt="Avatar 2"
              size={240}
              hasBox={false}
              direction="left"
              rotateDirection="clockwise"
              delay={0.1}
              rotate3D={true}
              interactive={false}
              className="scale-90 sm:scale-100"
              boxContent={
                <>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                    Motion Designer
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Cinematic animations & visuals
                  </p>
                </>
              }
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-blue-300">
                Creative Vision
              </h3>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Hi! I'm a motion graphic designer specializing in cinematic
                visuals, animation, and creative storytelling. I create
                impactful visuals that connect with audiences on an emotional
                level.
              </p>
              <motion.div
                className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                {["After Effects", "Cinema 4D", "Blender", "Premiere Pro"].map(
                  (tool, index) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 rounded-full text-xs sm:text-sm border border-white/10"
                    >
                      {tool}
                    </span>
                  )
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* BLOCK 2 — Normal Text Left, Avatar Right (Less Interactive) */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:w-1/2 order-2 lg:order-1"
          >
            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-purple-300">
                Emotional Impact
              </h3>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                My work blends motion graphics, editing, and atmosphere-focused
                design to create strong emotional impact. I aim to turn ideas
                into immersive visual experiences that captivate and inspire.
              </p>
              <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
                Every project starts with understanding the emotional core,
                ensuring the visuals resonate deeply with the intended audience.
              </p>
              <motion.div
                className="mt-6 sm:mt-8 h-1 w-16 sm:w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>

          <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center">
            <AnimatedAvatar
              src="/images/len_avatar.png"
              alt="Avatar 2"
              size={240}
              hasBox={false}
              direction="right"
              rotateDirection="counter-clockwise"
              delay={0.1}
              rotate3D={true}
              interactive={false}
              className="scale-90 sm:scale-100"
            />
          </div>
        </div>

        {/* Responsive decorative elements */}
        <motion.div
          className="hidden sm:block absolute top-1/4 left-4 lg:left-10 w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-500/30"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="hidden sm:block absolute bottom-1/3 right-4 lg:right-20 w-4 h-4 md:w-6 md:h-6 rounded-full bg-purple-500/20"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Mobile-only decorative elements */}
        <motion.div
          className="sm:hidden absolute top-10 left-4 w-2 h-2 rounded-full bg-blue-500/20"
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="sm:hidden absolute bottom-20 right-4 w-2 h-2 rounded-full bg-purple-500/20"
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
      </section>
    </div>
  );
}
