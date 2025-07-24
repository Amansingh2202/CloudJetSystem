const express=require('express')

const CityController = require('../../controllers/city_controller.js');
const FlightController = require('../../controllers/flight_controller.js');
const AirportController = require('../../controllers/airport_controller.js');
const {FlightMiddlewares} = require('../../middlewares/index.js');

const router=express.Router();

router.post('/city', CityController.create);
router.delete('/city/:id', CityController.destroy);
router.patch('/city/:id', CityController.update);
router.get('/city/:id', CityController.get);
router.get('/city', CityController.getAll);

router.post('/flights',
    FlightMiddlewares.validateCreateFlight,
    FlightController.create
);

router.get('/flights', FlightController.getAll);
router.post('/airports', AirportController.create);
router.get('/flights/:id', FlightController.getFlightById);

router.patch('/flights/:id',FlightController.update) // to update something we use patch request 

module.exports=router;
