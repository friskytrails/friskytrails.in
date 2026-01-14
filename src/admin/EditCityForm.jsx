import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { getCurrentUser } from "../api/user.api";
import {
  getAllCountries,
  getStates,
  getCityById,
  updateCity,
} from "../api/admin.api";

const EditCityForm = ({ cityId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    howToReach: "",
    country: "",
    state: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
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

  /* ---------------- FETCH CITY ---------------- */
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await getCityById(cityId);
        // API returns { status: true, data: city }, so we need res.data.data
        const city = res.data?.data || res.data;

        setFormData({
          name: city.name || "",
          slug: city.slug || "",
          howToReach: city.howToReach || "",
          country: city.country?._id || city.country || "",
          state: city.state?._id || city.state || "",
        });

        setImagePreview(city.image || "");
      } catch (err) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };

    if (cityId) fetchCity();
  }, [cityId]);

  /* ---------------- FETCH COUNTRIES ---------------- */
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getAllCountries();
        // API returns { status: true, data: countries }, so we need res.data.data
        setCountries(res.data?.data || res.data || []);
      } catch (err) {
        setCountries([]);
      }
    };
    fetchCountries();
  }, []);

  /* ---------------- FETCH STATES WHEN COUNTRY CHANGES ---------------- */
  useEffect(() => {
    const fetchStates = async () => {
      if (!formData.country) {
        setStates([]);
        return;
      }
      try {
        const res = await getStates(formData.country);
        // API returns { status: true, data: states } or similar
        setStates(res.data?.data || res.data || []);
      } catch (err) {
        setStates([]);
      }
    };
    fetchStates();
  }, [formData.country]);

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

    // Reset state when country changes
    if (name === "country") {
      setFormData((prev) => ({ ...prev, state: "" }));
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
    data.append("howToReach", formData.howToReach);
    data.append("country", formData.country);
    data.append("state", formData.state);
    if (imageFile) data.append("image", imageFile);

    try {
      const res = await updateCity(cityId, data);
      setMessage(res.message || "City updated successfully! ✅");
      setTimeout(() => {
        if (onUpdate) onUpdate();
        if (onClose) onClose();
      }, 1500);
    } catch (err) {
      setMessage(err.message || "Failed to update city ❌");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- GUARDS ---------------- */
  if (loading) return <div>Loading...</div>;
  if (!isAllowed) return <NotFound />;
  if (!isAdmin) return null;

  /* ---------------- UI ---------------- */
  return (
    <div className="p-4 w-full max-w-xl sm:max-w-2xl md:w-[70%] mt-10 mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit City</h2>

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
          placeholder="City name"
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

        {/* State */}
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="p-2 border rounded"
          disabled={!formData.country}
        >
          <option value="">Select State</option>
          {states &&
            states.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
        </select>

        {/* How to Reach */}
        <textarea
          name="howToReach"
          value={formData.howToReach}
          onChange={handleChange}
          className="p-2 border rounded"
          placeholder="How to reach this city"
          rows="4"
        />

        {/* Image */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="City"
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
          {submitting ? "Updating..." : "Update City"}
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

export default EditCityForm;

