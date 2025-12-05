import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import CurvedLoop from "@/components/CurvedLoop";

export default function Home() {
  return (
    <div className="relative text-white w-full min-h-screen overflow-hidden">
      {/* HEADER / HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* ⭐ STAR BACKGROUND */}

        {/* 🎥 VIDEO BACKGROUND */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/main.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50 z-[-1]" />

        {/* HERO CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <CurvedLoop
            marqueeText="Welcome ✦ to ✦ Len's ✦ Lair ✦  "
            speed={2}
            curveAmount={500}
            direction="left"
            interactive={true}
            className="custom-text-style"
          />

          <h2 className="mt-4 text-2xl font-light tracking-widest text-gray-200">
            Motion Graphic Designer
          </h2>

          <p className="mt-6 text-lg max-w-3xl text-gray-300">
            Creating cinematic animations, dynamic visuals, and impactful motion
            graphics.
          </p>

          <button className="mt-10 px-8 py-3 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-200 transition">
            View Portfolio
          </button>
        </div>
      </section>

      {/* SECTION BELOW VIDEO */}
      <section className="py-20 px-6 bg-black">
        <GravityStarsBackground
          className="absolute inset-0 "
          mouseGravity="attract"
          gravityStrength={100}
          starsInteraction={true}
        />
        <h2 className="text-4xl font-bold mb-6 text-center">About Me</h2>

        <p className="text-lg max-w-3xl mx-auto text-center text-gray-300">
          Hi! I&apos;m a motion graphic designer specializing in high-impact
          visuals, animation, and creative storytelling. I transform ideas into
          compelling visual experiences that engage and inspire audiences.
        </p>
      </section>
    </div>
  );
}
