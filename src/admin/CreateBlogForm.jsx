import { useState, useEffect } from "react";
import {
  createBlog,
  getCountries,
  getStates,
  getCities,
} from "../api/admin.api";
import { getCurrentUser } from "../api/user.api";
import Editor from "../components/Editor";
import NotFound from "../components/NotFound"; // Import your 404 page

const CreateBlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    intro: "",
    conclusion: "",
    authorName: "",
    country: "",
    state: "",
    city: "",
    faq: "",
  });
  const [blocks, setBlocks] = useState([
    { id: Date.now(), heading: "", content: "" },
  ]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
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
        setFormData((prev) => ({ ...prev, state: "", city: "" }));
        setCities([]);
      } catch (err) {
        // Error handled silently
      }
    };
    fetchStates();
  }, [formData.country]);

  // Fetch cities on state change
  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.state) return;
      try {
        const res = await getCities(formData.state);
        setCities(res.data);
        setFormData((prev) => ({ ...prev, city: "" }));
      } catch (err) {
        // Error handled silently
      }
    };
    fetchCities();
  }, [formData.state]);

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "title") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  };

  // Handle image input
  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const handleBlockChange = (id, field, value) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const addBlock = () =>
    setBlocks([...blocks, { id: Date.now(), heading: "", content: "" }]);
  const removeBlock = (id) =>
    setBlocks((prev) => prev.filter((b) => b.id !== id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    data.append("blocks", JSON.stringify(blocks));
    if (imageFile) data.append("image", imageFile);

    try {
      const res = await createBlog(data);
      setMessage(res.message || "✅ Blog created successfully!");
      setFormData({
        title: "",
        slug: "",
        intro: "",
        conclusion: "",
        authorName: "",
        country: "",
        state: "",
        city: "",
        faq: "",
      });
      setBlocks([{ id: Date.now(), heading: "", content: "" }]);
      setImageFile(null);
      setStates([]);
      setCities([]);
    } catch (err) {
      setMessage("Failed to create blog");
    }
  };

  if (loading) return null;
  if (!isAllowed) return <NotFound />; 
  if (!isAdmin) return null;

  return (
    <div className="p-4 w-[70%] mt-30 mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Blog</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
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
          className="p-2 border rounded"
          disabled={!states.length}
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
          className="p-2 border rounded"
          disabled={!cities.length}
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <label className="block font-semibold mt-4 mb-1">Short Intro</label>
        <Editor
          content={formData.intro}
          onChange={(val) => setFormData((prev) => ({ ...prev, intro: val }))}
        />

        {/* Dynamic Blocks */}
        {blocks.map((block, idx) => (
          <div
            key={block.id}
            className="p-4 border rounded space-y-4 bg-gray-50"
          >
            <h3 className="font-semibold">Block {idx + 1}</h3>

            <div>
              <label className="block mb-2 font-medium">Heading</label>
              <Editor
                content={block.heading}
                onChange={(val) => handleBlockChange(block.id, "heading", val)}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Content</label>
              <Editor
                content={block.content}
                onChange={(val) => handleBlockChange(block.id, "content", val)}
              />
            </div>

            {blocks.length > 1 && (
              <button
                type="button"
                onClick={() => removeBlock(block.id)}
                className="text-red-500 underline"
              >
                Remove Block
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addBlock}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add Block
        </button>

        <label className="block font-semibold mt-4 mb-1">Conclusion</label>
        <Editor
          content={formData.conclusion}
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, conclusion: val }))
          }
        />
        <label className="block font-semibold mt-4 mb-1">FAQs</label>
        <Editor
          content={formData.faq}
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, faq: val }))
          }
        />

        <input
          type="text"
          name="authorName"
          placeholder="Author Name"
          value={formData.authorName}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <input
          key={imageFile ? imageFile.name : "file"}
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
          Create Blog
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

export default CreateBlogForm;
