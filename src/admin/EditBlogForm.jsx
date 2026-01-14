import { useState, useEffect } from "react";
import Editor from "../components/Editor";
import NotFound from "../components/NotFound";
import { getBlogById, updateBlog, getCountries, getStates, getCities } from "../api/admin.api";
import { getCurrentUser } from "../api/user.api";

const EditBlogForm = ({ blogId, onClose, onUpdate }) => {
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
  const [blocks, setBlocks] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);

  // Admin check
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

  // Fetch blog by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(blogId);
        const blog = res.data;

        setFormData({
          title: blog.title,
          slug: blog.slug,
          intro: blog.intro,
          conclusion: blog.conclusion,
          authorName: blog.authorName,
          country: blog.country?._id || "",
          state: blog.state?._id || "",
          city: blog.city?._id || "",
          faq: blog.faq || "",
        });
        
        setBlocks(
          blog.blocks.map((b) => ({
            id: b._id || Date.now() + Math.random(),
            heading: b.heading || "",
            content: b.content || "",
            image: b.image || "",
          }))
        );

        setCoverImagePreview(blog.coverImage || "");

      } catch (err) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };
    if (blogId) fetchBlog();
  }, [blogId]);

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

  // Fetch states when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (!formData.country) return;
      try {
        const res = await getStates(formData.country);
        setStates(res.data);
        setFormData((prev) => ({ ...prev, state: "", city: "" }));
        setCities([]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStates();
  }, [formData.country]);

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.state) return;
      try {
        const res = await getCities(formData.state);
        setCities(res.data);
        setFormData((prev) => ({ ...prev, city: "" }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCities();
  }, [formData.state]);

  // Handle input changes
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

  // Cover image change
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImageFile(file);
    setCoverImagePreview(URL.createObjectURL(file));
  };

  // Blocks
  const handleBlockChange = (id, field, value) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };
  // const addBlock = () => setBlocks([...blocks, { id: Date.now(), heading: "", content: "", image: "" }]);
  const addBlock = () => setBlocks([...blocks, { id: Date.now() + Math.random(), heading: "", content: "", image: "" }]);

  const removeBlock = (id) => setBlocks((prev) => prev.filter((b) => b.id !== id));

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    data.append("blocks", JSON.stringify(blocks));
    if (coverImageFile) data.append("image", coverImageFile);

    try {
      const res = await updateBlog(blogId, data);
      setMessage(res.message || "Blog updated successfully!");
      if (onUpdate) onUpdate();
      if (onClose) onClose();
    } catch (err) {
      setMessage("Failed to update blog");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!isAllowed) return <NotFound />;
  if (!isAdmin) return null;

  return (
    <div className="p-4 w-[70%] mt-10 mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-4">
        {/* Title & Slug */}
        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="p-2 border rounded" />
        <input type="text" name="slug" value={formData.slug} disabled className="p-2 border rounded bg-gray-100 cursor-not-allowed" />

        {/* Intro */}
        <label className="block font-semibold mt-4 mb-1">Intro</label>
        <Editor content={formData.intro} onChange={(val) => setFormData(prev => ({ ...prev, intro: val }))} />

        {/* Dynamic Blocks */}
        {blocks.map((block, idx) => (
  <div key={block.id} className="p-4 border rounded space-y-4 bg-gray-50">
    <h3 className="font-semibold">Block {idx + 1}</h3>

    <label className="block mb-2 font-medium">Heading</label>
    <Editor
      key={`editor-heading-${block.id}`} // unique per block + field
      content={block.heading}
      onChange={(val) => handleBlockChange(block.id, "heading", val)}
    />

    <label className="block mb-2 font-medium">Content</label>
    <Editor
      key={`editor-content-${block.id}`} // unique per block + field
      content={block.content}
      onChange={(val) => handleBlockChange(block.id, "content", val)}
    />

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

        <button type="button" onClick={addBlock} className="px-4 py-2 bg-blue-600 text-white rounded">+ Add Block</button>

        {/* Conclusion */}
        <label className="block font-semibold mt-4 mb-1">Conclusion</label>
        <Editor content={formData.conclusion} onChange={(val) => setFormData(prev => ({ ...prev, conclusion: val }))} />
        {/* FAQs */}
        <label className="block font-semibold mt-4 mb-1">FAQs</label>
        <Editor content={formData.faq} onChange={(val) => setFormData(prev => ({ ...prev, faq: val }))} />

        {/* Author */}
        <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} required className="p-2 border rounded" />

        {/* Country / State / City */}
        <select name="country" value={formData.country} onChange={handleChange} required className="p-2 border rounded">
          <option value="">Select Country</option>
          {countries.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <select name="state" value={formData.state} onChange={handleChange} required className="p-2 border rounded" disabled={!states.length}>
          <option value="">Select State</option>
          {states.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
        <select name="city" value={formData.city} onChange={handleChange} required className="p-2 border rounded" disabled={!cities.length}>
          <option value="">Select City</option>
          {cities.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>

        {/* Cover Image */}
        {coverImagePreview && <img src={coverImagePreview} className="w-full h-48 object-cover mb-2" />}
        <input type="file" accept="image/*" onChange={handleCoverImageChange} />

        {/* Submit */}
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Update Blog</button>
      </form>

      {message && <p className={`mt-4 text-center font-medium ${message.includes("Failed") ? "text-red-600" : "text-green-600"}`}>{message}</p>}
    </div>
  );
};

export default EditBlogForm;
