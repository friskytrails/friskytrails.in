import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getAllStates } from "../api/admin.api";

const Smallbox = () => {
  const defaultData = [
    { name: "Goa", slug: "goa" },
    { name: "Himachal", slug: "himachal-pradesh" },
    { name: "Kashmir", slug: "jammu-and-kashmir" },
    { name: "Kerala", slug: "kerala" },
    { name: "Arunachal", slug: "arunachal-pradesh" },
    { name: "Andaman", slug: "andaman-and-nicobar-islands" },
    { name: "Meghalaya", slug: "meghalaya" },
    { name: "Rajasthan", slug: "rajasthan" },
    { name: "Uttarakhand", slug: "uttarakhand" },
  ];

  const [data, setData] = useState(defaultData);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const fetchStateImages = async () => {
      try {
        const result = await getAllStates();
        const states = result?.data || [];
        const imageBySlug = new Map(states.map((state) => [state.slug, state.image]));

        setData((prev) =>
          prev.map((item) => ({
            ...item,
            image: imageBySlug.get(item.slug) || item.image,
          }))
        );
      } catch (error) {
        console.error("Failed to load dynamic state images:", error);
      }
    };

    fetchStateImages();
  }, [isVisible]);

  return (
    <div ref={containerRef} className="contents">
      {data.map((item, index) => (
        <Link
          key={index}
          to={`/state/${item.slug}`}
          className="
            group relative overflow-hidden
            aspect-square
            w-full
            rounded-md md:rounded-lg
            transition-transform duration-300
            hover:scale-[1.03]
          "
          style={item.image ? {
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          } : {
            backgroundColor: "#2a2a2a"
          }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>

          {/* text */}
          <div className="relative flex items-center justify-center h-full w-full">
            <h3 className="text-gray-200 font-semibold tracking-tight text-[0.6rem] sm:text-xs md:text-sm lg:text-base">
              {item.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Smallbox;
