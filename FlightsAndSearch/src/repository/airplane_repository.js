const {Airplane}=require('../models/index.js');


class AirplaneRepository {  
    async getAirplane(id){
        try {
            const airplane = await Airplane.findByPk(id);
            if (!airplane) {
                throw new Error('Airplane not found');
            }
            return airplane;
        } catch (error) {
            console.error("Error fetching airplane:", error);
            throw error;
        }
    }
}

module.exports=AirplaneRepository;