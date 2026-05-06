import { useEffect, useState, useRef } from "react";
import EditBlogForm from "./EditBlogForm";
import { getAllBlogs, deleteBlog } from "../api/admin.api";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const sectionRef = useRef(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const fetchBlogs = async (page = 1) => {
    try {
      setIsFetching(true);
      if (page === 1) setLoading(true);

      const response = await getAllBlogs({ page, limit: 12 });

      if (!response.status) {
        throw new Error(response.message || "Failed to fetch blogs");
      }

      setBlogs(response.data || []);
      if (response.pagination) {
        setTotalPages(response.pagination.totalPages);
        setCurrentPage(response.pagination.currentPage);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !isFetching) {
      fetchBlogs(newPage);
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleDeleteBlog = async (blogId, blogTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await deleteBlog(blogId);
      if (response.status) {
        // Refresh the blogs list
        await fetchBlogs(currentPage);
        alert("Blog deleted successfully!");
      } else {
        throw new Error(response.message || "Failed to delete blog");
      }
    } catch (err) {
      alert(err.message || "Error deleting blog");
      console.error("Error deleting blog:", err);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading blogs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        ⚠️ {error}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No blogs found 😕
      </div>
    );
  }

  if (selectedBlog) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <button
          onClick={() => setSelectedBlog(null)}
          className="mb-4 inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
        >
          ⬅ Back to All Blogs
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
        <EditBlogForm
          blogId={selectedBlog._id} // ✅ pass ID, not full object
          onUpdate={fetchBlogs}
          onClose={() => setSelectedBlog(null)}
        />
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-2 sm:px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Blogs</h2>
        <button
          onClick={fetchBlogs}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition"
          >
            {blog.coverImage && (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-500 text-sm mb-3 line-clamp-3">
                {blog.intro}
              </p>

              <div className="text-xs text-gray-400 flex flex-wrap gap-2 mb-3">
                <span>✍️ {blog.authorName}</span>
                {blog.city?.name && <span>📍 {blog.city?.name}</span>}
              </div>

              <div className="flex justify-between items-center gap-2">
                <a
                  href={`/blog/${blog.slug}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Read more →
                </a>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog._id, blog.title)}
                    className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isFetching}
              className={`px-4 py-2 rounded-md transition ${currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
                }`}
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Simple logic to show only some page numbers if there are too many
                if (
                  totalPages <= 7 ||
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-md transition ${currentPage === pageNum
                        ? "bg-[rgb(255,99,33)] text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === 2 && currentPage > 4) ||
                  (pageNum === totalPages - 1 && currentPage < totalPages - 3)
                ) {
                  return <span key={pageNum} className="px-1 text-gray-400">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isFetching}
              className={`px-4 py-2 rounded-md transition ${currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
                }`}
            >
              Next
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Showing Page {currentPage} of {totalPages}
          </p>
        </div>
      )}
    </section>
  );
};

export default AllBlogs;
