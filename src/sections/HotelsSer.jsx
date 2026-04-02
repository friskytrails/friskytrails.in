import "/src/styles/Class.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import HillImage from "/services/hotels.webp";
import Deals from "./Deals";
import HotelsForm from "../components/HotelsForm";

const HotelsSer = () => {
  return (
    <>
     <div className="min-h-screen mt-12 md:mt-20 w-full xl:mt-24">
        {/* Banner Section */}
        <div
          className="h-[40vh] sm:h-[50vh] md:h-[60vh] w-full"
          style={{
            backgroundImage: `url(${HillImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Form & Deals */}
        <HotelsForm />
        <Deals />

        {/* Testimonials Banner */}
        <div className="min-h-[70vh] w-full flex items-center justify-center px-4">
          <div
            className="hidden md:block w-full sm:w-[90%] md:w-[80%] lg:w-[80%] h-[50vh] rounded-3xl shadow-6xl p-4 relative"
            style={{
              backgroundImage: `url('/holidaysimages/testimonial.webp')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold pt-20 md:pt-28 pl-4">
              Loved For Experiences!
            </h2>
            <p className="text-white text-base sm:text-lg pl-4 max-w-[90%] md:max-w-[40%] mt-2">
              Read stories from travellers who trusted us to craft their perfect
              journeys!
            </p>
            <button className="bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 mt-4 ml-4 text-white font-bold rounded-full py-2 px-6 text-sm sm:text-base">
              View Testimonials
            </button>
          </div>
          <div
            className="md:hidden w-full sm:w-[90%] md:w-[80%] lg:w-[80%] h-[50vh] rounded-3xl shadow-6xl p-4 relative"
            style={{
              backgroundImage: `url('/holidaysimages/testimonialmob.webp')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className="text-white text-center text-2xl sm:text-3xl md:text-4xl font-semibold">
              Loved For Experiences!
            </h2>
            <p className="text-white text-base sm:text-lg pl-4 max-w-[100%] mt-1">
              Read stories from travellers who trusted us to craft their
              journeys!
            </p>
            <button className="bg-gradient-to-r hidden from-[rgb(255,99,33)] to-amber-400 mt-41 ml-16 text-white font-bold rounded-full py-1 px-2 text-xs">
              View Testimonials
            </button>
          </div>
        </div>

        {/* Holiday Packages */}
        <div className="w-full max-w-[1280px] px-4 sm:px-8 md:px-12 mx-auto py-10">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">
            Find Your Perfect “Holiday” Package
          </h2>
          <p className="pt-4 text-sm sm:text-base">
            At FriskyTrails, we believe travel should be hassle-free, exciting,
            and tailored just for you. Whether you’re planning a family
            vacation, a romantic getaway, or a thrilling solo adventure, we have
            something for every kind of traveller.
          </p>

          {/* Flex Container for text & image */}
          <div className="flex flex-col lg:flex-row gap-8 mt-6">
            {/* Left Text Column */}
            <div className="w-full lg:w-1/2">
              <h3 className="font-semibold text-lg sm:text-xl pt-2">
                ✨ Adventure Escapes
              </h3>
              <p className="pt-2 text-sm sm:text-base">
                Craving an adrenaline rush? Try our adventure-packed getaways
                featuring: <br />
                ✔ Paragliding in Bir Billing – Soar above the majestic valleys. <br />
                ✔ Scuba Diving in Andaman – Explore the vibrant underwater world. <br />
                ✔ Trekking to Kedarkantha – A winter wonderland awaits!
              </p>

              <h3 className="font-semibold text-lg sm:text-xl pt-4">
                🏝️ Beach & Island Retreats
              </h3>
              <p className="pt-2 text-sm sm:text-base">
                Nothing beats the sun, sand, and sea! Discover: <br />
                ✔ Goa's Pristine Beaches – Beach parties, sunsets & water sports. <br />
                ✔ Lakshadweep & Andaman – Crystal-clear waters & secluded escapes. <br />
                ✔ Pondicherry’s French Vibes – A blend of culture & relaxation.
              </p>

              <h3 className="font-semibold text-lg sm:text-xl pt-4">
                🏞️ Hills & Nature Lovers’ Paradise
              </h3>
              <p className="pt-2 text-sm sm:text-base">
                Love the mountains? Indulge in: <br />
                ✔ Manali & Shimla Road Trips – Drive through mesmerizing landscapes. <br />
                ✔ Darjeeling & Sikkim – Tea gardens, monasteries & misty mornings. <br />
                ✔ Munnar & Ooty – Breathe in the fresh mountain air.
              </p>
            </div>

            {/* Right Image Column */}
            <div
              className="w-full lg:w-1/2 h-[250px] sm:h-[350px] lg:h-auto rounded-2xl shadow-2xl"
              style={{
                backgroundImage: `url('/holidaysimages/holiday.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>

          {/* Exclusive Offers */}
          <h3 className="font-semibold text-lg sm:text-xl pt-6">
            Exclusive Offers & Rewards!
          </h3>
          <p className="pt-2 text-sm sm:text-base">
            💰 Save More with FriskyTrails Cash – Earn rewards every time you book & review your trip. <br />
            🎉 Refer & Earn – Share your joy, and get ₹400 when your friend completes a booking. <br />
            🚀 Start planning your dream vacation today with FriskyTrails – because every journey should be unforgettable!
          </p>
        </div>
      </div>
    </>
  );
};

export default HotelsSer;
