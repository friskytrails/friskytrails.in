import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/admin.api";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mt-30 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              {/* Product Image */}
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover mb-3 rounded-md"
                />
              )}

              {/* Name */}
              <h2 className="font-bold text-lg">{p.name}</h2>

              {/* Price */}
              <p className="text-gray-800 font-semibold">₹{p.price}</p>

              {/* Location */}
              <div className="text-sm text-gray-600 mt-2">
                {p.city?.name && <p>City: {p.city.name}</p>}
                {p.city?.state?.name && <p>State: {p.city.state.name}</p>}
                {p.city?.state?.country?.name && (
                  <p>Country: {p.city.state.country.name}</p>
                )}
              </div>

              {/* Link */}
              <Link
                to={`/tours/${p.slug}`}
                className="text-orange-500 font-semibold mt-3 block"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
