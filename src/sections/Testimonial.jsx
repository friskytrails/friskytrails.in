import { TestimonialMarquee } from './TestimonialMarquee';


 const testimonialData = [
  {
    name: "Ashutosh Pareek",

    image: "/feedback/ashutosh.png",
    review: "If you're looking to experience the Himalayas in the most authentic and beautiful way, Hampta Pass with FriskyTrails is the way to go. Thank you, team, for an unforgettable journey. I'll definitely be back for more adventures with you guys!",
    rating: 5
  },
  {
    name: "Gokul Ram",

    image: "/feedback/gokul.png",
    review: "They did all the arrangements as per our needs in Goa and it was correctly priced and the communication was neat. Will recommend to others.",
    rating: 4
  },
  {
    name: "Harsh Choudhary",
    image: "/feedback/Harsh-Chaudhary.png",
    review: "Thank you so much for your kind words! 🌟 We're thrilled to hear that you had a wonderful holiday with FriskyTrails",
    rating: 5
  },
  {
    name: "Nidhi Jaiswal",

    image: "/feedback/nidhi.png",
    review: "Such an amazing journey with Frisky Trails! The Hampta Pass trek had its challenges, but the crew made it so much fun and comfortable. They were helpful throughout, and the group vibes were just perfect.",
    rating: 5
  },
  {
    name: "Sahu VijayLaxmi",

    image: "/feedback/sahu-vijayLakshmi.avif",
    review: "The agency was incredibly responsive to our needs, even with last-minute adjustments, and their passion for the region shone through in every recommendation.It was really a fantastic experience",
    rating: 4
  },
  {
    name: "Manoj R Gupta",
    image: "/feedback/Manoj-R-Gupta.avif",
    review: "It was a wonderful and fabulous holiday with FriskyTrails. We went to Goa, such an amazing place to visit.",
    rating: 5
  }
]

const Testimonial = ({ className = "" }) => {
  return (
    <section className={`w-full md:py-4 px-4 md:px-8 lg:px-12 text-center mt-6 md:mt-2 ${className}`}>
      
      {/* Small Top Orange Heading */}
      <h3 className="text-orange-500 font-semibold text-lg md:text-xl mb-2">
        Customer's Feedback
      </h3>

      {/* Main Bold Black Heading */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        What Says Our Visitors
      </h2>

      <TestimonialMarquee data={testimonialData} />
    </section>
  );
};

export default Testimonial;
