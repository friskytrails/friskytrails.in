import { useEffect, useState } from "react";
import { getAllCountries } from "../api/admin.api";
import EditCountryForm from "./EditCountryForm";



const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const result = await getAllCountries();

      if (!result.data) {
        throw new Error(result.message || "Failed to fetch countries");
      }

      setCountries(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  /* -------------------- STATES -------------------- */

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading countries...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        ⚠️ {error}
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No countries found 😕
      </div>
    );
  }

  /* -------------------- EDIT MODE -------------------- */

  if (selectedCountry) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <button
          onClick={() => setSelectedCountry(null)}
          className="mb-4 inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
        >
          ⬅ Back to All Countries
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Country</h2>

        <EditCountryForm
          countryId={selectedCountry._id}
          onUpdate={fetchCountries}
          onClose={() => setSelectedCountry(null)}
        />
      </div>
    );
  }

  /* -------------------- LIST MODE -------------------- */

  return (
    <section className="max-w-6xl mx-auto px-2 sm:px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Countries</h2>
        <button
          onClick={fetchCountries}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((country) => (
          <div
            key={country._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition"
          >
            {country.image && (
              <img
                src={country.image}
                alt={country.name}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {country.name}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                Slug: <span className="font-medium">{country.slug}</span>
              </p>

              <div className="flex justify-between items-center">
                <a
                  href={`/country/${country.slug}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View →
                </a>

                <button
                  onClick={() => setSelectedCountry(country)}
                  className="text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md"
                >
                  ✏️ Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllCountries;

