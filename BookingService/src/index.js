const express=require('express');
const bodyParser=require('body-parser');

const apiRoutes=require('./routes/index.js');

const app=express();
const {PORT}=require('./config/serverConfig');
const db=require('./models/index.js')

const setupAndStartServer=()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    ;

   app.use('/api', apiRoutes);
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`);

        if(process.env.DB_SYNC)
{
            db.sequelize.sync({alter:true})
}    })

}


setupAndStartServer();