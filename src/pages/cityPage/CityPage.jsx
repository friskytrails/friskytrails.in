import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getCityWithBlogs } from "../../api/admin.api"
import CardCarousel from "../components/Carousel"
import Skeleton from "../../components/Skeleton"

const CityPage = () => {
  const { slug } = useParams()

  const [city, setCity] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCityWithBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await getCityWithBlogs(slug)
        
        // ApiResponse wrapper handling: result.data contains { city, blogs }
        if (result?.data) {
          setCity(result.data.city)
          setBlogs(result.data.blogs || [])
          setTours(result.data.tours || [])
        } else {
          setError("City data not found")
        }
      } catch (error) {
        console.error("Error fetching city:", error)
        setError(error?.response?.data?.message || error?.message || "Failed to fetch city data")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchCityWithBlogs()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero Skeleton */}
        <div className="w-full">
          <Skeleton height="384px" width="100%" borderRadius="0" />
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          {/* Header Skeleton */}
          <div className="border-b pb-4 space-y-3">
             <Skeleton height="3rem" width="40%" />
             <Skeleton height="1.5rem" width="60%" />
          </div>

          {/* Carousel Title Skeleton */}
          <div className="mt-8 mb-6">
             <Skeleton height="2.5rem" width="30%" />
          </div>

          {/* Carousel Skeletons */}
          <div className="flex gap-4 overflow-hidden">
             {[...Array(4)].map((_, i) => (
                <div key={i} className="min-w-[300px] space-y-4">
                   <Skeleton height="200px" width="100%" borderRadius="1rem" />
                   <Skeleton height="1.5rem" width="80%" />
                </div>
             ))}
          </div>
        </main>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{error || "City not found"}</p>
          <Link
            to="/"
            className="text-orange-500 hover:text-orange-600 underline"
          >
            Go back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <div className="w-full">
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
          loading="eager"
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* HEADER */}
        <section className="border-b pb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {city.name}
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Experiential journeys will make you a storyteller
          </p>
        </section>

        {/* BLOGS */}
        {blogs.length > 0 && (
          <>
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-6">
              Top Blogs in {city.name}
            </h2>

            <CardCarousel
              className="mt-2"
              items={blogs.map((blog) => ({
                ...blog,
                imageUrl: blog.image || blog.coverImage || "/placeholder.png",
              }))}
              renderItem={(blog) => (
                <Link
                  to={`/blog/${blog.slug}`}
                  className="bg-white rounded-2xl shadow overflow-hidden block h-full hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4 font-semibold line-clamp-2 leading-tight">
                    {blog.title}
                  </div>
                </Link>
              )}
            />

            {/* CTA */}
            <div className="flex justify-center mt-8 pb-8 border-b border-gray-100">
              <Link
                to="/blog"
                className="px-10 py-3.5 font-semibold bg-white border shadow-xl rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-400 hover:text-white transition-all duration-300 text-orange-500"
              >
                More Blogs
              </Link>
            </div>
          </>
        )}

        {/* TOURS */}
        {tours.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
              Top Tour Packages in {city.name}
            </h2>

            <CardCarousel
              className="mt-2"
              items={tours.map((tour) => ({
                ...tour,
                imageUrl: tour.images?.[0] || "/placeholder.png",
              }))}
              renderItem={(tour) => (
                <Link
                  to={`/tours/${tour.slug}`}
                  className="bg-white rounded-2xl shadow overflow-hidden block h-full hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={tour.imageUrl}
                      alt={tour.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                      {tour.productType}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg line-clamp-1 mb-2">
                      {tour.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500">Starting from</p>
                        <p className="text-lg font-extrabold text-[rgb(255,99,33)]">
                          ₹{tour.packages?.[0]?.discountedPrice?.toLocaleString("en-IN") || "N/A"}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            />

            <div className="flex justify-center mt-10">
              <Link
                to="/products"
                className="px-10 py-4 font-semibold bg-[rgb(255,99,33)] text-white shadow-xl rounded-full hover:bg-orange-600 transition-all duration-300 hover:scale-105"
              >
                View All Tours
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default CityPage
