import { useEffect, useState } from "react";
import { hotelBooking } from "../api/hotel.api";
import { useAuth } from "../context/AuthContext";

const HotelForm = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    city: "",
    property: "",
    checkInDate: "",
    checkOutDate: "",
    guests: "",
    budget: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  // Prevent background body scroll when popup is active
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showPopup]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await hotelBooking(formData);
      if (response.success) {
        alert("Hotel booked successfully!");
      } else {
        alert("Failed to book hotel.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (!user && !errorMessage) {
        alert("Please login first");
      } else {
        alert(errorMessage || "An error occurred. Please try again.");
      }
    }
    
    setFormData({
      city: "",
      property: "",
      checkInDate: "",
      checkOutDate: "",
      guests: "",
      budget: ""
    });
    setShowPopup(false);
  };

  const labels = {
    city: "City",
    property: "Property",
    checkInDate: "Check-In",
    checkOutDate: "Check-Out",
    guests: "Guests",
    budget: "₹ Budget"
  };

  return (
    <>
      {/* 🎯 LG+ SINGLE ROW - Sticks to Banner Bottom */}
      <div className="hidden lg:block relative -mt-24 lg:-mt-20 xl:-mt-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-4 lg:p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-3 lg:gap-4">
              {/* 1. City */}
              <div className="col-span-1">
                <label className="block text-xs lg:text-sm font-semibold mb-1 text-gray-700 text-center">{labels.city}</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  placeholder="City"
                  onChange={handleChange}
                  className="w-full p-2 lg:p-3 text-xs lg:text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100/50 transition-all"
                  required
                />
              </div>

              {/* 2. Property */}
              <div className="col-span-1">
                <label className="block text-xs lg:text-sm font-semibold mb-1 text-gray-700 text-center">{labels.property}</label>
                <input
                  type="text"
                  name="property"
                  value={formData.property}
                  placeholder="Hotel"
                  onChange={handleChange}
                  className="w-full p-2 lg:p-3 text-xs lg:text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100/50 transition-all"
                  required
                />
              </div>

              {/* 3. Check-In */}
              <div className="col-span-1">
                <label className="block text-xs lg:text-sm font-semibold mb-1 text-gray-700 text-center">{labels.checkInDate}</label>
                <input
                  type="date"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-2 lg:p-3 text-xs lg:text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100/50 transition-all"
                  required
                />
              </div>

              {/* 4. Check-Out */}
              <div className="col-span-1">
                <label className="block text-xs lg:text-sm font-semibold mb-1 text-gray-700 text-center">{labels.checkOutDate}</label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-2 lg:p-3 text-xs lg:text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100/50 transition-all"
                  required
                />
              </div>

              {/* 5. Guests */}
              <div className="col-span-1">
                <label className="block text-xs lg:text-sm font-semibold mb-1 text-gray-700 text-center">{labels.guests}</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  placeholder="2"
                  onChange={handleChange}
                  min="1"
                  className="w-full p-2 lg:p-3 text-xs lg:text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100/50 transition-all"
                  required
                />
              </div>

              {/* 6. BOOK BUTTON */}
              <div className="col-span-1 flex flex-col justify-end">
                <label className="block text-xs lg:text-sm font-semibold mb-1 invisible">Book</label>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white p-2 lg:p-3 rounded-xl font-bold text-xs lg:text-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-1 transition-all duration-200"
                >
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  BOOK
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 📱 MD/SM BUTTON */}
      <div className="lg:hidden relative -mt-12 md:-mt-10 z-20">
        <div className="max-w-2xl mb-4 mx-auto px-4 sm:px-6">
          <button
            onClick={() => setShowPopup(true)}
            className="max-w-sm mx-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 px-6 rounded-2xl font-bold text-base shadow-2xl flex items-center justify-center gap-2 border border-white/30 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Book My Stay
          </button>
        </div>
      </div>

      {/* 🚀 SUPER RESPONSIVE POPUP FORM */}
      {showPopup && (
        <div className="lg:hidden fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowPopup(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full sm:max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] transition-transform duration-300 transform translate-y-0">
            
            {/* Grabber for Mobile UI feel */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 sm:hidden" />

            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
                <span className="bg-orange-100 p-2 rounded-lg">🏨</span>
                Book Hotel
              </h2>
              <button
                onClick={() => setShowPopup(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <span className="text-2xl font-light">&times;</span>
              </button>
            </div>

            {/* Scrollable Form Area */}
            <div className="p-6 overflow-y-auto overflow-x-hidden">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Row 1: City & Property */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">{labels.city}</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      placeholder="e.g. Delhi"
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50 transition-all outline-none font-semibold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">{labels.property}</label>
                    <input
                      type="text"
                      name="property"
                      value={formData.property}
                      placeholder="e.g. Taj Hotel"
                      onChange={handleChange}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50 transition-all outline-none font-semibold"
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">{labels.checkInDate}</label>
                    <input
                      type="date"
                      name="checkInDate"
                      value={formData.checkInDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-orange-400 transition-all outline-none text-sm font-semibold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">{labels.checkOutDate}</label>
                    <input
                      type="date"
                      name="checkOutDate"
                      value={formData.checkOutDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-orange-400 transition-all outline-none text-sm font-semibold"
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Guests & Budget */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">{labels.guests}</label>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      placeholder="2"
                      onChange={handleChange}
                      min="1"
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-orange-400 transition-all outline-none font-bold"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">{labels.budget}</label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      placeholder="Budget"
                      onChange={handleChange}
                      min="0"
                      step="1000"
                      className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-orange-400 transition-all outline-none font-bold"
                    />
                  </div>
                </div>

                {/* Submit Container */}
                <div className="pt-4 pb-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-orange-100 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    BOOK HOTEL
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelForm;
