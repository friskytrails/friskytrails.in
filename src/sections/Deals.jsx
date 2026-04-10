import { Link } from "react-router-dom";

const Deals = () => {
  const deals = [
    {
      image: "/holidaysimages/Kashmir.webp",
      title: "Kashmir",
      duration: "4 Nights / 5 days",
      column: "left",
      link: "/state/kashmir/blogs",
    },
    {
      image: "/holidaysimages/Rishikesh.webp",
      title: "Uttarakhand",
      duration: "5 Nights / 6 days",
      column: "left",
      link: "/state/uttarakhand/blogs",
    },
    {
      image: "/holidaysimages/Kerala.webp",
      title: "Kerala",
      duration: "6 Nights / 7 days",
      column: "middle",
      link: "/state/kerala/blogs",
    },
    {
      image: "/holidaysimages/Goa.webp",
      title: "Goa",
      duration: "5 Nights / 6 days",
      column: "right",
      link: "/state/goa/blogs",
    },
    {
      image: "/holidaysimages/Andaman.webp",
      title: "Andaman",
      duration: "4 Nights / 5 days",
      column: "right",
      link: "/state/andaman/blogs",
    },
  ];

  const renderDealsByColumn = (column) =>
    deals
      .filter((deal) => deal.column === column)
      .map((deal, index) => (
        <Link
          to={deal.link}
          key={index}
          className={`block ${
            column !== "middle"
              ? "h-[25vh] md:h-[33vh] my-2 md:my-3"
              : "h-[50vh] md:h-[68vh]"
          } w-full md:w-[26vw] rounded-2xl shadow-2xl relative overflow-hidden group`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url('${deal.image}')` }}
          ></div>

          <h2 className="absolute bottom-7 text-white font-semibold text-lg px-4 py-1 drop-shadow">
            {deal.title}
          </h2>
          <h2 className="absolute bottom-2 text-white px-4 py-1 drop-shadow">
            {deal.duration}
          </h2>
        </Link>
      ));

  return (
    <div className="min-h-screen w-full md:pt-10 lg:pt-6">
      <h2 className="px-4 md:pt-20 lg:px-38 text-2xl md:text-4xl font-bold tracking-tight">
        Deals You Can&apos;t Miss
      </h2>
      <p className="pt-2 pb-4 md:pb-6 px-4 md:px-20 font-semibold text-xl lg:px-38">
        Travel beyond boundaries with incredible savings
      </p>

      {/* Desktop / Tablet */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 md:gap-6 h-auto md:h-[70vh] w-full md:w-[90vw] lg:w-[80vw] bg-white m-auto p-4 md:p-0">
        <div className="mx-auto">{renderDealsByColumn("left")}</div>
        <div className="m-auto">{renderDealsByColumn("middle")}</div>
        <div className="mx-auto">{renderDealsByColumn("right")}</div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-4 px-4 md:hidden">
        {deals.map((deal, index) => (
          <Link
            to={deal.link}
            key={index}
            className="h-[30vh] w-full rounded-2xl shadow-2xl relative overflow-hidden group"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: `url('${deal.image}')` }}
            ></div>

            <h2 className="absolute bottom-7 text-white font-semibold text-lg px-4 py-1 drop-shadow">
              {deal.title}
            </h2>
            <h2 className="absolute bottom-2 text-white px-4 py-1 drop-shadow">
              {deal.duration}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Deals;
