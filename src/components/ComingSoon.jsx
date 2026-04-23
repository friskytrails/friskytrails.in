import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div
      className="
        min-h-screen
        px-4 py-10
        sm:px-6
        md:px-12
        lg:px-20
        bg-[#fbf7ec]
        flex flex-col
      "
    >
      {/* MAIN CONTENT (vertically centered on tall screens) */}
      <div className="flex-1 flex items-center">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Left Section */}
            <div className="flex-1 max-w-xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Coming Soon...
              </h1>

              <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
                We are currently working hard to bring you new and exciting adventures. 
                Our team is busy crafting perfect experiences for your next journey.
              </p>

              {/* Contact Info */}
              <div className="space-y-5 mb-10">
                
                {/* Phone */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-800" />
                    <span className="font-bold text-gray-800">
                      Inquiries :
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-2">
                    <a href="tel:+917877979193" className="text-gray-700 font-semibold hover:text-amber-600 transition-colors">
                      +91-78779 79193
                    </a>
                  </div>
                </div>

                {/* Mail */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-800" />
                    <span className="font-bold text-gray-800">
                      Email :
                    </span>
                  </div>
                  <a
                    href="mailto:contact@friskytrails.in"
                    className="font-semibold text-gray-700 hover:underline sm:ml-2"
                  >
                    contact@friskytrails.in
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Link to="/">
                  <button className="px-7 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition shadow-lg">
                    Explore Home
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="px-7 py-3 bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 text-white font-semibold rounded-md hover:opacity-90 transition shadow-lg">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="flex-1 flex justify-center">
              <img
                src="/NotFound.webp"
                alt="Coming Soon"
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg object-contain opacity-80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="mt-16 pt-8 border-t border-gray-200 max-w-5xl">
        <p className="text-sm md:text-base leading-relaxed text-gray-800">
          <span className="font-bold">Stay Tuned! </span>
          <span className="font-semibold text-gray-600">
            We are launching some amazing tours and features soon. Follow us on social media for updates.
          </span>
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
