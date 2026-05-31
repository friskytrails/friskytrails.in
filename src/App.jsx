import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Layout components (Keep these static for better layout stability)
import Navbar from "./components/Navbar";
import Header from "./components/Header";
const End = lazy(() => import("./sections/End"));
const Last = lazy(() => import("./components/Last"));
import Scrolltotop from "./components/Scrolltotop";
import Skeleton from "./components/Skeleton";
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load page components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Hiring = lazy(() => import("./pages/Hiring"));
const Newlog = lazy(() => import("./Blogpages/Newlog"));
const CountryPage = lazy(() => import("./pages/countryPage/CountryPage"));
const StatePage = lazy(() => import("./pages/statePage/StatePage"));
const CityPage = lazy(() => import("./pages/cityPage/CityPage"));
const ProductsPage = lazy(() => import("./admin/ProductsPage"));
const ProductDetails = lazy(() => import("./admin/ProductDetails"));
const ProductType = lazy(() => import("./admin/ProductType"));
const AllBlogs = lazy(() => import("./admin/AllBlogs"));
const Unauthorized = lazy(() => import("./components/Unauthorized"));
const NotFound = lazy(() => import("./components/NotFound"));
const ComingSoon = lazy(() => import("./components/ComingSoon"));

// Admin forms
const Dashboard = lazy(() => import("./admin/Dashboard"));
const CreateBlogForm = lazy(() => import("./admin/CreateBlogForm"));
const CreateCountryForm = lazy(() => import("./admin/CreateCountryForm"));
const CreateStateForm = lazy(() => import("./admin/CreateStateForm"));
const CreateCityForm = lazy(() => import("./admin/CreateCityForm"));
const CreateProductPage = lazy(() => import("./admin/CreateProductPage"));
const CreateProductType = lazy(() => import("./admin/CreateProductType"));

// Service sub-pages
const Holidays = lazy(() => import("./ServicesPages/Holidays"));
const Flights = lazy(() => import("./ServicesPages/Flights"));
const Activities = lazy(() => import("./ServicesPages/Activities"));
const BusTickets = lazy(() => import("./ServicesPages/BusTickets"));
const Transport = lazy(() => import("./ServicesPages/Transport"));
const RailTickets = lazy(() => import("./ServicesPages/RailTickets"));
const Offers = lazy(() => import("./ServicesPages/Offers"));
const Hotels = lazy(() => import("./ServicesPages/Hotels"));



const App = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-clip"> {/* 👈 THIS WAS MISSING */}
      <Header />
      <Navbar />

      <Toaster position="top-center" gutter={12} containerStyle={{ margin: '16px' }} />
      {/*  MAIN CONTENT AREA - flex-1 pushes footer down */}
      <main className="flex-1">
        <Scrolltotop />
        <Suspense fallback={<div className="p-4 md:p-10"><Skeleton height="80vh" width="100%" borderRadius="1rem" /></div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/hiring" element={<Hiring />} />
            <Route path="/blog/:slug" element={<Newlog />} />
            <Route path="/country/:slug/" element={<CountryPage />} />
            <Route path="/state/:slug/" element={<StatePage />} />
            <Route path="/city/:slug/" element={<CityPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/tours/:slug" element={<ProductDetails />} />
            <Route path="/tags/:slug" element={<ProductType />} />
            <Route path="/get-blogs" element={<AllBlogs />} />

            {/* Coming Soon Routes */}
            <Route path="/adventures" element={<ComingSoon />} />
            <Route path="/partners" element={<ComingSoon />} />
            <Route path="/partner" element={<ComingSoon />} />
            <Route path="/reviews" element={<ComingSoon />} />

            {/* Protected Routes - SAME AS BEFORE */}
            <Route
              path="/services/*"
              element={

                <Routes>
                  <Route path="holidays" element={<Holidays />} />
                  <Route path="flights" element={<Flights />} />
                  <Route path="offers" element={<Offers />} />
                  <Route path="rail-tickets" element={<RailTickets />} />
                  <Route path="hotels" element={<Hotels />} />
                  <Route path="transport" element={<Transport />} />
                  <Route path="activities" element={<Activities />} />
                  <Route path="bus-tickets" element={<BusTickets />} />
                </Routes>

              }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              path="/admin/*"
              element={
                <ProtectedRoute adminOnly>
                  <Routes>
                    <Route path="admin-dashboard" element={<Dashboard />} />
                    <Route path="create-blog" element={<CreateBlogForm />} />
                    <Route path="create-country" element={<CreateCountryForm />} />
                    <Route path="create-state" element={<CreateStateForm />} />
                    <Route path="create-city" element={<CreateCityForm />} />
                    <Route path="create-product" element={<CreateProductPage />} />
                    <Route path="create-productType" element={<CreateProductType />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <End />
        <Last />
      </Suspense>
    </div>
  );
};

export default App;