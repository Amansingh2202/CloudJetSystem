const express= require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');

const UserService = require('./services/user_service');

const {PORT}=require('./config/serverConfig');

const db=require('./models/index');
const {User,Role}= require('./models/index');
 const prepareAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // Register API routes
    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
     
        console.log(`Server is running on port ${PORT}`);

       


        if(process.env.DB_SYNC){
              db.sequelize.sync({alter:true})
        }
    }   
    );

   
}
prepareAndStartServer();