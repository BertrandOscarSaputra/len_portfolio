import { motion } from "framer-motion";

interface VideoCardProps {
  work: {
    id: number;
    title: string;
    category: string;
    description: string;
    videoSrc: string;
  };
  index: number;
  isMobile: boolean;
  onSelect: () => void;
}

export default function VideoCard({
  work,
  index,
  isMobile,
  onSelect,
}: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
      onClick={onSelect}
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
  );
}
