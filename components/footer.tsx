"use client";

export default function Footer() {
  const currentYear = 2025;

  const contactInfo = {
    email: "lenlicht@gmail.com",
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: "/images/instagram.svg",
      url: "https://www.instagram.com/lenlenlen1233/",
      alt: "Instagram",
      handle: "@lenlenlen123",
    },
    {
      name: "YouTube",
      icon: "/images/youtube.svg",
      url: "https://youtube.com/@lenlicht",
      alt: "YouTube",
      handle: "@lenlicht",
    },
    {
      name: "Discord",
      icon: "/images/discord.svg",
      url: "https://discord.gg/your-invite",
      alt: "Discord",
      handle: "lenlicht",
    },
    {
      name: "X",
      icon: "/images/x.svg",
      url: "https://x.com/Len_licht",
      alt: "X",
      handle: "@Len_licht",
    },
  ];

  return (
    <footer className="bg-black border-t border-white/10 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content - Better balanced layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8">
          {/* Brand & Contact Info - Takes 2 columns on md, 1 on lg */}
          <div className="md:col-span-2 lg:col-span-1 text-center md:text-left">
            <div className="max-w-md md:max-w-none mx-auto md:mx-0">
              <h3 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Fallen Studio
              </h3>
              <p className="mt-3 text-gray-400 text-sm">
                Motion Graphics • Visual Effects • 3D Animation
              </p>

              {/* Contact Details - Better placement */}
              <div className="mt-6">
                <div className="inline-flex flex-col sm:flex-row items-center sm:items-start gap-2 text-gray-300 bg-white/5 rounded-lg p-4">
                  <span className="font-medium text-white">Contact:</span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-blue-300 transition-colors text-sm sm:text-base break-all"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media - Takes full width on md, 2 columns on lg */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6 text-white text-center md:text-left">
              Connect With Me
            </h4>

            {/* Social links in a responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group p-3 rounded-lg hover:bg-white/5"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors flex-shrink-0">
                    <img
                      src={social.icon}
                      alt={social.alt}
                      className="invert brightness-200 w-6 h-6"
                    />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="font-medium text-base truncate">
                      {social.name}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {social.handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider & Copyright - Cleaner without newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Len Licht — All Rights Reserved.
            </p>
            <p className="mt-2 text-xs text-gray-600">
              Crafting visual stories that inspire and transform
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
