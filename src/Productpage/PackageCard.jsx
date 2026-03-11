import { useState } from "react";
import { ChevronDown, ChevronUp, Check, Clock, X } from "lucide-react";

const PackageCard = ({ package: pkg }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Discount count
  const hasDiscount = pkg.actualPrice && pkg.actualPrice > pkg.price;
  const discountPercentage = hasDiscount
    ? Math.round(((pkg.actualPrice - pkg.price) / pkg.actualPrice) * 100)
    : 0;

  return (
    <div className="relative rounded-lg border-2 border-gray-200 bg-white transition-all duration-300 overflow-hidden hover:border-orange-300">
      {/* Popular Badge */}
      {pkg.isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
            Popular
          </div>
        </div>
      )}

      <div className="p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          {/* Left Side */}
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
              {pkg.name}
            </h3>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
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

          {/* Right Side */}
          <div className="text-left md:text-right flex-shrink-0">
            {hasDiscount && (
              <p className="text-gray-400 text-sm line-through">
                INR {pkg.actualPrice.toLocaleString("en-IN")}
              </p>
            )}

            <p className="text-orange-500 text-2xl md:text-3xl font-bold">
              INR {pkg.price.toLocaleString("en-IN")}
            </p>

            <p className="text-gray-500 text-sm">Per Adult</p>
          </div>
        </div>

        {/* Expandable Section */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-96 opacity-100 mt-5" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-200 pt-4 space-y-6">
            
            {/* Included Features */}
            <div>
              <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                <Check className="w-4 h-4" />
                What's Included:
              </h4>
              <ul className="space-y-2">
                {pkg.included?.length ? (
                  pkg.included.map((feature, index) => (
                    <li key={`inc-${index}`} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-400 italic">No specific inclusions listed</li>
                )}
              </ul>
            </div>

            {/* Excluded Features */}
            {pkg.excluded?.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <X className="w-4 h-4" />
                  What's Not Included:
                </h4>
                <ul className="space-y-2">
                  {pkg.excluded.map((feature, index) => (
                    <li key={`exc-${index}`} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
