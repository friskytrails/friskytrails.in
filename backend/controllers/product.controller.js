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
  } = req.body;

  if (!name || !slug || !productType) {
    throw new ApiError(
      400,
      "Name, Slug, and Product Type are required"
    );
  }

  // Validate productType is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(productType)) {
    throw new ApiError(400, "Invalid Product Type ID");
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
    } catch {
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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const [totalProducts, products] = await Promise.all([
    Product.countDocuments(),
    Product.find()
      .populate("country state city productType", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select(
        "name slug productType rating reviews images city packages createdAt"
      )
      .lean()
  ]);

  const totalPages = Math.ceil(totalProducts / limit);

  res.status(200).json({
    status: true,
    success: true,
    data: {
        products,
        pagination: {
          totalItems: totalProducts,
          totalPages,
          currentPage: page,
          limit,
        },
      },
    message: "Products fetched successfully"
  });
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
    } catch {
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
    } catch {
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
  if (productType) {
    if (!mongoose.Types.ObjectId.isValid(productType)) {
      throw new ApiError(400, "Invalid Product Type ID");
    }
    product.productType = productType;
  }
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
    } catch {
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

// ============================
// Get Blog Recommendations (Optimized for Performance)
// ============================
export const getBlogRecommendations = asyncHandler(async (req, res) => {
  const { blocks } = req.body;
  if (!blocks || !Array.isArray(blocks)) {
    return res.status(400).json(new ApiResponse(400, null, "Blocks array is required"));
  }

  if (blocks.length === 0 || blocks.length > 30) {
    return res.status(400).json(new ApiResponse(400, null, "Blocks must contain 1 to 30 items"));
  }

  for (const b of blocks) {
    const heading = typeof b?.heading === "string" ? b.heading : "";
    const content = typeof b?.content === "string" ? b.content : "";
    if (heading.length > 300 || content.length > 2000) {
      return res.status(400).json(new ApiResponse(400, null, "Block text exceeds allowed size"));
    }
  }

  // Fetch a lightweight version of all products (in-memory matching is extremely fast)
  const allProducts = await Product.find()
    .populate("state city", "name")
    .select("name state city images packages slug")
    .lean();

  const assigned = {};
  const usedIds = new Set();
  const blockCounts = {};

  const allPairs = [];

  const getScore = (block, p) => {
    const cleanHeading = block.heading?.replace(/<[^>]+>/g, "").toLowerCase() || "";
    const cleanContent = block.content?.replace(/<[^>]+>/g, "").toLowerCase() || "";

    let score = 0;

    const cityName = p.city?.name?.toLowerCase() || "";
    const stateName = p.state?.name?.toLowerCase() || "";
    const pName = p.name?.toLowerCase() || "";

    // Priority 1: Exact city.name match in the subsection heading
    if (cityName && cleanHeading.includes(cityName)) score += 100;

    // Priority 2: Exact state.name match in the subsection heading
    if (stateName && cleanHeading.includes(stateName)) score += 50;

    // Priority 3: Exact city.name match in the subsection content
    if (cityName && cleanContent.includes(cityName)) score += 30;

    // Priority 4: Exact state.name match in the subsection content
    if (stateName && cleanContent.includes(stateName)) score += 10;

    // Priority 5: Product name keyword overlap with heading
    const genericWords = ["group", "trip", "tour", "tours", "package", "packages", "travel", "guide", "places", "best", "things", "visit", "with", "from", "india", "days", "nights"];

    if (pName && (cleanHeading.includes(pName) || pName.includes(cleanHeading))) {
      score += 5;
    } else {
      const pWords = pName.split(/\s+/).filter(word => word.length > 3 && !genericWords.includes(word));
      if (pWords.some(word => cleanHeading.includes(word))) {
        score += 5;
      }
    }

    return score;
  };

  blocks.forEach(block => {
    if (!block.heading) return;
    blockCounts[block.order] = 0;

    allProducts.forEach(product => {
      const score = getScore(block, product);
      if (score > 0) {
        allPairs.push({ block, product, score });
      }
    });
  });

  allPairs.sort((a, b) => b.score - a.score);

  for (const pair of allPairs) {
    const { block, product } = pair;

    if (blockCounts[block.order] >= 2) continue;
    if (usedIds.has(product._id.toString())) continue;

    if (!assigned[block.order]) {
      assigned[block.order] = [];
    }

    assigned[block.order].push(product);
    usedIds.add(product._id.toString());
    blockCounts[block.order]++;
  }

  res.status(200).json(new ApiResponse(200, assigned, "Recommendations generated successfully"));
});
