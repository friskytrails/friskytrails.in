import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Star, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import Skeleton from "../components/Skeleton";

const Reviews = () => {
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeSlide, setActiveSlide] = useState(0);
  const [filterRating, setFilterRating] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Avatar color palette for distinct user circles
  const avatarColors = [
    "bg-teal-600", "bg-red-800", "bg-purple-700", "bg-amber-700",
    "bg-emerald-700", "bg-rose-600", "bg-indigo-700", "bg-cyan-700"
  ];

  // Full reviews data
  const allReviews = [
    {
      name: "Ashutosh Pareek",
      avatar: "/feedback/ashutosh.png",
      date: "May 20, 2026",
      trip: "Andaman",
      text: "If you're looking to experience the Himalayas in the most authentic and beautiful way, Hampta Pass with FriskyTrails is the way to go. Thank you, team, for an unforgettable journey. I'll definitely be back for more adventures with you guys!",
      rating: 4.5,
      photos: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=200&q=80"
      ],
      colorIdx: 0
    },
    {
      name: "Gokul Ram",
      avatar: "/feedback/gokul.png",
      date: "April 18, 2026",
      trip: "Goa",
      text: "They did all the arrangements as per our needs in Goa and it was correctly priced and the communication was neat. Will recommend to others. The beaches were stunning and the whole trip was very well organized from start to end.",
      rating: 4.5,
      photos: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=200&q=80"
      ],
      colorIdx: 1
    },
    {
      name: "Nidhi Jaiswal",
      avatar: "/feedback/nidhi.png",
      date: "March 15, 2026",
      trip: "Alps",
      text: "Such an amazing journey with Frisky Trails! The Hampta Pass trek had its challenges, but the crew made it so much fun and comfortable. They were helpful throughout, and the group vibes were just perfect. Can't wait for the next one!",
      rating: 4.5,
      photos: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=200&q=80"
      ],
      colorIdx: 2
    },
    {
      name: "Harsh Choudhary",
      avatar: "/feedback/Harsh-Chaudhary.webp",
      date: "March 02, 2026",
      trip: "Manali",
      text: "Thank you so much for your kind words! We're thrilled to hear that you had a wonderful holiday with FriskyTrails. The snow-capped mountains, the cozy campsites, and the whole crew were absolutely fantastic. A trip I'll never forget!",
      rating: 4.5,
      photos: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=200&q=80"
      ],
      colorIdx: 3
    },
    {
      name: "Sahu VijayLaxmi",
      avatar: "/feedback/sahu-vijayLakshmi.avif",
      date: "Feb 14, 2026",
      trip: "Kerala",
      text: "The agency was incredibly responsive to our needs, even with last-minute adjustments, and their passion for the region shone through in every recommendation. It was really a fantastic experience from the houseboat rides to the spice plantations.",
      rating: 5,
      photos: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=200&q=80"
      ],
      colorIdx: 4
    },
    {
      name: "Manoj R Gupta",
      avatar: "/feedback/Manoj-R-Gupta.avif",
      date: "Jan 28, 2026",
      trip: "Goa",
      text: "It was a wonderful and fabulous holiday with FriskyTrails. We went to Goa, such an amazing place to visit. The sunset cruise and beach shack dinners were the highlights. Definitely planning another trip soon!",
      rating: 5,
      photos: [
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=200&q=80"
      ],
      colorIdx: 5
    },
    {
      name: "Priya Mehta",
      avatar: "/feedback/priya.avif",
      date: "Jan 10, 2026",
      trip: "Rishikesh",
      text: "River rafting and bungee jumping in Rishikesh were experiences of a lifetime. FriskyTrails made sure everything was safe and smooth. The campsite by the Ganges was beautiful. Highly recommended for adventure lovers!",
      rating: 4,
      photos: [
        "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=200&q=80"
      ],
      colorIdx: 6
    },
    {
      name: "Rahul Sharma",
      avatar: "/feedback/rahul.avif",
      date: "Dec 20, 2025",
      trip: "Ladakh",
      text: "Ladakh trip organized by FriskyTrails was pure magic. From Pangong Lake to Nubra Valley, every stop was picture-perfect. The team handled altitude sickness precautions really well. Best trip of my life!",
      rating: 5,
      photos: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=200&q=80"
      ],
      colorIdx: 7
    }
  ];

  // Popular reviews for carousel
  const popularReviews = [
    {
      name: "Ashutosh Pareek",
      avatar: "/feedback/ashutosh.png",
      trip: "Hampta Pass Trek",
      text: "If you're looking to experience the Himalayas in the most authentic way, FriskyTrails is the way to go. Unforgettable journey!",
      rating: 5
    },
    {
      name: "Harsh Choudhary",
      avatar: "/feedback/Harsh-Chaudhary.webp",
      trip: "Manali Winter Trip",
      text: "We had a wonderful holiday with FriskyTrails. Snow-capped peaks, cozy stays, and the best team anyone could ask for!",
      rating: 5
    },
    {
      name: "Nidhi Jaiswal",
      avatar: "/feedback/nidhi.png",
      trip: "Hampta Pass Trek",
      text: "The trek had its challenges, but the crew made it fun and comfortable. Group vibes were perfect. Can't wait for the next one!",
      rating: 5
    },
    {
      name: "Sahu VijayLaxmi",
      avatar: "/feedback/sahu-vijayLakshmi.avif",
      trip: "Kerala Backwaters",
      text: "Incredibly responsive to our needs. Their passion for the region shone through in every recommendation. Fantastic experience!",
      rating: 5
    }
  ];

  // Destination blogs
  const relatedBlogs = [
    {
      name: "PELLING",
      slug: "pelling",
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "HAVELOCK ISLAND",
      slug: "havelock-island",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "CALANGUTE",
      slug: "calangute",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=80"
    }
  ];

  // Filter reviews
  const filteredReviews = filterRating
    ? allReviews.filter((r) => Math.floor(r.rating) >= filterRating)
    : allReviews;

  const displayedReviews = filteredReviews.slice(0, visibleCount);

  // Carousel handlers
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % popularReviews.length);
  };
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + popularReviews.length) % popularReviews.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % popularReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loading, popularReviews.length]);


  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#FEF0E6]">
        <Skeleton height="280px" width="100%" borderRadius="0" />
        <div className="max-w-5xl mx-auto mt-12 px-4 space-y-6">
          <Skeleton height="3rem" width="50%" borderRadius="0.5rem" />
          <Skeleton height="220px" width="100%" borderRadius="1.5rem" />
          <Skeleton height="220px" width="100%" borderRadius="1.5rem" />
          <Skeleton height="220px" width="100%" borderRadius="1.5rem" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FEF0E6] text-gray-900 pb-16 overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          1. HERO BANNER
      ═══════════════════════════════════════════ */}
      <div 
        className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] overflow-hidden"
        style={{
          boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.15)"
        }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/pexels-ann-h-45017-11022644.jpg)"
          }}
        ></div>
      </div>

      {/* ═══════════════════════════════════════════
          2. TRAVELER REVIEWS SECTION
      ═══════════════════════════════════════════ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 md:mt-12">
        {/* Section Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            What our <span className="text-[#FF6321]">Traveler</span> say
          </h2>
        </div>

        {/* Filter Row */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 text-gray-500 hover:text-[#FF6321] transition-colors text-xs font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter by Rating</span>
          </button>
          {showFilters && (
            <div className="flex items-center gap-1.5">
              {[null, 5, 4, 3].map((val) => (
                <button
                  key={val ?? "all"}
                  onClick={() => { setFilterRating(val); setVisibleCount(4); }}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                    filterRating === val
                      ? "bg-[#FF6321] text-white shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {val ? `${val}★+` : "All"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Review Cards */}
        <div className="space-y-4">
          {displayedReviews.map((review, i) => (
            <div
              key={i}
              className="bg-[#EBEBEB] rounded-[24px] border border-black/30 p-4 sm:p-5 hover:shadow-md transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-start gap-3 w-full">
                {/* Avatar */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden ${avatarColors[review.colorIdx]} shrink-0 border border-black/10 shadow-sm`}>
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base break-words">{review.name}</h4>
                    <span className="text-gray-500 text-xs font-medium shrink-0 mt-0.5 sm:mt-0">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mt-0.5 break-words">
                    Trip: <span className="text-gray-900 font-semibold">{review.trip}</span>
                  </p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed mt-3">
                {review.text}
              </p>

              {/* Card Footer: Photos at bottom-left, Rating at bottom-right */}
              <div className="flex items-end justify-between mt-4 gap-4">
                {/* Photo Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {review.photos && review.photos.length > 0 && review.photos.map((photo, pi) => (
                    <div
                      key={pi}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-black/10 hover:scale-105 transition-transform duration-200"
                    >
                      <img src={photo} alt={`Travel photo ${pi + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>

                {/* Rating Text */}
                <div className="shrink-0 mb-1">
                  <span className="text-[#388E3C] font-bold text-sm">
                    Rating: ★{review.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        {visibleCount < filteredReviews.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="bg-[#FF6321] text-white hover:bg-orange-600 border border-black/20 shadow-[0_4px_8px_rgba(0,0,0,0.15)] px-10 py-2.5 rounded-full text-xs font-bold active:scale-95 transition-all"
            >
              See More
            </button>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          3. POPULAR REVIEWS CAROUSEL
      ═══════════════════════════════════════════ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 md:mt-16">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Our Popular Reviews
          </h2>
          <div className="w-10 h-0.5 bg-[#FF6321] mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Carousel Container Wrapper - Rectangle 184 */}
        <div 
          className="relative bg-white mx-auto w-full"
          style={{
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
            borderRadius: "32px",
            padding: "24px",
            maxWidth: "850px"
          }}
          ref={carouselRef}
        >
          {/* Inner Orange Card - Rectangle 181 */}
          <div 
            className="relative overflow-hidden"
            style={{
              background: "linear-gradient(204.14deg, rgba(255, 79, 20, 0.95) -0.68%, rgba(226, 155, 0, 0.95) 106.06%)",
              boxShadow: "0px 8px 24px rgba(255, 99, 33, 0.2)",
              borderRadius: "24px",
              padding: "32px"
            }}
          >
            {/* Current Slide Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/50 shadow-sm shrink-0">
                <img
                  src={popularReviews[activeSlide].avatar}
                  alt={popularReviews[activeSlide].name}
                  className="w-full h-full object-cover bg-white"
                />
              </div>

              <div className="flex-1 w-full">
                {/* Name + Rating */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-white font-bold text-xl">{popularReviews[activeSlide].name}</h3>
                    <p className="text-white/90 text-sm font-semibold tracking-wide mt-1">{popularReviews[activeSlide].trip}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm mx-auto md:mx-0">
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span className="text-white font-bold text-sm">{popularReviews[activeSlide].rating}/5</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-white/95 text-base leading-relaxed mt-4 italic font-medium">
                  &ldquo;{popularReviews[activeSlide].text}&rdquo;
                </p>

                {/* Progress Bar */}
                <div className="mt-6 bg-white/20 h-1 rounded-full overflow-hidden w-full max-w-[200px] mx-auto md:mx-0">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${((activeSlide + 1) / popularReviews.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-700 hover:text-[#FF6321] hover:scale-105 active:scale-95 transition-all z-20 border border-gray-100"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-700 hover:text-[#FF6321] hover:scale-105 active:scale-95 transition-all z-20 border border-gray-100"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {popularReviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeSlide ? "w-6 h-1.5 bg-[#FF6321]" : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          4. EXPLORE RELATED BLOGS
      ═══════════════════════════════════════════ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 md:mt-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Explore Related Blogs
          </h2>
          <Link
            to="/blog"
            className="text-[#FF6321] font-bold text-xs hover:underline flex items-center gap-0.5 shrink-0"
          >
            See all <span className="text-sm font-bold">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {relatedBlogs.map((blog, i) => (
            <Link
              key={i}
              to={`/state/${blog.slug}`}
              className="relative overflow-hidden rounded-[20px] border-2 border-[#FF6321] aspect-[3/4] group shadow-md block"
            >
              <img
                src={blog.img}
                alt={blog.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="text-white font-extrabold text-base sm:text-lg tracking-wider text-center drop-shadow-md uppercase absolute bottom-6">
                  {blog.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
