import { useEffect, useState } from "react";
import { getProductTypeById, updateProductType } from "../api/admin.api";
import { getCurrentUser } from "../api/user.api";
import toast, { Toaster } from 'react-hot-toast';
import NotFound from "../components/NotFound";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

const EditProductTypeForm = ({ productTypeId, onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    thingsToCarry: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  useEffect(() => {
    const fetchProductType = async () => {
      try {
        setLoading(true);
        const res = await getProductTypeById(productTypeId);
        if (res && res.data) {
          setFormData({
            name: res.data.name || "",
            slug: res.data.slug || "",
            thingsToCarry: res.data.thingsToCarry || "",
          });
          setCurrentImageUrl(res.data.image || "");
        }
      } catch (err) {
        console.error("Failed to fetch product type", err);
        toast.error("Failed to fetch product type details.");
      } finally {
        setLoading(false);
      }
    };
    if (productTypeId) {
      fetchProductType();
    }
  }, [productTypeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Auto-generate slug from name
    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, thingsToCarry: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("thingsToCarry", formData.thingsToCarry);
    if (imageFile) data.append("image", imageFile);

    try {
      await updateProductType(productTypeId, data);
      toast.success('Product type updated successfully!', {
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
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to update product type', {
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
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-6 text-gray-500">Loading product type data...</div>;
  if (!isAllowed) return <NotFound />;
  if (!isAdmin) return null;

  return (
    <div className="p-6 max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-md relative">
      <button 
        onClick={onBack}
        type="button"
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
      >
        ✕
      </button>
      
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Product Type</h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        {/* Product Type Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Type Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Slug */}
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="p-2 border rounded bg-gray-100"
          readOnly
        />

        {/* Things to Carry */}
        <div className="mb-8">
          <label className="block mb-1 font-semibold text-gray-700">
            Things to Carry
          </label>
          <ReactQuill
            theme="snow"
            value={formData.thingsToCarry}
            onChange={handleEditorChange}
            placeholder="List the items people should carry..."
            className="h-40 mb-10"
          />
        </div>

        {/* Image Upload */}
        <div className="mt-8">
          <label className="block mb-1 font-semibold text-gray-700">
            Update Image (optional)
          </label>
          {currentImageUrl && !imageFile && (
            <div className="mb-2">
              <img src={currentImageUrl} alt="Current" className="h-20 w-32 object-cover rounded shadow-sm" />
              <p className="text-xs text-gray-500 mt-1">Current Image</p>
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border rounded w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`py-2 rounded text-white font-medium transition ${submitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {submitting ? 'Updating...' : 'Update Product Type'}
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

export default EditProductTypeForm;
