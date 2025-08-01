const {BookingService}=require('../services/index.js');
const {StatusCodes}=require('http-status-codes');
const { createChannel , publishMessage} = require('../utils/messageQueue.js');
const {REMINDER_BINDING_KEY}=require('../config/serverConfig.js')

const bookingService= new BookingService();



class BookingController{  


   constructor(){
   
   }

       
     async sendMessageToQueue(req,res)
     {
      const channel=await createChannel();
      const payload={
        data:{
                        subject:'This is  a notification from Queue',
                        content:'Some queue will subscribe this',
                        recepientEmail:'amansingnh420@gmail.com',
                        notificationTime:'2025-01-07T09:49:00'
        },
        service:'CREATE_TICKET'
      }
         publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload))
            return res.status(200).json({
              message:'Succesfully published the event '
            })
     }

    async create(req,res)
    {
             try{
                         const response=await bookingService.createBooking(req.body);
                           return res.status(StatusCodes.OK).json(
                            {
                                  success:true,
                                  message:'Booking created successfully',
                                  data:response,
                                  err:{} 
                            }); 
                }
             catch(error){
                             return res.status(error.statusCode|| StatusCodes.INTERNAL_SERVER_ERROR).json(
                              {
                                    message:error.message,
                                    success:false,
                                    err:error.explantion,
                                    data:{}
                              })


                          }

    }


    async cancel(req,res)
    {
                           try {
                                  const bookingId = req.params.id;
                                  const response = await bookingService.cancelBooking(bookingId);
    
                                 return res.status(StatusCodes.OK).json({
                                        success: true,
                                        message: "Booking cancelled successfully",
                                        data: response,
                                        err: {}
                                });
                               } 
                          catch (error) {
                                     return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
                                    message: error.message,
                                     success: false,
                                     err: error.explanation,
                                     data: {}
                                   });
                                    }
      }


}






module.exports=  BookingController