import Deals from '../assets/deals.webp';
import Work from '../assets/24.webp';
import Price from '../assets/price.webp';
import Booking from '../assets/booking.webp';

const Choose = () => {
  return (
    // 👉 MAIN DIV: md & lg pe mt-2, mobile pe 0
    <div className="w-full  md:mt-6 py-2 ">
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Why Choose Us
      </h2>

      <div className="max-w-[90vw] mx-auto">
        {/* Mobile: Horizontal scroll */}
        <div className="flex sm:hidden gap-6 overflow-x-auto pb-4 w-full mt-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="min-w-[70vw] rounded-lg bg-white border border-[#FF6321] shadow-lg px-4 pt-6 pb-6 text-center flex flex-col items-center "
            >
              <img className="h-16 w-16 mb-6" src={item.image} alt="img" />
              <h2 className="text-lg font-semibold mb-3">{item.title}</h2>
              <p className="text-sm text-gray-600 tracking-tight">
                {item.des}
              </p>
            </div>
          ))}
        </div>

        {/* Tablet & above: Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-2 md:mt-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="rounded-lg bg-white border border-[#FF6321] shadow-lg px-4 pt-6 pb-6 text-center flex flex-col items-center mt-3"
            >
              <img className="h-16 w-16 mb-6" src={item.image} alt="img" />
              <h2 className="text-lg font-semibold mb-3">{item.title}</h2>
              <p className="text-sm text-gray-600 tracking-tight">
                {item.des}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const data = [
  {
    title: "24/7 Travel Support",
    image: Work,
    des: "Our expert team is here round the clock to assist you with any travel queries. Just reach out, and we’ve got you covered.",
  },
  {
    title: "Easy Booking Process",
    image: Booking,
    des: "Booking adventure or tour is now easier than ever, with unbeatable offers to make your trip even better!",
  },
  {
    title: "Unbeatable Price",
    image: Price,
    des: "Get the lowest rates on hotels, holiday packages, Adventures and flights, so you can travel without breaking the bank.",
  },
  {
    title: "Unmissable Deals",
    image: Deals,
    des: "From flights and hotels to buses, car rentals, and tour packages – grab the best deals for your next adventure!",
  },
];

export default Choose;
