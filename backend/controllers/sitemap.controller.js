import { Router } from "express";
import CreateBlog from "../models/create-blog.model.js";
import Country from "../models/country.model.js";
import State from "../models/state.model.js";
import City from "../models/city.model.js";
import Product from "../models/product.model.js";
import ProductType from "../models/productType.model.js";

const router = Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const baseUrl = "https://www.friskytrails.in";

    // Static routes that always exist
    const staticPaths = [
      "",
      "/about",
      "/blog",
      "/contact",
      "/tours",
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

    const staticUrls = staticPaths.map((path) => `${baseUrl}${path}`);

    // Dynamic content
    const [blogs, countries, states, cities, products, productTypes] =
      await Promise.all([
        CreateBlog.find().select("slug").lean(),
        Country.find().select("slug").lean(),
        State.find().select("slug").lean(),
        City.find().select("slug").lean(),
        Product.find().select("slug").lean(),
        ProductType.find().select("slug").lean(),
      ]);

    const blogUrls = blogs.map((b) => `${baseUrl}/blog/${b.slug}`);
    const countryUrls = countries.map(
      (c) => `${baseUrl}/country/${c.slug}/`
    );
    const stateUrls = states.map((s) => `${baseUrl}/state/${s.slug}/`);
    const cityUrls = cities.map((c) => `${baseUrl}/city/${c.slug}/`);
    const productUrls = products.map((p) => `${baseUrl}/tours/${p.slug}`);
    const productTypeUrls = productTypes.map(
      (pt) => `${baseUrl}/productType/${pt.slug}/product`
    );

    const allUrls = [
      ...staticUrls,
      ...blogUrls,
      ...countryUrls,
      ...stateUrls,
      ...cityUrls,
      ...productUrls,
      ...productTypeUrls,
    ];

    const xml =
      '<?xml version="1.0" encoding="UTF-8"?>' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      allUrls
        .map(
          (url) => `
  <url>
    <loc>${url}</loc>
  </url>`
        )
        .join("") +
      "</urlset>";

    res.header("Content-Type", "application/xml");
    return res.send(xml);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return res.status(500).send("Sitemap error");
  }
});

export default router;

