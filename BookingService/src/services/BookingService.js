const axios = require('axios');
const { ServiceError } = require('../utils/errors/index.js');
const { BookingRepository } = require('../repository/index.js');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig.js');

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;

      const response = await axios.get(getFlightRequestURL);
      const flightData = response.data.data;

      if (!flightData) {
        throw new ServiceError("Flight not found", "Flight fetch error", 404);
      }

      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Not enough seats available",
          "BookingService error",
          400
        );
      }

      const totalcost = flightData.price * data.noOfSeats;
      console.log(totalcost)
      const bookingPayload = { ...data, totalcost };

      const booking = await this.bookingRepository.create(bookingPayload);

      // Update remaining seats
      const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightRequestURL, {
        totalSeats: flightData.totalSeats - booking.noOfSeats
      });

        const finalbooking=await this.bookingRepository.update(booking.id,{status:"Booked"});



      return finalbooking;
    } catch (error) {
      console.error("BookingService::createBooking error", error);

      throw new ServiceError(
        "Failed to create booking",
        "Service layer error",
        error.response?.status || 500
      );
    }
  }
  async cancelBooking(bookingId) {
    try {
      // Step 1: Find the booking
      const booking = await this.bookingRepository.getById(bookingId);
  
      if (!booking) {
        throw new ServiceError("Booking not found", "Cancel error", 404);
      }
  
      // Step 2: If already cancelled
      if (booking.status === 'Cancelled') {
        throw new ServiceError("Booking already cancelled", "Cancel error", 400);
      }
  
      // Step 3: Get Flight Info
      const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      const flightResponse = await axios.get(getFlightRequestURL);
      const flightData = flightResponse.data.data;
  
      if (!flightData || typeof flightData.totalSeats !== 'number') {
        throw new ServiceError("Flight data not found", "Cancel error", 404);
      }
  
      // Step 4: Update seats back in Flight Service
      const updatedSeats = flightData.totalSeats + booking.noOfSeats;
      await axios.patch(getFlightRequestURL, { totalSeats: updatedSeats });
  
      // Step 5: Update booking status
      const updatedBooking = await this.bookingRepository.update(bookingId, { status: 'Cancelled' });
      return updatedBooking; 
  
    } catch (error) {
      console.error("BookingService::cancelBooking error", error);
  
      throw new ServiceError(
        error?.response?.data?.message || "Failed to cancel booking",
        "Service layer error",
        error.response?.status || 500
      );
    }
  }
  
}

module.exports = BookingService;
