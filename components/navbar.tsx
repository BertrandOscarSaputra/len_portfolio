"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  function handleNavClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    setOpen(false);
    setActive(id);

    const el = document.getElementById(id);
    if (el) {
      const navHeight = document.querySelector("nav")?.clientHeight ?? 72;
      const offset =
        el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: offset, behavior: "smooth" });
    } else {
      window.location.hash = `#${id}`;
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-30">
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) =>
              handleNavClick(e as unknown as React.MouseEvent, "home")
            }
            className="flex items-center gap-3"
          >
            <Image
              src="/images/logo2.png"
              alt="Fallen Logo"
              width={36}
              height={36}
              className="object-contain scale-200 invert brightness-200" // makes the logo look bigger
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 text-lg">
            {LINKS.map((l) => (
              <li key={l.id}>
                <Link
                  href={`#${l.id}`}
                  onClick={(e) =>
                    handleNavClick(e as unknown as React.MouseEvent, l.id)
                  }
                  className={`relative px-1 py-1 transition-colors ${
                    active === l.id
                      ? "text-white"
                      : "text-gray-200 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden p-2 rounded-md text-2xl text-white/80 focus:ring-2 focus:ring-white/40"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed left-0 right-0 top-[64px] z-20 transition-all duration-300 transform ${
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-3 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-4 mt-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-lg">
          <ul className="flex flex-col gap-3 text-lg">
            {LINKS.map((l) => (
              <li key={l.id}>
                <Link
                  href={`#${l.id}`}
                  onClick={(e) =>
                    handleNavClick(e as unknown as React.MouseEvent, l.id)
                  }
                  className={`block rounded px-3 py-2 transition-colors ${
                    active === l.id
                      ? "bg-white/15 text-white"
                      : "text-gray-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
