import { useState, useEffect } from "react";
import Editor from "../components/Editor";
import NotFound from "../components/NotFound";
import { getProductById, updateProduct, getCountries, getStates, getCities, getAllProductTypes } from "../api/admin.api";
import { getCurrentUser } from "../api/user.api";
import toast, { Toaster } from 'react-hot-toast';

const emptyPackage = {
  name: "",
  price: "",
  included: [""],
  excluded: [],
  isPopular: false,
};

const EditProductForm = ({ productId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    offerPrice: "",
    actualPrice: "",
    productType: "",
    rating: 0,
    reviews: 0,
    productHighlights: "",
    productOverview: "",
    itineraries: "",
    additionalInfo: "",
    faq: "",
    country: "",
    state: "",
    city: "",
    packages: [],
  });

  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);

  // Check admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await getCurrentUser();
        const user = res.data.user;
        if (!user || !user.admin) setIsAllowed(false);
        else setIsAdmin(true);
      } catch {
        setIsAllowed(false);
      }
    };
    checkAdmin();
  }, []);

  // Fetch product - Updated to handle new package structure
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(productId);
        const product = res.data;

        // Transform backend packages to editor-friendly structure
        const transformedPackages =
          product.packages?.map((pkg) => ({
            name: pkg.name || "",
            price: pkg.price || "",
            isPopular: pkg.isPopular || false,
            // Prefer new included field; fall back to legacy features
            included:
              (Array.isArray(pkg.included) && pkg.included.length
                ? pkg.included
                : Array.isArray(pkg.features) && pkg.features.length
                ? pkg.features
                : [""]),
            excluded:
              Array.isArray(pkg.excluded) && pkg.excluded.length
                ? pkg.excluded
                : [""],
          })) || [];

        setFormData({
          name: product.name || "",
          slug: product.slug || "",
          offerPrice: product.offerPrice || "",
          actualPrice: product.actualPrice || "",
          productType: product.productType?._id || product.productType || "",
          rating: product.rating || 0,
          reviews: product.reviews || 0,
          productHighlights: product.productHighlights || "",
          productOverview: product.productOverview || "",
          itineraries: product.itineraries || "",
          additionalInfo: product.additionalInfo || "",
          faq: product.faq || "",
          country: product.country?._id || "",
          state: product.state?._id || "",
          city: product.city?._id || "",
          packages: transformedPackages,
        });
        
        setImages(product.images || []);
      } catch (err) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  // Location effects (unchanged)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getCountries();
        setCountries(res.data);
      } catch (err) {}
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (!formData.country) {
        setStates([]);
        return;
      }
      try {
        const res = await getStates(formData.country);
        setStates(res.data);
        const hasValidState = formData.state && res.data.some(s => s._id === formData.state);
        if (!hasValidState) {
          setFormData(prev => ({ ...prev, state: "", city: "" }));
          setCities([]);
        }
      } catch (err) {
        setStates([]);
      }
    };
    fetchStates();
  }, [formData.country]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.state) {
        setCities([]);
        return;
      }
      try {
        const res = await getCities(formData.state);
        setCities(res.data);
        const hasValidCity = formData.city && res.data.some(c => c._id === formData.city);
        if (!hasValidCity) {
          setFormData(prev => ({ ...prev, city: "" }));
        }
      } catch (err) {
        setCities([]);
      }
    };
    fetchCities();
  }, [formData.state]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const res = await getAllProductTypes();
        setProductTypes(res.data);
      } catch (err) {}
    };
    fetchProductTypes();
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const selected = Array.from(files);
      if (selected.length + images.length + newImages.length > 5)
        return alert("❌ You can upload up to 5 images.");
      setNewImages(prev => [...prev, ...selected]);
      setPreviews(prev => [...prev, ...selected.map(f => URL.createObjectURL(f))]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === "name") {
        setFormData(prev => ({
          ...prev,
          slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
        }));
      }
    }
  };

  // Updated Package handlers
  const addPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, { ...emptyPackage }],
    }));
  };

  const removePackage = index => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
    }));
  };

  const updatePackage = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, packages: updated }));
  };

  // Included handlers
  const addIncluded = (packageIndex) => {
    const updated = [...formData.packages];
    updated[packageIndex].included.push("");
    setFormData(prev => ({ ...prev, packages: updated }));
  };

  const removeIncluded = (packageIndex, featureIndex) => {
    const updated = [...formData.packages];
    updated[packageIndex].included.splice(featureIndex, 1);
    setFormData(prev => ({ ...prev, packages: updated }));
  };

  const updateIncluded = (packageIndex, featureIndex, value) => {
    const updated = [...formData.packages];
    updated[packageIndex].included[featureIndex] = value;
    setFormData(prev => ({ ...prev, packages: updated }));
  };

  // Excluded handlers
  const addExcluded = (packageIndex) => {
    const updated = [...formData.packages];
    updated[packageIndex].excluded.push("");
    setFormData(prev => ({ ...prev, packages: updated }));
  };

  const removeExcluded = (packageIndex, featureIndex) => {
    const updated = [...formData.packages];
    updated[packageIndex].excluded.splice(featureIndex, 1);
    setFormData(prev => ({ ...prev, packages: updated }));
  };

  const updateExcluded = (packageIndex, featureIndex, value) => {
    const updated = [...formData.packages];
    updated[packageIndex].excluded[featureIndex] = value;
    setFormData(prev => ({ ...prev, packages: updated }));
  };

  const removeImage = (index, isNew = false) => {
    if (isNew) {
      setNewImages(prev => prev.filter((_, i) => i !== index));
      setPreviews(prev => prev.filter((_, i) => i !== index));
    } else {
      setImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "packages") {
          data.append("packages", JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });

      newImages.forEach(img => data.append("images", img));
  
      await updateProduct(formData.slug, data);
      
      toast.success('Product updated successfully!', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#10b981',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          fontWeight: 500,
        },
      });
      
      if (onUpdate) onUpdate();
      if (onClose) onClose();
    } catch (err) {
      toast.error('❌ Failed to update product', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#ef4444',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          fontWeight: 500,
        },
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!isAllowed) return <NotFound />;
  if (!isAdmin) return null;

  return (
    <div className="p-4 w-[70%] mt-10 mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-4">
        {/* All existing form fields remain unchanged until Packages section */}
        {/* Product Name */}
        <label htmlFor="name" className="block mb-1 font-medium">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <label htmlFor="slug" className="block mb-1 font-medium">Slug</label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          disabled
          className="p-2 border rounded bg-gray-100 cursor-not-allowed"
        />

        <label htmlFor="actualPrice" className="block mb-1 font-medium">Actual Price</label>
        <input
          type="number"
          id="actualPrice"
          name="actualPrice"
          value={formData.actualPrice}
          onChange={handleChange}
          placeholder="Actual Price"
          required
          className="p-2 border rounded"
        />

        <label htmlFor="offerPrice" className="block mb-1 font-medium">Offer Price</label>
        <input
          type="number"
          id="offerPrice"
          name="offerPrice"
          value={formData.offerPrice}
          onChange={handleChange}
          placeholder="Offer Price"
          required
          className="p-2 border rounded"
        />

        <label htmlFor="productType" className="block mb-1 font-medium">Product Type</label>
        <select 
          name="productType" 
          value={formData.productType} 
          onChange={handleChange} 
          className="p-2 border rounded"
        >
          <option value="">Select Product Type</option>
          {productTypes.map(pt => (
            <option key={pt._id} value={pt._id}>{pt.name}</option>
          ))}
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="rating" className="block mb-1 font-medium">Rating</label>
            <input 
              type="number" 
              id="rating"
              name="rating" 
              value={formData.rating} 
              onChange={handleChange} 
              min="0" 
              max="5"
              step="0.1"
              className="p-2 border rounded w-full" 
            />
          </div>
          <div>
            <label htmlFor="reviews" className="block mb-1 font-medium">Reviews</label>
            <input 
              type="number" 
              id="reviews"
              name="reviews" 
              value={formData.reviews} 
              onChange={handleChange} 
              min="0"
              className="p-2 border rounded w-full" 
            />
          </div>
        </div>

        <label className="font-semibold">Product Highlights</label>
        <Editor content={formData.productHighlights} onChange={val => setFormData(prev => ({ ...prev, productHighlights: val }))} />

        <label className="font-semibold">Product Overview</label>
        <Editor content={formData.productOverview} onChange={val => setFormData(prev => ({ ...prev, productOverview: val }))} />
        
        <label className="font-semibold">Itineraries</label>
        <Editor content={formData.itineraries} onChange={val => setFormData(prev => ({ ...prev, itineraries: val }))} />
        
        <label className="font-semibold">Additional Info</label>
        <Editor content={formData.additionalInfo} onChange={val => setFormData(prev => ({ ...prev, additionalInfo: val }))} />

        <label className="font-semibold">FAQ</label>
        <Editor content={formData.faq} onChange={val => setFormData(prev => ({ ...prev, faq: val }))} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="country" className="block mb-1 font-medium">Country</label>
            <select name="country" value={formData.country} onChange={handleChange} className="p-2 border rounded w-full">
              <option value="">Select Country</option>
              {countries.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="state" className="block mb-1 font-medium">State</label>
            <select name="state" value={formData.state} onChange={handleChange} disabled={!states.length} className="p-2 border rounded w-full">
              <option value="">Select State</option>
              {states.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block mb-1 font-medium">City</label>
            <select name="city" value={formData.city} onChange={handleChange} disabled={!cities.length} className="p-2 border rounded w-full">
              <option value="">Select City</option>
              {cities.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Images section unchanged */}
        <div>
          <label className="block mb-2 font-medium">Product Images (Max 5)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded" alt="Product image" />
                <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 text-red-500 bg-white rounded-full px-2 py-1 text-xs hover:bg-red-100">X</button>
              </div>
            ))}
            {previews.map((src, i) => (
              <div key={i} className="relative">
                <img src={src} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded" alt="Preview" />
                <button type="button" onClick={() => removeImage(i, true)} className="absolute top-1 right-1 text-red-500 bg-white rounded-full px-2 py-1 text-xs hover:bg-red-100">X</button>
              </div>
            ))}
          </div>
          <input type="file" name="images" multiple accept="image/*" onChange={handleChange} className="p-2 border rounded w-full" />
        </div>

        {/* ---------------- UPDATED PACKAGES SECTION ---------------- */}
        <h3 className="text-lg font-semibold mt-8 border-b pb-2 sm:text-xl">Package Options</h3>

        {formData.packages.map((pkg, i) => (
          <div key={i} className="border p-4 sm:p-6 rounded-lg space-y-4 bg-gray-50 my-4 sm:my-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
              <h4 className="text-md font-bold sm:text-lg">Package {i + 1}</h4>
              <button 
                type="button" 
                onClick={() => removePackage(i)} 
                className="text-red-600 hover:text-red-800 font-medium text-sm sm:text-base w-fit"
              >
                Remove Package
              </button>
            </div>

            <input
              placeholder="Package Name (e.g., Basic, Premium)"
              value={pkg.name}
              onChange={e => updatePackage(i, "name", e.target.value)}
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />

            <input
              type="number"
              placeholder="Package Price"
              value={pkg.price}
              onChange={e => updatePackage(i, "price", e.target.value)}
              min="0"
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />

            <label className="flex items-center gap-3 p-3 bg-white rounded-lg border w-full sm:w-auto">
              <input
                type="checkbox"
                checked={pkg.isPopular}
                onChange={e => updatePackage(i, "isPopular", e.target.checked)}
                className="w-4 h-4 text-blue-600 flex-shrink-0"
              />
              <span className="font-medium text-sm sm:text-base">Mark as Popular Package</span>
            </label>

            {/* Included Features */}
            <div className="space-y-3 sm:space-y-2">
              <p className="font-medium text-sm sm:text-base text-green-700">✓ Included</p>
              {pkg.included.map((f, fi) => (
                <div key={`included-${fi}`} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    value={f}
                    onChange={e => updateIncluded(i, fi, e.target.value)}
                    placeholder={`Included Feature ${fi + 1}`}
                    className="p-2 border rounded-lg flex-1 w-full focus:ring-2 focus:ring-green-500 text-sm"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeIncluded(i, fi)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg w-full sm:w-auto text-xs sm:text-sm flex-shrink-0"
                  >
                    ❌
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => addIncluded(i)} 
                className="text-green-600 hover:text-green-800 text-sm font-medium w-fit"
              >
                + Add Included Feature
              </button>
            </div>

            {/* Excluded Features */}
            <div className="space-y-3 sm:space-y-2">
              <p className="font-medium text-sm sm:text-base text-red-700">✗ Excluded</p>
              {pkg.excluded.map((f, fi) => (
                <div key={`excluded-${fi}`} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    value={f}
                    onChange={e => updateExcluded(i, fi, e.target.value)}
                    placeholder={`Excluded Feature ${fi + 1}`}
                    className="p-2 border rounded-lg flex-1 w-full focus:ring-2 focus:ring-red-500 text-sm"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeExcluded(i, fi)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg w-full sm:w-auto text-xs sm:text-sm flex-shrink-0"
                  >
                    ❌
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => addExcluded(i)} 
                className="text-red-600 hover:text-red-800 text-sm font-medium w-fit"
              >
                + Add Excluded Feature
              </button>
            </div>
          </div>
        ))}

        <button 
          type="button" 
          onClick={addPackage} 
          className="bg-gray-200 hover:bg-gray-300 py-3 px-6 rounded-lg font-medium w-full sm:w-fit mt-4"
        >
          + Add New Package
        </button>

        <button 
          type="submit" 
          className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition font-semibold w-full sm:w-fit mt-4"
        >
          Update Product
        </button>
      </form>

      <Toaster 
        position="top-right"
        gutter={12}
        containerStyle={{ margin: '16px' }}
      />
    </div>
  );
};

export default EditProductForm;
