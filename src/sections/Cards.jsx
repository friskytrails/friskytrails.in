import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { data } from "../lib/corouselData";
import ProductDetails from "../admin/ProductDetails";

const Cards = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const getCutPrice = (price) => {
    const priceNum = parseInt(price.replace(/[^\d]/g, ""));
    return `₹${(priceNum + 1000).toLocaleString()}`;
  };

  //  INLINE PREFETCH FUNCTION for optimization ke liye
  const prefetchTourPage = () => {
    import("../admin/ProductDetails");
  };

  return (
    <div className="w-full py-6 md:py-8 mt-8 md:mt-12">
      <h1
        className="text-center text-3xl sm:text-4xl md:text-5xl font-bold"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Upcoming Trips & Adventures
      </h1>

      <div className="w-full max-w-7xl mx-auto px-4 mt-10">
        <Slider {...settings}>
          {data.map((item, index) => {
            const cutPrice = getCutPrice(item.price);

            return (
              <div
                key={index}
                className="px-3"
                onMouseEnter={prefetchTourPage} // 🔥 prefetch on card hover
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden h-full flex flex-col min-h-[350px]">
                  
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-60 sm:h-64 md:h-72 object-top object-cover"
                  />

                  <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                      ⭐ {item.rating} Overall Reviews
                    </p>

                    <h2 className="font-semibold text-lg sm:text-xl md:text-2xl line-clamp-2 md:min-h-[56px] leading-tight">
                      {item.title}
                    </h2>

                    {/* PRICE + CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-start">
                        <span className="text-gray-400 text-sm line-through mb-1">
                          {cutPrice}
                        </span>
                        <div className="flex items-baseline">
                          <span className="text-[rgb(255,99,33)] font-bold text-xl sm:text-2xl">
                            {item.price}
                          </span>
                          <span className="text-gray-400 ml-1 text-sm">
                            /person
                          </span>
                        </div>
                      </div>

                      {/* 🔥 INLINE PREFETCH ON LINK HOVER */}
                      <Link
                        to={item.link}
                        onMouseEnter={prefetchTourPage}
                      >
                        <button className="rounded-full px-4 py-2 border border-gray-300 text-sm sm:text-base font-semibold bg-white hover:bg-[rgb(255,99,33)] hover:text-white transition-all">
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      <style>
        {`
          .slick-track {
            display: flex !important;
          }
          .slick-slide {
            height: auto !important;
            display: flex !important;
          }
          .slick-slide > div {
            display: flex !important;
            width: 100%;
          }
        `}
      </style>
    </div>
  );
};

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 
               bg-orange-100 hover:bg-orange-200 text-orange-500
               w-10 h-10 rounded-full flex items-center justify-center shadow-md"
  >
    <FaChevronLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 
               bg-orange-100 hover:bg-orange-200 text-orange-500
               w-10 h-10 rounded-full flex items-center justify-center shadow-md"
  >
    <FaChevronRight />
  </button>
);

export default Cards;
