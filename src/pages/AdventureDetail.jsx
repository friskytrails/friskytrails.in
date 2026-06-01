import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Plus, Minus, Star, ChevronRight } from "lucide-react";
import Popupform from "../components/Popupform";
import Promise from "../sections/Promise";
import Choose from "../sections/Choose";
import Skeleton from "../components/Skeleton";

const AdventureDetail = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [descExpanded, setDescExpanded] = useState(false);

  useEffect(() => {
    // 800ms loading skeleton matching main page
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [slug]);

  const openBookingForm = (packageName) => {
    setSelectedPackage(`Hi, I'm interested in booking the "${packageName}" package under Hot Air Balloons in India. Please share availability and pricing details.`);
    setShowForm(true);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // 9 Hot Air Balloon packages with distinct locations and images
  const balloonPackages = [
    {
      title: "Hot Air Balloons in Jaipur",
      img: "/services/balloon_jaipur.png",
      price: "₹12,499",
      desc: "Fly high over the historic forts, amber palaces, and desert landscape of the Pink City."
    },
    {
      title: "Hot Air Balloons in Manali",
      img: "/services/balloon_manali.png",
      price: "₹8,999",
      desc: "Marvel at snow-capped Himalayan ranges and the lush Solang Valley from high above."
    },
    {
      title: "Hot Air Balloons in Pushkar",
      img: "/services/balloon_pushkar.png",
      price: "₹11,500",
      desc: "Experience the magical camel fair city, sacred lakes, and scenic desert landscape of Pushkar."
    },
    {
      title: "Hot Air Balloons in Jaisalmer",
      img: "/services/balloon_jaisalmer.png",
      price: "₹11,000",
      desc: "Fly over the golden sand dunes of the Thar desert and the historical Jaisalmer Fort."
    },
    {
      title: "Hot Air Balloons in Udaipur",
      img: "/services/balloon_udaipur.png",
      price: "₹12,000",
      desc: "Take in the stunning views of pristine lakes, marble palaces, and Aravali mountain range."
    },
    {
      title: "Hot Air Balloons in Lonavla",
      img: "/services/balloon_lonavla.png",
      price: "₹13,999",
      desc: "Experience panoramic views of the lush green Western Ghats, mist-covered hills, and lakes."
    },
    {
      title: "Hot Air Balloons in Goa",
      img: "/services/balloon_goa.png",
      price: "₹14,000",
      desc: "Float above beautiful coastlines, palm-fringed rivers, and countryside landscapes."
    },
    {
      title: "Hot Air Balloons in Chandigarh",
      img: "/services/balloon_chandigarh.png",
      price: "₹13,500",
      desc: "Soar over the beautiful Sukhna Lake, rock gardens, and modern layout of the city of Chandigarh."
    },
    {
      title: "Hot Air Balloons in Munnar",
      img: "/services/balloon_munnar.png",
      price: "₹15,500",
      desc: "Soar high above the endless green tea plantations, misty valleys, and hills of Munnar."
    }
  ];

  // Best Destinations Section (3 columns)
  const bestDestinations = [
    {
      name: "JAIPUR",
      img: "/services/jaipur.jpg",
      tagline: "Royal Forts & Sunrise Rides"
    },
    {
      name: "LONAVALA",
      img: "/services/lonavala.jpg",
      tagline: "Mist Valleys & Green Ranges"
    },
    {
      name: "RISHIKESH",
      img: "/services/rishikesh.jpg",
      tagline: "Himalayan Vistas & River Views"
    }
  ];

  // Accordion FAQs
  const faqs = [
    {
      q: "What is the best time for Hot Air Ballooning in India?",
      a: "The ideal period is from October to April, when the weather is cool, skies are clear, and wind patterns are stable. Flights usually operate in the early morning around sunrise, when the winds are calmest and temperature is perfect."
    },
    {
      q: "How safe is a hot air balloon flight?",
      a: "Hot air ballooning is one of the safest aviation sports. All flights are certified by DGCA (Directorate General of Civil Aviation). The pilots are highly experienced international professionals, and the equipment is fully certified and checked regularly."
    },
    {
      q: "Is there any age or weight limit?",
      a: "Children below 5 years are generally not allowed. Minors must be accompanied by an adult. There is no strict weight limit, but participants should be physically fit enough to stand for about 60 minutes during the flight."
    },
    {
      q: "What happens if a flight is cancelled due to weather?",
      a: "Safety is our priority. If the wind conditions or visibility are unfavorable, the pilot may cancel the flight. In such cases, we offer a full refund or the option to reschedule to the next available date."
    },
    {
      q: "What should I wear for the ride?",
      a: "We recommend comfortable, casual outdoor clothing and flat closed-toe shoes (sports shoes are ideal). Avoid skirts, high heels, or loose jewelry. A light jacket is recommended as it can be chilly before sunrise."
    }
  ];

  // Traveler feedback lists
  const reviewsList = [
    {
      name: "Siddharth Malhotra",
      rating: 5,
      date: "May 12, 2026",
      text: "Absolutely mindblowing experience in Jaipur! Rising above the Amer Fort at sunrise was sheer magic. The crew was professional, and the landing was incredibly smooth. Highly recommend!"
    },
    {
      name: "Kriti Sen",
      rating: 5,
      date: "April 18, 2026",
      text: "The Lonavala flight was breathtaking. The green Western Ghats covered in morning fog looked surreal. Worth every single penny!"
    },
    {
      name: "Manish Pandey",
      rating: 4,
      date: "March 29, 2026",
      text: "Rishikesh ballooning gives a peaceful view of the Ganga. Very calm and relaxing ride. Great service by FriskyTrails."
    }
  ];

  // Gallery Photos (6 photos with different sizes to fit our masonry layout)
  const travelerPhotos = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=400&q=80"
  ];

  // Other Popular Activities (3 vertical cards)
  const otherActivities = [
    {
      title: "Scuba Diving",
      location: "Andaman Islands",
      img: "/services/scuba_diving.png"
    },
    {
      title: "Paragliding",
      location: "Bir Billing",
      img: "/services/paragliding.png"
    },
    {
      title: "Rock Climbing",
      location: "Manali",
      img: "/services/rock_climbing.png"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#FEF0E6] flex flex-col justify-center items-center py-20">
        <div className="w-full max-w-7xl px-4 space-y-8">
          <Skeleton height="55vh" width="100%" borderRadius="1.5rem" />
          <div className="flex justify-center">
            <Skeleton height="3.5rem" width="220px" borderRadius="9999px" />
          </div>
          <Skeleton height="8rem" width="100%" borderRadius="2rem" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton height="350px" width="100%" borderRadius="1.5rem" />
            <Skeleton height="350px" width="100%" borderRadius="1.5rem" />
            <Skeleton height="350px" width="100%" borderRadius="1.5rem" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FEF0E6] text-gray-900 pb-16 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="relative min-h-[500px] md:h-[643px] w-full flex items-center overflow-hidden">
        {/* Background image container with Figma styling */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 transition-transform duration-10000 hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(10,3,34,0.65) 30%, rgba(10,3,34,0.2) 100%), url('/services/balloon_hero.jpg')`,
          }}
        />
        
        <div className="max-w-[1274px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-2xl text-left flex flex-col justify-center py-12 md:py-20 md:pl-[111px]">
            <h1 
              className="text-4xl sm:text-5xl md:text-[52px] lg:text-[65px] font-normal text-[#FFFAF6] tracking-tight leading-[1.2] md:leading-[65px] lg:leading-[117px] font-['Konkhmer_Sleokchher'] max-w-[407px]"
              style={{ fontFamily: "'Konkhmer Sleokchher', sans-serif" }}
            >
              Hot Air <span className="text-[#FF4F14]">Balloons</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 font-medium leading-relaxed max-w-xl">
              Get <span className="text-[#FF4F14]">Special Offers</span> on India Hot Air Balloons packages
            </p>
          </div>
        </div>
      </div>

      {/* 2. CTA CONNECT WITH US */}
      <div className="hidden sm:flex justify-center items-center mt-12 px-4">
        <button
          onClick={() => openBookingForm("General Hot Air Balloon Inquiry")}
          className="w-full sm:w-auto bg-[#FF6321] hover:bg-orange-600 text-white font-extrabold px-10 py-4.5 rounded-full shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all duration-300 text-lg flex items-center justify-center gap-2 group"
        >
          Connect with us <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

        {/* 3. DESCRIPTION CARD */}
        <div 
          className="mx-auto w-full max-w-[1139px] rounded-[32px] p-6 sm:p-8 md:p-12 lg:p-16 shadow-xl border border-gray-100/30"
          style={{
            background: "rgba(217, 217, 217, 0.52)",
          }}
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Hot Air Balloons in India
          </h2>
          <p className="text-xs sm:text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
            <span className="sm:hidden">
              {descExpanded 
                ? "Hot air ballooning is one of the most peaceful and breathtaking adventure activities in India. Audacious yet tranquil, in the sky while enjoying panoramic views of vast landscapes as they golden deserts, lush green valleys, winding rivers, and magnificent historical structures. Unlike fast-paced adventure sports, hot air balloon rides offer a calm and soothing experience. There is no rush, no noise, just the soft sound of the burner and the feeling of slowly rising above the ground. The unique views of the environment from this altitude help to explore nature from a completely new perspective."
                : "Hot air ballooning is one of the most peaceful and breathtaking adventure activities in India. Audacious yet tranquil, in the sky while enjoying panoramic views of vast landscapes as they golden deserts..."
              }
            </span>
            <span className="hidden sm:inline">
              Hot air ballooning is one of the most peaceful and breathtaking adventure activities in India. 
              Audacious yet tranquil, in the sky while enjoying panoramic views of vast landscapes as they golden deserts, 
              lush green valleys, winding rivers, and magnificent historical structures. Unlike fast-paced adventure sports, 
              hot air balloon rides offer a calm and soothing experience. There is no rush, no noise, just the soft sound of 
              the burner and the feeling of slowly rising above the ground. The unique views of the environment from this altitude 
              help to explore nature from a completely new perspective.
            </span>
          </p>
          <button 
            onClick={() => setDescExpanded(!descExpanded)}
            className="sm:hidden mt-3 text-xs font-bold text-[#FF6321] hover:underline focus:outline-none"
          >
            {descExpanded ? "Read Less" : "Read More"}
          </button>
        </div>

        {/* 4. INDIA HOT AIR BALLOONS PACKAGES */}
        <div className="mt-20 md:mt-28">
          <div className="text-center mb-12">
            <span className="text-[#FF6321] font-bold text-sm tracking-widest uppercase">Explore Offers</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-2 text-gray-900">
              India Hot Air Balloons Packages
            </h2>
            <div className="w-20 h-1 bg-[#FF6321] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Grid of 9 Packages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center max-w-[1098.5px] mx-auto w-full">
            {balloonPackages.map((pkg, i) => (
              <div key={i} className="w-full max-w-[320px] bg-white rounded-[6px] overflow-hidden border border-[#FF4F14] hover:shadow-2xl transition-all duration-300 flex flex-col group pb-5">
                <div className="relative w-full h-[230px] shrink-0 overflow-hidden border-b border-[#FF4F14]">
                  <img
                    src={pkg.img}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white font-extrabold px-4 py-1.5 rounded-full text-sm shadow-md">
                    {pkg.price}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"></div>
                </div>
                
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-2xl font-extrabold text-gray-900 group-hover:text-[#FF6321] transition-colors duration-300">
                      {pkg.title}
                    </h4>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed line-clamp-2">
                      {pkg.desc}
                    </p>
                  </div>
                  
                  <div className="flex justify-center mt-3">
                    <button
                      onClick={() => openBookingForm(pkg.title)}
                      className="bg-[#FF6321] text-white font-bold px-8 py-2 rounded-full shadow hover:bg-orange-600 transition duration-200 text-sm active:scale-95"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. BEST HOT AIR BALLOONS DESTINATIONS */}
        <div className="mt-24 md:mt-32">
          <div className="text-center mb-14">
            <span className="text-[#FF6321] font-bold text-sm tracking-widest uppercase">Popular Locations</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-2 text-gray-900">
              Best Hot Air Balloons Destinations
            </h2>
            <div className="w-20 h-1 bg-[#FF6321] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestDestinations.map((dest, i) => (
              <div
                key={i}
                className="relative h-[420px] rounded-[6px] overflow-hidden shadow-lg hover:shadow-2xl group cursor-pointer"
                onClick={() => openBookingForm(`Hot Air Balloon in ${dest.name}`)}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-white font-black text-3xl tracking-widest text-center">
                    {dest.name}
                  </h3>
                  <div className="w-12 h-1 bg-orange-500 mx-auto mt-4 group-hover:w-24 transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Accent Horizontal Divider */}
          <div className="mt-20 flex justify-center">
            <div className="w-[80%] max-w-2xl h-0.5 bg-orange-500/30 rounded-full"></div>
          </div>
        </div>

        {/* 6. FAQs ACCORDION */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">FAQs</h2>
            <div className="w-16 h-1 bg-[#FF6321] mx-auto mt-3 rounded-full"></div>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isExpanded = expandedFaq === i;
              return (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-orange-50/10 transition-colors duration-150"
                  >
                    <span className="font-bold text-gray-800 text-base sm:text-lg pr-4">
                      {faq.q}
                    </span>
                    <span className="p-1 rounded-full bg-[#FF6321]/10 text-[#FF6321] shrink-0">
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 text-gray-500 text-sm sm:text-base leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. REVIEWS & RATINGS */}
        <div className="mt-24 bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">

            {/* Left Score Card */}
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center lg:border-r border-gray-100 lg:pr-8">
              <h2 className="text-2xl font-extrabold text-gray-800">Reviews</h2>
              <div className="flex items-center gap-1.5 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h1 className="text-7xl font-black text-[#FF6321] mt-4">4.5</h1>
              <p className="text-gray-400 mt-2 text-sm font-semibold text-center">Average rating from 310+ flyers</p>
            </div>

            {/* Middle Bar Chart */}
            <div className="w-full lg:w-2/3 space-y-3.5">
              {[
                { stars: 5, pct: "78%" },
                { stars: 4, pct: "14%" },
                { stars: 3, pct: "5%" },
                { stars: 2, pct: "2%" },
                { stars: 1, pct: "1%" },
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
            {reviewsList.map((rev, i) => (
              <div key={i} className="bg-[#FEF0E6]/20 p-6 rounded-xl border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-start hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
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
                <div className="flex gap-2 mt-4 sm:mt-0 shrink-0">
                  <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden border border-white shadow-sm">
                    <img src={travelerPhotos[0]} alt="review thumbnail" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden border border-white shadow-sm">
                    <img src={travelerPhotos[1]} alt="review thumbnail" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. PHOTOS GALLERY */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Photos</h2>
            <div className="w-16 h-1 bg-[#FF6321] mx-auto mt-3 rounded-full"></div>
          </div>
          
          {/* Custom Grid Layout representing the Figma design */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="md:col-span-2 md:row-span-2 aspect-video md:aspect-auto md:h-[400px] rounded-xl overflow-hidden shadow-sm hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
              <img src={travelerPhotos[0]} alt="Big Balloon shot" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
              <img src={travelerPhotos[1]} alt="Balloon close up" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
              <img src={travelerPhotos[2]} alt="Ascending balloons" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
              <img src={travelerPhotos[3]} alt="Scenic balloon flight" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
              <img src={travelerPhotos[4]} alt="Morning flight view" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="col-span-1 md:col-span-2 aspect-video md:aspect-auto md:h-[190px] rounded-xl overflow-hidden shadow-sm hover:scale-[1.02] hover:shadow-lg transition-all duration-300">
              <img src={travelerPhotos[5]} alt="Balloons sunset" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>

        {/* 9. OTHER POPULAR ACTIVITIES */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Other Popular Activities
            </h2>
            <div className="w-20 h-1 bg-[#FF6321] mx-auto mt-3 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherActivities.map((act, i) => (
              <div
                key={i}
                className="relative h-96 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                onClick={() => openBookingForm(act.title)}
              >
                <img
                  src={act.img}
                  alt={act.title}
                  className="absolute inset-0 w-full h-full object-cover scale-[1.05] group-hover:scale-115 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-end justify-center pb-8 z-10">
                  <div 
                    className="w-[213px] h-[74px] rounded-[50px] flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(217, 217, 217, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    <span className="text-white font-bold text-[22px] tracking-wide text-center">
                      {act.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10. PROMOTIONAL BANNER */}
        <div className="mt-24 relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
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

      {/* 11. REUSED SECTIONS */}
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
          initialMessage={selectedPackage}
        />
      )}
    </div>
  );
};

export default AdventureDetail;
