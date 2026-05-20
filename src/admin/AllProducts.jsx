import { useEffect, useState, useRef } from "react";
import { getProducts, deleteProduct } from "../api/admin.api";
import EditProductForm from "./EditProductForm";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track product being edited
  const sectionRef = useRef(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const fetchProducts = async (page = 1) => {
    try {
      setIsFetching(true);
      if (page === 1) setLoading(true);

      const res = await getProducts({ page, limit: 12 });
      if (!res.status && !res.success) throw new Error(res.message || "Failed to fetch products");

      // Handle both paginated ({ products: [] }) and direct array ([]) responses
      const productList = Array.isArray(res.data)
        ? res.data
        : (res.data?.products || []);

      setProducts(productList);
      if (res.data?.pagination) {
        setTotalPages(res.data.pagination.totalPages);
        setCurrentPage(res.data.pagination.currentPage);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !isFetching) {
      fetchProducts(newPage);
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleDeleteProduct = async (productSlug, productName) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await deleteProduct(productSlug);
      if (response.status || response.success) {
        // Refresh the products list
        await fetchProducts(currentPage);
        alert("Product deleted successfully!");
      } else {
        throw new Error(response.message || "Failed to delete product");
      }
    } catch (err) {
      alert(err.message || "Error deleting product");
      console.error("Error deleting product:", err);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        ⚠️ {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No products found 😕
      </div>
    );
  }

  if (selectedProduct) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <button
          onClick={() => setSelectedProduct(null)}
          className="mb-4 inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
        >
          ⬅ Back to All Products
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <EditProductForm
          productId={selectedProduct._id} // pass product ID
          onUpdate={fetchProducts} // refresh list after update
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-2 sm:px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
        <button
          onClick={() => fetchProducts(currentPage)}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition"
          >
            <img
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.productType}</p>

              <div className="flex items-center justify-between mb-3">
                {Array.isArray(product.packages) && product.packages.length > 0 ? (
                  (() => {
                    const firstPkg = product.packages[0];
                    const actual = Number(firstPkg.actualPrice);
                    const discounted = Number(
                      firstPkg.discountedPrice ?? firstPkg.price ?? firstPkg.actualPrice
                    );
                    const hasActual = !Number.isNaN(actual) && actual > 0;
                    const hasDiscounted = !Number.isNaN(discounted) && discounted >= 0;

                    return (
                      <>
                        {hasDiscounted && (
                          <p className="text-green-600 font-bold">
                            ₹{discounted.toLocaleString("en-IN")}
                          </p>
                        )}
                        {hasActual && (
                          <p className="text-gray-400 line-through text-sm">
                            ₹{actual.toLocaleString("en-IN")}
                          </p>
                        )}
                      </>
                    );
                  })()
                ) : (
                  <p className="text-gray-400 text-sm">No pricing set</p>
                )}
              </div>

              <div className="flex justify-between items-center gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.slug, product.name)}
                    className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
                <a
                  href={`/tours/${product.slug}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View →
                </a>
              </div>
            </div>
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
              className={`px-4 py-2 rounded-md transition ${currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
                }`}
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                if (
                  totalPages <= 7 ||
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-md transition ${currentPage === pageNum
                          ? "bg-[rgb(255,99,33)] text-white shadow-md"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === 2 && currentPage > 4) ||
                  (pageNum === totalPages - 1 && currentPage < totalPages - 3)
                ) {
                  return <span key={pageNum} className="px-1 text-gray-400">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isFetching}
              className={`px-4 py-2 rounded-md transition ${currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
                }`}
            >
              Next
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Showing Page {currentPage} of {totalPages}
          </p>
        </div>
      )}
    </section>
  );
};

export default AllProducts;
