const {FlightService}=require('../services/index.js')


const flightService = new FlightService();


const create = async(req, res) => {
    try {
        const flight = await flightService.createFlight(req.body);
        return res.status(201).json({
            data: flight,
            success: true,
            message: "Flight created successfully"
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to create a flight",
            err: error
        });
    }
};

const  getAll=async(req,res)=>{
    try {
        const flights = await flightService.getAllFlightData(req.query);
        return res.status(200).json({
            data: flights,
            success: true,
            message: "Flights fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to fetch flights",
            err: error
        });
    }
}

  const getFlightById=async(req,res)=>{
    try {
        const flights = await flightService.getFlight(req.params.id);
        return res.status(200).json({
            data: flights,
            success: true,
            message: "Flights fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to fetch flights",
            err: error
        });
    }


  }

  const update=async(req,res)=>{
    try {
        const response = await flightService.updateFlight(req.params.id,req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Flight updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to update the flight",
            err: error
        });
    }

  }





module.exports={
    create,
    getAll,
    getFlightById,
    update
}
