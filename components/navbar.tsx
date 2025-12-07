"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    // Close menu on escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    setIsMounted(true);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Scroll to footer/contact section
  const scrollToFooter = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const footer = document.querySelector("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo with glow effect */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            {/* Glow container */}
            <div className="relative">
              {/* Outer glow ring - hidden by default, shows on hover */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/30 group-hover:via-purple-500/30 group-hover:to-blue-500/30 blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100" />

              {/* Inner glow ring - more subtle */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-blue-400/0 group-hover:from-blue-400/20 group-hover:via-purple-400/20 group-hover:to-blue-400/20 blur-md transition-all duration-300 opacity-0 group-hover:opacity-100" />

              {/* Logo image with brightness and scale animation */}
              <div className="relative">
                <Image
                  src="/images/invert_logo.png"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="object-contain scale-200 brightness-200 group-hover:brightness-300 group-hover:scale-210 transition-all duration-300"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 text-lg">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-gray-200 hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {/* Desktop Contact Link that scrolls to footer */}
            <li>
              <button
                onClick={scrollToFooter}
                className="text-gray-200 hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-2xl text-white/80 hover:text-white transition-colors menu-button"
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay and Panel wrapped in AnimatePresence */}
      <AnimatePresence mode="wait">
        {isMenuOpen && isMounted && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              key="menu-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-lg border-l border-white/10 z-40 mobile-menu"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                {/* Mobile Navigation Links with horizontal dividers */}
                <ul className="space-y-0">
                  <li>
                    <Link
                      href="/"
                      className="block py-5 text-xl text-white hover:text-blue-300 transition-colors border-b border-white/10"
                      onClick={handleLinkClick}
                    >
                      Home
                    </Link>
                  </li>

                  {LINKS.map((l, index) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="block py-5 text-xl text-gray-300 hover:text-white transition-colors border-b border-white/10"
                        onClick={handleLinkClick}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}

                  {/* Contact Link */}
                  <li>
                    <button
                      onClick={scrollToFooter}
                      className="block w-full text-left py-5 text-xl text-gray-300 hover:text-white transition-colors cursor-pointer border-b border-white/10"
                    >
                      Contact
                    </button>
                  </li>
                </ul>

                {/* Empty space for better spacing */}
                <div className="flex-grow" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
