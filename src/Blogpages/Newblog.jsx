import { useState } from "react";
import Right from "../assets/right.svg";
import Facebook from "../assets/facebook.svg";
import Twitter from "../assets/twitter.svg";
import Linkedin from "../assets/linkedin.svg";
import Instagram from "../assets/instagram.svg";
import Blogleft from "../components/Blogleft";
import Blogright from "../components/Blogright";

const Newblog = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    duration: "",
    budget: "",
    date: "",
    guests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      from: "",
      to: "",
      duration: "",
      budget: "",
      date: "",
      guests: "",
    });
  };

  return (
    <div className="min-h-screen mt-30 w-full">
      <div
        className="w-full min-h-[640px] bg-no-repeat bg-contain"
        style={{
          backgroundImage: "url('/images/bgbanner.svg')",
        }}
      >
        <div className="flex items-center gap-2 px-4 xl:pl-20 pt-6 text-sm sm:text-base">
          <h3 className="font-semibold">India</h3>
          <img className="h-4 w-4 mt-1" src={Right} alt="rightarrow" />
          <h3 className="font-semibold">Kerala</h3>
          <img className="h-4 w-4 mt-1" src={Right} alt="rightarrow" />
          <h3 className="font-semibold text-gray-600">Kochi</h3>
        </div>

        <h1 className="text-2xl sm:text-3xl xl:pl-20 md:text-4xl font-semibold tracking-tighter px-4 pt-8 md:pt-4">
          Places to see in Chennai
        </h1>

        <img
          className="mx-auto rounded-2xl mt-6 w-[90vw] max-w-5xl"
          src="/images/filters.webp"
          alt="image"
        />

        {/* Form Section */}
        <div className="bg-white w-[90vw] rounded-lg mt-6 mx-auto shadow-lg">
          <div className="grid grid-cols-3 text-xs sm:text-base pt-4 font-semibold">
            <h1 className="text-center border py-4 border-gray-300">
              Holidays
            </h1>
            <h1 className="text-center border py-4 border-gray-300">
              Adventures
            </h1>
            <h1 className="text-center border py-4 border-gray-300">Hotels</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-4 justify-center w-full px-4 py-2 md:py-6"
          >
            {/* From */}
            <div className="w-full sm:w-[45%] lg:w-[15%]">
              <label className="block font-semibold mb-1">From City</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                placeholder="Enter location"
                className="w-full px-3 py-1 md:px-3 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            {/* To */}
            <div className="w-full sm:w-[45%] lg:w-[15%]">
              <label className="block font-semibold mb-1">To City</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder="Enter destination"
                className="w-full px-3 py-1 md:px-3 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            {/* Duration */}
            <div className="w-full sm:w-[45%] lg:w-[15%]">
              <label className="block font-semibold mb-1">
                Duration (in Days)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Enter duration"
                className="w-full px-3 py-1 md:px-3 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            {/* Budget */}
            <div className="w-full sm:w-[45%] lg:w-[15%]">
              <label className="block font-semibold mb-1">Budget (in ₹)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter amount"
                min="0"
                step="1000"
                className="w-full px-3 py-1 md:px-3 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            {/* Date */}
            <div className="w-full sm:w-[45%] lg:w-[15%]">
              <label className="block font-semibold mb-1">Departure Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-1 md:px-3 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            {/* Guests */}
            <div className="w-full sm:w-[45%] lg:w-[15%]">
              <label className="block font-semibold mb-1">No. of Guests</label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                placeholder="No. of persons"
                className="w-full px-3 py-1 md:px-3 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            {/* Button */}
            <div className="w-full sm:w-auto mt-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 hover:scale-95 py-3 px-6 text-white rounded-xl font-semibold w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Blog Section */}
        <div className="w-full flex flex-col lg:flex-row pt-10 gap-6">
          {/* Left sidebar */}
          {/* <div className=""> */}

          <div className="lg:w-[15%] hidden xl:flex flex-col pl-6 items-center sticky top-0">
            <div className="flex gap-4 pt-6">
              <a href="https://www.facebook.com/friskytrails/" target="_blank">
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  src={Facebook}
                  alt=""
                  />
              </a>
              <a href="https://x.com/frisky_trails" target="_blank">
                <img className="w-8 h-8 sm:w-10 sm:h-10" src={Twitter} alt="" />
              </a>
              <a
                href="https://www.linkedin.com/company/friskytrails/"
                target="_blank"
                >
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  src={Linkedin}
                  alt=""
                  />
              </a>
              <a href="https://www.instagram.com/friskytrails/" target="_blank">
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  src={Instagram}
                  alt=""
                  />
              </a>
            {/* </div> */}
          </div>
            <div className="hidden xl:block w-[100%] h-[200px] sm:h-[300px] lg:h-[78vh] mt-4 bg-[url('/blogimages/blogbanner.png')] bg-cover bg-center rounded-lg shadow-lg" />
                  </div>

          {/* Middle content */}
          <div className="lg:w-[55%] w-full px-0 lg:pl-10 overflow-y-visible lg:overflow-y-auto custom-scrollbar lg:max-h-[calc(100vh-100px)]">
            <Blogleft />
          </div>

          {/* Right sidebar */}
          <div className="hidden lg:block lg:w-[30%] w-full sticky top-0">
            <Blogright />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newblog;
