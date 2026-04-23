import { useEffect, useState, useCallback, useMemo, lazy } from "react";
import { useParams } from "react-router-dom";
import Share from "../assets/share.svg";
import Payment from "../assets/payment.svg";
import Call from "../assets/calling.svg";
import { Star, StarHalf, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";

import {
  getProductBySlug,
  getProductTypeById,
  getCityById,
} from "../api/admin.api";
import Content from "../Productpage/Content";
import BookingModal from "../components/BookingModal";
import LazySection from "../components/LazySection";
const Choose = lazy(() => import("../sections/Choose"));
const Testimonial = lazy(() => import("../sections/Testimonial"));
import Skeleton from "../components/Skeleton";

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [thingsToCarry, setThingsToCarry] = useState([]);
  const [howToReach, setHowToReach] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Function to optimize Cloudinary URL
  const optimizeUrl = (url, width = 1200) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  };

  /* =====================
     Star Rating Component
  ===================== */
  const StarRating = ({ rating, reviews, size = 20 }) => {
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 >= 0.5;
  
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            className="fill-yellow-400 text-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <StarHalf size={size} className="fill-yellow-400 text-yellow-400" />
        )}
        <span className="ml-1 text-sm font-medium text-gray-700">
          {(rating || 0)}/5
        </span>
        <span className="ml-1 text-sm text-gray-500">
          ({reviews || 0})
        </span>
      </div>
    );
  };

  const sliderImages = useMemo(() => 
    product?.sliderImages && product.sliderImages.length > 0
      ? product.sliderImages
      : product?.images || [],
    [product]
  );

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

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const productRes = await getProductBySlug(slug);
        const productData = productRes.data;
        setProduct(productData);
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
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [slug]);

  const openBookingModal = useCallback(() => setShowBooking(true), []);
  const closeBookingModal = useCallback(() => setShowBooking(false), []);

  const selectedPackage =
    Array.isArray(product?.packages) && product.packages.length
      ? product.packages[selectedPackageIndex] || product.packages[0]
      : null;

  const selectedPackageActual = selectedPackage ? Number(selectedPackage.actualPrice) : NaN;
  const selectedPackageDiscounted = selectedPackage ? Number(selectedPackage.discountedPrice ?? selectedPackage.price ?? selectedPackage.actualPrice) : NaN;
  const hasPackagePricing = !Number.isNaN(selectedPackageActual) && !Number.isNaN(selectedPackageDiscounted) && selectedPackageActual > 0;
  const savingsPercent = hasPackagePricing && selectedPackageActual > selectedPackageDiscounted ? Math.round(((selectedPackageActual - selectedPackageDiscounted) / selectedPackageActual) * 100) : null;

  return (
    <div className="min-h-screen w-full pb-24 lg:pb-0">
      <Helmet>
        <title>{product ? `${product.name} | FriskyTrails` : "Tour Details | FriskyTrails"}</title>
        <link rel="canonical" href={`https://www.friskytrails.in/tours/${slug}`} />
        <meta name="description" content={product?.description?.replace(/<[^>]+>/g, "").slice(0, 160)} />
      </Helmet>

      {/* Breadcrumb Area */}
      <div className="w-full max-w-7xl mx-auto px-4 md:py-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl tracking-tighter font-bold pt-6">
          {loading ? <Skeleton width="60%" height="2.5rem" /> : product.name}
        </h1>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-wrap">
            {loading ? (
              <Skeleton width="150px" height="1.25rem" />
            ) : (
              <StarRating rating={product.rating} reviews={product.reviews} size={18} />
            )}
            {loading ? (
              <Skeleton width="120px" height="1.25rem" />
            ) : (
              <h3 className="flex items-center gap-1 text-gray-500 text-sm sm:text-base">
                <MapPin size={16} className="text-gray-500" />
                {product.city?.name}, {product.state?.name}
              </h3>
            )}
          </div>
          {!loading && (
            <button onClick={() => {}} className="py-2 flex items-center justify-center gap-2 px-4 sm:px-6 font-semibold text-white bg-[rgb(233,99,33)] rounded-3xl text-sm sm:text-base w-fit">
              <img className="invert h-4 w-4" src={Share} alt="Share this tour" /> Share
            </button>
          )}
        </div>
      </div>

      {/* Images Section */}
      <div className="h-auto w-full pt-4 px-4">
        <div className="w-full max-w-7xl rounded-lg bg-white mx-auto">
          {loading ? (
             <div className="w-full h-64 sm:h-80 lg:h-[28rem]">
                <Skeleton height="100%" borderRadius="1rem" />
             </div>
          ) : product?.images?.length > 0 && (
            <>
              {/* Mobile slider */}
              <div className="block lg:hidden relative overflow-hidden rounded-xl shadow-2xl">
                <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                  {sliderImages.map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-full h-64 sm:h-80 relative">
                       <img 
                        src={optimizeUrl(img, 800)} 
                        alt={`${product.name} - View ${idx + 1}`} 
                        className="w-full h-full object-center object-cover"
                        loading={idx === 0 ? "eager" : "lazy"}
                        fetchPriority={idx === 0 ? "high" : "low"}
                        width="800"
                        height="400"
                       />
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Grid */}
              <div className="hidden lg:grid grid-cols-3 gap-3">
                <div className="space-y-3">
                  {product.images.slice(0, 2).map((img, idx) => (
                    <div key={idx} className="h-56 w-full rounded-2xl shadow-md overflow-hidden bg-gray-100">
                       <img src={optimizeUrl(img, 600)} alt={`${product.name} detail ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" width="600" height="300" />
                    </div>
                  ))}
                </div>
                <div className="h-[28rem] w-full rounded-2xl shadow-xl overflow-hidden bg-gray-100">
                   <img 
                    src={optimizeUrl(product.images[2] || product.images[0], 1000)} 
                    alt={`${product.name} Hero View`} 
                    className="w-full h-full object-top object-cover hover:scale-105 transition-transform duration-500"
                    fetchPriority="high"
                    width="1000"
                    height="500"
                   />
                </div>
                <div className="space-y-3">
                  {product.images.slice(3, 5).map((img, idx) => (
                    <div key={idx} className="h-56 w-full rounded-2xl shadow-md overflow-hidden bg-gray-100">
                       <img src={optimizeUrl(img, 600)} alt={`${product.name} detail ${idx + 4}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" width="600" height="300" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row px-4 gap-8 mt-5">
        <div className="w-full lg:w-[68%]">
          {loading ? (
             <div className="space-y-4 pt-10">
                <Skeleton height="2rem" width="40%" />
                <Skeleton height="10rem" width="100%" />
                <Skeleton height="2rem" width="40%" />
                <Skeleton height="15rem" width="100%" />
             </div>
          ) : (
            <Content product={product} howToReach={howToReach} thingsToCarry={thingsToCarry} selectedPackageIndex={selectedPackageIndex} onSelectPackage={setSelectedPackageIndex} />
          )}
        </div>

        <div className="w-full lg:w-[32%] pt-4 lg:pt-8">
          <div className="lg:sticky lg:top-28 space-y-6">
            {loading ? (
              <div className="space-y-4">
                 <Skeleton height="15rem" width="100%" borderRadius="1rem" />
                 <Skeleton height="15rem" width="100%" borderRadius="1rem" />
              </div>
            ) : (
              <>
                {/* RESTORED PRICE CARD UI */}
                <div className="hidden lg:block bg-white border border-orange-500 rounded-xl shadow-md overflow-hidden">
                  <div className="bg-orange-500 py-4 px-4 flex justify-between items-center">
                     <span className="text-white font-bold">Tour Price</span>
                     {savingsPercent && <span className="text-white text-sm font-bold bg-white/20 px-2 py-1 rounded">Save {savingsPercent}%</span>}
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <div>
                      {hasPackagePricing && (
                        <>
                          <span className="line-through text-gray-500 text-sm">₹{selectedPackageActual.toLocaleString("en-IN")}</span>
                          <h2 className="text-3xl font-bold text-orange-500">₹{selectedPackageDiscounted.toLocaleString("en-IN")}</h2>
                        </>
                      )}
                      <span className="text-sm font-medium">per person</span>
                    </div>
                    <button onClick={openBookingModal} className="py-2.5 px-6 font-bold text-white bg-[rgb(233,99,33)] rounded-full hover:bg-orange-600 transition-colors">Book Now</button>
                  </div>
                  <div className="px-5 pb-5">
                     <div className="flex items-center gap-2 text-sm text-gray-600">
                        <img src={Payment} className="h-4 w-4" alt="Payment security icon" />
                        <span className="underline">Reserve now & pay later</span>
                     </div>
                  </div>
                </div>

                {/* RESTORED SUPPORT CARD UI */}
                <div className="hidden lg:block bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800">Got a Question?</h2>
                  <p className="text-gray-600 mt-2 text-sm">Our destination expert will be happy to help you with your queries.</p>
                  <div className="flex gap-4 items-center mt-6">
                    <div className="bg-orange-500 h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                      <img className="invert h-6 w-6" src={Call} alt="Call us icon" />
                    </div>
                    <div>
                      <a href="tel:+91-7877979193" className="font-bold text-lg text-gray-900 block hover:text-orange-500 transition-colors">
                        +91-78779 79193
                      </a>
                      <p className="text-xs text-gray-500">Mon-Sun: 9AM-8PM</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {!loading && (
        <>
          <LazySection height="400px" className="mt-20">
            <Testimonial />
          </LazySection>
          <LazySection height="400px">
            <Choose />
          </LazySection>
        </>
      )}

      {showBooking && <BookingModal productSlug={product.slug} onClose={closeBookingModal} />}
    </div>
  );
};

export default ProductDetails;
