import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import Share from "../assets/share.svg";
import Payment from "../assets/payment.svg";
import Call from "../assets/calling.svg";
import { Star, StarHalf } from "lucide-react"; // Add these imports

import toast from "react-hot-toast";

import {
  getProductBySlug,
  getProductTypeById,
  getCityById,
} from "../api/admin.api";
import Content from "../Productpage/Content";
import BookingModal from "../components/BookingModal";
import Choose from "../sections/Choose";
import FriskyLoader from "../components/Loader";
import { MapPin } from "lucide-react";
import Testimonial from "../sections/Testimonial";

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [thingsToCarry, setThingsToCarry] = useState([]);
  const [howToReach, setHowToReach] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  /* =====================
     SHARE HANDLER
  ===================== */
  const handleShare = async () => {
    try {
      const url = `https://www.friskytrails.in/tours/${slug}`;
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  /* =====================
     Star Rating Component
  ===================== */
  const StarRating = ({ rating, reviews, size = 20 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
  
    return (
      <div className="flex items-center gap-1">
        
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
  
        {/* Half Star */}
        {hasHalfStar && (
          <StarHalf size={size} className="fill-yellow-400 text-yellow-400" />
        )}
  
        {/* Rating Text */}
        <span className="ml-1 text-sm font-medium text-gray-700">
          {rating}/5
        </span>
  
        {/* Reviews */}
        <span className="ml-1 text-sm text-gray-500">
          ({reviews || 0})
        </span>
  
      </div>
    );
  };

  // Images used for the small-device slider
  const sliderImages = useMemo(() => 
    product?.sliderImages && product.sliderImages.length > 0
      ? product.sliderImages
      : product?.images || [],
    [product]
  );

  /* =====================
     AUTO IMAGE SLIDER (unchanged)
  ===================== */
  useEffect(() => {
    if (!sliderImages || sliderImages.length === 0) return;

    let interval;

    const start = () => {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
      }, 3000);
    };

    const stop = () => clearInterval(interval);

    if (document.visibilityState === "visible") start();

    const onVisibilityChange = () => {
      document.visibilityState === "visible" ? start() : stop();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [sliderImages]);

  /* =====================
     DATA FETCH (unchanged)
  ===================== */
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);

        const productRes = await getProductBySlug(slug);
        const productData = productRes.data;
        setProduct(productData);

        // Default to first package when data is loaded
        if (Array.isArray(productData.packages) && productData.packages.length) {
          setSelectedPackageIndex(0);
        }

        const promises = [];

        if (productData.productType) {
          promises.push(getProductTypeById(productData.productType));
        }

        if (productData.city?._id) {
          promises.push(getCityById(productData.city._id));
        }

        const [typeRes, cityRes] = await Promise.all(promises);

        if (typeRes?.data?.thingsToCarry) {
          try {
            const parsed = JSON.parse(typeRes.data.thingsToCarry);
            setThingsToCarry(Array.isArray(parsed) ? parsed : [parsed]);
          } catch {
            setThingsToCarry(typeRes.data.thingsToCarry);
          }
        }

        if (cityRes?.data?.howToReach) {
          setHowToReach(cityRes.data.howToReach || "");
        }
      } catch (error) {
        console.error("Error fetching product/type/city:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  const openBookingModal = useCallback(() => setShowBooking(true), []);
  const closeBookingModal = useCallback(() => setShowBooking(false), []);

  if (loading || !product) {
    return <FriskyLoader />;
  }

  const selectedPackage =
    Array.isArray(product.packages) && product.packages.length
      ? product.packages[selectedPackageIndex] || product.packages[0]
      : null;

  const selectedPackageActual = selectedPackage
    ? Number(selectedPackage.actualPrice)
    : NaN;
  const selectedPackageDiscounted = selectedPackage
    ? Number(
        selectedPackage.discountedPrice ??
          selectedPackage.price ??
          selectedPackage.actualPrice
      )
    : NaN;

  const hasPackagePricing =
    !Number.isNaN(selectedPackageActual) &&
    !Number.isNaN(selectedPackageDiscounted) &&
    selectedPackageActual > 0 &&
    selectedPackageDiscounted >= 0;

  const savingsPercent =
    hasPackagePricing && selectedPackageActual > selectedPackageDiscounted
      ? Math.round(
          ((selectedPackageActual - selectedPackageDiscounted) /
            selectedPackageActual) *
            100
        )
      : null;

  return (
    <div className="min-h-screen w-full pb-24 lg:pb-0">
      {/* Breadcrumb - UPDATED WITH STARS */}
      <div className="w-full max-w-7xl mx-auto mt-10 md:mt-16 lg:mt-24 px-4 md:py-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl tracking-tighter font-bold pt-6">
          {product.name}
        </h1>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-wrap">
            {/* Star Rating Display */}
            <StarRating 
              rating={product.rating || 0} 
              reviews={product.reviews || 0}
              size={18}
            />
            
            {/* Location */}
            <h3 className="flex items-center gap-1 text-gray-500 text-sm sm:text-base">
              <MapPin size={16} className="text-gray-500" />
              {product.city?.name}, {product.state?.name}
            </h3>
          </div>

          <button
            onClick={handleShare}
            className="py-2 flex items-center justify-center gap-2 px-4 sm:px-6 font-semibold text-white active:scale-95 transition-all duration-300 bg-[rgb(233,99,33)] rounded-3xl text-sm sm:text-base w-fit"
          >
            <img className="invert h-4 w-4 sm:h-5 sm:w-5" src={Share} alt="share" />
            Share
          </button>
        </div>
      </div>

      {/* Images Section - UNCHANGED */}
      <div className="h-auto w-full pt-4 px-4">
        <div className="w-full max-w-7xl rounded-lg bg-white mx-auto">
          {product.images && product.images.length > 0 && (
            <>
              {/* Mobile & Tablet Auto Slider (uses sliderImages if provided) */}
              <div className="block lg:hidden relative overflow-hidden rounded-xl shadow-2xl">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {sliderImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-full h-64 sm:h-80 relative overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${img}')` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
                  {sliderImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 w-2 rounded-full ${
                        currentIndex === idx ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Desktop Grid View */}
              <div className="hidden lg:grid grid-cols-3 gap-3">
                <div className="space-y-3">
                  {product.images.slice(0, 2).map((img, idx) => (
                    <div
                      key={idx}
                      className="h-56 w-full rounded-2xl shadow-2xl relative overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-110"
                        style={{ backgroundImage: `url('${img}')` }}
                      ></div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center">
                  <div className="h-[28rem] w-full rounded-2xl shadow-2xl relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-110"
                      style={{
                        backgroundImage: `url('${product.images[2] || product.images[0]}')`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  {product.images.slice(3, 5).map((img, idx) => (
                    <div
                      key={idx}
                      className="h-56 w-full rounded-2xl shadow-2xl relative overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-110"
                        style={{ backgroundImage: `url('${img}')` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Rest of component UNCHANGED */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row px-4 gap-8 mt-5 md:mt-8 lg:mt-10">
        <div className="w-full lg:w-[68%] lg:order-1">
          <Content
            product={product}
            howToReach={howToReach}
            thingsToCarry={thingsToCarry}
            selectedPackageIndex={selectedPackageIndex}
            onSelectPackage={setSelectedPackageIndex}
          />
        </div>

        <div className="w-full lg:w-[32%] lg:order-2 pt-4 lg:pt-8 lg:pl-2 xl:pl-6">
          <div className="lg:sticky lg:top-28">
            {/* PRICE CARD */}
            <div className="hidden lg:block bg-white border border-orange-500 rounded-lg shadow-md overflow-hidden">
              <div className="bg-orange-500 py-4 relative">
                {hasPackagePricing && savingsPercent !== null && savingsPercent > 0 && (
                  <span className="text-white absolute right-2 top-1">
                    Save {savingsPercent}%
                  </span>
                )}
              </div>
              <div className="p-4 flex justify-between items-center gap-4">
                <div>
                  {hasPackagePricing && (
                    <>
                      <span className="line-through text-gray-500">
                        ₹{selectedPackageActual.toLocaleString("en-IN")}
                      </span>
                      <h2 className="text-3xl font-bold text-orange-500">
                        ₹{selectedPackageDiscounted.toLocaleString("en-IN")}
                      </h2>
                    </>
                  )}
                  <span className="font-semibold">per person</span>
                </div>
                <button
                  onClick={openBookingModal}
                  className="py-2 px-6 font-semibold text-white bg-[rgb(233,99,33)] rounded-3xl"
                >
                  Book Now
                </button>
              </div>
              <div className="flex gap-2 px-4 pb-4">
                <img src={Payment} className="h-5 w-5" alt="" />
                <p className="text-sm">
                  <span className="underline font-semibold">
                    Reserve now & pay later
                  </span>
                </p>
              </div>
            </div>

            {/* CONTACT CARD */}
            <div className="hidden md:block bg-white border border-orange-500 rounded-lg shadow-md p-4 mt-10">
              <h2 className="text-orange-500 text-xl font-semibold">
                Got a Question?
              </h2>
              <p className="mt-2">
                Our destination expert will be happy to help you.
              </p>
              <div className="flex gap-4 items-center mt-4">
                <div className="bg-orange-500 h-10 w-10 rounded-full flex items-center justify-center">
                  <img className="invert h-5 w-5" src={Call} alt="call" />
                </div>
                <div>
                  <a href="tel:+91-7877979193" className="font-semibold text-lg">
                    +91-78779 79193
                  </a>
                  <p className="text-sm">Mon-Sun: 9AM-8PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bar */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 bg-white border-t border-orange-500 shadow-md py-5 px-4 flex justify-between items-center z-50">
        <div className="min-w-0">
          {hasPackagePricing && (
            <>
              <span className="line-through text-gray-500">
                ₹{selectedPackageActual.toLocaleString("en-IN")}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-orange-500">
                  ₹{selectedPackageDiscounted.toLocaleString("en-IN")}
                </span>
                <span className="text-gray-600">per person</span>
              </div>
            </>
          )}
        </div>
        <button
          onClick={openBookingModal}
          className="py-2 px-4 font-semibold text-white bg-[rgb(233,99,33)] rounded-3xl whitespace-nowrap"
        >
          Book Now
        </button>
      </div>

      <Testimonial className="!mt-3 md:!mt-5 lg:!mt-7" />

      <div className="mt-3 md:mt-5 lg:mt-7 mb-0 lg:mb-6">
        <Choose />
      </div>


      {showBooking && (
        <BookingModal productSlug={product.slug} onClose={closeBookingModal} />
      )}
    </div>
  );
};

export default ProductDetails;
