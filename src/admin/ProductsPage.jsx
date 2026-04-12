import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api/admin.api";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const fetchProducts = async (page = 1) => {
    try {
      setIsFetching(true);
      if (page === 1) setLoading(true);

      const res = await getProducts({ page, limit: 12 });
      
      if (res.status) {
        setProducts(res.data.products || []);
        if (res.data.pagination) {
          setTotalPages(res.data.pagination.totalPages);
          setCurrentPage(res.data.pagination.currentPage);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !isFetching) {
      fetchProducts(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return <div className="max-w-6xl mt-30 mx-auto p-6 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mt-30 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">Products</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col"
              >
                {/* Product Image */}
                {p.images && p.images[0] && (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-40 object-cover mb-3 rounded-md"
                  />
                )}

                {/* Name */}
                <h2 className="font-bold text-lg">{p.name}</h2>

                {/* Price (from first package) */}
                <p className="text-gray-800 font-semibold">
                  {p.packages && p.packages[0] ? `₹${p.packages[0].discountedPrice}` : "Contact for Price"}
                </p>

                {/* Location */}
                <div className="text-sm text-gray-600 mt-2 flex-grow">
                  {p.city?.name && <p>City: {p.city.name}</p>}
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

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isFetching}
                  className={`px-4 py-2 rounded-md transition ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
                  }`}
                >
                  Previous
                </button>
                
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isFetching}
                  className={`px-4 py-2 rounded-md transition ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
