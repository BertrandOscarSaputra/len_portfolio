import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold tracking-wide">Fallen Studio</h3>
          <p className="mt-3 text-gray-400 text-sm">
            Motion Graphics • Visual Effects • 3D Animation
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Projects</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Me</h4>

          <ul className="flex md:flex-col justify-center md:justify-start gap-4 md:gap-3 text-gray-400 text-lg">
            {/* Discord */}
            <li className="hover:text-white cursor-pointer flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/images/discord.svg"
                  alt="Discord"
                  width={20}
                  height={20}
                  className="invert brightness-200 w-5 h-5"
                />
              </div>
              Discord
            </li>

            {/* X / Twitter */}
            <li className="hover:text-white cursor-pointer flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/images/x.svg"
                  alt="X (Twitter)"
                  width={20}
                  height={20}
                  className="invert brightness-200 w-5 h-5"
                />
              </div>
              X
            </li>

            {/* Instagram */}
            <li className="hover:text-white cursor-pointer flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/images/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="invert brightness-200 w-5 h-5"
                />
              </div>
              Instagram
            </li>

            {/* YouTube */}
            <li className="hover:text-white cursor-pointer flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/images/youtube.svg"
                  alt="YouTube"
                  width={20}
                  height={20}
                  className="invert brightness-200 w-5 h-5"
                />
              </div>
              YouTube
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} Fallen Studio — All Rights Reserved.
      </div>
    </footer>
  );
}
