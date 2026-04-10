import { useState, useRef, useLayoutEffect } from "react";
import { ChevronDown, ChevronUp, Check, X } from "lucide-react";

const PackageCard = ({ package: pkg, isSelected = false, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  // Use useLayoutEffect for accurate DOM measurements (runs after DOM mutations but before paint)
  useLayoutEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        // Force a reflow to ensure accurate measurement
        contentRef.current.style.height = "auto";
        const height = contentRef.current.scrollHeight;
        setMaxHeight(`${height}px`);
      } else {
        setMaxHeight("0px");
      }
    }
  }, [isExpanded, pkg]);

  // Reset height when collapsing to prevent jumping
  useLayoutEffect(() => {
    if (!isExpanded && contentRef.current) {
      contentRef.current.style.height = "0px";
    }
  }, [isExpanded]);

  // Discount calculation
  const actual = Number(pkg.actualPrice);
  const discounted = Number(
    pkg.discountedPrice ?? pkg.price ?? pkg.actualPrice
  );

  const hasDiscount =
    !Number.isNaN(actual) &&
    !Number.isNaN(discounted) &&
    actual > 0 &&
    discounted >= 0 &&
    actual > discounted;

  const discountPercentage = hasDiscount
    ? Math.round(((actual - discounted) / actual) * 100)
    : 0;

  return (
    <div
      ref={containerRef}
      className={`relative rounded-lg border-2 bg-white transition-all duration-300 overflow-hidden cursor-pointer ${
        isSelected
          ? "border-orange-500 shadow-md"
          : "border-gray-200 hover:border-orange-300"
      }`}
      onClick={onSelect ? () => onSelect() : undefined}
    >
      {/* Badge */}
      {(pkg.isPopular || isSelected) && (
        <div className="absolute top-0 right-0">
          <div className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
            {isSelected ? "Selected" : "Popular"}
          </div>
        </div>
      )}

      <div className="p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Left */}
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
              {pkg.name}
            </h3>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded((prev) => !prev);
              }}
              className="mt-3 text-orange-500 font-medium text-sm hover:underline inline-flex items-center gap-1"
            >
              {isExpanded ? "Hide Details" : "Show Details"}
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Right */}
          <div className="text-left md:text-right flex-shrink-0">
            {hasDiscount && (
              <p className="text-gray-400 text-sm line-through">
                INR {actual.toLocaleString("en-IN")}
              </p>
            )}

            <p className="text-orange-500 text-2xl md:text-3xl font-bold">
              INR {discounted.toLocaleString("en-IN")}
            </p>

            <p className="text-gray-500 text-sm">Per Adult</p>

            {discountPercentage > 0 && (
              <p className="mt-1 text-xs text-green-600 font-semibold">
                Save {discountPercentage}% on this package
              </p>
            )}
          </div>
        </div>

        {/* Expandable Section - Fixed height calculation */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight }}
        >
          <div ref={contentRef} className="transition-all duration-300">
            <div className="border-t border-gray-200 pt-4 mt-5 space-y-6 pb-4">
              {/* Included */}
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  What&apos;s Included:
                </h4>
                <ul className="space-y-2">
                  {pkg.included?.length ? (
                    pkg.included.map((feature, index) => (
                      <li key={`inc-${index}`} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">
                          {feature}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400 italic">
                      No specific inclusions listed
                    </li>
                  )}
                </ul>
              </div>

              {/* Excluded */}
              {pkg.excluded?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                    <X className="w-4 h-4" />
                    What&apos;s Not Included:
                  </h4>
                  <ul className="space-y-2">
                    {pkg.excluded.map((feature, index) => (
                      <li key={`exc-${index}`} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
