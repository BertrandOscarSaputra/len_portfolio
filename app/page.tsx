"use client";

import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import AnimatedAvatar from "@/components/animatedAvatar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

// Sample works data - can be replaced with actual content
const latestWorks = [
  {
    id: 1,
    title: "Cinematic Intro",
    category: "Motion Graphics",
    videoSrc: "/videos/main.mp4",
  },
  {
    id: 2,
    title: "Character Animation",
    category: "Animation",
    videoSrc: "/videos/animegirl.mp4",
  },
  {
    id: 3,
    title: "3D Visualization",
    category: "3D Animation",
    videoSrc: "/videos/Plane.mp4",
  },
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Detect mobile early
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Optimized scroll handler
    let scrollTimeout: NodeJS.Timeout | undefined;
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 50);
    };

    // Throttle scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Different settings for mobile vs desktop
  const starsConfig = isMobile
    ? {
        starsCount: 30,
        gravityStrength: 30,
        starsInteraction: false,
      }
    : {
        starsCount: 50,
        gravityStrength: 50,
        starsInteraction: false,
      };

  return (
    <div className="relative text-white w-full min-h-screen overflow-hidden">
      {/* MOBILE-OPTIMIZED HEADER */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Optimized Video - consider using poster image for mobile */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          webkit-playsinline="true"
          poster="/images/video-poster.jpg"
        >
          <source src="/videos/portfolio.mp4" type="video/mp4" />
          {/* Fallback image for unsupported browsers */}
          <img
            src="/images/video-poster.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Simple overlay - no gradients */}
        <div className="absolute inset-0 bg-black/50 z-[-1]" />

        {/* Main Content - Minimal animations */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          {/* Title - No animation on mobile */}
          <div className="relative mb-4 sm:mb-8">
            {isMobile ? (
              <h1 className="mt-4 text-4xl font-extrabold tracking-widest text-white font-bonheur">
                Len Licht
              </h1>
            ) : (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-widest text-white font-bonheur"
              >
                Len Licht
              </motion.h1>
            )}
          </div>

          {/* Tagline - Simplified */}
          <div className="max-w-2xl">
            {isMobile ? (
              <div>
                <p className="mt-4 text-base text-gray-300 font-light">
                  Creating{" "}
                  <span className="text-blue-300">cinematic animations</span>,
                  <span className="text-purple-300"> dynamic visuals</span>, and
                  <span className="text-blue-300">
                    {" "}
                    impactful motion graphics
                  </span>
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Crafting visual stories that move, inspire, and transform
                  ideas
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl text-gray-300 font-light tracking-wide">
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
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-400">
                  Crafting visual stories that move, inspire, and transform
                  ideas into unforgettable experiences
                </p>
              </motion.div>
            )}
          </div>

          {/* Scroll Indicator - Only show if not scrolled */}
          {showScrollIndicator && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex flex-col items-center">
                <div className="w-4 h-6 sm:w-5 sm:h-8 border border-gray-400/20 rounded-full flex justify-center pt-1">
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1 h-2 bg-gray-400/40 rounded-full"
                  />
                </div>
                {!isMobile && (
                  <p className="mt-1 text-[10px] sm:text-xs text-gray-400/60 tracking-wider">
                    Scroll
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MOBILE-OPTIMIZED ABOUT SECTION */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-black relative">
        {/* Only show stars background on desktop */}
        {!isMobile && (
          <GravityStarsBackground
            className="absolute inset-0"
            {...starsConfig}
          />
        )}

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, margin: isMobile ? "0px" : "-50px" }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        {/* BLOCK 1 - Stack on mobile */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto mb-12 sm:mb-24">
          <div className="w-full lg:w-1/2 flex justify-center">
            <AnimatedAvatar
              src="/images/len_avatar.png"
              alt="Avatar 1"
              size={isMobile ? 160 : 180}
              hasBox={false}
              direction="left"
              rotateDirection="clockwise"
              delay={0.1}
              rotate3D={!isMobile} // Disable 3D rotation on mobile
              interactive={false}
              className={isMobile ? "" : "scale-95"}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-black/30 border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-blue-300">
                Creative Vision
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Hi! I'm a motion graphic designer specializing in cinematic
                visuals, animation, and creative storytelling.
              </p>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {["After Effects", "Cinema 4D", "Blender", "Premiere Pro"].map(
                  (tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white/5 rounded-full text-xs border border-white/10"
                    >
                      {tool}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* BLOCK 2 - Reverse stack on mobile */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 order-2 lg:order-1"
          >
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-purple-300">
                Emotional Impact
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                My work blends motion graphics, editing, and atmosphere-focused
                design to create strong emotional impact.
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                Every project starts with understanding the emotional core,
                ensuring visuals resonate deeply with the audience.
              </p>
              {!isMobile && (
                <motion.div
                  className="mt-4 sm:mt-6 h-1 w-12 sm:w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              )}
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
            <AnimatedAvatar
              src="/images/len_avatar.png"
              alt="Avatar 2"
              size={isMobile ? 160 : 180}
              hasBox={false}
              direction="right"
              rotateDirection="counter-clockwise"
              delay={0.1}
              rotate3D={!isMobile} // Disable 3D rotation on mobile
              interactive={false}
              className={isMobile ? "" : "scale-95"}
            />
          </div>
        </div>
      </section>

      {/* LATEST WORKS SECTION */}
      <section id="projects" className="py-12 sm:py-24 px-4 sm:px-6 bg-black relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Latest Works
            </h2>
            <Link
              href="/gallery"
              className="mt-4 sm:mt-0 text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
            >
              View All
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {latestWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <video
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                    onTouchStart={(e) => e.currentTarget.play()}
                  >
                    <source src={work.videoSrc} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <span className="text-xs text-blue-400 uppercase tracking-wider">
                    {work.category}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {work.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
