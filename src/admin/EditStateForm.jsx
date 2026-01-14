import { useEffect, useState } from "react";
import Editor from "../components/Editor";
import NotFound from "../components/NotFound";
// import {
//   getStateById,
//   updateState,
//   getCountries,
// } from "../api/admin.api";
import { getCurrentUser } from "../api/user.api";
import { getAllCountries, getStateById, updateState } from "../api/admin.api";
const EditStateForm = ({ stateId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",   // 🔥 Editor field
    country: "",
  });



  const [countries, setCountries] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);

  /* ---------------- ADMIN CHECK ---------------- */
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

  /* ---------------- FETCH COUNTRIES ---------------- */
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getAllCountries();
        // API returns { status: true, data: countries }, so we need res.data.data
        const countriesData = res.data?.data || res.data || [];
        setCountries(countriesData);
      } catch (err) {
        setCountries([]);
      } finally {
        setCountriesLoading(false);
      }
    };
    fetchCountries();
  }, []);

  /* ---------------- FETCH STATE ---------------- */
  useEffect(() => {
    const fetchState = async () => {
      if (!stateId) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await getStateById(stateId);
        console.log('State response:', res);
        
        // API returns { status: true, data: state }
        // getStateById returns response.data, so res is { status: true, data: state }
        const stateData = res?.data || res;

        if (stateData) {
          setFormData({
            name: stateData.name || "",
            slug: stateData.slug || "",
            description: stateData.description || "",
            country: stateData.country?._id || stateData.country || "",
          });

          setImagePreview(stateData.image || "");
        }
      } catch (err) {
        setMessage("Failed to load state data");
      } finally {
        setLoading(false);
      }
    };

    fetchState();
  }, [stateId]);

  /* ---------------- INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  };

  /* ---------------- IMAGE ---------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("description", formData.description); // 🔥 editor value
    data.append("country", formData.country);
    if (imageFile) data.append("image", imageFile);

    try {
      const res = await updateState(stateId, data);
      setMessage(res.message || "State updated successfully! ✅");
      setTimeout(() => {
        if (onUpdate) onUpdate();
        if (onClose) onClose();
      }, 1500);
    } catch (err) {
      setMessage(err.message || "Failed to update state ❌");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- GUARDS ---------------- */
  if (loading || countriesLoading) return <div>Loading...</div>;
  if (!isAllowed) return <NotFound />;
  if (!isAdmin) return null;

  /* ---------------- UI ---------------- */
  return (
    <div className="p-4 w-full max-w-xl sm:max-w-2xl md:w-[70%] mt-10 mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit State</h2>
  
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
          placeholder="State name"
        />
  
        {/* Slug */}
        <input
          type="text"
          name="slug"
          value={formData.slug}
          disabled
          className="p-2 border text-gray-400 rounded cursor-not-allowed"
        />
  
        {/* Country */}
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select Country</option>
          {countries &&
            countries.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
  
        {/* Image */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="State"
            className="w-full h-48 object-cover rounded"
          />
        )}
  
        <input type="file" accept="image/*" onChange={handleImageChange} />
  
        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`bg-blue-600 text-white py-2 rounded transition ${
            submitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
        >
          {submitting ? "Updating..." : "Update State"}
        </button>
      </form>
  
      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-center font-medium ${
            message.includes("Failed") || message.includes("❌")
              ? "bg-red-50 text-red-600 border border-red-200"
              : "bg-green-50 text-green-600 border border-green-200"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
  
};

export default EditStateForm;
