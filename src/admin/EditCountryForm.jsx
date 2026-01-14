import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { getCurrentUser } from "../api/user.api";
import { getCountryById, updateCountry } from "../api/admin.api";

const EditCountryForm = ({ countryId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

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

  /* ---------------- FETCH COUNTRY ---------------- */
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await getCountryById(countryId);
        const country = res.data[0];

        setFormData({
          name: country?.name || "",
          slug: country?.slug || "",
        });

        setImagePreview(country.image || "");
      } catch (err) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };

    if (countryId) fetchCountry();
  }, [countryId]);

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
    if (imageFile) data.append("image", imageFile);

    try {
      const res = await updateCountry(countryId, data);
      setMessage(res.message || "Country updated successfully! ✅");
      setTimeout(() => {
        if (onUpdate) onUpdate();
        if (onClose) onClose();
      }, 1500);
    } catch (err) {
      setMessage(err.message || "Failed to update country ❌");
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
    <div className="p-4 w-[70%] mt-10 mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Country</h2>

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
          placeholder="Country name"
        />

        {/* Slug */}
        <input
  type="text"
  name="slug"
  value={formData.slug}
  readOnly
  placeholder="Slug will be auto-generated from country name"
  className="p-2 border rounded bg-gray-100 text-gray-600 cursor-not-allowed"
/>


        {/* Image */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Country"
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
          {submitting ? "Updating..." : "Update Country"}
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

export default EditCountryForm;

