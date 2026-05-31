import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { getProducts } from "../api/admin.api";

const ExploreMoreProducts = ({ currentProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const stateId = useMemo(() => {
    if (!currentProduct?.state) return "";
    if (typeof currentProduct.state === "string") return currentProduct.state;
    return currentProduct.state._id || "";
  }, [currentProduct]);

  useEffect(() => {
    const fetchSameStateProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts();
        const allProducts = Array.isArray(res?.data?.products) ? res.data.products : [];

        // Exclude the current product
        const otherProducts = allProducts.filter(
          (item) => item?._id !== currentProduct?._id
        );

        // Try to find products in the same state
        let filtered = otherProducts.filter((item) => {
          if (!stateId) return false;
          const itemStateId =
            typeof item?.state === "string" ? item.state : item?.state?._id;
          return itemStateId === stateId;
        });

        // Fallback: If no products in the same state, show ANY other products
        if (filtered.length === 0) {
          filtered = otherProducts;
        }

        setProducts(filtered.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch explore-more products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (!currentProduct?._id) {
      setProducts([]);
      setLoading(false);
      return;
    }

    fetchSameStateProducts();
  }, [currentProduct?._id, stateId]);

  const getPrice = (product) => {
    const firstPackage = Array.isArray(product?.packages) ? product.packages[0] : null;
    if (!firstPackage) return null;

    const discounted = Number(
      firstPackage.discountedPrice ??
        firstPackage.price ??
        firstPackage.actualPrice
    );
    if (Number.isNaN(discounted) || discounted < 0) return null;
    return discounted;
  };

  return (
    <section className="w-full mx-auto mb-6 md:mb-8 lg:mb-10">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm p-4 md:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1.5 h-7 rounded-full bg-orange-500" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Explore More
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="h-56 rounded-xl bg-gray-100 animate-pulse"
                aria-hidden="true"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="relative">
            <div className="flex gap-4 md:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {products.map((item) => {
              const image = item?.images?.[0] || "/placeholder.png";
              const price = getPrice(item);

              return (
                <Link
                  key={item._id}
                  to={`/tours/${item.slug}`}
                  className="group min-w-[84%] sm:min-w-[48%] lg:min-w-[31%] xl:min-w-[30%] snap-start rounded-xl overflow-hidden border border-gray-200 hover:border-orange-400 bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-44 w-full overflow-hidden">
                    <img
                      src={image}
                      alt={item?.name || "Tour image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
                      {item?.name || "Untitled Product"}
                    </h3>

                    <p className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin size={14} className="text-orange-500 shrink-0" />
                      <span className="line-clamp-1">
                        {item?.city?.name || "Location update soon"},{" "}
                        {item?.state?.name || currentProduct?.state?.name || "India"}
                      </span>
                    </p>

                    <div className="mt-3 flex items-end justify-between">
                      <p className="text-sm text-gray-500">Starting from</p>
                      {price !== null && (
                        <p className="text-lg md:text-xl font-bold text-orange-500">
                          ₹{price.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-orange-300 bg-orange-50 p-6 text-center">
            <h3 className="text-lg font-semibold text-orange-600">Coming soon</h3>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              We are adding more trips in this state. Check back shortly.
            </p>
          </div>
        )}
        </div>
      </div>
    </section>
  );
};

export default ExploreMoreProducts;
