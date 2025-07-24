const {FlightRepository,AirplaneRepository} = require('../repository/index.js');
const {compareTime}  =require('../utils/helper.js');



class FlightService {

    constructor(){
        this.airplaneRepository= new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }


    async createFlight(data) {
        try {

            if(!compareTime(data.arrivalTime,data.departureTime)){
                throw  {error:"Arrival time mmust be greater than departure time"};
            }

             const airplane=await this.airplaneRepository.getAirplane(data.airplaneId);
             const flight= await this.flightRepository.createFlight({...data,totalSeats:airplane.capacity});
             return flight;



        } catch (error) {
            console.error("Error creating flight:", error);
            throw error;
        }
    }
    async getAllFlightData(data){

        try {

            const flights=await  this.flightRepository.getAllFlights(data);
            return flights
        } catch (error) {
            console.error("Error fetching flights:", error);
            throw error;
        }

    }

      async  getFlight(flightId){
       try{
       const Flight= await this.flightRepository.getFlight(flightId);
       return Flight;
       }
       catch{
            console.log("something went wrong in the service layer ");
            throw{error};
       }

    }
    async updateFlight(flightId,data)
    {
        try{
            const response= await this.flightRepository.updateFlight(flightId,data);
            return response;
        }
        catch(error){
            console.log("something went wrong in the service layer ");
            throw{error};
        }
    }

}
module.exports = FlightService;


/**
flightNumber
airplaneid
departuretAirportid,
ArrivalAirportid,
arrivaltime,
departuretime,
price
totalSeats->airplane
  */
