import { motion } from "framer-motion";
import { useEffect } from "react";

interface VideoModalProps {
  work: {
    id: number;
    title: string;
    category: string;
    description: string;
    videoSrc: string;
  } | null;
  onClose: () => void;
}

export default function VideoModal({ work, onClose }: VideoModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (work) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [work]);

  if (!work) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Scrollable Container */}
      <div className="min-h-full w-full flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl bg-black/50 rounded-2xl overflow-hidden border border-white/10 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute cursor-pointer top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
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
              <source src={work.videoSrc} type="video/mp4" />
            </video>
          </div>
          <div className="p-4 sm:p-6">
            <span className="text-xs text-blue-400 uppercase tracking-wider">
              {work.category}
            </span>
            <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white">
              {work.title}
            </h3>
            <p className="mt-2 text-gray-400">{work.description}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
