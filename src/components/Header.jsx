import { Mail, Phone } from "lucide-react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaXTwitter 
} from "react-icons/fa6";

const Header = () => {
  return (
    <>
      {/* Desktop / Tablet Header - Restored Original Style with New Logos */}
      <div className="fixed hidden md:flex top-0 z-[1000] h-[5vh] lg:h-[6vh] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 w-full justify-between items-center px-8 xl:px-12 ">
        <div className="flex z-50 items-center gap-4 xl:gap-6">
          <div className="flex z-50 items-center gap-1.5 xl:gap-2">
            <Mail className="w-4 h-4 xl:w-5 xl:h-5 text-white" />
            <a href="mailto:contact@friskytrails.in" className="text-white text-xs xl:text-sm font-medium whitespace-nowrap">
              contact@friskytrails.in
            </a>
          </div>
          <div className="hidden md:block h-4 xl:h-5 border-l border-white/40" />
          <div className="flex items-center gap-1.5 xl:gap-2">
            <Phone className="w-4 h-4 xl:w-5 xl:h-5 text-white" />
            <a href="tel:+917877979193" className="text-white text-xs xl:text-sm font-medium whitespace-nowrap">
              +91-78779 79193
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 xl:gap-4">
          <span className="text-white text-xs xl:text-sm font-medium hidden lg:inline">Follow Us:</span>
          <div className="flex items-center gap-1.5 xl:gap-3">
            <a href="https://www.instagram.com/friskytrails/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <FaInstagram className="text-white w-4 h-4 xl:w-5 xl:h-5" />
            </a>
            <div className="h-4 xl:h-5 border-l border-white/40" />
            <a href="https://x.com/frisky_trails" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <FaXTwitter className="text-white w-4 h-4 xl:w-5 xl:h-5" />
            </a>
            <div className="h-4 xl:h-5 border-l border-white/40" />
            <a href="https://www.linkedin.com/company/friskytrailsofficial/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <FaLinkedinIn className="text-white w-4 h-4 xl:w-5 xl:h-5" />
            </a>
            <div className="h-4 xl:h-5 border-l border-white/40" />
            <a href="https://www.facebook.com/friskytrailscommunity/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <FaFacebookF className="text-white w-4 h-4 xl:w-5 xl:h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Header - Restored Original Style with New Logos */}
      <div className="fixed md:hidden flex h-[5vh] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 z-[1000] w-full justify-between items-center px-4 py-1">
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-white" />
          <a href="tel:+917877979193" className="text-white text-[10px] xs:text-xs font-semibold whitespace-nowrap">
            +91-78779 79193
          </a>
        </div>

        <div className="flex items-center gap-1.5">
          <a href="https://www.instagram.com/friskytrails/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 hover:scale-110 transition-transform">
            <FaInstagram className="text-white w-3.5 h-3.5" />
          </a>
          <div className="h-3.5 border-l border-white/40 mx-0.5" />
          <a href="https://x.com/frisky_trails" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 hover:scale-110 transition-transform">
            <FaXTwitter className="text-white w-3.5 h-3.5" />
          </a>
          <div className="h-3.5 border-l border-white/40 mx-0.5" />
          <a href="https://www.linkedin.com/company/friskytrailsofficial/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 hover:scale-110 transition-transform">
            <FaLinkedinIn className="text-white w-3.5 h-3.5" />
          </a>
          <div className="h-3.5 border-l border-white/40 mx-0.5" />
          <a href="https://www.facebook.com/friskytrailscommunity/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 hover:scale-110 transition-transform">
            <FaFacebookF className="text-white w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
