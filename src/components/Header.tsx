import { useState, useEffect } from "react";
import { Facebook, Instagram, Maximize, Minimize } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Header = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const checkFullScreen = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", checkFullScreen);
    checkFullScreen(); // Initial check

    return () => {
      document.removeEventListener("fullscreenchange", checkFullScreen);
    };
  }, []);

  const toggleFullScreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        // Unlock orientation when exiting fullscreen
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      } else {
        await document.documentElement.requestFullscreen();
        // Lock to landscape when entering fullscreen
        if (screen.orientation && screen.orientation.lock) {
          try {
            await screen.orientation.lock('landscape');
          } catch (orientationError) {
            console.warn('Failed to lock orientation:', orientationError);
          }
        }
      }
    } catch (error) {
      console.error('Failed to toggle full screen:', error);
    }
  };

  return (
    <header className="w-full bg-transparent">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-6">
        <img src={logo} alt="Steel Roofing" className="h-10 md:h-12" />
        {/* <div className="text-center">
          <h1 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">Pinnacle Roofing</h1>
          <p className="text-xs text-white drop-shadow hidden sm:block">Every Time!</p>
        </div> */}

        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="https://www.facebook.com/share/15enKYqLZw/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fe6b35] hover:text-[#fe6b35]/90 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/pinnacleroofingmabati?utm_source=qr&igsh=ZjAzdHU0d3A2cWph"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fe6b35] hover:text-[#fe6b35]/90 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://www.tiktok.com/@pinnacleroofingmabati?_t=ZM-90eYwDLeFCa&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fe6b35] hover:text-[#fe6b35]/90 transition-colors"
            aria-label="TikTok"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
        </div>

        <button
          onClick={toggleFullScreen}
          className="text-[#fe6b35] hover:text-[#fe6b35]/90 transition-colors p-1 rounded-md hover:bg-[#fe6b35]/10"
          aria-label={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
        >
          {isFullScreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
