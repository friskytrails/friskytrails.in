import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import slugify from "slugify";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

console.log("Controller loaded");

// ============================
// Create Product
// ============================
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    slug,
    productType,
    rating,
    reviews,
    description,
    productHighlights,
    productOverview,
    itineraries, // 👈 ADDED
    thingsToCarry,
    additionalInfo,
    faq,
    country,
    state,
    city,
    packages,
    existingImages,
    existingSliderImages,
  } = req.body;

  if (!name || !slug || !productType) {
    throw new ApiError(
      400,
      "Name, Slug, and Product Type are required"
    );
  }

  // Upload images to Cloudinary
  let images = [];
  let sliderImages = [];

  const imageFiles = req.files?.images || [];
  const sliderImageFiles = req.files?.sliderImages || [];

  if (imageFiles.length > 0) {
    for (const file of imageFiles) {
      const result = await uploadOnCloudinary(file.buffer);
      if (result?.secure_url) images.push(result.secure_url);
    }
    if (images.length > 5)
      throw new ApiError(400, "You can upload up to 5 images only");
  }

  if (sliderImageFiles.length > 0) {
    for (const file of sliderImageFiles) {
      const result = await uploadOnCloudinary(file.buffer);
      if (result?.secure_url) sliderImages.push(result.secure_url);
    }
    if (sliderImages.length > 5)
      throw new ApiError(400, "You can upload up to 5 slider images only");
  }

  // Parse packages safely (supports string, object, or array from multipart)
  let parsedPackages = [];
  if (packages) {
    try {
      let raw = packages;

      // Multer can sometimes give arrays for repeated fields
      if (Array.isArray(raw)) {
        raw = raw[0];
      }

      // If it's a JSON string, parse it
      if (typeof raw === "string") {
        raw = JSON.parse(raw);
      }

      if (!Array.isArray(raw)) {
        throw new Error("Packages must be an array");
      }

      // Normalize packages to ensure included/excluded are stored correctly
      parsedPackages = raw.map((pkg) => ({
        name: pkg.name || "",
        actualPrice: pkg.actualPrice ?? 0,
        discountedPrice: pkg.discountedPrice ?? pkg.price ?? 0,
        isPopular: !!pkg.isPopular,
        // Support both new (included) and old (features) keys
        included:
          (Array.isArray(pkg.included) && pkg.included.length
            ? pkg.included
            : Array.isArray(pkg.features)
            ? pkg.features
            : []),
        excluded: Array.isArray(pkg.excluded) ? pkg.excluded : [],
      }));
    } catch (err) {
      throw new ApiError(400, "Invalid packages format");
    }
  }

  // Helper: clean optional ObjectId fields
  const cleanObjectId = (value) => (value ? value : undefined);

  const product = await Product.create({
    name,
    slug,
    productType,
    rating: rating || 0,
    reviews: reviews || 0,
    description,
    productHighlights,
    productOverview,
    itineraries, // 👈 SAVED
    thingsToCarry,
    additionalInfo,
    faq,
    images,
    sliderImages,
    packages: parsedPackages,
    country,
    state: cleanObjectId(state),
    city: cleanObjectId(city),
  });

  res
    .status(201)
    .json(new ApiResponse(201, product, "✅ Product created successfully"));
});

// ============================
// Get All Products
// ============================
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("country state city", "name slug")
    .select(
      "name slug productType rating reviews images city packages createdAt"
    )
    .lean();

  res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

// ============================
// Get Product By Slug
// ============================
export const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const product = await Product.findOne({ slug })
    .populate("country state city productType", "name slug")
    .select("-__v")
    .lean();

  if (!product) throw new ApiError(404, "Product not found");

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

// ============================
// Get Product By ID
// ============================
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const product = await Product.findById(id)
    .populate("country", "name slug")
    .populate("state", "name slug")
    .populate("city", "name slug")
    .populate("productType", "name slug")
    .select("-__v") // 👈 Now includes itineraries automatically
    .lean();

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

// ============================
// Update Product By Slug
// ============================
export const updateProduct = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const {
    name,
    productType,
    rating,
    reviews,
    description,
    productHighlights,
    productOverview,
    itineraries, // 👈 ADDED
    thingsToCarry,
    additionalInfo,
    faq,
    country,
    state,
    city,
    packages,
    existingImages,
    existingSliderImages,
  } = req.body;

  const product = await Product.findOne({ slug });
  if (!product) throw new ApiError(404, "Product not found");

  // Overwrite existing image arrays when provided from admin UI
  if (existingImages !== undefined) {
    try {
      let parsed = existingImages;
      if (Array.isArray(parsed)) {
        parsed = parsed[0];
      }
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed || "[]");
      }
      if (!Array.isArray(parsed)) {
        throw new Error("existingImages must be an array");
      }
      if (parsed.length > 5) {
        throw new ApiError(400, "You can upload up to 5 images only");
      }
      product.images = parsed;
    } catch (err) {
      throw new ApiError(400, "Invalid existingImages format");
    }
  }

  if (existingSliderImages !== undefined) {
    try {
      let parsed = existingSliderImages;
      if (Array.isArray(parsed)) {
        parsed = parsed[0];
      }
      if (typeof parsed === "string") {
        parsed = JSON.parse(parsed || "[]");
      }
      if (!Array.isArray(parsed)) {
        throw new Error("existingSliderImages must be an array");
      }
      if (parsed.length > 5) {
        throw new ApiError(
          400,
          "You can upload up to 5 slider images only"
        );
      }
      product.sliderImages = parsed;
    } catch (err) {
      throw new ApiError(400, "Invalid existingSliderImages format");
    }
  }

  // Upload new images
  const imageFiles = req.files?.images || [];
  const sliderImageFiles = req.files?.sliderImages || [];

  if (imageFiles.length) {
    const existing = Array.isArray(product.images) ? product.images : [];
    if (imageFiles.length + existing.length > 5) {
      throw new ApiError(400, "You can upload up to 5 images only");
    }

    const uploadedImages = [];
    for (const file of imageFiles) {
      const result = await uploadOnCloudinary(file.buffer);
      if (result?.secure_url) uploadedImages.push(result.secure_url);
    }

    product.images = [...existing, ...uploadedImages];
  }

  if (sliderImageFiles.length) {
    const existingSlider = Array.isArray(product.sliderImages)
      ? product.sliderImages
      : [];
    if (sliderImageFiles.length + existingSlider.length > 5) {
      throw new ApiError(
        400,
        "You can upload up to 5 slider images only"
      );
    }

    const uploadedSliderImages = [];
    for (const file of sliderImageFiles) {
      const result = await uploadOnCloudinary(file.buffer);
      if (result?.secure_url) uploadedSliderImages.push(result.secure_url);
    }

    product.sliderImages = [...existingSlider, ...uploadedSliderImages];
  }

  // Update fields
  if (name) {
    product.name = name;
    product.slug = slugify(name, { lower: true, strict: true });
  }
  if (productType) product.productType = productType;
  if (rating !== undefined) product.rating = rating;
  if (reviews !== undefined) product.reviews = reviews;
  if (description) product.description = description;
  if (productHighlights) product.productHighlights = productHighlights;
  if (productOverview) product.productOverview = productOverview;
  if (itineraries) product.itineraries = itineraries; // 👈 UPDATED
  if (thingsToCarry) product.thingsToCarry = thingsToCarry;
  if (additionalInfo) product.additionalInfo = additionalInfo;
  if (faq) product.faq = faq;
  if (country) product.country = country;
  if (state) product.state = state;
  if (city) product.city = city;

  // Update packages
  if (packages) {
    try {
      let raw = packages;

      if (Array.isArray(raw)) {
        raw = raw[0];
      }

      if (typeof raw === "string") {
        raw = JSON.parse(raw);
      }

      if (!Array.isArray(raw)) {
        throw new Error("Packages must be an array");
      }

      product.packages = raw.map((pkg) => ({
        name: pkg.name || "",
        actualPrice: pkg.actualPrice ?? 0,
        discountedPrice: pkg.discountedPrice ?? pkg.price ?? 0,
        isPopular: !!pkg.isPopular,
        included:
          (Array.isArray(pkg.included) && pkg.included.length
            ? pkg.included
            : Array.isArray(pkg.features)
            ? pkg.features
            : []),
        excluded: Array.isArray(pkg.excluded) ? pkg.excluded : [],
      }));
    } catch (err) {
      throw new ApiError(400, "Invalid packages format");
    }
  }

  await product.save();

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully"));
});

// ============================
// Delete Product
// ============================
export const deleteProduct = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const product = await Product.findOneAndDelete({ slug });
  if (!product) throw new ApiError(404, "Product not found");

  res
    .status(200)
    .json(new ApiResponse(200, product, "Product deleted successfully"));
});
