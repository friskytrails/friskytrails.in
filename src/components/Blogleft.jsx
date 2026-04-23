import PropTypes from "prop-types";

const Blogleft = ({ blog }) => {
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
        .map((block, index) => (
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

  // Define font size map
  const sizeMap = {
    1: "text-3xl", // Tailwind classes
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg",
    5: "text-base",
    6: "text-sm",
  };

  return (
    <div className="flex items-start">
      <span className={`font-bold mt-1.5 mr-2 ${sizeMap[level]}`}>
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
            {block.image && (
              <div className="flex justify-center mt-4">
                <img
                  src={block.image}
                  alt={block.heading ? block.heading.replace(/<[^>]+>/g, "") : `${blog.title} - Section ${block.order}`}
                  className="rounded-lg max-w-full"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        ))}

      {/* Conclusion */}
      {blog.conclusion && (
        <div className="blog-content bg-white p-4 rounded-lg prose prose-lg max-w-none w-[90%] mx-auto mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#d64a00]">Conclusion</h2>
          <div dangerouslySetInnerHTML={{ __html: blog.conclusion }} />
        </div>
      )}
      {blog.faq && (
        <div className="blog-content bg-white p-4 rounded-lg prose prose-lg max-w-none w-[90%] mx-auto mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#d64a00]">Frequently Asked Questions</h2>
          <div dangerouslySetInnerHTML={{ __html: blog.faq }} className="faq-content" />
        </div>
      )}
    </div>
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