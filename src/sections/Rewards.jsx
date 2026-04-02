"use client";
import { useEffect, useRef } from "react";

const Rewards = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile || !scrollRef.current) return;

    const container = scrollRef.current;
    const cards = container.querySelectorAll(".scroll-card");
    let index = 0;

    const scrollInterval = setInterval(() => {
      if (index >= cards.length) index = 0;

      const card = cards[index];
      container.scrollTo({
        left: card.offsetLeft - 16,
        behavior: "smooth",
      });

      index++;
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="h-auto w-full md:px-8 mb-8 lg:px-16 md:mt-4">
      {/* Heading */}
      <h2
        className="text-center text-3xl sm:text-4xl md:text-5xl pt-6 md:pt-2 font-bold"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Discover More with FriskyTrails
      </h2>

      {/* Cards Container */}
      <div className="mt-6 md:mt-6">
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible scroll-smooth no-scrollbar pb-4"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="scroll-card w-[80vw] md:w-full flex-shrink-0 h-auto flex justify-center transition-transform duration-300 hover:scale-105 rounded-xl bg-white shadow-xl border-2 border-[#FF6321]"
            >
              <div className="w-full max-w-xs flex flex-col items-center p-4 md:p-6">
                {/* Image */}
                <div className="flex justify-center pt-4 md:pt-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 md:h-18 md:w-18 object-contain"
                  />
                </div>

                {/* Title */}
                <h2 className="mt-3 md:mt-4 text-base md:text-lg font-semibold text-center text-[#1a3a2f] leading-tight">
                  {item.title}
                </h2>

                {/* Description */}
                <p className="mt-2 text-center text-gray-700 text-sm md:text-base tracking-tight leading-relaxed px-2">
                  {item.des}
                </p>

                {/* Button */}
                <button className="mt-4 md:mt-5 bg-white border border-gray-300 text-[#1a3a2f] font-semibold rounded-lg px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base transition-all duration-300 hover:bg-amber-400 hover:text-white active:scale-95">
                  {item.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    title: "Find Your Perfect Gateway",
    image: "/rewardsimages/trolly.png",
    des: "Explore our handpicked travel packages and thrilling adventures tailored just for you.",
    button: "Book Now",
  },
  {
    title: "Save More, Travel More",
    image: "/rewardsimages/money.png",
    des: "Earn rewards when you book and leave a review – because great trips deserve great perks!",
    button: "How FriskyTrailsCash works",
  },
  {
    title: "Refer Joy & Earn",
    image: "/rewardsimages/refer.png",
    des: "Share the joy of travel! Invite a friend, and when they complete a booking, you get ₹300 as a thank-you.",
    button: "Invite friends",
  },
];

export default Rewards;
