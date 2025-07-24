const {ClientError} = require('../utils/error_code.js')

const validateCreateFlight = (req, res, next) => 
{
    if( !req.body.flightNumber || 
        !req.body.departureAirportId ||
        !req.body.arrivalAirporId ||
        !req.body.departureTime ||
        !req.body.arrivalTime ||
        !req.body.price ||
        !req.body.airplaneId ) 
    {
        return res.status(ClientError.BAD_REQUEST).json({ error: 'All fields are required' });

    }
    next();

};
module.exports={
    validateCreateFlight
}