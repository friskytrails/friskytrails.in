import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getStateWithBlogs } from "../../api/admin.api"
import CardCarousel from "../components/Carousel"
import Skeleton from "../../components/Skeleton"

const StatePage = () => {
  const { slug } = useParams()

  const [state, setState] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStateWithBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await getStateWithBlogs(slug)

        // ApiResponse wrapper handling: result.data contains { state, blogs }
        if (result?.data) {
          setState(result.data.state)
          setBlogs(result.data.blogs || [])
          setTours(result.data.tours || [])
        } else {
          setError("State data not found")
        }
      } catch (error) {
        console.error("Error fetching state:", error)
        setError(error?.response?.data?.message || error?.message || "Failed to fetch state data")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchStateWithBlogs()
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

  if (error || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{error || "State not found"}</p>
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
    <div className="min-h-screen ">
      {/* HERO */}
      <div className="w-full">
        <img
          src={state.image}
          alt={state.name}
          className="w-full h-64 sm:h-80 md:h-96 object-cover object-right sm:object-center"
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* HEADER */}
        <section className="pb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {state.name}
          </h1>
          <p className="mt-6 text-gray-700 leading-relaxed max-w-5xl text-2xl italic border-l-4 border-orange-500 pl-6 text-justify" style={{ fontFamily: "'Lora', serif" }}>
            "Leave the paved roads behind and find the places that make your heart beat a little faster.
            There’s a certain magic that happens when you step away from the noise and let the landscape take the lead. 
            From the quiet majesty of hidden trails to the vibrant pulse of local markets, every corner of this land 
            has a secret to share with those who are willing to listen. We’re here to help you find it."
          </p>
        </section>

        {/* BLOGS */}
        {blogs.length > 0 && (
          <>
            <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-6">
              Top Blogs in {state.name}
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
                  className="bg-white rounded-2xl shadow overflow-hidden block h-full hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg line-clamp-2 mb-4 h-12">
                      {blog.title}
                    </h3>
                    <div className="flex justify-end items-center mt-2">
                      <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            />

            {/* CTA */}
            <div className="flex justify-center mt-8 pb-8 border-b border-gray-100">
              <Link
                to="/blog"
                className="px-10 py-3.5 font-semibold bg-white border shadow-xl rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-400 hover:text-white transition-all duration-300"
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
              Top Tour Packages in {state.name}
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
                  <div className="relative overflow-hidden">
                    <img
                      src={tour.imageUrl}
                      alt={tour.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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
                        Check Now →
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            />


          </div>
        )}
      </main>
    </div>
  )
}

export default StatePage