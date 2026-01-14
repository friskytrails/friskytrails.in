import { useState, useEffect } from "react";
import { bookProduct } from "../api/booking.api";

const BookingModal = ({ productSlug, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    guest: "",
    mobile: "",
    message: "",
  });

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await bookProduct({ productSlug, ...formData });
      alert("Booking confirmed!");
      onClose();
    } catch (error) {
      alert(error.message || "Booking failed.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 px-4 backdrop-blur-sm bg-black/30"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Book Now</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name*"
            required
            className="border px-4 py-2 rounded-lg w-full"
          />

          {/* Mobile */}
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number*"
            pattern="[6-9]{1}[0-9]{9}"
            maxLength="10"
            required
            className="border px-4 py-2 rounded-lg w-full"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address*"
            required
            className="border px-4 py-2 rounded-lg w-full"
          />

          {/* Date & Guest */}
          <div className="flex gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="border px-4 py-2 rounded-lg w-1/2"
            />
            <input
              type="number"
              name="guest"
              value={formData.guest}
              onChange={handleChange}
              min="1"
              required
              placeholder="Guest Count"
              className="border px-4 py-2 rounded-lg w-1/2"
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write a Message"
            className="border px-4 py-2 rounded-lg w-full h-24 resize-none"
          ></textarea>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
