import { useEffect, useState } from "react";
import { getAllProductTypes } from "../api/admin.api";

const AllProductTypes = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAllProductTypes();

      if (!result?.data) {
        throw new Error(result?.message || "Failed to fetch product types");
      }

      setProductTypes(result.data || []);
    } catch (err) {
      console.error("Error fetching product types:", err);
      setError(err.message || "Failed to fetch product types");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading product types...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        {error}
      </div>
    );
  }

  if (productTypes.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No product types found
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-2 sm:px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Product Types</h2>
        <button
          onClick={fetchProductTypes}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
        >
          Refresh
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productTypes.map((productType) => (
          <div
            key={productType._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition"
          >
            {productType.image && (
              <img
                src={productType.image}
                alt={productType.name}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {productType.name}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                Slug: <span className="font-medium">{productType.slug}</span>
              </p>

              <a
                href={`/productType/${productType.slug}/product`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Products →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProductTypes;
