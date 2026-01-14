import { useState, useEffect } from "react";
import { createCity, getCountries, getStates } from "../api/admin.api";
import { getCurrentUser } from "../api/user.api";
import NotFound from "../components/NotFound";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateCityForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    country: "",
    state: "",
    howToReach: "",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  // Admin check
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await getCurrentUser();
        const user = res.data.user;
        if (!user || !user.admin) {
          setIsAllowed(false);
        } else {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error(err);
        setIsAllowed(false);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  // Fetch countries
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

  // Fetch states on country change
  useEffect(() => {
    const fetchStates = async () => {
      if (!formData.country) return;
      try {
        const res = await getStates(formData.country);
        setStates(res.data);
      } catch (err) {
        // Error handled silently
      }
    };
    fetchStates();
  }, [formData.country]);

  // Handle input changes
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

  // Handle image
  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  // Handle howToReach editor
  const handleHowToReachChange = (value) => {
    setFormData((prev) => ({ ...prev, howToReach: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("country", formData.country);
    data.append("state", formData.state);
    data.append("howToReach", formData.howToReach);
    if (imageFile) data.append("image", imageFile);

    try {
      const res = await createCity(data);
      setMessage(res.message || "✅ City created successfully!");
      setFormData({ name: "", slug: "", country: "", state: "", howToReach: "" });
      setImageFile(null);
      setStates([]);
    } catch (err) {
      setMessage("❌ Failed to create city");
    }
  };

  if (loading) return null;
  if (!isAllowed) return <NotFound />;
  if (!isAdmin) return null;

  return (
    <div className="p-4 max-w-xl mt-30 mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New City</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="City Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          disabled
          className="p-2 border rounded bg-gray-100 cursor-not-allowed"
        />

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

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          key={imageFile ? imageFile.name : "file"}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border rounded"
        />

        {/* ✅ How To Reach Section */}
        <div className="mt-4">
          <label className="block font-semibold mb-2">How to Reach</label>
          <ReactQuill
            theme="snow"
            value={formData.howToReach}
            onChange={handleHowToReachChange}
            placeholder="Add travel information (air, train, road, etc.)"
            className="bg-white rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Create City
        </button>
      </form>

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

export default CreateCityForm;
