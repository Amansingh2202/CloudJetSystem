const {CityRepository}  = require('../repository/index.js');



class  CityService {
    
    constructor(){
        this.CityRepository= new CityRepository();
    }

    async createCity({name}) {
        try {
            const city = await this.CityRepository.createCity({name});
            return city;
        } catch (error) {

            console.log("something went wrong in service layer ")
            throw {error};
        }
     }

      async deleteCity(cityId) {
        try {
            await this.CityRepository.deleteCity(cityId);
        } catch (error) {
            console.log("something went wrong in service layer ")
            throw {error};
        }
    }
    async updateCity(cityId, data) {
        try {
            const city = await this.CityRepository.updateCity(cityId, data);
            return city;
        } catch (error) {
            console.log("something went wrong in service layer ")
            throw {error};
        }
    }
    async getCity(cityId) {
        try {
            const city = await this.CityRepository.getCity(cityId);
            return city;
        } catch (error) {
            console.log("something went wrong in service layer ")
            throw {error};
        }
    }
    async getAllCities(filter) {
        try {
            const cities = await this.CityRepository.getAllCities({name:filter.name});
            return cities;
        } catch (error) {
            console.log("something went wrong in service layer ")
            throw {error};
        }
    }
 

}
module.exports = CityService;