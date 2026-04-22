"use client"

import { Link } from "react-router-dom"

const Blogs = () => {
  const data = [
    {
      image: "/TravelBlog/Vacation.webp",
      des: "Places to Visit in India in Winter",
      link: "/blog/places-to-visit-in-india-in-winter",
    },
    {
      image: "/TravelBlog/Goa.webp",
      des: "Places to Visit Near Calangute",
      link: "/blog/places-to-visit-near-calangute",
    },
    {
      image: "/TravelBlog/Chattisgarh.webp",
      des: "Offbeat Places to Visit in India",
      link: "/blog/offbeat-places-to-visit-in-india",
    },
    {
      image: "/TravelBlog/Delhi.webp",
      des: "Places to Visit Near Delhi within 300 km",
      link: "/blog/places-to-visit-near-delhi-within-300-km",
    },
  
  ]


  const preloadPage = (url) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "document"
    link.href = url
    document.head.appendChild(link)
  }

  return (
    <div className="w-full md:mt-8 max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-2">
      {/* Heading — spacing reduced */}
      <h2
        className="text-3xl py-2 md:text-4xl lg:text-5xl font-bold text-center mb-2 sm:mb-3 md:mb-4 leading-tight tracking-tight"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Enjoy Fresh Travel Blogs
      </h2>

      {/* Cards */}
      <div className="w-full">
        {/* Mobile Carousel */}
        <div className="block lg:hidden">
          <div className="flex overflow-x-auto gap-4 pb-4 -ml-4 pl-4 snap-x snap-mandatory scroll-smooth">
            {data.map((item) => (
              <Link
                key={item.des}
                to={item.link}
                onMouseEnter={() => preloadPage(item.link)}
                className="group relative min-w-[85vw] sm:min-w-[75vw] md:min-w-[65vw] max-w-xl h-52 sm:h-56 md:h-60 flex-shrink-0 snap-center rounded-3xl shadow-xl overflow-hidden"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.des}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-4 pb-6">
                  <h2 className="text-white font-bold text-sm sm:text-base line-clamp-2 mb-3">{item.des}</h2>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold py-2 rounded-xl">
                    Read More →
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          {data.map((item) => (
            <Link
              key={item.des}
              to={item.link}
              onMouseEnter={() => preloadPage(item.link)}
              className="group relative w-full h-64 xl:h-72 rounded-3xl shadow-xl overflow-hidden"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.des}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-5 pb-8">
                <h2 className="text-white font-bold text-base xl:text-lg line-clamp-2 mb-3">{item.des}</h2>
                <button className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold py-2.5 rounded-xl">
                  Read More →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-6 lg:mt-6">
        <Link
          to="/blog"
          className="px-10 py-4 text-lg font-semibold bg-white border shadow-xl rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-400 hover:text-white transition"
        >
          More Blogs
        </Link>
      </div>
    </div>
  )
}

export default Blogs
