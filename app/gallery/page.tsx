"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import VideoCard from "@/components/videoCard";
import VideoModal from "@/components/videoModal";
import { getAllWorks } from "@/lib/queries";
import { getFileUrl } from "@/lib/sanity";
import type { Work } from "@/lib/queries";

export default function GalleryPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedWork, setSelectedWork] = useState<any | null>(null);
  const [galleryWorks, setGalleryWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(["All"]);

  // Fetch works from Sanity
  useEffect(() => {
    async function fetchWorks() {
      try {
        const works = await getAllWorks();

        // Transform Sanity data to match component format
        const transformedWorks = works.map((work: Work) => ({
          id: work._id,
          title: work.title,
          category: work.category,
          description: work.description || "",
          videoSrc: work.video?.asset?.url || getFileUrl(work.video.asset._ref),
        }));

        setGalleryWorks(transformedWorks);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(works.map((work: Work) => work.category)),
        ];
        setCategories(uniqueCategories as string[]);
      } catch (error) {
        console.error("Error fetching works:", error);
        setGalleryWorks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWorks();
  }, []);

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
              A collection of my motion graphics, animations, and visual projects
              
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
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-gray-400">Loading gallery...</div>
            </div>
          ) : galleryWorks.length > 0 ? (
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
          ) : (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <p className="text-gray-400 mb-4">No works available yet.</p>
                <p className="text-sm text-gray-500">
                  Add content through your Sanity Studio
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </div>
  );
}
