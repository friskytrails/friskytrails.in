import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen py-2 px-4 mt-30 md:mb-[-250px] sm:px-6 md:px-12 lg:px-20">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 sm:gap-16">
        
        {/* Left Section */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-6">
            Coming Soon...
          </h1>
          
          <p className="text-gray-700 text-base sm:text-base md:text-lg mb-8 sm:mb-8 leading-relaxed">
            For tour-related inquiries, please feel free to contact us through the following methods:
          </p>

          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-4 mb-10 sm:mb-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-800" />
                <span className="font-bold text-gray-800">
                  Call Us for details :
                </span>
              </div>
              <div className="flex items-center gap-2 ml-7 sm:ml-0">
                <span className="bg-gradient-to-r text-gray-700 font-semibold">
                  +91-75015 16714
                </span>
                <span className="bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 bg-clip-text text-transparent font-bold">
                  (Toll Free)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-800" />
                <span className="font-bold text-gray-800">
                  Mail Us for details :
                </span>
              </div>
              <a
                href="mailto:holiday@kesari.in"
                className=" font-semibold text-gray-700 hover:underline ml-7 sm:ml-0"
              >
                contact@friskytrails.in
              </a>
            </div>
          </div>

          {/* Enquire Button */}
          <Link to="/contact">
  <button className="px-7 py-3 border border-transparent bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 text-white font-semibold rounded hover:opacity-90 transition-colors">
    Enquire Now
  </button>
</Link>

        </div>

        {/* Right Section - Image */}
        <div className="flex-1 flex justify-center mt-8 lg:mt-0">
          <img 
            src="/NotFound.png"
            alt="Travelers with map"
            className="w-80 sm:w-96 md:w-full max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-16 sm:mt-10 pt-8 border-t border-gray-100">
        <p className="text-sm md:text-base leading-relaxed">
          <span className="font-bold">Please Note : </span>
          <span className="text-gray-700 font-semibold">
            The Prices shown are reference pricing and based on previous foreign exchange rates.
            The Exact Foreign Exchange rate will be applicable at the time of booking.
            The Tour price may vary.
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
