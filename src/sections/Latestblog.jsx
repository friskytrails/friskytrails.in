import { Link } from "react-router-dom";

const Latestblog = () => {
  const data = [
    {
      season: "Summer",
      color: "bg-amber-200",
      image: "/seasonsimages/Summer.webp",
    },
    {
      season: "Monsoon",
      color: "bg-blue-200",
      image: "/seasonsimages/Monsoon.webp",
    },
    {
      season: "Autumn",
      color: "bg-purple-200",
      image: "/seasonsimages/Autumn.webp",
    },
    {
      season: "Winter",
      color: "bg-blue-100",
      image: "/seasonsimages/Winter.webp",
    },
    {
      season: "Spring",
      color: "bg-green-200",
      image: "/seasonsimages/Spring.webp",
    },
  ];

  return (
    <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py- ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-6 mb-8 sm:mb-12 lg:mb-16">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Best Places to Travel in India by Season
        </h2>
        <div className="h-px mx-auto lg:ml-0 sm:h-[5px] w-24 sm:w-32 lg:w-48 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 rounded-full shadow-sm "></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 w-full h-auto">
        {data.map((item) => (
          <Link
            key={item.season}
            // to={`/seasons/${item.season.toLowerCase()}`}
            className="group relative w-full aspect-square sm:aspect-[5/4] lg:aspect-square h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            {/* Season Text */}
            <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
              <h2 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center drop-shadow-lg tracking-wide bg-black/20 sm:bg-black/30 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-2xl border border-white/20 group-hover:bg-black/40 transition-all duration-400">
                {item.season}
              </h2>
            </div>

            {/* Orange Gradient Hover Effect - Large screens */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-amber-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />

            {/* Orange Gradient for small devices only - Middle below text */}
            <div className="sm:hidden absolute left-1/2 bottom-10 w-2/3 h-6 bg-gradient-to-r from-orange-500/40 via-transparent to-amber-400/40 opacity-0 group-hover:opacity-100 rounded-full transition-all duration-700" />

            {/* Subtle Top Accent */}
            <div className="absolute top-2 left-2 right-2 h-px bg-gradient-to-r from-orange-400/60 via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Latestblog;
