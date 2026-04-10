import { Router } from "express";
import { CreateBlog } from "../models/create-blog.model.js";
import { Country } from "../models/country.model.js";
import { State } from "../models/state.model.js";
import { City } from "../models/city.model.js";
import { Product } from "../models/product.model.js";
import { ProductType } from "../models/productType.model.js";

const router = Router();

// Frontend base URL for <loc> entries
const SITE_BASE_URL = "https://www.friskytrails.in";
// Backend base URL for sitemap files themselves (used in sitemap index)
const API_BASE_URL = "https://www.friskytrails.in";

const buildUrlset = (urls) => {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    urls
      .map(
        (u) => `
  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod || "2026-04-02"}</lastmod>
    <changefreq>${u.changefreq || "weekly"}</changefreq>
    <priority>${u.priority || "0.8"}</priority>
  </url>`
      )
      .join("") +
    "</urlset>"
  );
};

// Sitemap index – points to category sitemaps
// (Removed router.get here as we use exported functions now)

// Static pages sitemap
// (Removed router.get here as we use exported functions now)

// Blogs sitemap
// (Removed router.get here as we use exported functions now)

// Countries sitemap
// (Removed router.get here as we use exported functions now)

// States sitemap
// (Removed router.get here as we use exported functions now)

// Cities sitemap
// (Removed router.get here as we use exported functions now)

// Products sitemap (Renamed to match robots.txt tours-listing)
export const sitemapToursListing = async (req, res) => {
  try {
    const products = await Product.find().select("slug updatedAt").lean();
    const urls = products.map((p) => ({
      url: `${SITE_BASE_URL}/tours/${p.slug}`,
      lastmod: p.updatedAt ? p.updatedAt.toISOString().split("T")[0] : "2026-04-02",
      changefreq: "daily",
      priority: "0.9",
    }));
    const xml = buildUrlset(urls);

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap products error:", error);
    return res.status(500).send("Sitemap error");
  }
};

// Product types sitemap (Renamed to match robots.txt tags-listing)
export const sitemapTagsListing = async (req, res) => {
  try {
    const productTypes = await ProductType.find().select("slug updatedAt").lean();
    const urls = productTypes.map((pt) => ({
      url: `${SITE_BASE_URL}/tags/${pt.slug}`,
      lastmod: pt.updatedAt ? pt.updatedAt.toISOString().split("T")[0] : "2026-04-02",
      changefreq: "weekly",
      priority: "0.6",
    }));
    const xml = buildUrlset(urls);

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap productTypes error:", error);
    return res.status(500).send("Sitemap error");
  }
};

export const sitemap = (req, res) => {
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
};

export const sitemapStatic = (req, res) => {
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

  const urls = staticPaths.map((path) => ({
    url: `${SITE_BASE_URL}${path}`,
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "weekly",
    priority: path === "" ? "1.0" : "0.7",
  }));
  const xml = buildUrlset(urls);

  res.header("Content-Type", "application/xml");
  return res.send(xml);
};

export const sitemapBlogs = async (req, res) => {
  try {
    const blogs = await CreateBlog.find().select("slug updatedAt").lean();
    const urls = blogs.map((b) => ({
      url: `${SITE_BASE_URL}/blog/${b.slug}`,
      lastmod: b.updatedAt ? b.updatedAt.toISOString().split("T")[0] : "2026-04-02",
      changefreq: "weekly",
      priority: "0.6",
    }));
    const xml = buildUrlset(urls);

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap blogs error:", error);
    return res.status(500).send("Sitemap error");
  }
};

export const sitemapCountries = async (req, res) => {
  try {
    const countries = await Country.find().select("slug updatedAt").lean();
    const urls = countries.map((c) => ({
      url: `${SITE_BASE_URL}/country/${c.slug}/`,
      lastmod: c.updatedAt ? c.updatedAt.toISOString().split("T")[0] : "2026-04-02",
      changefreq: "monthly",
      priority: "0.7",
    }));
    const xml = buildUrlset(urls);

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap countries error:", error);
    return res.status(500).send("Sitemap error");
  }
};

export const sitemapStates = async (req, res) => {
  try {
    const states = await State.find().select("slug updatedAt").lean();
    const urls = states.map((s) => ({
      url: `${SITE_BASE_URL}/state/${s.slug}/`,
      lastmod: s.updatedAt ? s.updatedAt.toISOString().split("T")[0] : "2026-04-02",
      changefreq: "monthly",
      priority: "0.7",
    }));
    const xml = buildUrlset(urls);

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap states error:", error);
    return res.status(500).send("Sitemap error");
  }
};

export const sitemapCities = async (req, res) => {
  try {
    const cities = await City.find().select("slug updatedAt").lean();
    const urls = cities.map((c) => ({
      url: `${SITE_BASE_URL}/city/${c.slug}/`,
      lastmod: c.updatedAt ? c.updatedAt.toISOString().split("T")[0] : "2026-04-02",
      changefreq: "monthly",
      priority: "0.7",
    }));
    const xml = buildUrlset(urls);

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap cities error:", error);
    return res.status(500).send("Sitemap error");
  }
};

