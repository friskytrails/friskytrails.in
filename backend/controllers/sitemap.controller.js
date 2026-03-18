import { Router } from "express";
import { CreateBlog } from "../models/create-blog.model.js";
import { Country } from "../models/country.model.js";
import { State } from "../models/state.model.js";
import { City } from "../models/city.model.js";
import { Product } from "../models/product.model.js";
import { ProductType } from "../models/productType.model.js";

const router = Router();

// Frontend base URL for <loc> entries
const SITE_BASE_URL = "https://friskytrails.in";
// Backend base URL for sitemap files themselves (used in sitemap index)
const API_BASE_URL = "https://friskytrails.in";

const buildUrlset = (urls) => {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    urls
      .map(
        (url) => `
  <url>
    <loc>${url}</loc>
  </url>`
      )
      .join("") +
    "</urlset>"
  );
};

// Sitemap index – points to category sitemaps
router.get("/sitemap.xml", (req, res) => {
  const sitemaps = [
    "/sitemap-static.xml",
    "/sitemap-blogs.xml",
    "/sitemap-countries.xml",
    "/sitemap-states.xml",
    "/sitemap-cities.xml",
    "/sitemap-tours-listing.xml",
    "/sitemap-tags-listing.xml",
  ];

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    sitemaps
      .map(
        (path) => `
  <sitemap>
    <loc>${API_BASE_URL}${path}</loc>
  </sitemap>`
      )
      .join("") +
    "</sitemapindex>";

  res.header("Content-Type", "application/xml");
  return res.send(xml);
});

// Static pages sitemap
router.get("/sitemap-static.xml", (req, res) => {
  const staticPaths = [
    "",
    "/about",
    "/blog",
    "/reviews",
    "/partner",
    "/contact",
    "/hiring",
    "/services/holidays",
    "/services/flights",
    "/services/offers",
    "/services/rail-tickets",
    "/services/hotels",
    "/services/transport",
    "/services/activities",
    "/services/bus-tickets",
  ];

  const urls = staticPaths.map((path) => `${SITE_BASE_URL}${path}`);
  const xml = buildUrlset(urls);

  res.header("Content-Type", "application/xml");
  return res.send(xml);
});

// Blogs sitemap
router.get("/sitemap-blogs.xml", async (req, res) => {
  try {
    const blogs = await CreateBlog.find().select("slug").lean();
    const urls = blogs.map((b) => `${SITE_BASE_URL}/blog/${b.slug}`);
    const xml = buildUrlset(urls);

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap blogs error:", error);
    return res.status(500).send("Sitemap error");
  }
});

// Countries sitemap
router.get("/sitemap-countries.xml", async (req, res) => {
  try {
    const countries = await Country.find().select("slug").lean();
    const urls = countries.map(
      (c) => `${SITE_BASE_URL}/country/${c.slug}/`
    );
    const xml = buildUrlset(urls);

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap countries error:", error);
    return res.status(500).send("Sitemap error");
  }
});

// States sitemap
router.get("/sitemap-states.xml", async (req, res) => {
  try {
    const states = await State.find().select("slug").lean();
    const urls = states.map((s) => `${SITE_BASE_URL}/state/${s.slug}/`);
    const xml = buildUrlset(urls);

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap states error:", error);
    return res.status(500).send("Sitemap error");
  }
});

// Cities sitemap
router.get("/sitemap-cities.xml", async (req, res) => {
  try {
    const cities = await City.find().select("slug").lean();
    const urls = cities.map((c) => `${SITE_BASE_URL}/city/${c.slug}/`);
    const xml = buildUrlset(urls);

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap cities error:", error);
    return res.status(500).send("Sitemap error");
  }
});

// Products sitemap
router.get("/sitemap-products.xml", async (req, res) => {
  try {
    const products = await Product.find().select("slug").lean();
    const urls = products.map((p) => `${SITE_BASE_URL}/tours/${p.slug}`);
    const xml = buildUrlset(urls);

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap products error:", error);
    return res.status(500).send("Sitemap error");
  }
});

// Product types sitemap
router.get("/sitemap-productTypes.xml", async (req, res) => {
  try {
    const productTypes = await ProductType.find().select("slug").lean();
    const urls = productTypes.map((pt) => `${SITE_BASE_URL}/tags/${pt.slug}`);
    const xml = buildUrlset(urls);

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap productTypes error:", error);
    return res.status(500).send("Sitemap error");
  }
});

export default router;

