import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Right from "../assets/right.svg";
import Blogleft from "../components/Blogleft";
import Blogright from "../components/Blogright";
import { getSingleBlog } from "../api/blog.api";
import Skeleton from "../components/Skeleton";
  import { Helmet } from "react-helmet-async";

const Newlog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getSingleBlog(slug);
        setBlog(res);
      } catch {
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
       <p className="text-red-500 font-semibold">{error}</p>
    </div>
  );

  // Function to optimize Cloudinary URL
  const optimizeUrl = (url) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_1200/");
  };

  return (
    <div className="min-h-screen mt-12 md:mt-20 lg:mt-24 w-full">
      <Helmet>
        <title>{blog ? `${blog.title} | FriskyTrails Blog` : "Blog | FriskyTrails"}</title>
        <link rel="canonical" href={`https://www.friskytrails.in/blog/${slug}`} />
        <meta name="description" content={blog?.intro?.replace(/<[^>]+>/g, "").slice(0, 160)} />
      </Helmet>

      <div
        className="w-full min-h-[460px] bg-no-repeat md:bg-contain"
        style={{
          backgroundImage: "url('/images/bgbanner.svg')",
        }}
      >
        <div className="flex items-center gap-2 px-4 xl:pl-20 pt-8 md:pt-6 text-sm sm:text-base">
          {loading ? (
             <Skeleton width="200px" height="1.5rem" />
          ) : (
            <>
              {blog?.country && <h3 className="font-semibold">{blog.country?.name}</h3>}
              {blog?.country && blog?.state && (
                <img className="h-4 w-4 mt-1" src={Right} alt="Breadcrumb separator" />
              )}
              {blog?.state && <h3 className="font-semibold">{blog.state?.name}</h3>}
              {blog?.state && blog?.city && (
                <img className="h-4 w-4 mt-1" src={Right} alt="Breadcrumb separator" />
              )}
              {blog?.city && (
                <h3 className="font-semibold text-gray-600">{blog.city?.name}</h3>
              )}
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl xl:pl-20 md:text-4xl font-semibold tracking-tighter px-4 pt-4 md:pt-4">
          {loading ? <Skeleton width="80%" height="2.5rem" /> : blog?.title}
        </h1>

        {loading ? (
          <div className="mx-auto mt-6 w-[90vw] max-w-5xl">
            <Skeleton height="40vh" borderRadius="1rem" />
          </div>
        ) : (
          <img
            className="mx-auto rounded-2xl mt-6 w-[90vw] h-[32vh] md:h-[40vh] max-w-5xl object-cover"
            src={optimizeUrl(blog?.coverImage)}
            alt={blog?.title}
            width="1200"
            height="600"
            fetchpriority="high"
          />
        )}
        
        {/* Blog Section */}
        <div className="w-full flex justify-center flex-col lg:flex-row pt-0 md:pt-10">
          <div className="lg:w-[60%] pt-3 w-full px-4">
            {loading ? (
              <div className="space-y-4">
                <Skeleton height="1.5rem" width="100%" />
                <Skeleton height="1.5rem" width="90%" />
                <Skeleton height="1.5rem" width="95%" />
                <Skeleton height="1.5rem" width="80%" />
                <Skeleton height="20rem" width="100%" borderRadius="1rem" />
              </div>
            ) : (
              <Blogleft blog={blog} />
            )}
          </div>

          {/* Right sidebar */}
          <div className="hidden lg:block lg:w-[30%] px-4">
            <div className="sticky top-26">
              {loading ? (
                <div className="space-y-6">
                   <Skeleton height="15rem" width="100%" borderRadius="1rem" />
                   <Skeleton height="15rem" width="100%" borderRadius="1rem" />
                </div>
              ) : (
                <Blogright />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newlog;
