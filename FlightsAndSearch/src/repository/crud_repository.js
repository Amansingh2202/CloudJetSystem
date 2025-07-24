const { where } = require("sequelize");

class CrudRepository{
    constructor(model){
        this.model=model;  
    }
    async create(data){
        try{
               const result= await this.model.create(data);
               return result;
        }
        catch(error){
            console.error("Error creating record:", error);
            throw error;
        }
    }
    async destroy(modelId){
        try{
              
            await this.model.destroy({
                where: {
                    id: modelId
                }
            })
            return true;
        }
        catch(error){
            console.error("Error creating record:", error);
            throw error;
        }
    }
    async get(modelId){
        try{
                const result= await this.model.findByPK(modelId)
                return result;
        }
        catch(error){
            console.error("Error creating record:", error);
            throw error;
        }
    }
    async getAll(){
        try{
            const result= await this.model.findAll()
            return result;
        }
        catch(error){
            console.error("Error creating record:", error);
            throw error;
        }
    }
    async  update(modelId,data){
        try{
                const result=await this.model.update(data,{
            where: {
                id: modelId
            }
                })
                return result;
        }
        catch(error){
            console.error("Error creating record:", error);
            throw error;
        }
    }
}
module.exports=CrudRepository;