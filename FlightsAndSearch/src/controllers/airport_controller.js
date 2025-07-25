const {AirportService}= require('../services/index.js');

const airportService= new AirportService();

const create = async (req, res) => {
    try {

         console.log(req.body);
        const airport = await airportService.create(req.body);
        return res.status(201).json({
            data: airport,
            success: true,
            message: "Successfully created a new airport",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to create a new airport",
            err: error
        });
    }
}



module.exports={
  create
}