const express=require('express');

const bodyParser=require('body-parser')
const {PORT, REMINDER_BINDING_KEY}=require('./config/configServer')
const {sendBasicEmail}=require('./services/email-service')
const  TicketController= require('./controllers/ticket-controller.js')

const {createChannel, subscribeMessage}= require('./utils/messageQueue.js')

const EmailService=require('./services/email-service.js')

const setupJobs=require('./utils/job')

const setupStartServer=async ()=>{
       const app=express();
       app.use(bodyParser.json())
       app.use(bodyParser.urlencoded({extended:true}));

       const channel=await createChannel()
       subscribeMessage(channel,EmailService.subscribeEvent,REMINDER_BINDING_KEY)


       app.listen(PORT,()=>{
          console.log(`Server started at PORT:${PORT}`)
          setupJobs()

       //    app.post('/api/v1/tickets',TicketController.create) 

        //   sendBasicEmail(
        //     'support@admin.com',
        //     'amansingnh420@gmail.com',
        //     'this is a testing email',
        //     'hey, how are you , i hope you like the support'
        //   )

       })
}

setupStartServer()