import { Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="w-full bg-transparent">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-3">
        <img src={logo} alt="Steel Roofing" className="h-10 w-10 md:h-12 md:w-12" />
        <div className="text-center">
          <h1 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">Pinnacle Roofing</h1>
          <p className="text-xs text-white drop-shadow hidden sm:block">Every Time!</p>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
