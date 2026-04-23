import { Link } from "react-router-dom";

const Box = () => {
  const data = [
    {
      image: "/TrendingBlog/Kodaikanal.webp",
      title: "Places to Visit in Kodaikanal in 1 Day",
    },
    {
      image: "/TrendingBlog/Calangute.webp",
      title: "Places to Visit Near Calangute",
    },
    {
      image: "/TrendingBlog/Pelling.webp",
      title: "Places to Visit in Pelling",
    },
    {
      image: "/TrendingBlog/Havelock.webp",
      title: "Places to Visit in Havelock Island",
    },
    {
      image: "/TrendingBlog/SouthGoa.webp",
      title: "Best Places to Visit in South Goa",
    },
    {
      image: "/TrendingBlog/Ahemdabad.webp",
      title: "Places to Visit Near Ahmedabad Within 100 Km",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 mt-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-6"
          >
            {/* Image Container */}
            <div className="w-[55%] h-32 sm:h-44 md:h-52 lg:h-44 xl:h-56 overflow-hidden rounded-[2rem] flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.title}
              />
            </div>

            {/* Content Container */}
            <div className="flex flex-col gap-3 flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 leading-tight">
                {item.title}
              </h2>
              <Link
                to={`/blog/${item.title.toLowerCase().replace(/ /g, "-")}`}
                className="inline-block w-fit"
                onClick={() => window.scrollTo(0, 0)}
              >
                <button className="bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 text-white text-xs sm:text-sm font-bold py-2 px-6 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-md">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Box;
