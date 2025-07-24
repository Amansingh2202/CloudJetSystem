const {Flights}= require('../models/index.js');
const { Op } = require('sequelize');


class FlightRepository {
       #createFilter(data) {
         let filter={}
         if(data.arrivalAirportId){
            filter.arrivalAirportId=data.arrivalAirportId;

          }

          if(data.departureAirportId){
            filter.departureAirportId=data.departureAirportId;
          }
         if(data.minPrice && data.maxPrice){
            Object.assign(filter,{price:{[Op.between]:[data.minPrice,data.maxPrice]}})
          }

          if(data.minPrice){
            Object.assign(filter,{price:{[Op.gte]:data.minPrice}})
          }
          if(data.maxPrice){
            Object.assign(filter,{price:{[Op.lte]:data.maxPrice}})
          }
          return filter;
        }

             async createFlight(data){
        try{
            const flight=await Flights.create(data);
            return flight;
        }
        catch(error){
            console.error("Error creating flight:", error);
            throw error;
        }

    }
    async getFlight(id) {
        try {
            const flight = await Flights.findByPk(id);
            if (!flight) {
                throw new Error('Flight not found');
            }
            return flight;
        } catch (error) {
            console.error("Something went wrong  in the repository:", error);
            throw error;
        }
    }

    async getAllFlights(filter) {
        try {
            const filterObject= this.#createFilter(filter);
            const flights = await Flights.findAll(
                {
                    where:filterObject
                }
            );
            return flights;
        } catch (error) {
            console.error("Something went wrong in the repository:", error);
            throw error;
        }
    }

    async updateFlight(flightId,data)
    {
        try{
            await Flights.update(data,{
                where:{
                    id:flightId
                }
            })
            return true;

        }
        catch(erro){
            console.error("Something went wrong in the repository:", error);
            throw error;
        }
    }



}
module.exports = FlightRepository;
