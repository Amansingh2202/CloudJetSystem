const {User,Role}= require('../models');

class UserRepository {

    async create(data){
        try{
            const user = await User.create(data);
            return user;
        }
        catch(error){
                throw error
        }
    }
    async destroy(userid){
        try{
            const user = await User.destroy({
                where: {
                    id: userid
                }
            });
            return user;
        }
        catch(error){
            throw error;
        }
    }
    async getByID(userID)
    {
        try{
            const user = await User.findByPk(userID,{
                attributes: ['id', 'email'] //this will only going to give us these attributes among all the attributes of user model
            });
            return user;
        }
        catch(error){
            console.log("something went wrong in user repository while fetching user by ID");
            throw error;
        }
    }
           
    async getByEmail(userEmail){
        try{
            const user = await User.findOne({
                where: {
                    email: userEmail
                },
             // this will only give us these attributes among all the attributes of user model
            });

            return user;
        }
        catch(error){
            console.log("something went wrong in user service while fetching user by email");
            throw error;
        }
    }

      async isAdmin(userid){
        try{
               const user= await User.findByPk(userid);
               const adminRole=await  Role.findOne({
                where:{
                    name:'ADMIN'
                }
               })  
              
               return user.hasRole(adminRole);// weather user is exist by this role or not

              // and in this hasRole this (Role) is the table name and this can be hasPermission, hasCategory etc

        }
        catch(error){
            console.log("something went wrong in user  repository while checking if user is admin");
            throw error;
        }
      }
}

module.exports=UserRepository;