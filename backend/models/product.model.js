import mongoose from "mongoose";

/**
 * NOTE::: Package schema (sub-document) //in same model for fast read up no solo identitiy of packageschema
 */
const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // e.g. "Basic", "Premium"
    },
    // Original price before discount
    actualPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    // Discounted / offer price for this package
    discountedPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    // Included items for the package (e.g. "Hotel stay", "Breakfast")
    included: {
      type: [String],
      default: [],
    },
    // Excluded items for the package (e.g. "Flights", "Personal expenses")
    excluded: {
      type: [String],
      default: [],
    },
    isPopular: {
      type: Boolean,
      default: false, // highlight package
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true },
    productType: { type: String, required: true, trim: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },

    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: false,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: false,
    },

    // 👇 NEW FIELDS ADDED
    description: { type: String }, // Basic description (from textarea)
    itineraries: { type: String }, // 👈 ITINERARIES ADDED HERE
    productHighlights: { type: String },
    productOverview: { type: String },
    additionalInfo: { type: String },
    faq: { type: String },

    /**
     * 📦 Package Options
     */
    packages: {
      type: [packageSchema],
      default: [],
      validate: {
        validator: (val) => val.length <= 5,
        message: "You can add up to 5 packages only.",
      },
    },

    images: {
      type: [String],
      validate: {
        validator: (val) => val.length <= 5,
        message: "You can upload up to 5 images only.",
      },
    },

    // Separate slider images for small devices
    sliderImages: {
      type: [String],
      validate: {
        validator: (val) => val.length <= 5,
        message: "You can upload up to 5 slider images only.",
      },
    },
  },
  { timestamps: true }
);

// Auto-generate slug
productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
