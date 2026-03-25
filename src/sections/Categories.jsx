import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function HoverRevealButton() {
  const data = [
    {
      image: "/images/1.png",
      name: "Japan",
      link: "/services/activities",
    },
    {
      image: "/images/2.png",
      name: "Maldives",
      link: "services/holidays",
    },
    {
      image: "/images/4.png",
      name: "Dubai",
      link: "/services/transport",
    },
    {
      image: "/images/6.png",
      name: "Manali",
      link: "/services/hotels",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      {/* Desktop view */}
      <div className="hidden xl:block min-h-[60vh] w-full">
        <h2
          className="text-3xl md:text-5xl text-center font-bold"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Curated Categories
        </h2>

        <div className="grid w-[90vw] mx-auto grid-cols-1 xl:grid-cols-4 mt-8 md:mt-10 gap-8 md:gap-16 place-items-center">
          {data.map((item, index) => (
            <div
              key={index}
              className="relative w-74 h-72 flex items-center justify-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.img
                src={item.image}
                alt={item.name}
                className="absolute w-full h-full rounded-lg shadow-lg object-cover"
                animate={{ y: hoveredIndex === index ? -30 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

           <motion.button
                className="absolute mt-80 px-8 py-2 bg-white font-semibold rounded-lg shadow-md hover:bg-amber-400 hover:text-white transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
               
              >
                 <Link to={item.link}> 
                View All
                </Link> 
              </motion.button>
             
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view — ONLY main div margin changed */}
      <div className="xl:hidden h-auto mb-4 w-full px-4 ">
        <h2
          className="text-3xl md:text-5xl text-center font-bold"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Curated Categories
        </h2>

        <div className="flex overflow-x-auto h-auto gap-6 mt-6 pb-4 scrollbar-hide">
          {data.map((item, index) => (
            <div
              key={index}
              className="min-w-[70vw] md:min-w-[30vw] max-w-[260px] h-72 md:h-[40vh] xl:h-72 flex-shrink-0 relative"
            >
            <Link to={item.link}> <img
                src={item.image}
                alt={item.name}
                className="w-full h-full rounded-lg shadow-lg object-cover"
              />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
