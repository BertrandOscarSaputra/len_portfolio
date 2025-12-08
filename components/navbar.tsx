"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function LogoNavbar() {
  const pathname = usePathname();

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed top-6 left-6 z-50">
      <Link href="/" className="block" onClick={handleScrollToTop}>
        <motion.div
          whileHover={{ 
            scale: 1.1,
            filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5)) brightness(1.2)" 
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Image
            src="/images/invert_logo.png"
            alt="Fallen Studio Logo"
            width={36}
            height={36}
            className="object-contain brightness-200 transition-all duration-300"
          />
        </motion.div>
      </Link>
    </div>
  );
}