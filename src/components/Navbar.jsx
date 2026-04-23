import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Admodal from "../components/Admodal";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import Arrow from "../assets/arrow.svg";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Added for stable redirection
  const [showModal, setShowModal] = useState(false);
  const [showAdmodal, setShowAdmodal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showAdventures, setShowAdventures] = useState(false);

  const isLoggedIn = !!user;
  const storedFirstName = user?.name?.split(" ")[0] || user?.email?.split("@")[0] || "";

  const toggleAdmodal = () => setShowAdmodal(!showAdmodal);
  const toggleModal = () => setShowModal(!showModal);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleServices = () => {
    setShowServices((prev) => {
      if (!prev) setShowAdventures(false); // Close adventures if opening services
      return !prev;
    });
  };

  const toggleAdventures = () => {
    setShowAdventures((prev) => {
      if (!prev) setShowServices(false); // Close services if opening adventures
      return !prev;
    });
  };

  const handleScroll = () => {
    setShowModal(false);
    setShowAdmodal(false);
    setIsMenuOpen(false);
    setShowServices(false);
    setShowAdventures(false);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".relative") && !e.target.closest(".mobile-menu")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Reset all UI states
      setShowDropdown(false);
      setShowLogin(false);
      setIsMenuOpen(false);
      // Use navigate instead of window.location.href to prevent race conditions
      navigate("/"); 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNavigation = () => {
    setShowModal(false);
    setShowAdmodal(false);
    setIsMenuOpen(false);
    setShowServices(false);
    setShowAdventures(false);
    setShowDropdown(false);
  };

  return (
    <>
      {/* Global Layout Spacer - Account for Header (5vh/6vh) + Navbar (7.5vh/8vh) total height */}
      <div className="h-[12.5vh] lg:h-[14vh]" />
      
      <div className="fixed top-[5vh] lg:top-[6vh] left-0 right-0 z-[999] w-full">
        <div className="
          h-[7.5vh] lg:h-[8vh]            
          w-full bg-white
          border-none shadow-sm
          flex flex-col lg:flex-row 
          justify-between items-center
          px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12
        ">
          {/* Logo and Hamburger */}
          <div className="flex justify-between items-center w-full lg:w-auto h-full">
            <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-3 flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  className="h-12 xs:h-14 w-auto sm:h-12 md:h-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 object-contain flex-shrink-0"
                  src="/logo.webp"
                  alt="FriskyTrails Logo"
                  width="80"
                  height="80"
                  fetchPriority="high"
                />
              </Link>
              <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl font-bold tracking-tight whitespace-nowrap text-gray-800 flex-shrink-0">
                FriskyTrails
              </h2>
            </div>
            
            <button 
              onClick={toggleMenu} 
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors z-[1001] ml-2 sm:ml-4 flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <span className="text-xl sm:text-2xl font-bold">✕</span>
              ) : (
                <div className="space-y-1 w-5 sm:w-6">
                  <div className="w-full h-0.5 bg-black rounded"></div>
                  <div className="w-full h-0.5 bg-black rounded"></div>
                  <div className="w-full h-0.5 bg-black rounded"></div>
                </div>
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            <Link to="/" className="text-lg font-medium hover:text-amber-500 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-lg font-medium hover:text-amber-500 transition-colors">
              About
            </Link>
            <button
              onClick={toggleAdmodal}
              className="flex items-center gap-1 text-lg font-medium hover:text-amber-500 transition-colors group"
            >
              Adventures 
              <img 
                className={`w-4 h-4 transition-transform ${showAdmodal ? "-rotate-180" : ""}`} 
                src={Arrow} 
                alt="arrow" 
              />
            </button>
            {showAdmodal && <Admodal onClose={() => setShowAdmodal(false)} />}
            
            <button
              onClick={toggleModal}
              className="flex items-center gap-1 text-lg font-medium hover:text-amber-500 transition-colors group"
            >
              Services 
              <img 
                className={`w-4 h-4 transition-transform ${showModal ? "-rotate-180" : ""}`} 
                src={Arrow} 
                alt="arrow" 
              />
            </button>
            {showModal && <Modal onClose={() => setShowModal(false)} />}
            
            <Link to="/blog" className="text-lg font-medium hover:text-amber-500 transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-lg font-medium hover:text-amber-500 transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 text-base font-semibold text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-all"
                >
                  <FaUser className="text-lg" />
                  Hi, {storedFirstName}
                  <FaChevronDown className="text-sm transition-transform" style={{ transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[1000] py-2 overflow-hidden">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold px-7 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[1001] lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-[85vw] max-w-sm bg-white shadow-2xl z-[1002] transform transition-transform duration-300 ease-in-out overflow-y-auto lg:hidden mobile-menu ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-end items-center mb-8 pt-2">
        
            <button
              onClick={toggleMenu}
              className="text-3xl  font-bold text-gray-500 hover:text-black "
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 space-y-2 text-lg font-medium">
            <Link
              to="/"
              onClick={handleNavigation}
              className="block p-4 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={handleNavigation}
              className="block p-4 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all"
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div>
              <button
                onClick={toggleServices}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all"
              >
                <span>Services</span>
                <img
                  src={Arrow}
                  alt="arrow"
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                    showServices ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {showServices && (
                <div className="mt-2 space-y-2 pl-6 border-l-2 border-amber-300">
                  <Link to="/services/holidays" onClick={handleNavigation} className="block p-3 text-base hover:bg-amber-100 rounded-lg">
                    Holidays
                  </Link>
                  <Link to="/services/flights" onClick={handleNavigation} className="block p-3 text-base hover:bg-amber-100 rounded-lg">
                    Flights
                  </Link>
                  <Link to="/services/activities" onClick={handleNavigation} className="block p-3 text-base hover:bg-amber-100 rounded-lg">
                    Activities
                  </Link>
                  <Link to="/services/rail-tickets" onClick={handleNavigation} className="block p-3 text-base hover:bg-amber-100 rounded-lg">
                    Rail Tickets
                  </Link>
                  <Link to="/services/hotels" onClick={handleNavigation} className="block p-3 text-base hover:bg-amber-100 rounded-lg">
                    Hotels
                  </Link>
                  <Link to="/services/bus-tickets" onClick={handleNavigation} className="block p-3 text-base hover:bg-amber-100 rounded-lg">
                    Bus Tickets
                  </Link>
                  <Link to="/services/transport" onClick={handleNavigation} className="block p-3 text-base hover:bg-amber-100 rounded-lg">
                    Cab Service
                  </Link>
                </div>
              )}
            </div>

            {/* Adventures Dropdown */}
            <div>
              <button
                onClick={toggleAdventures}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all"
              >
                <span>Adventures</span>
                <img
                  src={Arrow}
                  alt="arrow"
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                    showAdventures ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {showAdventures && (
                <div className="mt-2 space-y-4 pl-6 border-l-2 border-amber-300">
                  <div>
                    <h3 className="text-amber-600 font-bold mt-4 mb-2 px-2">Aerial Activities</h3>
                    <div className="space-y-2">
                      <Link to="/services/aerial/paragliding" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Paragliding</Link>
                      <Link to="/services/aerial/paramotoring" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Paramotoring</Link>
                      <Link to="/services/aerial/hot-air-balloon" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Hot Air Balloon</Link>
                      <Link to="/services/aerial/hummerchute-ride" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Hummerchute Ride</Link>
                      <Link to="/services/aerial/skydiving" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Skydiving</Link>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-amber-600 font-bold mt-4 mb-2 px-2">Water Activities</h3>
                    <div className="space-y-2">
                      <Link to="/services/water/scuba-diving" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Scuba Diving</Link>
                      <Link to="/services/water/kayaking" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Kayaking</Link>
                      <Link to="/services/water/boating" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Boating</Link>
                      <Link to="/services/water/flyboarding" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Flyboarding</Link>
                      <Link to="/services/water/surfing" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Surfing</Link>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-amber-600 font-bold mt-4 mb-2 px-2">Land Activities</h3>
                    <div className="space-y-2">
                      <Link to="/services/land/trekking" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Trekking</Link>
                      <Link to="/services/land/camping" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Camping</Link>
                      <Link to="/services/land/bungee-jumping" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Bungee Jumping</Link>
                      <Link to="/services/land/bike-trips" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">Bike Trips</Link>
                      <Link to="/services/land/atv-ride" onClick={handleNavigation} className="block p-3 text-sm hover:bg-amber-100 rounded-lg">ATV Ride</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/blog"
              onClick={handleNavigation}
              className="block p-4 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              onClick={handleNavigation}
              className="block p-4 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all"
            >
              Contact Us
            </Link>

            {/* Login/Logout Section */}
            {isLoggedIn ? (
              <div className="px-4 mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full py-3.5 flex items-center justify-center gap-2 rounded-2xl text-lg font-bold text-red-600 bg-red-50 active:bg-red-100 transition-all duration-200 shadow-sm"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-4 mt-6">
                <button
                  onClick={() => {
                    handleNavigation();
                    setShowLogin(true);
                  }}
                  className="w-full py-3 text-center rounded-xl text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg active:scale-95 transition-all duration-200"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && <LoginModal onClose={handleLoginClose} />}
    </>
  );
};

export default Navbar;