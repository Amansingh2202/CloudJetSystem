const {CityService } = require('../services/index.js');



const cityService= new CityService();

const create=async(req,res)=>{
    try{
          const city=await cityService.createCity(req.body)
         return  res.status(201).json({
            data: city,
            success: true,
            message: "Successfully created a new city",
            err:{}
         });            
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to create a new city",
            err: error
        })
    }
}

 

const destroy=async(req,res)=>{  
    try{
     
          const response=  await cityService.deleteCity(req.params.id);
        return res.status(200).json({
            data: {},
            success: true,
            message: "Successfully deleted the city",
            err:{}
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to delete the city",
            err: error
        });
    }
}
  
//patch -> /city/:id -> req.body
const update=async(req,res)=>{
    try{
          const response= cityService.updateCity(req.params.id, req.body)
               return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully updated the city",
            err:{}
        });
        }
    catch(error){
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to update the city",
            err: error
        });
    }
}

// get -> /city/:id
const get=async(req,res)=>{
    try{
            const response =await cityService.getCity(req.params.id)
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched the city",
            err:{}
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to fetch the city",
            err: error
        });
    }
}

 const getAll=async(req,res)=>{
    try{
        const cities=await cityService.getAllCities(req.query);
        return res.status(200).json({
            data: cities,
            success: true,
            message: "Successfully fetched all the cities",
            err:{}
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to fetch the cities",
            err: error
        });
 }
 // search function to select a city by particular name 






}
module.exports = {
    create,
    destroy,
    update,
    get,
    getAll
}
