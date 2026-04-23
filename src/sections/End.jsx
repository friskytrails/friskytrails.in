import Smallbox from "./Smallbox";
import Facebook from "../assets/facebook.svg";
import Linkedin from "../assets/linkedin.svg";
import Twitter from "../assets/twitter.svg";
import Instagram from "../assets/instagram.svg";
import { Link } from "react-router-dom";

const End = () => {
  return (
    <>
      {/* Desktop & larger screens (XL and up) */}
      <div className="hidden xl:block">
        <div className="w-full bg-[rgb(10,3,34)] relative flex justify-center items-center py-16">
          <div className="max-w-screen-xl w-full px-6">
            {/* Use a responsive grid: 1 col on small, 3 cols on xl */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 border-y border-gray-500 py-8 place-items-start">
              {/* LEFT COLUMN */}
              <div className="w-full">
                <div className="flex items-center gap-4">
                  <img className="h-20 w-20 bg-white rounded-full object-cover" src="/logo.webp" alt="FriskyTrails Logo" />
                  <h2 className="text-3xl font-bold text-white">FriskyTrails</h2>
                </div>

                <h3 className="text-gray-400 font-semibold mt-6">
                  Uttarapan Market Complex, G15, Hill Cart Rd, opposite of Biswadeep Cinema Hall, Ward 1, Patiram Jote,
                  Siliguri, West Bengal 734001
                </h3>

                <div className="mt-6 space-y-2">
                  <h3 className="text-gray-400 font-bold">
                    <a href="tel:+917877979193" className="hover:text-white transition-colors">+91-78779 79193</a>
                  </h3>
                  <h3 className="text-gray-400 font-bold">
                    <a href="mailto:contact@friskytrails.in" className="hover:text-white transition-colors">contact@friskytrails.in</a>
                  </h3>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <a href="https://www.facebook.com/friskytrailscommunity/" target="_blank" rel="noopener noreferrer">
                    <img className="w-8 h-8 object-cover bg-white rounded-lg" src={Facebook || "/placeholder.svg"} alt="facebook" />
                  </a>
                  <a href="https://x.com/frisky_trails" target="_blank" rel="noopener noreferrer">
                    <img className="w-8 h-8 object-cover bg-white rounded-lg" src={Twitter || "/placeholder.svg"} alt="twitter" />
                  </a>
                  <a href="https://www.linkedin.com/company/friskytrailsofficial/" target="_blank" rel="noopener noreferrer">
                    <img className="w-8 h-8 object-cover bg-white rounded-lg" src={Linkedin || "/placeholder.svg"} alt="linkedin" />
                  </a>
                  <a href="https://www.instagram.com/friskytrails/" target="_blank" rel="noopener noreferrer">
                    <img className="w-8 h-8 object-cover bg-white rounded-lg" src={Instagram || "/placeholder.svg"} alt="instagram" />
                  </a>
                </div>
              </div>

              {/* MIDDLE COLUMN */}
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-white text-3xl font-semibold">Short Links</h2>
                    <div className="mt-6 space-y-4">
                      {[
                        { text: "About Us", path: "/about" },
                        { text: "Adventures", path: "/adventures" },
                        { text: "Services", path: "/services/holidays" },
                        { text: "Reviews", path: "/reviews" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="gray">
                            <path
                              d="M9 6C9 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <Link to={item.path} onClick={() => window.scrollTo(0, 0)}>
                            <h3 className="text-gray-400 font-semibold hover:text-white">{item.text}</h3>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-white text-3xl font-semibold">Quick Links</h2>
                    <div className="mt-6  space-y-4">
                      {[
                        { text: "Contact Us", path: "/contact" },
                        { text: "Blogs", path: "/blog" },
                        { text: "Hiring", path: "/hiring" },
                        { text: "Partner with Us", path: "/partner" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="gray">
                            <path
                              d="M9 6C9 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <Link to={item.path} onClick={() => window.scrollTo(0, 0)}>
                            <h3 className="text-gray-400 font-semibold hover:text-white">{item.text}</h3>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="w-full">
                <h2 className="text-white text-3xl font-semibold">Travel Destinations</h2>

                {/* Make the destinations grid responsive: 2 cols on md, 3 cols on lg/xl */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3  gap-4">
                  <Smallbox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet (below XL) */}
      <div className="xl:hidden h-auto w-full bg-[rgb(10,3,34)] px-3 sm:px-4 md:px-6 py-6 md:py-8 text-white">
        {/* Travel Destinations Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">Travel Destinations</h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 md:h-full md:w-full gap-2 sm:gap-3 mt-3 md:mt-4">
            <Smallbox />
          </div>
        </div>

        {/* Short Links Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">Short Links</h2>
          <div className="flex justify-center items-start mt-3 md:mt-4 gap-8 sm:gap-10 md:gap-16">
            <div className="flex flex-col gap-3 sm:gap-4">
              <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                <h3 className="text-gray-400 font-semibold text-sm sm:text-base hover:text-white transition-colors">
                  About Us
                </h3>
              </Link>
              <Link to="/adventures" onClick={() => window.scrollTo(0, 0)}>
                <h3 className="text-gray-400 font-semibold text-sm sm:text-base hover:text-white transition-colors">
                  Adventures
                </h3>
              </Link>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <Link to="/services/holidays" onClick={() => window.scrollTo(0, 0)}>
                <h3 className="text-gray-400 font-semibold text-sm sm:text-base hover:text-white transition-colors">
                  Services
                </h3>
              </Link>
              <Link to="/reviews" onClick={() => window.scrollTo(0, 0)}>
                <h3 className="text-gray-400 font-semibold text-sm sm:text-base hover:text-white transition-colors">
                  Reviews
                </h3>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">Quick Links</h2>
          <div className="flex justify-center items-start mt-3 md:mt-4 gap-8 sm:gap-10 md:gap-16">
            <div className="flex  ml-10 flex-col gap-3 sm:gap-4">
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                <h3 className="text-gray-400 font-semibold text-sm sm:text-base hover:text-white transition-colors">
                  Contact Us
                </h3>
              </Link>
              <Link to="/blog" onClick={() => window.scrollTo(0, 0)}>
                <h3 className="text-gray-400 font-semibold text-sm sm:text-base hover:text-white transition-colors">
                  Blogs
                </h3>
              </Link>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <Link to="/hiring" onClick={() => window.scrollTo(0, 0)}>
                <h3 className="text-gray-400 font-semibold text-sm sm:text-base hover:text-white transition-colors">
                  Hiring
                </h3>
              </Link>
              <Link to="/partner" onClick={() => window.scrollTo(0, 0)}>
                <h3 className="text-gray-400 font-semibold text-sm sm:text-base hover:text-white transition-colors">
                  Partner With Us
                </h3>
              </Link>
            </div>
          </div>
        </div>

        {/* Company Info Section */}
        <div>
          <div className="flex mt-6 md:mt-8 justify-center items-center gap-2">
            <img
              className="h-8 sm:h-10 w-8 sm:w-10 bg-white rounded-full object-cover"
              src="/logo.webp"
              alt="FriskyTrails Logo"
            />
            <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-white">FriskyTrails</h2>
          </div>
          <h3 className="text-gray-400 font-semibold mt-3 md:mt-4 text-center text-xs sm:text-sm md:text-base px-1">
            Uttarapan Market Complex, G15, Hill Cart Rd, opposite of Biswadeep Cinema Hall, Ward 1, Patiram Jote,
            Siliguri, West Bengal 734001
          </h3>
          <div className="email mt-3 md:mt-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 md:gap-10">
            <h3 className="text-gray-400 font-bold text-xs sm:text-sm md:text-base">
              <a href="mailto:contact@friskytrails.in" className="hover:text-white transition-colors">contact@friskytrails.in</a>
            </h3>
            <h3 className="text-gray-400 font-bold text-xs sm:text-sm md:text-base">
              <a href="tel:+917877979193" className="hover:text-white transition-colors">+91-78779 79193</a>
            </h3>
          </div>
          <div className="images mt-4 md:mt-6 flex justify-center items-center gap-3 sm:gap-4">
            <a href="https://www.facebook.com/friskytrailscommunity/" target="_blank" rel="noopener noreferrer">
              <img
                className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 object-cover bg-white rounded-lg hover:opacity-80 transition-opacity"
                src={Facebook || "/placeholder.svg"}
                alt="Facebook"
              />
            </a>
            <a href="https://x.com/frisky_trails" target="_blank" rel="noopener noreferrer">
              <img
                className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 object-cover bg-white rounded-lg hover:opacity-80 transition-opacity"
                src={Twitter || "/placeholder.svg"}
                alt="Twitter"
              />
            </a>
            <a href="https://www.linkedin.com/company/friskytrailsofficial/" target="_blank" rel="noopener noreferrer">
              <img
                className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 object-cover bg-white rounded-lg hover:opacity-80 transition-opacity"
                src={Linkedin || "/placeholder.svg"}
                alt="LinkedIn"
              />
            </a>
            <a href="https://www.instagram.com/friskytrails/" target="_blank" rel="noopener noreferrer">
              <img
                className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 object-cover bg-white rounded-lg hover:opacity-80 transition-opacity"
                src={Instagram || "/placeholder.svg"}
                alt="Instagram"
              />
            </a>
          </div>
        </div>

        <div className="bg-white mt-4 md:mt-6 h-0.5 w-full opacity-20"></div>
      </div>
    </>
  );
};

export default End;
