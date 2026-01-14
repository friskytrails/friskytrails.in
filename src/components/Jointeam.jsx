

import { useState } from "react"

const Jointeam = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    mobile: "",
    resume: null,
    message: "",
  })

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, resume: e.target.files[0] })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormData({
      name: "",
      email: "",
      position: "",
      mobile: "",
      resume: null,
      message: "",
    })

    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="z-100 p-2 flex flex-col w-full gap-3 sm:gap-4 md:gap-5">
      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Your Name*"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-3 sm:px-4 py-3 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm sm:text-base"
        required
      />

      {/* Mobile */}
      <input
        type="tel"
        name="mobile"
        placeholder="Your Mobile Number*"
        pattern="[6-9]{1}[0-9]{9}"
        maxLength="10"
        value={formData.mobile}
        onChange={handleChange}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm sm:text-base"
        required
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email Address*"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm sm:text-base"
        required
      />

      {/* Position */}
      <div className="w-full">
        <label className="text-gray-600 text-xs sm:text-sm pl-2 mb-1.5 block">Position Applying For*</label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm sm:text-base"
          required
        >
          <option value="" disabled>
            Select a position
          </option>
          <option value="Software Engineer / Senior Software Engineer">
            Software Engineer / Senior Software Engineer
          </option>
          <option value="Graphic Designer">Graphic Designer</option>
          <option value="Social Media">Social Media</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Travel Executive / Travel Consultant">Travel Executive / Travel Consultant</option>
        </select>
      </div>

      {/* Resume */}
      <div className="w-full">
        <label className="text-gray-600 text-xs sm:text-sm pl-2 mb-1.5 block">Attach Resume (PDF/DOC)*</label>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 text-xs sm:text-sm"
          required
        />
      </div>

      {/* Message */}
      <textarea
        name="message"
        placeholder="Add a cover letter here"
        value={formData.message}
        onChange={handleChange}
        className="w-full h-24 sm:h-28 md:h-32 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none text-sm sm:text-base"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 hover:scale-95 active:scale-90 transition-transform duration-150 py-3 sm:py-4 text-white rounded-full font-semibold text-base sm:text-lg md:text-xl"
      >
        Submit
      </button>
    </form>
  )
}

export default Jointeam
