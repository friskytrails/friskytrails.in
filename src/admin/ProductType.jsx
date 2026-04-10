import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductTypeBySlugWithProduct } from "../api/admin.api";

const ProductType = () => {
  const { slug } = useParams(); // e.g., "electronics"
  const [productTypeData, setProductTypeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductType = async () => {
      try {
        const res = await getProductTypeBySlugWithProduct(slug);
        setProductTypeData(res.data); // { productType, products }
      } catch (error) {
        console.error("Error fetching product type:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductType();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!productTypeData) return <p className="text-center py-10">Product Type not found</p>;

  const { productType, products } = productTypeData;

  return (
    <div className="max-w-6xl mt-30 mx-auto p-6">
      {/* Product Type Info */}
      <div className="text-center mb-10">
        {productType.image && (
          <img
            src={productType.image}
            alt={productType.name}
            className="mx-auto w-64 h-40 object-cover rounded-xl shadow-md"
          />
        )}
        <h1 className="text-4xl font-bold mt-4 text-orange-500">{productType.name}</h1>
      </div>

      {/* Products Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Products under {productType.name}
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products added yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-700 mb-2">{product.description}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Price: ₹{product.price}
                </p>
                <a
                  href={`/tours/${product.slug}`}
                  className="text-orange-500 font-semibold mt-2 inline-block"
                >
                  View Product →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductType;
