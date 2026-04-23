

import Cards from "../sections/Cards";
import Categories from "../sections/Categories";
import Banner from "../sections/Banner";
import Landing from "../sections/Landing";
import Next from "../sections/Next";
import Choose from "../sections/Choose";
import Rewards from "../sections/Rewards";
import Blogs from "../sections/Blogs";
import Testimonial from "../sections/Testimonial";
import Skeleton from "../components/Skeleton";
import { useEffect, useState } from "react";


const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate fast reload handling
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // 0.8 sec (adjust kar sakte ho)

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-white">
        {/* Landing Hero Skeleton */}
        <div className="w-full">
           <Skeleton height="72vh" width="100%" borderRadius="0" />
           {/* Animated Ticker Skeleton */}
           <div className="py-8 bg-gray-100 flex gap-10 overflow-hidden">
              <Skeleton width="400px" height="4rem" />
              <Skeleton width="400px" height="4rem" />
              <Skeleton width="400px" height="4rem" />
           </div>
        </div>

        {/* Categories Skeleton */}
        <div className="max-w-7xl mx-auto px-4 py-20">
           <div className="flex gap-4 overflow-hidden">
             {[...Array(6)].map((_, i) => (
                <Skeleton key={i} width="160px" height="160px" borderRadius="100%" />
             ))}
           </div>
        </div>

        {/* Hero Banner Skeleton */}
        <div className="max-w-7xl mx-auto px-4 mb-20">
           <Skeleton height="400px" width="100%" borderRadius="1rem" />
        </div>

        {/* Product Cards Skeleton */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                 <Skeleton height="300px" width="100%" borderRadius="1rem" />
                 <Skeleton height="1.5rem" width="80%" />
                 <Skeleton height="1rem" width="40%" />
              </div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="sr-only">Home</h1>
      <Landing />
      <Categories />
      <Banner />
      <Cards />
      <Next />
      <Choose />
      <Blogs />
      <Rewards />
      <Testimonial />
    </>
  );
};

export default Home;
