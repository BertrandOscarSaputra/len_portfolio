"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Work {
  id: number;
  title: string;
  category: string;
  videoSrc: string;
}

interface WorksCarouselProps {
  works: Work[];
}

export default function WorksCarousel({ works }: WorksCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setPlayingVideo(null);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
    setPlayingVideo(null);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % works.length);
    setPlayingVideo(null);
  };

  const toggleVideoPlay = (workId: number, videoElement: HTMLVideoElement) => {
    if (playingVideo === workId) {
      videoElement.pause();
      setPlayingVideo(null);
    } else {
      videoElement.play();
      setPlayingVideo(workId);
    }
  };

  // Mobile: show only current slide
  // Desktop: show current + 2 side slides
  const getVisibleSlides = () => {
    if (isMobile) return [currentIndex];

    const prev = (currentIndex - 1 + works.length) % works.length;
    const next = (currentIndex + 1) % works.length;
    return [prev, currentIndex, next];
  };

  const visibleSlides = getVisibleSlides();

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative overflow-visible">
        <div className="flex items-center justify-center min-h-[350px] sm:min-h-[450px] px-4 sm:px-16 py-8">
          <AnimatePresence mode="popLayout">
            {visibleSlides.map((slideIndex, position) => {
              const work = works[slideIndex];
              const isCenter = slideIndex === currentIndex;
              const isSide = !isCenter;

              return (
                <motion.div
                  key={`${work.id}-${slideIndex}`}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: isCenter ? 1 : 0.8,
                    x: isMobile
                      ? 0
                      : position === 0
                      ? -380
                      : position === 2
                      ? 380
                      : 0,
                    zIndex: isCenter ? 10 : 5,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className={`absolute w-full max-w-lg ${
                    isSide && !isMobile ? "cursor-pointer" : ""
                  }`}
                  onClick={() => isSide && !isMobile && goToSlide(slideIndex)}
                >
                  <div
                    className={`group relative rounded-2xl overflow-hidden bg-zinc-900 border transition-all duration-300 ${
                      isCenter
                        ? "border-blue-500/50 shadow-2xl shadow-blue-500/20"
                        : "border-zinc-800 hover:border-zinc-700"
                    } ${isSide && !isMobile ? "pointer-events-none" : ""}`}
                  >
                    <div className="aspect-video relative overflow-hidden bg-black">
                      <video
                        ref={(el) => {
                          if (el && isCenter) {
                            el.dataset.workId = work.id.toString();
                          }
                        }}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      >
                        <source src={work.videoSrc} type="video/mp4" />
                      </video>

                      {/* Play/Pause Button Overlay */}
                      {isCenter && (
                        <div
                          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                            const videoElement = e.currentTarget
                              .previousElementSibling as HTMLVideoElement;
                            if (videoElement) {
                              toggleVideoPlay(work.id, videoElement);
                            }
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                              scale: playingVideo === work.id ? 0 : 1,
                              opacity: playingVideo === work.id ? 0 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-sm border-2 border-white/80 flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all"
                          >
                            <svg
                              className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </motion.div>
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 bg-zinc-900">
                      <span className="text-xs text-blue-400 uppercase tracking-wider font-medium">
                        {work.category}
                      </span>
                      <h3 className="mt-2 text-lg sm:text-xl font-semibold text-white">
                        {work.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 sm:left-2 cursor-pointer top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-800 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 cursor-pointer sm:right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-800 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
        {works.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-10 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50"
                : "w-2.5 h-2.5 bg-zinc-700 hover:bg-zinc-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
