import { getStateWithBlogs } from '../../api/admin.api';

const StateData = async (slug) => {
  try {
    // Uncomment and use this when the backend is ready
    // const response = await getStateWithBlogs(slug);
    // return response.data;
    
    // Mock data - replace with actual API call
    return {
      state: {
        name: slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Paris",
        bannerImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600",
        topDestinations: [
          { 
            name: "Vedettes de Paris Sightseeing Cruise", 
            image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600", 
            description: "Scenic boat tour", 
            price: 22, 
            distance: "5 km" 
          },
          { 
            name: "Open Tour Bus", 
            image: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=600", 
            description: "Hop-on hop-off bus", 
            price: 30.60, 
            distance: "15 km", 
            discount: "10% Off" 
          },
          { 
            name: "Musée d'Orsay – Tourism Board Ticket", 
            image: "https://images.unsplash.com/photo-1541264161754-445bbdd7de52?w=600", 
            description: "Art museum tour", 
            price: 14, 
            distance: "14.5 km" 
          },
          { 
            name: "Ballon Generali Hot Air Balloon Ride", 
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600", 
            description: "Aerial experience", 
            price: 10, 
            distance: "50 km", 
            discount: "17% Off" 
          },
        ],
        topHotels: [
            { name: "Paris Vacation Rental at Louvre Palais Royal", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600", rating: 4.5, price: 150, link: "#", location: "Louvre / Place Vendôme", distance: "5 km" },
            { name: "River Seine / Eiffel / Rue Cler: Just Perfect!", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600", rating: 5.0, price: 200, link: "#", location: "Eiffel Tower / Invalides", distance: "11.2 km" },
            { name: "Central Paris Notre Dame Picasso", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600", rating: 4.8, price: 180, link: "#", location: "Luxembourg", distance: "50 km" },
            { name: "A Studio with Terrace - Notre Dame de Paris", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600", rating: 4.2, price: 120, link: "#", location: "Panthéon", distance: "31 km" },
          ],
        popularFoods: [
            { name: "Signature Montmartre", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600", description: "French, Asian, Korean", rating: 4.9, reviews: 2231, priceRange: "$$ - $$$", verified: true },
            { name: "Epicure", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600", description: "French, European", rating: 4.7, reviews: 2643, priceRange: "$$$$", verified: true },
            { name: "Petit Boutary", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600", description: "French, Gastropub", rating: 4.3, reviews: 1880, priceRange: "$$ - $$$", verified: true },
            { name: "Seb'on", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600", description: "French, European", rating: 4.0, reviews: 1116, priceRange: "$$ - $$$", verified: true },
          ],
      }
    };
  } catch (error) {
    throw error;
  }
};

export { StateData };