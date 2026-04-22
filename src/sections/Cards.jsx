import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getProducts, getProductBySlug } from "../api/admin.api";


const Cards = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: false, // Only infinite if enough cards
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

  /* =====================
     DATA FETCHING (CURATED SELECTION)
  ===================== */
  useEffect(() => {
    const curatedSlugs = [
      "kedarnath-yatra-group-trip",
      "meghalaya-group-tour-package",
      "paragliding-in-manali",
      "chopta-tungnath-trek-with-chandrashila",
      "do-dham-yatra-group-trip",
      "char-dham-yatra-group-trip",
      "chikmagalur-trip-from-bangalore",
      "mandalpatti-jeep-safari",
      "pondicherry-weekend-trip-from-bangalore",
      "powered-paragliding-in-pune",
      "paragliding-in-gurgaon"
    ];

    const fetchCuratedTrips = async () => {
      try {
        setLoading(true);
        // Fetch a large enough batch to find our curated items
        const response = await getProducts({ page: 1, limit: 100 });
        
        if (response?.data?.products) {
          // Filter to only include tours in our curated list
          const filtered = response.data.products.filter(p => curatedSlugs.includes(p.slug));
          
          // Sort them to match the exact order of curatedSlugs
          const sorted = curatedSlugs
            .map(slug => filtered.find(p => p.slug === slug))
            .filter(Boolean);

          setTrips(sorted);
        }
      } catch (error) {
        console.error("Error in curated fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCuratedTrips();
  }, []);

  /* =====================
     PRICE CALCULATION
  ===================== */
  const getDisplayPrices = (packages) => {
    if (!packages || !Array.isArray(packages) || packages.length === 0) {
      return { current: "N/A", cut: "" };
    }

    // Find the package with the lowest discounted price
    const validPackages = packages.filter(pkg => 
      (pkg.discountedPrice || pkg.price || pkg.actualPrice) !== undefined
    );

    if (validPackages.length === 0) return { current: "N/A", cut: "" };

    const cheapest = validPackages.reduce((prev, curr) => {
      const prevPrice = Number(prev.discountedPrice || prev.price || prev.actualPrice);
      const currPrice = Number(curr.discountedPrice || curr.price || curr.actualPrice);
      return prevPrice < currPrice ? prev : curr;
    });

    const currentPrice = Number(cheapest.discountedPrice || cheapest.price || cheapest.actualPrice);
    const actualPrice = Number(cheapest.actualPrice);

    return {
      current: `₹${currentPrice.toLocaleString("en-IN")}`,
      cut: actualPrice > currentPrice ? `₹${actualPrice.toLocaleString("en-IN")}` : ""
    };
  };

  //  INLINE PREFETCH FUNCTION
  const prefetchTourPage = (slug) => {
    // You can implement more advanced prefetching here if needed
  };

  return (
    <div className="w-full py-6 md:py-8 mt-8 md:mt-12">
      <h2
        className="text-center text-3xl sm:text-4xl md:text-5xl font-bold"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Upcoming Trips & Adventures
      </h2>

      <div className="w-full max-w-7xl mx-auto px-4 mt-10 min-h-[400px]">
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="bg-white rounded-2xl shadow-md h-[350px] animate-pulse">
               <div className="w-full h-60 bg-gray-200" />
               <div className="p-4 space-y-3">
                 <div className="h-4 bg-gray-200 w-3/4 rounded" />
                 <div className="h-6 bg-gray-200 w-full rounded" />
                 <div className="h-8 bg-gray-200 w-1/2 rounded" />
               </div>
             </div>
           ))}
         </div>
        ) : trips.length > 0 ? (
          <Slider {...settings}>
            {trips.map((item, index) => {
              const { current, cut } = getDisplayPrices(item.packages);

              return (
                <div
                  key={item._id || index}
                  className="px-3"
                  onMouseEnter={() => prefetchTourPage(item.slug)}
                >
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden h-full flex flex-col min-h-[350px]">
                    <Link to={`/tours/${item.slug}`}>
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[2] || item.images[0]}
                          alt={item.name}
                          className="w-full h-60 sm:h-64 md:h-72 object-top object-cover hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-60 sm:h-64 md:h-72 bg-gray-200 flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </Link>

                    <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        ⭐ {item.rating || 0} ({item.reviews || 0} reviews)
                      </p>

                      <h2 className="font-semibold text-lg sm:text-xl md:text-2xl line-clamp-2 md:min-h-[56px] leading-tight active:text-[rgb(255,99,33)] transition-colors">
                        <Link to={`/tours/${item.slug}`}>{item.name}</Link>
                      </h2>

                      {/* PRICE + CTA */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col items-start">
                          {cut && (
                            <span className="text-gray-400 text-sm line-through">
                              {cut}
                            </span>
                          )}
                          <div className="flex items-baseline">
                            <span className="text-[rgb(255,99,33)] font-semibold text-xl sm:text-2xl">
                              {current}
                            </span>
                            <span className="text-gray-400 ml-1 text-sm">
                              /person
                            </span>
                          </div>
                        </div>

                        <Link
                          to={`/tours/${item.slug}`}
                        >
                          <button className="rounded-full px-2 sm:px-4 py-2 border border-gray-300 text-[13px] sm:text-sm md:text-base font-semibold bg-white hover:bg-[rgb(255,99,33)] hover:text-white transition-all active:scale-90 whitespace-nowrap">
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
        ) : (
          <div className="text-center py-20 text-gray-500">
            No upcoming trips found.
          </div>
        )}
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

const PrevArrow = (props) => {
  const { className, onClick } = props;
  if (className.includes("slick-disabled")) return null;
  return (
    <button
      onClick={onClick}
      className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 
                 bg-orange-100 hover:bg-orange-200 text-orange-500
                 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95"
    >
      <FaChevronLeft />
    </button>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  if (className.includes("slick-disabled")) return null;
  return (
    <button
      onClick={onClick}
      className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 
                 bg-orange-100 hover:bg-orange-200 text-orange-500
                 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95"
    >
      <FaChevronRight />
    </button>
  );
};

export default Cards;
