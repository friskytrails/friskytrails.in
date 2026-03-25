

import Cards from "../sections/Cards";
import Categories from "../sections/Categories";
import Banner from "../sections/Banner";
import Landing from "../sections/Landing";
import Next from "../sections/Next";
import Choose from "../sections/Choose";
import Rewards from "../sections/Rewards";
import Blogs from "../sections/Blogs";
import Testimonial from "../sections/Testimonial";
import FriskyLoader from "../components/Loader";
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
      <div 
        className="flex items-center justify-center min-h-[70vh] py-20 px-4"
     
      >
        <FriskyLoader size="md" text="" />
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
