/

   -src/
        index.js// server
        models/
        controllers/
        middlewares/
        utils/
        config/ 
        repository/
 

 // dont be uploading below files in the production 
     -test/[later]     
     -static 
     -temp 
  
  ## project Setup 
  - clone the project on your local 
  -Execute `npm install` on the same path as of your root directory of tech downloaded project 
  -create a `.env` file in the root directory and add the following environment variable 
  -  `PORT=3000`
  - Inside  the `src/config` folder create a new file `config.jason` and then add the following piece of jason 
  ---
   
   {
  "name": "flightsandsearch",
  "version": "1.0.0",
  "description": "Micro service for handling FLIGHT CRUD",
  "license": "ISC",
  "author": "",
  "type": "commonjs",
  "main": "index.js",
  "scripts": {
    "start": "npx nodemon src/index.js"
  },
  "dependencies": {
    "body-parser": "^2.2.0",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "mysql2": "^3.14.1",
    "nodemon": "^3.1.10",
    "sequelize": "^6.37.7",
    "sequelize-cli": "^6.6.3"
  }
   }
   
    
     - Once you've added your db config as listed above , go to the src folder from your terminal and execute `npx sequelizdb:create` and the execute 
     - `npx sequelize db:migrate`


  ## DB design
   - Airplane table 
   -flight table
   - Airport 
   -city 

   - A flight belongs to an airplane but  one airplane can be used in multiple  flights 
   -A city has many airports but one airport belongs to a city 
   -One airport can have many flights , but a flight belongs to one airport 


   ## tables detail

    city->id,name,created_at,updated_at
    Airport -> id , name , address, city_id, created_at,updated_at

    Relation -> A city can have many Airports and a airpot only having one city(one to many )

    *********************

    To create the Airport model 

    npx sequelize model:generate --name Airport --attributes  name:String,address:String,cityId:integer

    ***********************