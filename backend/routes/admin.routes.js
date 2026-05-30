import { Router } from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { createBlog, createCountry, getAllBlogs, getAllCountries, getAllStates, getBlogById, getCountries, getCountryBySlug, getCountryById, getCountryWithBlogs, updateBlog, deleteBlog, updateState, updateCountry, uploadEditorImage, getAllCities, getCityById, updateCity, getStateById } from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createState, getStates, getStateWithBlogs } from "../controllers/state.controller.js";
import { createCity, getCities, getCityWithBlogs } from "../controllers/city.controller.js";
import { createProduct, deleteProduct, getProductById, getProductBySlug, getProducts, updateProduct, getBlogRecommendations } from "../controllers/product.controller.js";
import { createBooking, getAllBookings, getBookingsByProduct } from "../controllers/booking.controller.js";
import { createProductType, getAllProductTypes, getProductTypeById, getProductTypeBySlug, getProductTypeBySlugWithProduct, updateProductType } from "../controllers/productType.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
const router = Router();

router.route("/create-blog").post(upload.single("image"), verifyJWT, verifyAdmin, createBlog)
router.get("/blogs", getAllBlogs);
router.route("/blog/:id").get(getBlogById);
router.put("/blog/:id", upload.single("image"), verifyJWT, verifyAdmin, updateBlog);
router.delete("/blog/:id", verifyJWT, verifyAdmin, deleteBlog);

router.post("/upload-editor-image", upload.single("image"), verifyJWT, verifyAdmin, uploadEditorImage);
router.post("/create-country", upload.single("image"), verifyJWT, verifyAdmin, createCountry);
router.get("/country/:slug", getCountries);
router.post("/create-state", upload.single("image"), verifyJWT, verifyAdmin, createState);
router.get("/countries", getCountries);
router.get("/states/:countryId", getStates);
router.post("/create-city", upload.single("image"), verifyJWT, verifyAdmin, createCity);
router.get("/cities/:stateId", getCities);
router.get("/country/:slug", getCountryBySlug);
router.get("/country/:slug/blogs", getCountryWithBlogs);
router.get("/state/:slug/blogs", getStateWithBlogs);
router.get("/city/:slug/blogs", getCityWithBlogs);

//HARSH ROUTES----------------------

// ================= STATES ROUTES =================

router.get("/states", getAllStates);

router.get(
  "/state/:id",
  getStateById
);

// ================= COUNTRIES ROUTES =================

router.get(
  "/allcountries",
  getAllCountries
);

router.get(
  "/country/:id",
  getCountryById
);

router.put(
  "/country/:id",
  verifyJWT,
  verifyAdmin, 
  upload.single("image"),
  updateCountry
);

router.put(
  "/state/:id",
  verifyJWT,
  verifyAdmin, 
  upload.single("image"),
  updateState
);

// ==========  CITIES ROUTES ============

router.get("/cities", getAllCities);

router.get("/city/:id", getCityById);

router.put(
  "/city/:id",
  verifyJWT,
  verifyAdmin, 
  upload.single("image"),
  updateCity
);





router.post(
  "/create-product",
  verifyJWT,
  verifyAdmin,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "sliderImages", maxCount: 5 },
  ]),
  createProduct
);

router.get("/products", getProducts);
router.post("/products/recommendations", getBlogRecommendations);
router.route("/product/id/:id").get(getProductById);
router.get("/product/slug/:slug", getProductBySlug);
router.put(
  "/product/:slug",
  verifyJWT,
  verifyAdmin,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "sliderImages", maxCount: 5 },
  ]),
  updateProduct
);
router.delete("/product/:slug", verifyJWT, verifyAdmin, deleteProduct);

router.post("/bookings", verifyJWT, verifyAdmin, createBooking);
router.get("/bookings", verifyJWT, getAllBookings);
router.get("/bookings/:slug", verifyJWT, verifyAdmin, getBookingsByProduct);

router.post("/create-productType", upload.single("image"), verifyJWT, verifyAdmin, createProductType);
router.get("/tags/:slug", getProductTypeBySlug);
router.get("/tags/:slug/product", getProductTypeBySlugWithProduct);
router.get("/productType/:id", getProductTypeById);
router.put(
  "/productType/:id",
  verifyJWT,
  verifyAdmin,
  upload.single("image"),
  updateProductType
);
router.get("/all-productTypes", getAllProductTypes);


export default router;
