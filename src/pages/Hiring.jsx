

import { useState, useRef, useEffect } from "react"
import Jointeam from "../components/Jointeam"

const Hiring = () => {
  const [showJointeam, setShowJointeam] = useState(false)
  const formRef = useRef(null)

  // lock body scroll when modal open
  useEffect(() => {
    if (showJointeam) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [showJointeam]) // [web:28][web:26]

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setShowJointeam(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const openings = [
    "Software Engineer / Senior Software Engineer",
    "Graphic Designer",
    "Social Media",
    "Frontend Developer",
    "Travel Executive / Travel Consultant",
  ]

  return (
    <div className="min-h-screen mt-23 md:mt-28 lg:mt-30 xl:mt-28 w-full">
      {/* Banner */}
      <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
        <img src="/images/hiring.png" alt="Hiring Banner" className="w-full h-full object-cover object-center" />
      </div>

      {/* Main Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-6 md:mt-12 text-center px-4">
        Let&apos;s Redefine Adventure, <span className="text-[rgb(255,99,33)] font-bold">TOGETHER!</span>
      </h1>

      {/* Subtext */}
      <div className="w-full md:w-[80%] lg:w-[70%] mx-auto">
        <p className="text-center mt-4 md:mt-8 text-sm sm:text-base md:text-lg text-gray-600 px-4">
          FriskyTrails isn&apos;t just a career opportunity—it&apos;s a launchpad for bold ideas, passionate individuals, and
          limitless growth.
        </p>
      </div>

      {/* Current Openings */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-8 md:mt-12 mb-4 md:mb-10 text-center">
        Current Openings
      </h2>

      {/* Opening Cards */}
      <div className="flex flex-col gap-4 px-4 pb-10">
        {openings.map((opening, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row border rounded-xl border-gray-300 w-full md:w-[90%] lg:w-[70%] mx-auto justify-between items-center md:items-start"
          >
            <div className="text-lg sm:text-xl md:text-2xl font-semibold px-4 md:px-6 py-4 md:py-6 text-center md:text-left">
              {opening}
            </div>
            <div className="px-4 md:px-6 pb-4 md:pb-6 mt-4 w-full md:w-auto flex justify-center items-center relative">
              <button
                onClick={() => setShowJointeam(true)}
                className="bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 text-white rounded-lg px-4 sm:px-5 py-2 sm:py-3 font-semibold active:scale-95 transition duration-200"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Jointeam Modal */}
      {showJointeam && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 px-3 sm:px-4 py-4 sm:py-6 z-50">
          <div
            ref={formRef}
            className="bg-white w-full max-w-md max-h-[85vh] sm:max-h-[90vh] rounded-lg shadow-lg p-4 sm:p-6 relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            <button
              onClick={() => setShowJointeam(false)}
              className="absolute top-3 p-1 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg z-10"
            >
              ✕
            </button>

            <Jointeam onClose={() => setShowJointeam(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Hiring
