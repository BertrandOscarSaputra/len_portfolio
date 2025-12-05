"use client";

import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative text-white w-full min-h-screen overflow-hidden">
      {/* HEADER / HERO */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/portfolio.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50 z-[-1]" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="mt-4 text-2xl font-extrabold tracking-widest text-gray-200 font-bonheur sm:text-4xl md:text-5xl lg:text-6xl">
            Len Licht
          </h1>

          <p className="mt-6 text-lg max-w-3xl text-gray-300">
            Creating cinematic animations, dynamic visuals, and impactful motion
            graphics.
          </p>

          <button className="mt-10 px-8 py-3 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-200 transition">
            View Portfolio
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-6 bg-black relative">
        <GravityStarsBackground
          className="absolute inset-0"
          mouseGravity="attract"
          gravityStrength={100}
          starsInteraction={true}
        />

        <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>

        {/* BLOCK 1 — Avatar Left, Text Right */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto mb-20"
        >
          <Image
            src="/images/len_avatar.png"
            alt="Avatar 1"
            width={200}
            height={200}
            className="rounded-full rotate-y-180"
          />

          <p className="text-lg text-gray-300 md:text-left text-center">
            Hi! I’m a motion graphic designer specializing in cinematic visuals,
            animation, and creative storytelling. I create impactful visuals
            that connect with audiences.
          </p>
        </motion.div>

        {/* BLOCK 2 — Avatar Right, Text Left */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row-reverse items-center gap-10 max-w-5xl mx-auto"
        >
          <Image
            src="/images/len_avatar.png"
            alt="Avatar 2"
            width={200}
            height={200}
            className="rounded-full"
          />

          <p className="text-lg text-gray-300 md:text-right text-center">
            My work blends motion graphics, editing, and atmosphere-focused
            design to create strong emotional impact. I aim to turn ideas into
            immersive visual experiences.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
