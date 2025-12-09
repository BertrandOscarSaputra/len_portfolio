"use client";

import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import AnimatedAvatar from "@/components/animatedAvatar";
import WorksCarousel from "@/components/latestCarousel";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getFeaturedWorks } from "@/lib/queries";
import { getFileUrl } from "@/lib/sanity";
import type { Work } from "@/lib/queries";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [latestWorks, setLatestWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(false);

  // Fetch works from Sanity
  useEffect(() => {
    // Check if we have a saved scroll position IMMEDIATELY
    // If not, we can show the page right away so there's no unnecessary delay
    const hasSavedScroll = sessionStorage.getItem("home_scroll_pos");
    if (!hasSavedScroll) {
      setIsPageVisible(true);
    }

    async function fetchWorks() {
      try {
        const works = await getFeaturedWorks();

        // Transform Sanity data to match carousel format
        const transformedWorks = works.map((work: Work) => ({
          id: work._id,
          title: work.title,
          category: work.category,
          videoSrc: work.video?.asset?.url || getFileUrl(work.video.asset._ref),
        }));

        setLatestWorks(transformedWorks);
      } catch (error) {
        console.error("Error fetching works:", error);
        // Fallback to empty array if fetch fails
        setLatestWorks([]);
      } finally {
        setLoading(false);
        // Restore scroll position if available
        const savedScroll = sessionStorage.getItem("home_scroll_pos");
        if (savedScroll) {
          setTimeout(() => {
            window.scrollTo({
              top: parseInt(savedScroll),
              behavior: "instant",
            });
            sessionStorage.removeItem("home_scroll_pos");
            // Show page AFTER the scroll jump
            setIsPageVisible(true);
          }, 100);
        } else {
          // Ensure visible if checks failed or logic fell through
          setIsPageVisible(true);
        }
      }
    }

    fetchWorks();
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const starsConfig =
    !isMounted || isMobile
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
    <div
      className={`relative text-white w-full min-h-screen overflow-hidden transition-opacity duration-500 ${
        isPageVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* MOBILE-OPTIMIZED HEADER - FIXED FOR DESKTOP */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Hero Video - Fixed to ensure full coverage */}
        <div className="absolute inset-0">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-[-2] min-w-full min-h-full"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="absolute inset-0 bg-black/50 z-[-1]" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="relative mb-4 sm:mb-8">
            {!isMounted || isMobile ? (
              <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-widest text-white font-bonheur drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                Len Licht
              </h1>
            ) : (
              <motion.h1
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-widest text-white font-bonheur drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
              >
                Len Licht
              </motion.h1>
            )}
          </div>

          <div className="max-w-2xl">
            {!isMounted || isMobile ? (
              <div>
                <p className="mt-4 text-lg text-gray-200 font-light tracking-wider">
                  Creating{" "}
                  <span className="text-blue-200">cinematic animations</span>,
                  <span className="text-purple-200"> dynamic visuals</span>, and
                  <span className="text-blue-200">
                    {" "}
                    impactful motion graphics
                  </span>
                </p>
                <p className="mt-2 text-sm text-gray-400 font-light tracking-wide">
                  Crafting visual stories that move, inspire, and transform
                  ideas
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <p className="mt-4 sm:mt-6 text-lg sm:text-2xl md:text-3xl text-gray-200 font-light tracking-wider leading-relaxed">
                  Creating{" "}
                  <span className="text-blue-200 font-normal drop-shadow-sm">
                    cinematic animations
                  </span>
                  ,{" "}
                  <span className="text-purple-200 font-normal drop-shadow-sm">
                    dynamic visuals
                  </span>
                  , and{" "}
                  <span className="text-blue-200 font-normal drop-shadow-sm">
                    impactful motion graphics
                  </span>
                </p>
                <p className="mt-3 sm:mt-5 text-sm sm:text-lg text-gray-400/80 font-light tracking-widest uppercase">
                  Crafting visual stories that move, inspire, and transform
                  ideas into unforgettable experiences
                </p>
              </motion.div>
            )}
          </div>

          {isMounted && showScrollIndicator && (
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
                {isMounted && !isMobile && (
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
        {isMounted && !isMobile && (
          <GravityStarsBackground
            className="absolute inset-0"
            {...starsConfig}
          />
        )}

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{
            once: true,
            margin: !isMounted || isMobile ? "0px" : "-50px",
          }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        {/* BLOCK 1 */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto mb-12 sm:mb-24">
          <div className="w-full lg:w-1/2 flex justify-center">
            <AnimatedAvatar
              src="/images/len_avatar.png"
              alt="Avatar 1"
              size={!isMounted ? 240 : isMobile ? 160 : 240}
              hasBox={false}
              direction="left"
              rotateDirection="clockwise"
              delay={0.1}
              rotate3D={isMounted && !isMobile}
              interactive={false}
              className={!isMounted || isMobile ? "" : "scale-95"}
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

        {/* BLOCK 2 */}
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
              {isMounted && !isMobile && (
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
              size={!isMounted ? 240 : isMobile ? 160 : 240}
              hasBox={false}
              direction="right"
              rotateDirection="counter-clockwise"
              delay={0.1}
              rotate3D={isMounted && !isMobile}
              interactive={false}
              className={!isMounted || isMobile ? "" : "scale-95"}
            />
          </div>
        </div>
      </section>

      {/* LATEST WORKS CAROUSEL SECTION */}
      <section
        id="projects"
        className="py-12 sm:py-24 px-4 sm:px-6 bg-black relative"
      >
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
              onClick={() => {
                sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
              }}
              className="mt-4 sm:mt-0 text-sm sm:text-base text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
            >
              View All
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-gray-400">Loading works...</div>
            </div>
          ) : latestWorks.length > 0 ? (
            <WorksCarousel works={latestWorks} />
          ) : (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-gray-400">No works available yet.</div>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}