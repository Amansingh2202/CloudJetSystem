const sender=require('../config/emailConfig')
const TicketRepository=require('../repository/ticket-repository')


const repo= new TicketRepository()

const sendBasicEmail=async (mailfrom,mailto,mailSubject,mailBody)=>{
     try{      
     const response =await sender.sendMail({
        from:mailfrom,
        to:mailto,
        subject:mailSubject,
        text:mailBody
     })}
     catch(error){
   console.log(error)
   throw error
     }
}


const fetchPendingEmails= async (timestamp)=>{
  try{
       
         const response =await repo.get({status:"PENDING"});
         return response;  
  }
  catch(error)
  {
      console.log(error)
      throw error
  }
}      


     const createNotification=async (data)=>{
          try{
                  const response = await repo.create(data)
                  return response 
          }
          catch(error){
            console.log(error)
            throw error

          }
     }
  const updateTicket=async (ticketId,data)=>{
    try{
            const response=await repo.update(ticketId,data)
    }catch(error){
             console.log(error)
    }

  }



    const subscribeEvent=async (payload)=>{
       
   
        let data =payload.data;
        let  service =payload.service;
        switch(service){
          case 'CREATE_TICKET':
             await  createNotification(data);
             break;
          case 'SEND_BASIC_MAIL':
            await sendBasicEmail(data);
            break;
            default :
            console.log('NO valid event received');
            break;
        }
      }


  





module.exports={
  sendBasicEmail,
  fetchPendingEmails,
  createNotification,
  updateTicket,
   subscribeEvent,
}



/**
 * 
 * SMPT 
 *  
 */
