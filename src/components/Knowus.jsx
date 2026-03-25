import Call from '../assets/calling.svg';
import Email from '../assets/email.svg';

// Example data array with image URLs and LinkedIn URLs
const teamMembers = [
  { img: '/members/manasvi.png', linkedin: 'https://www.linkedin.com/in/manasvi-singh-9392aa24b/' },
  { img: '/members/kanish.jpg', linkedin: 'https://www.linkedin.com/in/kanish-das-9bb268282/' },
  { img: '/members/sathi.jpg', linkedin: 'https://www.linkedin.com/in/sathi-maity/' },
  { img: '/members/khushboo.jpg', linkedin: 'https://www.linkedin.com/in/khushboo-bishnoi-8534672b7/' },
  { img: '/members/tushar.jpg', linkedin: 'https://www.linkedin.com/in/tushar-sharma-8003a836b/' },
  { img: '/members/sanya.jpg', linkedin: 'https://www.linkedin.com/in/sanya-batra-b22a0628a/' },
];

const Knowus = () => {
  return (
    <div className="px-4 md:px-10 xl:pl-20 w-full lg:w-[90%] max-w-[1280px] mx-auto">
      <h4 className="text-orange-600 text-xl md:text-2xl font-semibold">
        Get In
      </h4>
      <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl pt-2 font-semibold tracking-tighter leading-tight">
        Touch & Start Your Adventure!
      </h2>
      <p className="pt-4 lg:pt-2 xl:pt-2 sm:pt-6 text-sm sm:text-base">
        Our expert support team is always prepared to help you with any queries or concerns,
        providing quick and tailored solutions to suit your needs.
      </p>

      <div className="border-amber-600 mt-6 sm:mt-8 xl:mt-8 lg:mt-0 border rounded-3xl w-full lg:w-[40vw] xl:w-[36vw] h-auto sm:h-[40vh] p-6 sm:p-8">
        {/* Contact info section */}
        <div className="flex lg:flex-col xl:flex-row flex-wrap sm:flex-nowrap gap-4 sm:gap-6 items-start">
          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 h-[40px] w-[40px] rounded-full flex items-center justify-center">
              <img className="h-[20px] w-[20px] object-contain invert" src={Call} alt="Call icon" />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm sm:text-base">Phone No:</h3>
              <h2 className="text-base sm:text-lg font-semibold text-orange-500 cursor-pointer"><a href="tel:+917877979193">
              +91-78779 79193
            </a></h2>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-[rgb(255,99,33)] to-amber-400 h-[40px] w-[40px] rounded-full flex items-center justify-center">
              <img className="h-[20px] w-[20px] object-contain invert" src={Email} alt="Email icon" />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm sm:text-base">Email Address:</h3>
              <h2 className="text-base sm:text-lg font-semibold text-orange-500 cursor-pointer"><a href="mailto:contact@friskytrails.in">
              contact@friskytrails.in
            </a></h2>
            </div>
          </div>
        </div>

        {/* Team Text */}
        <h2 className="text-xl sm:text-2xl xl:text-3xl pt-6 font-semibold tracking-tighter">
          20+ Expert Team member
        </h2>

        {/* Overlapping Circles with Images */}
        <div className="pt-6 sm:pt-10 flex items-center space-x-[-10px] relative z-0">
          {teamMembers.map((member, index) => (
            <a
              key={index}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-transform hover:scale-110 hover:z-10"
            >
              <img
                src={member.img}
                alt={`Team member ${index + 1}`}
                className="h-[60px] sm:h-[70px] w-[60px] sm:w-[70px] rounded-full border-2 border-white object-cover shadow-md"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Knowus;
