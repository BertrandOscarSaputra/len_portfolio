"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

// Gallery works data - can be expanded with more content
const galleryWorks = [
  {
    id: 1,
    title: "Cinematic Intro",
    category: "Motion Graphics",
    description: "A dynamic motion graphics intro with cinematic transitions and effects.",
    videoSrc: "/videos/main.mp4",
  },
  {
    id: 2,
    title: "Character Animation",
    category: "Animation",
    description: "Stylized character animation with fluid movements and expressive design.",
    videoSrc: "/videos/animegirl.mp4",
  },
  {
    id: 3,
    title: "3D Visualization",
    category: "3D Animation",
    description: "High-quality 3D render showcasing detailed modeling and lighting.",
    videoSrc: "/videos/Plane.mp4",
  },
  {
    id: 4,
    title: "Portfolio Showreel",
    category: "Showreel",
    description: "A compilation of best works featuring various motion design techniques.",
    videoSrc: "/videos/portfolio.mp4",
  },
  {
    id: 5,
    title: "Visual Story",
    category: "Motion Graphics",
    description: "An atmospheric piece blending visuals with emotional storytelling.",
    videoSrc: "/videos/vid.mp4",
  },
];

const categories = ["All", ...new Set(galleryWorks.map((work) => work.category))];

export default function GalleryPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedWork, setSelectedWork] = useState<typeof galleryWorks[0] | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredWorks =
    activeCategory === "All"
      ? galleryWorks
      : galleryWorks.filter((work) => work.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white pt-20 sm:pt-24">
      {/* Header Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <span className="hover:-translate-x-1 transition-transform">←</span>
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gallery
            </h1>
            <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl">
              A collection of motion graphics, animations, and visual projects showcasing creative storytelling and design.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 flex flex-wrap gap-2 sm:gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedWork(work)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <video
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => !isMobile && e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }
                    }}
                  >
                    <source src={work.videoSrc} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <span className="text-xs text-blue-400 uppercase tracking-wider">
                      {work.category}
                    </span>
                    <h3 className="mt-1 text-lg sm:text-xl font-semibold text-white">
                      {work.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {work.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedWork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedWork(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-black/50 rounded-2xl overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
            <div className="aspect-video">
              <video
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
              >
                <source src={selectedWork.videoSrc} type="video/mp4" />
              </video>
            </div>
            <div className="p-4 sm:p-6">
              <span className="text-xs text-blue-400 uppercase tracking-wider">
                {selectedWork.category}
              </span>
              <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white">
                {selectedWork.title}
              </h3>
              <p className="mt-2 text-gray-400">{selectedWork.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
