import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Plus, Minus, Star, MapPin, Sliders } from "lucide-react";
import Popupform from "../components/Popupform";
import Choose from "../sections/Choose";
import Promise from "../sections/Promise";
import Skeleton from "../components/Skeleton";

const Adventures = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const getNormalizedCategory = (cat) => {
    if (cat === "air" || cat === "aerial") return "aerial";
    return cat;
  };

  const activeTabFromUrl = searchParams.get("category") || "land";
  const [activeTab, setActiveTab] = useState(getNormalizedCategory(activeTabFromUrl));
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [descExpanded, setDescExpanded] = useState(false);

  useEffect(() => {
    // 800ms loading skeleton matching other pages
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    if (!loading && category) {
      setActiveTab(getNormalizedCategory(category));
    }
  }, [searchParams, loading]);

  const handleTabClick = (tab) => {
    setActiveTab(getNormalizedCategory(tab));
    setSearchParams({ category: getNormalizedCategory(tab) });
  };

  const openBookingForm = (activityName) => {
    if (activityName === "Hot Air Balloon") {
      navigate("/adventures/hot-air-balloon");
      return;
    }
    setSelectedActivity(`Hi, I'm interested in booking the "${activityName}" adventure activity with FriskyTrails. Please provide packages and pricing.`);
    setShowForm(true);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // 18 activities list
  const landActivities = [
    { title: "Hiking", desc: "Explore scenic mountain trails and enjoy breathtaking views of nature.", img: "/services/hiking.png" },
    { title: "Mountain Biking", desc: "Ride through rugged terrains and explore off-road trails.", img: "/services/mountain_biking.png" },
    { title: "Jungle Safari", desc: "Discover wildlife in their natural habitat.", img: "/services/jungle_safari.png" },
    { title: "Camping", desc: "Relax under the stars and enjoy peaceful nights in nature.", img: "/services/camping.png" },
    { title: "Rock Climbing", desc: "Challenge yourself with exciting climbing adventures on natural rocks.", img: "/services/rock_climbing.png" },
    { title: "Trekking", desc: "Go on long adventurous journeys through forests and hills.", img: "/services/trekking.png" },
  ];

  const waterActivities = [
    { title: "River Rafting", desc: "Feel the thrill of riding through powerful river currents with expert guides.", img: "/services/river_rafting.png" },
    { title: "Kayaking", desc: "Paddle through calm waters and scenic routes.", img: "/services/kayaking.png" },
    { title: "Scuba Diving", desc: "Explore underwater life and discover the beauty beneath the sea.", img: "/services/scuba_diving.png" },
    { title: "Jet Skiing", desc: "Speed across the water and enjoy an exciting ride.", img: "/services/jet_skiing.png" },
    { title: "Canoeing", desc: "Enjoy smooth and relaxing rides across lakes and rivers.", img: "/services/canoeing.png" },
    { title: "Boat Ride", desc: "Enjoy a relaxing ride across calm waters and scenic views.", img: "/services/boat_riding.png" },
  ];

  const airActivities = [
    { title: "Skydiving", desc: "Experience the ultimate adrenaline rush as you jump from the sky.", img: "/services/skydiving.png" },
    { title: "Hot Air Balloon", desc: "Enjoy a peaceful flight and panoramic views from above.", img: "/services/hot_air_balloon.png" },
    { title: "Zip Lining", desc: "Glide across valleys with speed and excitement.", img: "/services/zip_lining.png" },
    { title: "Bungee Jumping", desc: "Take a thrilling leap from great heights and feel the rush.", img: "/services/bungee_jumping.png" },
    { title: "Paragliding", desc: "Soar high above mountains and enjoy breathtaking aerial views.", img: "/services/paragliding.png" },
    { title: "Parasailing", desc: "Glide above the water while being pulled by a speedboat.", img: "/services/parasailing.png" },
  ];

  const popularIndia = [
    { title: "HIKING", location: "Himalayas", img: "/services/popular_hiking.jpg" },
    { title: "SCUBA DIVING", location: "Andaman Islands", img: "/services/popular_scuba.jpg" },
    { title: "PARASAILING", location: "Goa Coast", img: "/services/popular_parasailing.jpg" },
  ];

  const destinationBlogs = [
    { name: "KODAIKANAL", slug: "kodaikanal", img: "/services/kodaikanal.jpg" },
    { name: "MANALI", slug: "manali", img: "/services/manali.jpg" },
    { name: "GOA", slug: "goa", img: "/services/goa.png" },
  ];

  const faqs = [
    { q: "What happens in case of bad weather?", a: "Your safety is our top priority. In the event of adverse weather (such as heavy rain, storm, or poor wind conditions for paragliding), the activity may be rescheduled or cancelled. In case of cancellation, you will receive a full refund or option to book an alternative experience." },
    { q: "What all water activities I can do in India?", a: "India offers an incredibly diverse range of water sports. You can experience River Rafting in Rishikesh and Ladakh; Scuba Diving & Sea Walking in Andaman & Nicobar or Netrani Island; Jet Skiing, Kayaking, Parasailing & Windsurfing in Goa; and Canoeing in Kerala Backwaters." },
    { q: "Are these activities safe?", a: "Absolutely. All our listed adventure activities are hosted by certified professional operators who strictly comply with international safety regulations. They use top-grade equipment, offer detailed safety briefings, and ensure professional instructors accompany you during the entire session." },
    { q: "Do I need prior experience?", a: "Most of our recreational activities (like tandem paragliding, introductory scuba diving, kayaking, rafting, and basic treks) require no prior experience. Our guides will train you on basic techniques and safety protocols before the activity starts. However, advanced treks or specialized activities may list fitness or skill requirements." },
    { q: "What is the age limit for activities?", a: "Age limits vary depending on the nature of the activity. Generally: paragliding is suitable for ages 6-65; scuba diving requires participants to be at least 10 years old; river rafting is permitted for ages 12 and above. Parental consent is mandatory for all minors." },
    { q: "Is equipment provided?", a: "Yes, all specialized safety and operational gear (e.g., life jackets, helmets, harnesses, ropes, scuba diving suits, cylinders, and masks) are provided at the site by our operators and are included in the package price. You only need to carry personal items and wear comfortable apparel." },
    { q: "How long do activities last?", a: "The duration varies from 10-20 minutes of flight time (for paragliding/parasailing) to 30-45 minutes underwater (for scuba diving), 1-3 hours (for river rafting/kayaking), and a whole day or multiple days for treks and camping. Detailed schedules are listed inside each package description." },
    { q: "Can I cancel or reschedule my booking?", a: "Yes, bookings can be cancelled or rescheduled according to the cancellation policy of the specific activity. Typically, cancellations made 48-72 hours in advance qualify for a full or partial refund. Rescheduling is subject to slot availability." },
    { q: "Are food and drinks included?", a: "This depends on the package. Short activities (like paragliding or jet skiing) do not include meals, though water is often provided. Multi-hour or full-day packages (like trekking, camping, and long safaris) generally include fresh local meals and beverages." },
    { q: "Is transportation provided?", a: "Many packages include pickup and drop-off from a central meeting point near the local activity hub. We can also arrange custom private transport from your hotel or airport for an additional cost. Let us know your preferences during booking!" },
    { q: "What should I wear for activities?", a: "We recommend comfortable, quick-dry activewear or athletic clothing. For land activities: sturdy sports shoes or hiking boots are essential. For water activities: swimwear, nylon clothing, and secure strap sandals are ideal. Avoid loose clothing, jewelry, or heavy accessories." }
  ];

  const reviews = [
    { name: "Amit Sharma", rating: 5, date: "May 15, 2026", text: "Amazing experience trekking with FriskyTrails. Safe, organized, and absolutely breathtaking!" },
    { name: "Priya Patel", rating: 5, date: "April 28, 2026", text: "Paragliding in Bir Billing was my dream. The instructor was very professional and made me feel so comfortable." },
    { name: "Rahul Verma", rating: 4, date: "May 02, 2026", text: "Rafting in Rishikesh was extreme fun. Strongly recommend FriskyTrails for hassle-free bookings." }
  ];

  const travelerPhotos = [
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=300&q=80"
  ];

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white">
        <Skeleton height="60vh" width="100%" borderRadius="0" />
        <div className="max-w-7xl mx-auto mt-12 px-4 space-y-8">
          <Skeleton height="8rem" width="100%" borderRadius="2rem" />
          <div className="flex gap-4 justify-center">
            <Skeleton height="3rem" width="150px" borderRadius="9999px" />
            <Skeleton height="3rem" width="150px" borderRadius="9999px" />
            <Skeleton height="3rem" width="150px" borderRadius="9999px" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton height="300px" width="100%" borderRadius="1rem" />
            <Skeleton height="300px" width="100%" borderRadius="1rem" />
            <Skeleton height="300px" width="100%" borderRadius="1rem" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF6F0] text-gray-900 pb-16">

      {/* 1. HERO SECTION */}
      <div className="relative min-h-[500px] md:h-[643px] w-full flex items-center overflow-hidden">
        {/* Background image container with Figma styling */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(10,3,34,0.65) 30%, rgba(10,3,34,0.2) 100%), url('/ad1.png')`,
          }}
        />
        <div className="max-w-[1274px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-2xl text-left flex flex-col justify-center py-12 md:py-20 md:pl-[111px]">
            <h1 
              className="text-4xl sm:text-5xl md:text-[52px] lg:text-[65px] font-normal text-[#FFFAF6] tracking-tight leading-[1.2] md:leading-[65px] lg:leading-[117px] font-['Konkhmer_Sleokchher'] max-w-[407px]"
              style={{ fontFamily: "'Konkhmer Sleokchher', sans-serif" }}
            >
              Find Your <span className="text-[#FF4F14]">Adventure</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 font-medium leading-relaxed max-w-xl">
              Discover thrilling experiences, breathtaking landscapes, and unforgettable memories. Choose your next adventure with us.
            </p>
            <div className="mt-8">
              <button
                onClick={() => handleTabClick("land")}
                className="bg-white hover:bg-[#FF4F14] text-gray-900 hover:text-white transition-all duration-300 font-bold px-8 py-3.5 rounded-full shadow-lg active:scale-95 text-base sm:text-lg"
              >
                Discover Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">

        {/* 2. DESCRIPTION BLOCK (Rectangle 94) */}
        <div 
          className="mx-auto w-full max-w-[1139px] rounded-[32px] p-6 sm:p-8 md:p-12 lg:p-16 shadow-xl border border-gray-100/30"
          style={{
            background: "rgba(217, 217, 217, 0.52)",
          }}
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Adventure Activities
          </h2>
          <p className="text-xs sm:text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
            <span className="sm:hidden">
              {descExpanded 
                ? "Adventure awaits those who dare to explore beyond the ordinary. From soaring high in hot air balloons and paragliding above breathtaking landscapes to trekking through rugged mountains, river rafting in wild waters, and experiencing the thrill of skydiving, adventure activities offer unforgettable moments filled with excitement and discovery. Whether you're seeking adrenaline-pumping challenges or scenic outdoor experiences, every adventure creates lasting memories, pushes your limits, and connects you with the beauty of nature in the most thrilling way possible."
                : "Adventure awaits those who dare to explore beyond the ordinary. From soaring high in hot air balloons and paragliding above breathtaking landscapes to trekking through rugged mountains..."
              }
            </span>
            <span className="hidden sm:inline">
              Adventure awaits those who dare to explore beyond the ordinary. From soaring high in hot air balloons and paragliding above breathtaking landscapes to trekking through rugged mountains, river rafting in wild waters, and experiencing the thrill of skydiving, adventure activities offer unforgettable moments filled with excitement and discovery. Whether you're seeking adrenaline-pumping challenges or scenic outdoor experiences, every adventure creates lasting memories, pushes your limits, and connects you with the beauty of nature in the most thrilling way possible.
            </span>
          </p>
          <button 
            onClick={() => setDescExpanded(!descExpanded)}
            className="sm:hidden mt-3 text-xs font-bold text-[#FF6321] hover:underline focus:outline-none"
          >
            {descExpanded ? "Read Less" : "Read More"}
          </button>
        </div>

        {/* 3. CHOOSE YOUR ADVENTURE */}
        <div className="mt-16 md:mt-24">
          <div className="text-center mb-6">
            <span className="text-[#FF6321] font-bold text-lg tracking-wider">Adventure Activities</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2 text-gray-900">
              Choose Your{" "}
              <span className="relative inline-block pb-2">
                Adventure
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF6321] rounded"></span>
              </span>
            </h2>
          </div>

          {/* Filter Tab Bar */}
          <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
            <div className="p-3 bg-white shadow-md rounded-full text-gray-500 hover:text-[#FF6321] cursor-pointer hidden sm:block">
              <Sliders className="w-5 h-5" />
            </div>
            <button
              onClick={() => handleTabClick("land")}
              className={`px-8 py-3 rounded-full font-bold shadow-md transition-all duration-300 active:scale-95 text-base border ${activeTab === "land"
                ? "bg-[#FF6321] text-white border-transparent"
                : "bg-white text-gray-700 hover:bg-gray-100 border-black/20"
                }`}
            >
              Land Activities
            </button>
            <button
              onClick={() => handleTabClick("water")}
              className={`px-8 py-3 rounded-full font-bold shadow-md transition-all duration-300 active:scale-95 text-base border ${activeTab === "water"
                ? "bg-[#FF6321] text-white border-transparent"
                : "bg-white text-gray-700 hover:bg-gray-100 border-black/20"
                }`}
            >
              Water Activities
            </button>
            <button
              onClick={() => handleTabClick("aerial")}
              className={`px-8 py-3 rounded-full font-bold shadow-md transition-all duration-300 active:scale-95 text-base border ${activeTab === "aerial"
                ? "bg-[#FF6321] text-white border-transparent"
                : "bg-white text-gray-700 hover:bg-gray-100 border-black/20"
                }`}
            >
              Air Activities
            </button>
          </div>

          {/* LAND ACTIVITIES SECTION */}
          {activeTab === "land" && (
            <div className="pt-2">
              <div className="text-center mb-6">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#FF6321] tracking-tight">Land Activities</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center max-w-[1098.5px] mx-auto w-full">
                {landActivities.map((act, i) => (
                  <div key={i} className="w-full max-w-[320px] bg-white rounded-[6px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col group pb-5">
                    <div className="relative w-full h-[230px] shrink-0 overflow-hidden">
                      <img
                        src={act.img}
                        alt={act.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="text-2xl font-extrabold text-gray-900 group-hover:text-[#FF6321] transition-colors duration-300">
                          {act.title}
                        </h4>
                        <p className="text-gray-500 mt-2 text-sm leading-relaxed line-clamp-2">
                          {act.desc}
                        </p>
                      </div>
                      <div className="flex justify-center mt-3">
                        <button
                          onClick={() => openBookingForm(act.title)}
                          className="bg-[#FF6321] text-white font-bold px-8 py-2 rounded-full shadow hover:bg-orange-600 transition duration-200 text-sm active:scale-95"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WATER ACTIVITIES SECTION */}
          {activeTab === "water" && (
            <div className="pt-2">
              <div className="text-center mb-6">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#FF6321] tracking-tight">Water Activities</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center max-w-[1098.5px] mx-auto w-full">
                {waterActivities.map((act, i) => (
                  <div key={i} className="w-full max-w-[320px] bg-white rounded-[6px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col group pb-5">
                    <div className="relative w-full h-[230px] shrink-0 overflow-hidden">
                      <img
                        src={act.img}
                        alt={act.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="text-2xl font-extrabold text-gray-900 group-hover:text-[#FF6321] transition-colors duration-300">
                          {act.title}
                        </h4>
                        <p className="text-gray-500 mt-2 text-sm leading-relaxed line-clamp-2">
                          {act.desc}
                        </p>
                      </div>
                      <div className="flex justify-center mt-3">
                        <button
                          onClick={() => openBookingForm(act.title)}
                          className="bg-[#FF6321] text-white font-bold px-8 py-2 rounded-full shadow hover:bg-orange-600 transition duration-200 text-sm active:scale-95"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AIR ACTIVITIES SECTION */}
          {activeTab === "aerial" && (
            <div className="pt-2">
              <div className="text-center mb-6">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#FF6321] tracking-tight">Air Activities</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center max-w-[1098.5px] mx-auto w-full">
                {airActivities.map((act, i) => (
                  <div key={i} className="w-full max-w-[320px] bg-white rounded-[6px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col group pb-5">
                    <div className="relative w-full h-[230px] shrink-0 overflow-hidden">
                      <img
                        src={act.img}
                        alt={act.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="text-2xl font-extrabold text-gray-900 group-hover:text-[#FF6321] transition-colors duration-300">
                          {act.title}
                        </h4>
                        <p className="text-gray-500 mt-2 text-sm leading-relaxed line-clamp-2">
                          {act.desc}
                        </p>
                      </div>
                      <div className="flex justify-center mt-3">
                        <button
                          onClick={() => openBookingForm(act.title)}
                          className="bg-[#FF6321] text-white font-bold px-8 py-2 rounded-full shadow hover:bg-orange-600 transition duration-200 text-sm active:scale-95"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div> 

        {/* 4. POPULAR ACTIVITIES IN INDIA */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Popular Activities Do in India
            </h2>
            <div className="w-20 h-1 bg-[#FF6321] mx-auto mt-3 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularIndia.map((item, i) => (
              <div
                key={i}
                className="relative h-96 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                onClick={() => openBookingForm(item.title)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover scale-[1.05] group-hover:scale-115 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-[#FF6321] font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {item.location}
                  </span>
                  <h3 className="text-white font-black text-2xl tracking-wide mt-1.5">
                    {item.title}
                  </h3>
                  <div className="w-12 h-1 bg-white mt-3 group-hover:w-20 transition-all duration-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. FAQs ACCORDION */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">FAQs</h2>
            <div className="w-16 h-1 bg-[#FF6321] mx-auto mt-3 rounded"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isExpanded = expandedFaq === i;
              return (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50/50 transition-colors duration-150"
                  >
                    <span className="font-semibold text-gray-800 text-base sm:text-lg pr-4">
                      {faq.q}
                    </span>
                    <span className="p-1 rounded-full bg-[#FF6321]/10 text-[#FF6321] shrink-0">
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-1 text-gray-500 text-sm sm:text-base leading-relaxed border-t border-gray-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. REVIEWS & RATINGS */}
        <div className="mt-24 bg-white rounded-2xl p-8 md:p-12 shadow-md border border-gray-55">
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">

            {/* Left Score Card */}
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center lg:border-r border-gray-100 lg:pr-8">
              <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
              <div className="flex items-center gap-2 mt-4">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-amber-400 text-amber-400" />
                ))}
                <Star className="w-8 h-8 fill-amber-400/30 text-amber-400" />
              </div>
              <h1 className="text-7xl font-black text-[#FF6321] mt-4">4.5</h1>
              <p className="text-gray-400 mt-2 text-sm font-semibold">Average rating from 240+ adventurers</p>
            </div>

            {/* Middle Bar Chart */}
            <div className="w-full lg:w-2/3 space-y-3.5">
              {[
                { stars: 5, pct: "75%" },
                { stars: 4, pct: "15%" },
                { stars: 3, pct: "5%" },
                { stars: 2, pct: "3%" },
                { stars: 1, pct: "2%" },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-4 text-sm font-bold text-gray-600 text-right">{row.stars}</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                  <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#FF6321] h-full rounded-full"
                      style={{ width: row.pct }}
                    ></div>
                  </div>
                  <span className="w-10 text-sm text-gray-400 font-semibold">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Traveler feedback list */}
          <div className="mt-12 space-y-6 pt-12 border-t border-gray-100">
            {reviews.map((rev, i) => (
              <div key={i} className="bg-[#FAF8F5]/50 p-6 rounded-xl border border-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900">{rev.name}</h4>
                    <span className="text-xs text-gray-400">• {rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-1.5">
                    {[...Array(rev.rating)].map((_, index) => (
                      <Star key={index} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                    {rev.text}
                  </p>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden border border-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=100&q=80" alt="review thumbnail" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden border border-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=100&q=80" alt="review thumbnail" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. PHOTOS GALLERY */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Photos</h2>
            <div className="w-16 h-1 bg-[#FF6321] mx-auto mt-3 rounded"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {travelerPhotos.map((url, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 hover:scale-[1.03] transition-all duration-300">
                <img src={url} alt={`traveler pic ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* 8. POPULAR DESTINATION STATE BLOGS */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Popular Destination State Blogs
            </h2>
            <div className="w-24 h-1 bg-[#FF6321] mx-auto mt-3 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinationBlogs.map((blog, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-50 flex flex-col group hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={blog.img}
                    alt={blog.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25"></div>
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-white font-black text-2xl tracking-wider text-center drop-shadow-md">
                      {blog.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6 flex justify-center">
                  <a
                    href={`/state/${blog.slug}`}
                    className="bg-[#FF6321] hover:bg-orange-600 text-white font-bold px-8 py-2.5 rounded-full shadow text-sm transition-colors duration-150 active:scale-95"
                  >
                    Read
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 9. PROMOTIONAL BANNER */}
        <div className="mt-24 relative rounded-2xl overflow-hidden shadow-xl border border-gray-100/30">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(10,3,34,0.85) 40%, rgba(10,3,34,0.4) 100%), url('/services/journey_banner.png')`,
            }}
          ></div>
          <div className="relative z-10 px-6 py-10 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Your Next Journey Starts Here
              </h2>
              <p className="text-gray-300 mt-3 text-xs sm:text-sm md:text-base leading-relaxed">
                Empower your travel dreams with our tailored services and handpicked tour packages. Enjoy secure booking, local guides, and 24/7 client support.
              </p>
            </div>

            {/* Promo Sticker */}
            <div className="relative group shrink-0 active:scale-95 transition-transform duration-200 flex items-center justify-center">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative w-28 h-28 flex items-center justify-center rotate-[-12deg] group-hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/services/discount_sticker.png" 
                  alt="Discount Sticker" 
                  className="absolute inset-0 w-full h-full object-contain shadow-2xl"
                />
                <div className="relative flex flex-col items-center justify-center text-white text-center pointer-events-none select-none">
                  <span className="text-[10px] font-extrabold tracking-wider uppercase leading-none text-[#FFFAF6]">FLAT</span>
                  <span className="text-[18px] font-black leading-none mt-1 text-[#FFFAF6]">30% OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 10. REUSED SECTIONS */}
      <div className="mt-16">
        <Choose />
      </div>
      <div>
        <Promise />
      </div>

      {/* Booking popup form modal */}
      {showForm && (
        <Popupform
          onClose={() => setShowForm(false)}
          initialMessage={selectedActivity}
        />
      )}
    </div>
  );
};

export default Adventures;
