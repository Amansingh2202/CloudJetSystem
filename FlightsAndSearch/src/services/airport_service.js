const CrudService = require('./crud_service');
const {AirportRepository} = require('../repository/index.js');


class AirportService extends CrudService {
    constructor() {
         constructor()
         {
            const airportRepository = new AirportRepository();
            super(airportRepository);
         }
    }

    
}

module.exports = AirportService;