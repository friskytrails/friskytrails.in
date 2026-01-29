import { useRef } from 'react'
import { Link } from "react-router-dom";

const Modal = ({ onClose }) => {
    const modalRef = useRef();

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    const handleOptionClick = (e) => {
        onClose();
    }

    return (
        <div
            ref={modalRef}
            onClick={closeModal}
            className='fixed inset-0 flex justify-center z-50 pt-24 mt-4 px-2 sm:px-4 md:px-6 md:pl-40 xl:mt-2.5 bg-black/20'
        >
            <div className='relative h-[28vh] sm:h-[26vh] md:h-[24vh] lg:h-[30vh] w-[90vw] sm:w-[85vw] md:w-[70vw] lg:w-[50vw] xl:w-[35vw] max-w-sm lg:max-w-md rounded-lg bg-[rgb(10,3,34)] flex'>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className='absolute top-1 right-2 sm:right-3 md:right-4 text-white text-xl sm:text-2xl font-bold hover:text-[rgb(255,99,33)] transition duration-200'
                    aria-label="Close Modal"
                >
                    &times;
                </button>

                <div className='text-white pt-3 sm:pt-4 pl-3 sm:pl-6 md:pl-10 cursor-pointer flex-1 min-w-0'>
                    <Link 
                        to="/services/holidays"
                        onClick={handleOptionClick}
                    >
                        <h3 className='py-2 sm:py-3 hover:text-[rgb(255,99,33)] text-sm sm:text-base truncate'>Holidays</h3>
                    </Link>
                    <Link 
                        to="/services/activities"
                        onClick={handleOptionClick}
                    >
                        <h3 className='py-2 sm:py-3 hover:text-[rgb(255,99,33)] text-sm sm:text-base truncate'>Activities</h3>
                    </Link>
                    <Link 
                        to="/services/hotels"
                        onClick={handleOptionClick}
                    >
                        <h3 className='py-2 sm:py-3 hover:text-[rgb(255,99,33)] text-sm sm:text-base truncate'>Hotels</h3>
                    </Link>
                    <Link 
                        to="/services/transport"
                        onClick={handleOptionClick}
                    >
                        <h3 className='py-2 sm:py-3 hover:text-[rgb(255,99,33)] text-sm sm:text-base truncate'>Cab Service</h3>
                    </Link>
                </div>

                <div className='text-white pt-3 sm:pt-4 pl-2 sm:pl-4 md:pl-8 lg:pl-12 cursor-pointer flex-1 min-w-0'>
                    <Link 
                        to="/services/flights"
                        onClick={handleOptionClick}
                    >
                        <h3 className='py-2 sm:py-3 hover:text-[rgb(255,99,33)] text-sm sm:text-base truncate'>Flights</h3>
                    </Link>
                    <Link 
                        to="/services/rail-tickets"
                        onClick={handleOptionClick}
                    >
                        <h3 className='py-2 sm:py-3 hover:text-[rgb(255,99,33)] text-sm sm:text-base truncate'>Rail Tickets</h3>
                    </Link>
                    <Link 
                        to="/services/bus-tickets"
                        onClick={handleOptionClick}
                    >
                        <h3 className='py-2 sm:py-3 hover:text-[rgb(255,99,33)] text-sm sm:text-base truncate'>Bus Tickets</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Modal;
