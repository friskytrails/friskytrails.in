import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { getBlogRecommendations } from "../api/admin.api";
import FAQ from "./FAQ";

const Blogleft = ({ blog }) => {
  const [blockProducts, setBlockProducts] = useState({});

  useEffect(() => {
    let active = true;
    const fetchRecommendations = async () => {
      if (!blog || !blog.blocks || blog.blocks.length === 0) return;
      try {
        // Send only the minimal data the backend scoring engine needs.
        // Full blocks contain rich HTML that can exceed Express's 16kb body limit.
        const trimmedBlocks = blog.blocks.map(b => ({
          order: b.order,
          heading: b.heading || "",
          content: (b.content || "").replace(/<[^>]+>/g, "").slice(0, 500),
        }));
        const res = await getBlogRecommendations(trimmedBlocks);
        if (active) {
          setBlockProducts(res?.data || {});
        }
      } catch (err) {
        console.error("Failed to load blog recommendations:", err);
      }
    };
    
    fetchRecommendations();
    return () => {
      active = false;
    };
  }, [blog?.blocks]);

  if (!blog || !blog.blocks) return null;

  return (
    <div className="pt-2 md:pt-6 pb-10 h-auto w-full">
      {/* Intro Section */}
      {blog.intro && (
        <div className="blog-content bg-white p-4 rounded-lg prose prose-lg max-w-none w-[90%] mx-auto mb-6">
          <div dangerouslySetInnerHTML={{ __html: blog.intro }} />
        </div>
      )}

      {/* Sorted Blocks */}
      {blog.blocks
        .sort((a, b) => a.order - b.order)
        .map((block, index) => {
          const product = blockProducts[block.order];
          return (
            <div key={index} className="w-[90%] mx-auto mb-8 bg-white p-4 rounded-lg">
              {/* Heading */}
              {/* {block.heading && (
                <div className="flex items-start mb-2">
                  <span className="font-bold mr-2">{block.order}.</span>
                  <div
                    className="blog-heading flex-1"
                    dangerouslySetInnerHTML={{ __html: block.heading }}
                  />
                </div>
              )} */}
              {block.heading && (() => {
                // Extract heading level using regex
                const match = block.heading.match(/<h([1-6])[^>]*>/);
                const level = match ? parseInt(match[1]) : 3; // default to h3 if not found

                // Define font size map pointing to matching CSS rules
                const sizeMap = {
                  1: "blog-serial-1",
                  2: "blog-serial-2",
                  3: "blog-serial-3",
                  4: "blog-serial-4",
                  5: "blog-serial-5",
                  6: "blog-serial-6",
                };

                return (
                  <div className="flex items-baseline">
                    <span className={`mr-2 select-none ${sizeMap[level]}`}>
                      {block.order}.
                    </span>
                    <div
                      className="blog-heading flex-1"
                      dangerouslySetInnerHTML={{ __html: block.heading }}
                    />
                  </div>
                );
              })()}

              {/* Content */}
              {block.content && (
                <div
                  className="blog-content prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              )}

              {/* Block Image */}
              {block.image && (() => {
                const optimizeUrl = (url) => {
                  if (!url || !url.includes("cloudinary.com")) return url;
                  // For content images, we can use a smaller width like 800px
                  return url.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
                };
                
                return (
                  <div className="flex justify-center mt-2 md:mt-4">
                    <img
                      src={optimizeUrl(block.image)}
                      alt={block.heading ? block.heading.replace(/<[^>]+>/g, "") : `${blog.title} - Section ${block.order}`}
                      className="rounded-lg w-full h-auto object-cover md:w-auto md:max-w-full"
                      loading="lazy"
                      width="800"
                      height="450"
                    />
                  </div>
                );
              })()}

              {/* Subblog Landscape Product Card */}
              {product && Array.isArray(product) && product.length > 0 && (
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-400 block mb-2 uppercase tracking-wider">
                    Related Tour Package{product.length > 1 ? 's' : ''}
                  </span>
                  <div className="flex flex-col gap-4">
                    {product.map(p => (
                      <BlockProductCard key={p._id} product={p} blog={blog} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

      {/* Conclusion */}
      {blog.conclusion && (
        <div className="blog-content bg-white p-4 rounded-lg prose prose-lg max-w-none w-[90%] mx-auto mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#d64a00]">Conclusion</h2>
          <div dangerouslySetInnerHTML={{ __html: blog.conclusion }} />
        </div>
      )}
      {blog.faq && (
        <div className="blog-content bg-white rounded-lg w-[90%] mx-auto mt-6">
          <FAQ productName="" faq={blog.faq} />
        </div>
      )}
    </div>
  );
};

const BlockProductCard = ({ product, blog }) => {
  const getPrice = (product) => {
    const firstPackage = Array.isArray(product?.packages) ? product.packages[0] : null;
    if (!firstPackage) return null;

    const discounted = Number(
      firstPackage.discountedPrice ??
        firstPackage.price ??
        firstPackage.actualPrice
    );
    if (Number.isNaN(discounted) || discounted < 0) return null;
    return discounted;
  };

  const optimizeUrl = (url) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_400/");
  };

  const image = product?.images?.[0] || "/placeholder.png";
  const price = getPrice(product);

  return (
    <Link
      to={`/tours/${product.slug}`}
      className="flex items-center gap-4 bg-gray-50/50 hover:bg-orange-50/5 border border-gray-200 hover:border-orange-400 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 w-full"
    >
      {/* Left Side: Landscape Image */}
      <div className="w-[30%] sm:w-[22%] h-20 sm:h-24 shrink-0 overflow-hidden relative">
        <img
          src={optimizeUrl(image)}
          alt={product?.name || "Tour image"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Right Side: Landscape Info */}
      <div className="flex-1 flex flex-col justify-between py-2 pr-3 min-w-0">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 leading-tight transition-colors duration-300 hover:text-orange-500">
            {product?.name || "Untitled Product"}
          </h3>
          <p className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-500 mt-1">
            <MapPin size={12} className="text-orange-500 shrink-0" />
            <span className="line-clamp-1">
              {product?.city?.name || "Location details soon"},{" "}
              {product?.state?.name || blog?.state?.name || "India"}
            </span>
          </p>
        </div>

        <div className="mt-2 flex flex-row items-end justify-between gap-2">
          <div>
            <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap block">Starting from</span>
            {price !== null && (
              <span className="text-sm sm:text-base font-extrabold text-orange-500 whitespace-nowrap block leading-none">
                ₹{price.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <span className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors whitespace-nowrap">
            View Package
          </span>
        </div>
      </div>
    </Link>
  );
};


Blogleft.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    intro: PropTypes.string,
    conclusion: PropTypes.string,
    faq: PropTypes.string,
    authorName: PropTypes.string,
    country: PropTypes.object,
    state: PropTypes.object,
    city: PropTypes.object,
    blocks: PropTypes.arrayOf(
      PropTypes.shape({
        order: PropTypes.number.isRequired,
        heading: PropTypes.string,
        content: PropTypes.string,
        image: PropTypes.string,
      })
    ).isRequired,
  }),
};

export default Blogleft;