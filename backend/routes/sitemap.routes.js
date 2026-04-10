import { Router } from "express";
import { 
  sitemap, 
  sitemapStatic, 
  sitemapBlogs, 
  sitemapCountries, 
  sitemapStates, 
  sitemapCities, 
  sitemapToursListing, 
  sitemapTagsListing 
} from "../controllers/sitemap.controller.js";

const router = Router();

router.get("/sitemap.xml", sitemap);
router.get("/sitemap-static.xml", sitemapStatic);
router.get("/sitemap-blogs.xml", sitemapBlogs);
router.get("/sitemap-countries.xml", sitemapCountries);
router.get("/sitemap-states.xml", sitemapStates);
router.get("/sitemap-cities.xml", sitemapCities);
router.get("/sitemap-tours-listing.xml", sitemapToursListing);
router.get("/sitemap-tags-listing.xml", sitemapTagsListing);

export default router;
