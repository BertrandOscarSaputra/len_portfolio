"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  easeInOut,
  easeOut,
} from "framer-motion";
import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";

interface AnimatedAvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  hasBox?: boolean;
  boxContent?: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  rotate3D?: boolean;
  interactive?: boolean;
  rotateDirection?: "clockwise" | "counter-clockwise";
}

export default function AnimatedAvatar({
  src,
  alt,
  size = 200,
  className = "",
  hasBox = false,
  boxContent,
  direction = "left",
  delay = 0,
  rotate3D = false,
  interactive = true,
  rotateDirection = "clockwise",
}: AnimatedAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [rotationKey, setRotationKey] = useState(0); // Key to force re-render

  // Force re-render when rotateDirection changes
  useEffect(() => {
    setRotationKey((prev) => prev + 1);
  }, [rotateDirection]);

  // For mouse tracking effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;

    x.set(mouseX * 0.1);
    y.set(mouseY * 0.1);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Floating animation
  const floatingAnimation = {
    y: ["0%", "-8%", "0%"],
    transition: {
      duration: isHovered ? 2 : 3,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: easeInOut,
    },
  };

  // Click animation
  const clickAnimation = {
    scale: isClicked ? [1, 1.1, 1] : 1,
    transition: {
      duration: 0.3,
    },
  };

  // Fade in from direction variants
  const fadeInVariants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -40 : 40,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: easeOut,
      },
    },
  };

  // SIMPLIFIED ROTATION - This will work better
  const rotationAmount = rotateDirection === "counter-clockwise" ? -360 : 360;

  return (
    <motion.div
      key={rotationKey} // Force re-render when direction changes
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInVariants}
      className={`relative ${hasBox ? "p-4 md:p-8" : ""}`}
      style={interactive ? { x: springX, y: springY } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => interactive && setIsClicked(true)}
    >
      {hasBox && boxContent && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-3xl border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 rounded-3xl border border-white/5" />
          <div className="absolute -top-2 md:-top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full" />
          <div className="absolute -bottom-2 md:-bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full" />
          <div className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full" />
          <div className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full" />
        </motion.div>
      )}

      <motion.div
        animate={floatingAnimation}
        whileHover={{ scale: interactive ? 1.08 : 1.05 }}
        whileTap={{ scale: interactive ? 0.98 : 0.95 }}
        className={`relative z-10 cursor-pointer ${className}`}
      >
        {rotate3D ? (
          <motion.div
            key={`rotate-${rotateDirection}`}
            animate={{
              rotateY: isHovered ? rotationAmount * 2 : rotationAmount,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{
              rotateY: {
                duration: isHovered ? 8 : 20,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 0.3,
              },
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={size}
              height={size}
              className="rounded-full shadow-2xl shadow-blue-500/20"
            />
          </motion.div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className="rounded-full shadow-2xl shadow-blue-500/20"
          />
        )}

        {/* Enhanced glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"
          animate={{
            scale: isHovered ? [1, 1.3, 1] : [1, 1.2, 1],
            opacity: isHovered ? [0.4, 0.7, 0.4] : [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: isHovered ? 2 : 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Particle effect on hover */}
        {isHovered && interactive && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: Math.cos((i * 60 * Math.PI) / 180) * 50,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 50,
                }}
                transition={{
                  duration: 0.8,
                  repeat: 1,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Box content */}
      {hasBox && boxContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
          viewport={{ once: true }}
          className="absolute -bottom-14 md:-bottom-16 left-1/2 transform -translate-x-1/2 w-56 md:w-64 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 md:p-4 shadow-2xl z-20"
        >
          <div className="text-center">{boxContent}</div>
          {/* Box arrow */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-black/60" />
        </motion.div>
      )}

      {/* Tooltip on hover */}
      {interactive && !hasBox && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          👆 Interactive
        </motion.div>
      )}
    </motion.div>
  );
}
