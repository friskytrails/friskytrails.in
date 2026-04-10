import { useState } from "react";
import PropTypes from "prop-types";
import Call from "../assets/calling.svg";
import FAQ from "../components/FAQ";
import ItineraryTimeline from "./ItineraryTimeline";
import PackageShowcase from "./PackageShowcase";
import ExploreMoreProducts from "./ExploreMoreProducts";

const MAIN_HEADING_PATTERNS = [
  "essential info",
  "about the",
  "package overview",
  "activity details",
  "itinerary details",
];

const getHeadingClassNames = (headingText) => {
  const normalized = (headingText || "").trim().toLowerCase();
  const isMainHeading = MAIN_HEADING_PATTERNS.some((pattern) =>
    normalized.startsWith(pattern)
  );

  if (isMainHeading) {
    return "font-bold mb-2 ml-6 w-fit";
  }

  return "font-semibold mt-4 mb-2 ml-3 md:ml-5 w-fit";
};

const Content = ({
  product,
  thingsToCarry,
  howToReach,
  selectedPackageIndex = 0,
  onSelectPackage,
}) => {
  const MAX_WORDS = 50;
  const [expandedSections, setExpandedSections] = useState({});

  if (!product) return null;

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const countWords = (text) => {
    if (!text) return 0;
    return text.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
  };

  const processHtmlContent = (htmlContent) => {
    if (!htmlContent) return "";

    const processed = htmlContent.replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-semibold">$1</strong>'
    );

    // Keep raw HTML when DOM APIs are unavailable.
    if (typeof window === "undefined" || typeof DOMParser === "undefined") {
      return processed;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        `<div id="content-root">${processed}</div>`,
        "text/html"
      );
      const root = doc.getElementById("content-root");
      if (!root) return processed;

      // Format standalone strong headings:
      // <p><strong>Nearest Airports:</strong></p>
      root.querySelectorAll("strong").forEach((strongTag) => {
        const text = strongTag.textContent?.trim() || "";
        if (!text) return;

        const parent = strongTag.parentElement;
        const isStandaloneStrongParagraph =
          parent?.tagName === "P" &&
          (parent.textContent?.trim() || "") === text;

        if (!isStandaloneStrongParagraph) return;

        const wrapper = doc.createElement("div");
        wrapper.className = getHeadingClassNames(text.replace(/:\s*$/, ""));
        wrapper.innerHTML = strongTag.outerHTML;
        parent.replaceWith(wrapper);
      });

      // Format numbered plain-text headings:
      // <p>1. By Air</p>, <p>2) By Road</p>
      root.querySelectorAll("p").forEach((paragraph) => {
        const paragraphText = paragraph.textContent?.trim() || "";
        if (!paragraphText || paragraph.children.length > 0) return;

        const isNumberedHeading = /^\d+[).\s-]+.+/.test(paragraphText);
        if (!isNumberedHeading) return;

        const wrapper = doc.createElement("div");
        wrapper.className = "font-bold mt-5 mb-3 ml-3 md:ml-5";
        wrapper.textContent = paragraphText;
        paragraph.replaceWith(wrapper);
      });

      return root.innerHTML;
    } catch (error) {
      console.error("Failed to format product HTML content:", error);
      return processed;
    }
  };

  const truncateHtml = (html, shouldTruncate, isExpanded) => {
    const textContent = html.replace(/<[^>]+>/g, "").trim();
    if (!shouldTruncate || isExpanded) return html;
    const words = textContent.split(/\s+/);
    if (words.length <= MAX_WORDS) return html;
    return html.split(" ").slice(0, MAX_WORDS).join(" ") + "...";
  };

  const renderSection = (
    key,
    title,
    htmlContent,
    showTitle = true,
    showProductName = true
  ) => {
    const wordCount = countWords(htmlContent);
    const isExpanded = expandedSections[key];
    const shouldTruncate = wordCount > MAX_WORDS;

    let processedContent = processHtmlContent(htmlContent);

    const displayContent = truncateHtml(processedContent, shouldTruncate, isExpanded);

    return (
      <div className="w-full mx-auto mb-6 md:mb-8 lg:mb-10">
        <div className="blog-content bg-white p-4 rounded-lg prose prose-lg mt-1 max-w-none">
          {showTitle && (
            <h2 className="mb-2 sm:mb-3 ml-4 not-prose leading-[1.1] sm:leading-tight">
              {showProductName && (
                <span className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
                  {product.name}{" "}
                </span>
              )}
              <span className="text-xl sm:text-xl md:text-2xl font-semibold text-black whitespace-nowrap">
                {title}
              </span>
            </h2>
          )}

          <div
            className="prose prose-headings:font-bold prose-headings:text-gray-900 max-w-none"
            dangerouslySetInnerHTML={{ __html: displayContent }}
          />

          {shouldTruncate && (
            <button
              onClick={() => toggleSection(key)}
              className="text-orange-500 font-semibold mt-2 ml-6"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-6 w-full space-y-4 md:space-y-6">
      {product.productHighlights &&
        renderSection("highlights", "Highlights", product.productHighlights)}
      
      {product.productOverview &&
        renderSection("overview", "Overview", product.productOverview)}

      {/* Things to Carry, Contact, FAQ, etc. - ALL UNCHANGED */}
      {thingsToCarry && (
        <div className="w-full mx-auto mb-6 md:mb-8 lg:mb-10">
          <div className="blog-content bg-white p-4 rounded-lg prose prose-lg mt-1 max-w-none">
            <h2 className="mb-1 sm:mb-3 not-prose ml-3 leading-[1.1] sm:leading-tight">
              <span className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
                {product.name}{" "}
              </span>
              <span className="text-xl sm:text-xl md:text-2xl font-semibold text-orange-500 whitespace-nowrap">
                Things to Carry
              </span>
            </h2>
            {Array.isArray(thingsToCarry) ? (
              <ul className="list-disc pl-5 ml-4">
                {(expandedSections["carry"] ? thingsToCarry : thingsToCarry.slice(0, 10)).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <div
                className="prose prose-headings:font-bold prose-headings:text-gray-900 ml-4"
                dangerouslySetInnerHTML={{
                  __html: processHtmlContent(
                    countWords(thingsToCarry) > MAX_WORDS && !expandedSections["carry"]
                      ? thingsToCarry.split(" ").slice(0, MAX_WORDS).join(" ") + "..."
                      : thingsToCarry
                  ),
                }}
              />
            )}
            {countWords(Array.isArray(thingsToCarry) ? thingsToCarry.join(" ") : thingsToCarry) > MAX_WORDS && (
              <button onClick={() => toggleSection("carry")} className="text-orange-500 font-semibold mt-2 ml-4">
                {expandedSections["carry"] ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="md:hidden bg-white border border-orange-500 rounded-lg shadow-md p-4 mb-6 md:mb-8 lg:mb-10 md:mt-10 sm:p-5">
        <h2 className="text-orange-500 text-lg sm:text-xl md:text-2xl font-semibold">Got a Question?</h2>
        <p className="text-sm sm:text-base md:text-lg mt-2">Our destination expert will be happy to help you resolve your queries for this tour.</p>
        <div className="flex gap-3 sm:gap-4 items-center w-full mt-4">
          <div className="flex items-center justify-center bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 h-9 w-9 sm:h-10 sm:w-10 rounded-full">
            <img className="h-4 w-4 sm:h-5 sm:w-5 invert" src={Call} alt="call" />
          </div>
          <div>
            <a className="text-base sm:text-lg md:text-xl font-semibold block" href="tel:+91-7877979193">
              +91-78779 79193
            </a>
            <h3 className="text-xs sm:text-sm">Mon-Sun: 9AM-8PM</h3>
            <h3 className="text-xs sm:text-sm break-all">
              <a href="mailto:contact@friskytrails.in" className="text-black">contact@friskytrails.in</a>
            </h3>
          </div>
        </div>
      </div>

      {product.additionalInfo &&
        renderSection("additionalInfo", "Know Before You Book", product.additionalInfo, true, false)}
      
      {howToReach && howToReach.trim() !== "" && renderSection("howToReach", "How to Reach", howToReach)}
      
      {product.faq && (
        <div className="w-full mx-auto mb-6 md:mb-8 lg:mb-10">
          <FAQ productName={product.name} faq={product.faq} />
        </div>
      )}
      
      {product.itineraries && (
        <div className="w-full mx-auto mb-6 md:mb-8 lg:mb-10">
          <ItineraryTimeline itineraries={product.itineraries} />
        </div>
      )}
      
      {Array.isArray(product.packages) && product.packages.length > 0 && (
        <div className="w-full mx-auto mb-6 md:mb-8 lg:mb-10">
          <PackageShowcase packages={product.packages} selectedIndex={selectedPackageIndex} onSelectPackage={onSelectPackage} />
        </div>
      )}

      <ExploreMoreProducts currentProduct={product} />
   
    </div>
    
  );
  
};



Content.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    productHighlights: PropTypes.string,
    productOverview: PropTypes.string,
    additionalInfo: PropTypes.string,
    faq: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.shape({ question: PropTypes.string, answer: PropTypes.string }))]),
    itineraries: PropTypes.array,
    packages: PropTypes.array,
  }).isRequired,
  thingsToCarry: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  howToReach: PropTypes.string,
};

export default Content;
