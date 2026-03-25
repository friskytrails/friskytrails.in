import Right from "../assets/right.svg";
import Share from "../assets/share.svg";
import Payment from "../assets/payment.svg";
import Call from "../assets/calling.svg";
import Content from "./Content";

const Productpage = () => {
  // Example data — you can replace or fetch this from an API
  const product = {
    title: "Big Bus Paris Hop-On Hop-Off Tour with Optional River Cruise",
    location: "Chennai, Tamil Nadu",
    reviews: "⭐⭐⭐⭐⭐ Reviews",
    oldPrice: "₹5,047",
    newPrice: "₹4,047",
    contact: "+91-78779 79193",
    contactHours: "10:30 AM - 8:00 PM (Mon to Sat)",
    images: [
      "/images/kashmir.webp",
      "/images/kerala.webp",
      "/images/thailand.png",
      "/images/bali.png",
      "/images/malaysia.png",
    ],
  };

  return (
    <>
      <div className="min-h-screen w-full">
        <div className="w-[80%] mt-30 m-auto">
          <div className="flex items-center pt-6">
            <h3 className="font-semibold">Home</h3>
            <img className="h-4 w-4 mt-1" src={Right} alt="rightarrow" />
            <h3 className="font-semibold">Destination</h3>
            <img className="h-4 w-4 mt-1" src={Right} alt="rightarrow" />
            <h3 className="font-semibold text-gray-600">Chennai</h3>
          </div>
          <h1 className="text-3xl tracking-tighter font-bold pt-4">
            {product.title}
          </h1>

          <div className="flex justify-between">
            <div className="email flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1">
                <h3 className="text-gray-500">{product.reviews}</h3>
              </div>
              <div className="border-1 h-full border-gray-400"></div>{" "}
              {/* Vertical Line */}
              <div className="number flex justify-center items-center">
                <h3 className="text-gray-500">{product.location}</h3>
              </div>
            </div>
            <button className="py-2 flex items-center gap-2 px-6 font-semibold text-white active:scale-95 transition-all duration-300 bg-[rgb(233,99,33)] rounded-3xl">
              <img className="invert h-5 w-5" src={Share} alt="share" />
              Share
            </button>
          </div>
        </div>

        <div className="h-[80vh] w-full pt-4">
          <div className="grid grid-cols-3 h-[70vh] w-[80vw] rounded-lg bg-white m-auto">
            <div className="mx-auto">
              <div className="h-[33vh] w-[26vw] mt-2 mb-3 rounded-2xl shadow-2xl relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out hover:scale-110"
                  style={{
                    backgroundImage: `url('${product.images[0]}')`,
                  }}
                ></div>
              </div>
              <div className="h-[33vh] w-[26vw] rounded-2xl shadow-2xl relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out hover:scale-110"
                  style={{
                    backgroundImage: `url('${product.images[1]}')`,
                  }}
                ></div>
              </div>
            </div>

            {/* Middle Column */}
            <div className="m-auto">
              <div className="h-[68vh] w-[26vw] rounded-2xl shadow-2xl relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out hover:scale-110"
                  style={{
                    backgroundImage: `url('${product.images[2]}')`,
                  }}
                ></div>
              </div>
            </div>

            {/* Right Column */}
            <div className="mx-auto">
              <div className="h-[33vh] w-[26vw] mt-2 mb-3 rounded-2xl shadow-2xl relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out hover:scale-110"
                  style={{
                    backgroundImage: `url('${product.images[3]}')`,
                  }}
                ></div>
              </div>
              <div className="h-[33vh] w-[26vw] rounded-2xl shadow-2xl relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out hover:scale-110"
                  style={{
                    backgroundImage: `url('${product.images[4]}')`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[80%] m-auto flex min-h-screen">
          <div className="w-[70%] min-h-screen m-auto">
            <Content />
          </div>
          <div className="w-[30%] min-h-screen m-auto">
            <div className="h-[4vh] relative w-full bg-orange-500 m-auto">
              <span className="text-white absolute right-2 top-1">
                Save upto 50%
              </span>
            </div>
            <div className="h-[20vh] w-full border-1 border-orange-500 bg-white m-auto">
              <div className="flex items-center justify-between w-[86%] m-auto">
                <div className="">
                  <span className="font-semibold">From</span>
                  <span className="line-through pl-2 text-xl text-gray-500">
                    {product.oldPrice}
                  </span>
                  <h2 className="text-3xl font-bold text-orange-500">{product.newPrice}</h2>
                  <span className="font-semibold">per person</span>
                </div>
                <div>
                  <button className="py-2 flex text-xl items-center gap-2 px-10 font-semibold text-white active:scale-95 transition-all duration-300 bg-[rgb(233,99,33)] rounded-3xl">
                    Book Now
                  </button>
                </div>
              </div>
              <div className="flex gap-4 w-[90%] m-auto items-center pt-2">
                <img className="h-6 w-6" src={Payment} alt="payment" />
                <p className="text-sm">
                  <span className="underline font-semibold">
                    Reserve now & pay later
                  </span>{" "}
                  to book your spot and pay nothing today
                </p>
              </div>
            </div>

            <div className="h-[36vh] w-full border-1 border-orange-500 mt-10 bg-white m-auto">
              <div className="flex items-center justify-between w-[90%] m-auto">
                <div className="">
                  <h2 className="text-orange-500 pt-4 text-3xl font-semibold">
                    Got a Question?
                  </h2>
                  <p className="pt-4 text-xl">
                    Our destination expert will be happy to help you resolve
                    your queries for this tour.
                  </p>
                  <div className="flex gap-4 items-center w-[94%] m-auto pt-6">
                    <div className="round flex items-center justify-center bg-gradient-to-r from-[rgb(255,99,33)] text-xl to-amber-400 h-[40px] w-[40px] rounded-full">
                      <img
                        className="h-[20px] w-[20px] object-contain invert"
                        src={Call}
                        alt="call"
                      />
                    </div>
                    <div>
                      <a className="text-xl" href={`tel:${product.contact}`}>
                        {product.contact}
                      </a>
                      <h3>{product.contactHours}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productpage;

