import { Link } from "react-router-dom";

const Box = () => {
  const data = [
    {
      image: "/TrendingBlog/Kodaikanal.webp",
      des: "Places to Visit in Kodaikanal in 1 Day",
      link: "/blog/places-to-visit-in-kodaikanal-in-1-day",
    },
    {
      image: "/TrendingBlog/Calangute.webp",
      des: "Places to Visit Near Calangute",
      link: "/blog/places-to-visit-near-calangute",
    },
  
    {
      image: "/TrendingBlog/Pelling.webp",
      des: "Places to Visit in Pelling",
      link: "/blog/places-to-visit-in-pelling",
    },
    {
      image: "/TrendingBlog/Havelock.webp",
      des: "Places to Visit in Havelock Island",
      link: "/blog/places-to-visit-in-havelock",
    },
    {
      image: "/TrendingBlog/SouthGoa.webp",
      des: "Best Places to Visit in South Goa",
      link: "/blog/best-places-to-visit-in-south-goa",
    },
    {
      image: "/TrendingBlog/Ahemdabad.webp",
      des: "Places to Visit Near Ahmedabad Within 100 Km",
      link: "/blog/places-to-visit-near-ahmedabad-within-100-km",
    },
  ];
  
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="grid mt-3 grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="box flex h-[28vh] m-auto w-[80vw] sm:w-[60vw] md:w-[48vw] lg:w-[42vw] xl:w-[40vw]"
            >
              <img
                className="w-[35vw] sm:w-[30vw] md:w-[24vw] h-full object-cover rounded-l-4xl flex-shrink-0"
                src={item.image}
                alt=""
              />
              <div className="flex-1 pl-4 sm:pl-5 md:pl-6 pt-4 flex flex-col justify-between text-xl sm:text-[1.35rem] md:text-[1rem] lg:text-xl xl:text-2xl font-semibold tracking-tight">
                <h3 className="flex-1 ">{item.des}</h3>
                <Link to={item.link}>
                  <button className="bg-gradient-to-r md:mb-20 from-[rgb(255,99,33)] to-amber-400 border active:scale-90 transition-all duration-300 hover:bg-amber-400 text-white mt-2 text-base sm:text-lg font-semibold rounded-full px-5 sm:px-6 py-2 cursor-pointer self-start">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View - Fixed Consistent Layout */}
     {/* Mobile View - Fixed Equal Height Cards */}
<div className="md:hidden flex gap-4 overflow-x-auto px-4 pb-4">
  {data.map((item, index) => (
    <div
      key={index}
      className="box min-w-[80vw] max-w-[80vw] flex-shrink-0 bg-white shadow-md rounded-xl overflow-hidden flex flex-col"
    >
      {/* Image */}
      <img
        className="w-full h-[26vh] object-cover"
        src={item.image}
        alt=""
      />

      {/* Content */}
      <div className="px-4 py-4 flex flex-col flex-1 justify-between">
        {/* FIXED HEIGHT TITLE */}
        <h3 className="text-sm font-bold leading-snug line-clamp-2 min-h-[2.6rem]">
          {item.des}
        </h3>

        {/* Button ALWAYS at bottom */}
        <Link to={item.link}>
          <button className="w-full bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 active:scale-90 transition-all duration-300 text-white text-base font-semibold rounded-full py-2 mt-3">
            Read More
          </button>
        </Link>
      </div>
    </div>
  ))}
</div>

    </>
  );
};

export default Box;
