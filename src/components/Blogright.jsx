import { useState, useEffect } from "react";
import Form from "../components/Popupform";

const Blogright = () => {
  const [showForm, setShowForm] = useState(false);

  // Toggle function
  const toggleForm = () => setShowForm(!showForm);

  // Function to close modals on scroll
  const handleScroll = () => {
    setShowForm(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="w-full max-w-[400px] h-[260px] flex items-center mx-auto mt-4 lg:mt-0"
        style={{
          height: "200px",
          width: "100%",
          backgroundImage: "url('/blogimages/trip.webp')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-white opacity-90 h-[160px] w-[92%] flex flex-col justify-center gap-2 p-4 rounded-lg m-auto">
          <h2 className="text-xl text-orange-500 font-bold tracking-tight">
            Looking for a perfect trip?
          </h2>
          <p className="text-black tracking-tighter">
            Connect with our team of experts and plan a perfect getaway with your loved ones.
          </p>
          <button
            onClick={toggleForm}
            className="bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 font-semibold rounded-full active:scale-90 transition-all duration-300 hover:bg-amber-400 text-white py-3"
          >
            Get Quote
          </button>
          {showForm && <Form onClose={() => setShowForm(false)} />}
        </div>
      </div>
      <div className="w-full max-w-[400px] h-[400px] mt-6 rounded-2xl mx-auto bg-[url('/blogimages/banner2.webp')] bg-cover bg-center">
      </div>
    </>
  );
};

export default Blogright;
