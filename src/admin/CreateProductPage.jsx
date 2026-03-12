import { useEffect, useState } from "react";
import { 
  createProduct, 
  getCountries, 
  getStates, 
  getCities, 
  getAllProductTypes 
} from "../api/admin.api";
import Editor from "../components/Editor";
import { getCurrentUser } from "../api/user.api";
import NotFound from "../components/NotFound";

const CreateProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    productType: "",
    productHighlights: "",
    productOverview: "",
    thingsToCarry: "",
    additionalInfo: "",
    faq: "",
    country: "",
    state: "",
    city: "",
    reviews: "",
    rating: "",
    itineraries: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [sliderPreviews, setSliderPreviews] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);
  const [loading, setLoading] = useState(true);



  // Packages: use included / excluded instead of legacy features
  const [packages, setPackages] = useState([
    {
      name: "",
      actualPrice: "",
      discountedPrice: "",
      included: [""],
      excluded: [""],
      isPopular: false,
    },
  ]);

  const handlePackageChange = (index, field, value) => {
    const updated = [...packages];
    updated[index][field] = value;
    setPackages(updated);
  };

  const handleIncludedChange = (pkgIndex, featureIndex, value) => {
    const updated = [...packages];
    updated[pkgIndex].included[featureIndex] = value;
    setPackages(updated);
  };

  const handleExcludedChange = (pkgIndex, featureIndex, value) => {
    const updated = [...packages];
    updated[pkgIndex].excluded[featureIndex] = value;
    setPackages(updated);
  };

  const addPackage = () => {
    if (packages.length >= 5) {
      alert("You can add up to 5 packages only");
      return;
    }
    setPackages((prev) => [
      ...prev,
      {
        name: "",
        actualPrice: "",
        discountedPrice: "",
        included: [""],
        excluded: [""],
        isPopular: false,
      },
    ]);
  };

  const addIncluded = (pkgIndex) => {
    const updated = [...packages];
    updated[pkgIndex].included.push("");
    setPackages(updated);
  };

  const addExcluded = (pkgIndex) => {
    const updated = [...packages];
    updated[pkgIndex].excluded.push("");
    setPackages(updated);
  };

  const removePackage = (index) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  const removeIncluded = (pkgIndex, featureIndex) => {
    const updated = [...packages];
    updated[pkgIndex].included.splice(featureIndex, 1);
    setPackages(updated);
  };

  const removeExcluded = (pkgIndex, featureIndex) => {
    const updated = [...packages];
    updated[pkgIndex].excluded.splice(featureIndex, 1);
    setPackages(updated);
  };




  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await getCurrentUser();
        const user = res.data.user;
        if (!user || user.admin !== true) {
          setIsAllowed(false);
        } else {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to verify user");
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  // Auto-generate slug
  useEffect(() => {
    if (formData.name) {
      setFormData((prev) => ({
        ...prev,
        slug: formData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      }));
    }
  }, [formData.name]);

  // Load product types
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllProductTypes();
        setProductTypes(res.data);
      } catch (err) {
        console.error("Error fetching product types:", err);
      }
    })();
  }, []);

  // Load countries
  useEffect(() => {
    (async () => {
      const res = await getCountries();
      setCountries(res.data);
    })();
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (formData.country) {
      (async () => {
        const res = await getStates(formData.country);
        setStates(res.data);
        setCities([]);
      })();
    } else {
      setStates([]);
      setCities([]);
    }
  }, [formData.country]);

  // Load cities when state changes
  useEffect(() => {
    if (formData.state) {
      (async () => {
        const res = await getCities(formData.state);
        setCities(res.data);
      })();
    } else {
      setCities([]);
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const selected = Array.from(files);
      if (selected.length > 5)
        return alert("❌ You can upload up to 5 images.");
      setImages(selected);
      setPreviews(selected.map((f) => URL.createObjectURL(f)));
    } else if (name === "sliderImages") {
      const selected = Array.from(files);
      if (selected.length > 5)
        return alert("❌ You can upload up to 5 slider images.");
      setSliderImages(selected);
      setSliderPreviews(selected.map((f) => URL.createObjectURL(f)));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formObj = new FormData();
  
      for (const key in formData) {
        formObj.append(key, formData[key]);
      }
  
      // IMPORTANT: send packages as JSON (backend normalizes to schema)
      formObj.append("packages", JSON.stringify(packages));
  
      images.forEach((f) => formObj.append("images", f));
      sliderImages.forEach((f) => formObj.append("sliderImages", f));
  
      await createProduct(formObj);
      alert("Product created successfully!");
    
      // Reset form
      setFormData({
        name: "",
        slug: "",
        description: "",
        productType: "",
        productHighlights: "",
        productOverview: "",
        // thingsToCarry: "",
        additionalInfo: "",
        faq: "",
        country: "",
        state: "",
        city: "",
        reviews: "",
        rating: "",
        itineraries: "",
      });
      setImages([]);
      setPreviews([]);
      setSliderImages([]);
      setSliderPreviews([]);
      setPackages([
        {
          name: "",
          actualPrice: "",
          discountedPrice: "",
          included: [""],
          excluded: [""],
          isPopular: false,
        },
      ]);
    } catch (err) {
      console.error("Error creating product:", err);
      alert("❌ Failed to create product");
    }
  };

  if (loading) return null;
  if (!isAllowed) return <NotFound />;
  if (!isAdmin) return null;

  return (
    <div className="max-w-3xl mt-30 mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name & Slug */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full bg-gray-100"
          readOnly
        />

        {/* Product Type */}
        <select
          name="productType"
          value={formData.productType}
          onChange={handleChange}
          required
          className="p-2 border rounded w-full"
        >
          <option value="">Select Product Type</option>
          {productTypes.map((pt) => (
            <option key={pt._id} value={pt._id}>
              {pt.name}
            </option>
          ))}
        </select>

        {/* Location */}
        <div className="flex gap-4">
          <select
            name="country"
            value={formData.country}
            required
            onChange={handleChange}
            className="p-2 border rounded w-full"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            disabled={!formData.country}
            className="p-2 border rounded w-full"
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.state}
            className="p-2 border rounded w-full"
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        {/* Reviews & Rating */}
        <div className="flex gap-4">
          <input
            type="text"
            name="reviews"
            placeholder="Reviews"
            value={formData.reviews}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />

        {/* Editors with Labels */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Product Highlights
            </label>
            <Editor
              content={formData.productHighlights}
              onChange={(c) =>
                setFormData((p) => ({ ...p, productHighlights: c }))
              }
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Product Overview
            </label>
            <Editor
              content={formData.productOverview}
              onChange={(c) =>
                setFormData((p) => ({ ...p, productOverview: c }))
              }
            />
          </div>


          {/* <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Things to Carry
            </label>
            <Editor
              content={formData.thingsToCarry}
              onChange={(c) =>
                setFormData((p) => ({ ...p, thingsToCarry: c }))
              }
            />
          </div> */}


<div>
  <label className="block mb-1 font-semibold text-gray-700">
    Itineraries
  </label>
  <Editor
    content={formData.itineraries}
    onChange={(c) =>
      setFormData((p) => ({ ...p, itineraries: c }))  
    }
  />
</div>


          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Know before you book (Additional Info)
            </label>
            <Editor
              content={formData.additionalInfo}
              onChange={(c) =>
                setFormData((p) => ({ ...p, additionalInfo: c }))
              }
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              FAQ
            </label>
            <Editor
              content={formData.faq}
              onChange={(c) => setFormData((p) => ({ ...p, faq: c }))}
            />
          </div>
        </div>



{/* Packages */}
<div className="space-y-6">
  <h3 className="text-lg font-semibold text-gray-800">
    Package Options
  </h3>

  {packages.map((pkg, index) => (
    <div key={index} className="border rounded-lg p-4 space-y-4">
      <div className="flex gap-3 flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Package Name (e.g. Basic)"
          value={pkg.name}
          onChange={(e) =>
            handlePackageChange(index, "name", e.target.value)
          }
          className="p-2 border rounded w-full"
        />

        <input
          type="number"
          placeholder="Actual Price"
          value={pkg.actualPrice}
          onChange={(e) =>
            handlePackageChange(index, "actualPrice", e.target.value)
          }
          className="p-2 border rounded w-full"
        />

        <input
          type="number"
          placeholder="Discounted Price"
          value={pkg.discountedPrice}
          onChange={(e) =>
            handlePackageChange(index, "discountedPrice", e.target.value)
          }
          className="p-2 border rounded w-full"
        />
      </div>

      {/* Included Features */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-green-700">Included</p>
        {pkg.included.map((f, fIndex) => (
          <div key={`inc-${fIndex}`} className="flex gap-2">
            <input
              type="text"
              placeholder="Included feature"
              value={f}
              onChange={(e) =>
                handleIncludedChange(index, fIndex, e.target.value)
              }
              className="p-2 border rounded w-full"
            />
            <button
              type="button"
              onClick={() => removeIncluded(index, fIndex)}
              className="text-red-500 text-sm px-2"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addIncluded(index)}
          className="text-sm text-orange-600 font-semibold"
        >
          + Add Included
        </button>
      </div>

      {/* Excluded Features */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-red-700">Excluded</p>
        {pkg.excluded.map((f, fIndex) => (
          <div key={`exc-${fIndex}`} className="flex gap-2">
            <input
              type="text"
              placeholder="Excluded feature"
              value={f}
              onChange={(e) =>
                handleExcludedChange(index, fIndex, e.target.value)
              }
              className="p-2 border rounded w-full"
            />
            <button
              type="button"
              onClick={() => removeExcluded(index, fIndex)}
              className="text-red-500 text-sm px-2"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addExcluded(index)}
          className="text-sm text-orange-600 font-semibold"
        >
          + Add Excluded
        </button>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={pkg.isPopular}
            onChange={(e) =>
              handlePackageChange(index, "isPopular", e.target.checked)
            }
          />
          Most Popular
        </label>

        <button
          type="button"
          onClick={() => removePackage(index)}
          className="text-red-500 text-sm"
        >
          Remove Package
        </button>
      </div>
    </div>
  ))}

  <button
    type="button"
    onClick={addPackage}
    className="text-orange-600 font-semibold"
  >
    + Add Package
  </button>
</div>


        {/* Images for large devices */}
        <div className="space-y-2">
          <label className="block mb-1 font-semibold text-gray-700">
            Product Images (Desktop/Grid) - Max 5
          </label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {previews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  className="w-32 h-24 object-cover rounded-lg border"
                  alt="Preview"
                />
              ))}
            </div>
          )}
        </div>

        {/* Slider images for small devices */}
        <div className="space-y-2">
          <label className="block mb-1 font-semibold text-gray-700">
            Slider Images (Mobile) - Max 5
          </label>
          <input
            type="file"
            name="sliderImages"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          {sliderPreviews.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {sliderPreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  className="w-32 h-24 object-cover rounded-lg border"
                  alt="Slider Preview"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-xl mt-4"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
