import { useState, useRef, useEffect } from "react";

const Popupform = ({ onClose }) => {
  const modalRef = useRef();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    guest: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      email: "",
      date: "",
      guest: "",
      mobile: "",
      message: "",
    });
    onClose();
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3"
    >
      {/* Modal Box */}
      <div className="relative w-full max-w-[92vw] sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute  right-1 h-8 w-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition"
        >
          ✕
        </button>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 px-4 py-5 sm:px-6 sm:py-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Your Mobile Number"
            pattern="[6-9]{1}[0-9]{9}"
            maxLength="10"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={handleChange}
              className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
            />

            <input
              type="number"
              name="guest"
              placeholder="Traveller Count"
              value={formData.guest}
              onChange={handleChange}
              className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <textarea
            name="message"
            placeholder="Write a Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full min-h-[96px] px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 hover:brightness-110 active:scale-95 transition-transform duration-150 py-3.5 sm:py-4 text-white rounded-full font-semibold text-base sm:text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popupform;
