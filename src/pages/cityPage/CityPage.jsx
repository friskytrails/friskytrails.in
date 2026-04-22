import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getCityWithBlogs } from "../../api/admin.api"
import CardCarousel from "../components/Carousel"
import Skeleton from "../../components/Skeleton"

const CityPage = () => {
  const { slug } = useParams()

  const [city, setCity] = useState(null)
  const [blogs, setBlogs] = useState([])
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
        {/* Responsive Hero Skeleton */}
        <div className="w-full mt-12 lg:mt-[6.7rem] xl:mt-24 px-4 sm:px-6 lg:px-8">
          <Skeleton height="0" className="pb-[56.25%] sm:pb-[62.5%] md:pb-[75%] lg:pb-[70%] xl:pb-[66.67%]" width="100%" borderRadius="1rem" />
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
      {/* HERO - PERFECT RESPONSIVE IMAGE */}
      <div
        className="w-full mt-12 lg:mt-[6.7rem] xl:mt-24"
        style={{
          marginTop:
            typeof window !== "undefined"
              ? window.innerWidth === 1024 && window.innerHeight === 600
                ? "3.9rem"     // Nest Hub → kam gap
                : window.innerWidth === 1024 && window.innerHeight === 1366
                ? "9.5rem"     // 1024×1366 → thoda zyada gap
                : undefined    // baaki sab Tailwind se
              : undefined,
        }}
      >
        {/* Responsive Container with Fixed Aspect Ratios */}
        <div className="relative overflow-hidden rounded-lg mx-4 sm:mx-6 lg:mx-8">
          <div className="w-full pt-[56.25%] sm:pt-[62.5%] md:pt-[75%] lg:pt-[70%] xl:pt-[66.67%]">
            <img
              src={city.image}
              alt={city.name}
              className="absolute inset-0 w-full h-full object-cover object-center hover:object-right transition-all duration-300"
              loading="eager"
            />
          </div>
        </div>
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
        <div className="flex justify-center mt-10">
          <Link
            to="/blog"
            className="px-10 py-4 font-semibold bg-white border-2 border-orange-500 shadow-xl rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-400 hover:text-white hover:border-transparent transition-all duration-300 text-orange-500 hover:shadow-2xl"
          >
            More Blogs
          </Link>
        </div>
      </main>
    </div>
  )
}

export default CityPage
