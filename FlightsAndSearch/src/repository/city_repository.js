const {City}= require('../models/index.js');
const {Op}= require('sequelize');


class CityReposioty{
    async createCity({name})
    {
        try{
            const city = await City.create({name});
            return city;
        }
        catch(error){
            throw {error};
        }
}

 async deleteCity(cityId)
 {
    try{
       await City.destroy({
            where:{
                id:cityId
            }
        });
    }
    catch(error){
        throw {error}
    }
  }

  async getCity(cityId)
  {
    try{
        const city = await City.findByPk(cityId);
        return city;
    }
    catch(error){
        throw {error}
    }
  }
  async updateCity({cityId, data}){
    try{
            // 
            
            const city = await City.findByPk(cityId);
            if(!city){
                throw {error: "No such city exists"}
            }
            city.name = data.name;
            await city.save();
            return city;
             
        }
    
    catch(error){
        throw {error}
    }

}
// this filter parameter can empty also 
    async getAllCities(filter ){
        try{
            if(filter.name){
                const cities=await City.findAll({
                    where:{
                        name:{
                            [Op.startsWith]: filter.name
                        }
                    }
                })
                return cities;

            }
            else {
                const cities = await City.findAll();
            return cities;
            }
        }
        catch(error){
            throw {error}
        }
    }
}
module.exports = CityReposioty;