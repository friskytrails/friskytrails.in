import { useState, useEffect } from "react";
import { createState, getCountries } from "../api/admin.api"
import { getCurrentUser } from "../api/user.api";
import NotFound from "../components/NotFound";;

const CreateStateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    country: "",
  });

  const [countries, setCountries] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const checkAdmin = async () => {
        try {
          const res = await getCurrentUser();
          const user = res.data.user;
          console.log(user);
          if (!user || user.admin != true) {
            setIsAllowed(false);
          } else {
            setIsAdmin(true);
          }
        } catch (err) {
          alert("Failed to verify user");
          window.location.href = "/";
        } finally {
          setLoading(false);
        }
      };
  
      checkAdmin();
    }, []);
  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getCountries();
        setCountries(res.data);
      } catch (err) {
        // Error handled silently
      }
    };
    fetchCountries();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from state name
    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("country", formData.country);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const res = await createState(data);
      setMessage(res.message || "✅ State created successfully!");

      // Reset form
      setFormData({
        name: "",
        slug: "",
        country: "",
      });
      setImageFile(null);
    } catch (err) {
      setMessage("❌ Failed to create state");
    }
  };
  if (loading) return null;
  if (!isAllowed) return <NotFound />;
  if (!isAdmin) return null;

  return (
    <div className="p-4 max-w-xl mt-30 mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New State</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        {/* State Name */}
        <input
          type="text"
          name="name"
          placeholder="State Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        {/* Slug (auto-generated) */}
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          disabled
          className="p-2 border rounded bg-gray-100 cursor-not-allowed"
        />

        {/* Country Dropdown */}
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <input
          key={imageFile ? imageFile.name : "file"}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Create State
        </button>
      </form>

      {/* Message */}
      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.includes("Failed") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateStateForm;
