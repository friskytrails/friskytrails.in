import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Mobile1 from "/bannerimages/1_result.webp";
import Mobile2 from "/bannerimages/2_result.webp";
import Mobile3 from "/bannerimages/3_result.webp";

import Desktop1 from "/bannerimages/1.png";
import Desktop2 from "/bannerimages/2.png";
import Desktop3 from "/bannerimages/3.png";

const Banner = () => {
  const mobileData = [Mobile1, Mobile2, Mobile3];
  const desktopData = [Desktop1, Desktop2, Desktop3];

  const swiperSettings = {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: { clickable: true },
    autoplay: { delay: 4500, disableOnInteraction: false },
    modules: [EffectCoverflow, Pagination, Autoplay],
  };

  return (
    <div className="banner h-auto w-full md:w-[90vw] lg:w-[80vw] mx-auto flex justify-center items-center px-4 md:px-0">
      {/* Mobile Swiper */}
      <div className="block md:hidden w-full h-[150px]">
        <Swiper {...swiperSettings} slidesPerView={1} className="w-full h-full">
          {mobileData.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat rounded-xl shadow-lg"
                style={{ backgroundImage: `url(${item})` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop Swiper */}
      <div className="hidden md:block w-full h-[300px]">
        <Swiper {...swiperSettings} slidesPerView={1} className="w-full h-full">
          {desktopData.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat rounded-2xl shadow-xl"
                style={{ backgroundImage: `url(${item})` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;