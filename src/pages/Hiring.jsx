

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
    <div className="min-h-screen mt-14 md:mt-28 lg:mt-28 xl:mt-26 w-full">
      {/* Banner */}
      <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
        <img src="/images/hiring.webp" alt="Hiring Banner" className="w-full h-full object-cover object-center" />
      </div>

      {/* Main Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-6 md:mt-12 text-center px-4">
        Let&apos;s Redefine Adventure, <span className="text-[rgb(255,99,33)] font-bold">TOGETHER!</span>
      </h1>

      {/* Subtext */}
      <div className="w-full md:w-[80%] lg:w-[70%] mx-auto">
        <p className="text-center mt-4 md:mt-8 text-sm sm:text-base md:text-lg text-gray-600 px-4">
          FriskyTrails isn&apos;t just a career opportunity, it&apos;s a launchpad for bold ideas, passionate individuals, and
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
        <div className="fixed inset-0 flex items-start justify-center bg-black/60 backdrop-blur-sm px-3 sm:px-4 pt-28 pb-10 z-50">
          <div
            ref={formRef}
            className="bg-white w-full max-w-lg max-h-full rounded-2xl shadow-2xl relative flex flex-col overflow-y-auto scrollbar-hide"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowJointeam(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-20"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-1 sm:p-2">
              <Jointeam onClose={() => setShowJointeam(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hiring
