const UserRepository= require('../repository/user_repository');
const jwt= require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcypt = require('bcrypt');
const ValidationError = require('../utils/validation-error');

class UserService {
     constructor() {
            this.userRepository = new UserRepository();
     }
     
    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
          
           
            console.log("something went wrong in user service while creating user");
            throw error;
        }
    }

    async signIn(email, plainpassword) {
        try {
            const user = await this.userRepository.getByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
    
            const passwordMatch = this.checkPassword(plainpassword, user.password);
            if (!passwordMatch) {
                throw new Error("Invalid password");
            }
    
            const newJWT = this.createToken({ id: user.id, email: user.email });
            return newJWT;
        } catch (error) {
            console.log("Error in signIn:", error.message);
            throw error;
        }
    }
    

    createToken(user)
    {
        try{
            const result=jwt.sign(user,JWT_KEY, {
                expiresIn: '1h' // Token will expire in 1 hour
            });
            return result;
  
        }
        catch(error){
            console.log("something went wrong in user service while creating token");
            throw error;
        }
    }

   verifyToken(token)
   {
        try{
            const result=jwt.verify(token, JWT_KEY);
            return result;
        }
        catch(error){
            console.log("something went wrong in user service while verifying token",error);
            throw error;
        }
    }
    async isAuthenticated(token)
    {
        try{
             const response = this.verifyToken(token)
             if(!response){
                throw {error: "Unauthorized"};
             }
             const user=await this.userRepository.getByID(response.id);
                if(!user){
                    throw {error: "User does not exist"};
                }
              return user.id;
        }
        catch(error){
            console.log("something went wrong in user service while checking authentication");
            throw error;
        }
    }

   checkPassword(userInputPassword, encryptedPassword) {
    try{
              return bcypt.compareSync(userInputPassword, encryptedPassword);
    }
    catch{
        console.log("something went wrong in user service while checking password");
        throw error;
    }

   }
   async isAdmin(userId){
    try{
                 return this.userRepository.isAdmin(userId);
    }
    catch{
        console.log("something went wrong in service layer");
        throw error;
    }
    }
   }

   





module.exports = UserService;