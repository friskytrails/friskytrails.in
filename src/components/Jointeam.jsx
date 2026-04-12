

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
    <div className="flex flex-col w-full p-4 sm:p-6 md:p-8">
      {/* Form Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Join Our Team</h2>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Fill out the form below and we'll get back to you soon.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 w-full">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-700 text-sm font-medium pl-1">Full Name*</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-gray-50/50"
            required
          />
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mobile */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-sm font-medium pl-1">Mobile Number*</label>
            <input
              type="tel"
              name="mobile"
              placeholder="e.g. 9876543210"
              pattern="[6-9]{1}[0-9]{9}"
              maxLength="10"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-gray-50/50"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-700 text-sm font-medium pl-1">Email Address*</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-gray-50/50"
              required
            />
          </div>
        </div>

        {/* Position */}
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-700 text-sm font-medium pl-1">Position Applying For*</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-gray-50/50 appearance-none cursor-pointer"
            required
          >
            <option value="" disabled>Select a position</option>
            <option value="Software Engineer / Senior Software Engineer">Software Engineer / Senior Software Engineer</option>
            <option value="Graphic Designer">Graphic Designer</option>
            <option value="Social Media">Social Media</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Travel Executive / Travel Consultant">Travel Executive / Travel Consultant</option>
          </select>
        </div>

        {/* Resume */}
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-700 text-sm font-medium pl-1">Attach Resume (PDF/DOC)*</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-gray-50/50 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
            required
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-700 text-sm font-medium pl-1">Cover Letter / Message</label>
          <textarea
            name="message"
            placeholder="Tell us a bit about yourself..."
            value={formData.message}
            onChange={handleChange}
            className="w-full h-24 sm:h-32 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all bg-gray-50/50 resize-none overflow-y-auto"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[rgb(255,99,33)] to-amber-500 hover:brightness-110 active:scale-[0.98] transition-all transform py-3.5 text-white rounded-xl font-bold text-lg shadow-[0_4px_14px_0_rgba(255,99,33,0.39)]"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  )
}

export default Jointeam
