import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { label: "Projects", href: "/#projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-30">
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo - Clicking this goes to home */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/invert_logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="object-contain scale-200 brightness-200"
            />
          </Link>

          {/* Desktop Links - No Home link here */}
          <ul className="hidden md:flex items-center gap-8 text-lg">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2 rounded-md text-2xl text-white/80"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
