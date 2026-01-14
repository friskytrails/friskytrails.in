import { useEffect, useState } from "react";
import { createCountry } from "../api/admin.api";
import { getCurrentUser } from "../api/user.api";
import NotFound from "../components/NotFound";

const CreateCountryForm = () => {
  const [formData, setFormData] = useState({ name: "", slug: "" });
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
        if (!user || user.admin != true) {
          setIsAllowed(false);
          // alert("You are not an admin!");
          // window.location.href = "/";
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

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  };

  // Handle image input
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    if (imageFile) data.append("image", imageFile);

    try {
      const res = await createCountry(data);
      setMessage(res.message || "Country created successfully!");
      setFormData({ name: "", slug: "" });
      setImageFile(null);
    } catch (err) {
      setMessage("Failed to create country");
    }
  };

  if (loading) return null;
  if (!isAllowed) return <NotFound />;
  if (!isAdmin) return null;

  return (
    <div className="p-6 max-w-lg mx-auto mt-30 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create New Country</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Country Name"
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
          readOnly
          className="p-2 border rounded bg-gray-100"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Country
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default CreateCountryForm;
