import axiosInstance from "../utils/axiosInstance";

const railTicket = async ({ fromStation, toStation, departureDate, returnDate, travelClass, passengers, price }) => {
  try {
    const response = await axiosInstance.post("/api/v1/rail/booking", { fromStation, toStation, departureDate, returnDate, travelClass, passengers, price });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export { railTicket };
