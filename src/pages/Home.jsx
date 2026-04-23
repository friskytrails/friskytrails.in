

import { useEffect, useState, lazy, Suspense } from "react";
import Landing from "../sections/Landing";
import LazySection from "../components/LazySection";

// Lazy load sections below the fold
const Categories = lazy(() => import("../sections/Categories"));
const Banner = lazy(() => import("../sections/Banner"));
const Cards = lazy(() => import("../sections/Cards"));
const Next = lazy(() => import("../sections/Next"));
const Choose = lazy(() => import("../sections/Choose"));
const Blogs = lazy(() => import("../sections/Blogs"));
const Rewards = lazy(() => import("../sections/Rewards"));
const Testimonial = lazy(() => import("../sections/Testimonial"));
import { Helmet } from "react-helmet-async";
import Skeleton from "../components/Skeleton";


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
      <Helmet>
        <title>FriskyTrails | Adventure Tours, Trekking & Seasonal Activities in India</title>
        <link rel="canonical" href="https://www.friskytrails.in/" />
        <meta name="description" content="Explore India's most stunning destinations with FriskyTrails. We offer curated adventure tours, trekking, camping, and seasonal activities across India." />
      </Helmet>
      <h1 className="sr-only">Home</h1>
      <Landing />
      <LazySection height="200px">
        <Categories />
      </LazySection>
      <LazySection height="400px">
        <Banner />
      </LazySection>
      <LazySection height="600px">
        <Cards />
      </LazySection>
      <LazySection height="400px">
        <Next />
      </LazySection>
      <LazySection height="400px">
        <Choose />
      </LazySection>
      <LazySection height="500px">
        <Blogs />
      </LazySection>
      <LazySection height="400px">
        <Rewards />
      </LazySection>
      <LazySection height="400px">
        <Testimonial />
      </LazySection>
    </>
  );
};

export default Home;
