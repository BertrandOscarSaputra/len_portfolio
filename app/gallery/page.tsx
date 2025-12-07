"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import VideoCard from "@/components/videoCard";
import VideoModal from "@/components/videoModal";

// Gallery works data - can be expanded with more content
const galleryWorks = [
  {
    id: 1,
    title: "Cinematic Intro",
    category: "Motion Graphics",
    description:
      "A dynamic motion graphics intro with cinematic transitions and effects.",
    videoSrc: "/videos/main.mp4",
  },
  {
    id: 2,
    title: "Character Animation",
    category: "Animation",
    description:
      "Stylized character animation with fluid movements and expressive design.",
    videoSrc: "/videos/animegirl.mp4",
  },
  {
    id: 3,
    title: "3D Visualization",
    category: "3D Animation",
    description:
      "High-quality 3D render showcasing detailed modeling and lighting.",
    videoSrc: "/videos/Plane.mp4",
  },
  {
    id: 4,
    title: "Portfolio Showreel",
    category: "Showreel",
    description:
      "A compilation of best works featuring various motion design techniques.",
    videoSrc: "/videos/portfolio.mp4",
  },
  {
    id: 5,
    title: "Visual Story",
    category: "Motion Graphics",
    description:
      "An atmospheric piece blending visuals with emotional storytelling.",
    videoSrc: "/videos/vid.mp4",
  },
];

const categories = [
  "All",
  ...new Set(galleryWorks.map((work) => work.category)),
];

export default function GalleryPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedWork, setSelectedWork] = useState<
    (typeof galleryWorks)[0] | null
  >(null);

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
              <span className="hover:-translate-x-1 transition-transform">
                ←
              </span>
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gallery
            </h1>
            <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl">
              A collection of motion graphics, animations, and visual projects
              showcasing creative storytelling and design.
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
              <VideoCard
                key={work.id}
                work={work}
                index={index}
                isMobile={isMobile}
                onSelect={() => setSelectedWork(work)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </div>
  );
}
