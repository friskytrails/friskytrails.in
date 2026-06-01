import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Admodal = ({ onClose }) => {
    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 flex justify-center z-50 pt-28 px-4 sm:px-6 md:px-8 bg-black/20 backdrop-blur-sm'>
            <div className='relative h-auto sm:h-[50vh] w-full sm:w-[90vw] md:w-[75vw] lg:w-[55vw] xl:w-[40vw] rounded-3xl drop-shadow-2xl bg-[rgb(10,3,34)] flex flex-col sm:flex-row overflow-y-auto max-h-[90vh] p-8 border border-white/10'>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-white text-3xl font-light hover:text-[rgb(255,99,33)] transition duration-200"
                    aria-label="Close Modal"
                >
                    &times;
                </button>

                {/* Column 1: Aerial */}
                <div className='text-white flex-1 flex flex-col cursor-pointer pb-6 sm:pb-0'>
                    <Link to="/adventures?category=aerial" onClick={onClose} className="hover:text-amber-500 transition-colors">
                        <h3 className='py-3 text-[rgb(255,99,33)] text-xl font-bold'>Aerial Activities</h3>
                    </Link>
                    <div className="flex flex-col gap-2.5 text-gray-300">
                        <Link to="/adventures?category=aerial" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Paragliding</Link>
                        <Link to="/adventures?category=aerial" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Paramotoring</Link>
                        <Link to="/adventures?category=aerial" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Hot Air Balloon</Link>
                        <Link to="/adventures?category=aerial" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Hummerchute Ride</Link>
                        <Link to="/adventures?category=aerial" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Skydiving</Link>
                    </div>
                </div>

                {/* Column 2: Water */}
                <div className='text-white flex-1 flex flex-col cursor-pointer pb-6 sm:pb-0 sm:pl-8'>
                    <Link to="/adventures?category=water" onClick={onClose} className="hover:text-amber-500 transition-colors">
                        <h3 className='py-3 text-[rgb(255,99,33)] text-xl font-bold'>Water Activities</h3>
                    </Link>
                    <div className="flex flex-col gap-2.5 text-gray-300">
                        <Link to="/adventures?category=water" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Scuba Diving</Link>
                        <Link to="/adventures?category=water" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Kayaking</Link>
                        <Link to="/adventures?category=water" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Boating</Link>
                        <Link to="/adventures?category=water" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Flyboarding</Link>
                        <Link to="/adventures?category=water" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Surfing</Link>
                    </div>
                </div>

                {/* Column 3: Land */}
                <div className='text-white flex-1 flex flex-col cursor-pointer sm:pl-8'>
                    <Link to="/adventures?category=land" onClick={onClose} className="hover:text-amber-500 transition-colors">
                        <h3 className='py-3 text-[rgb(255,99,33)] text-xl font-bold'>Land Activities</h3>
                    </Link>
                    <div className="flex flex-col gap-2.5 text-gray-300">
                        <Link to="/adventures?category=land" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Trekking</Link>
                        <Link to="/adventures?category=land" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Camping</Link>
                        <Link to="/adventures?category=land" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Bungee Jumping</Link>
                        <Link to="/adventures?category=land" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">Bike Trips</Link>
                        <Link to="/adventures?category=land" onClick={onClose} className="hover:text-[#FF6321] transition-colors py-1">ATV Ride</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admodal;