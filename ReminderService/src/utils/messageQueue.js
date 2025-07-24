const amqpilib =require('amqplib')
const {EXCHANGE_NAME,MESSAGE_BROKER_URL}=require('../config/configServer.js')


// first going to create the channel 

// i am using rabbitMQ in this 

const createChannel=async()=>{
    try{ 
        
        const connection= await amqpilib.connect(MESSAGE_BROKER_URL)

        const channel=await  connection.createChannel();

       

        await channel.assertExchange(EXCHANGE_NAME,'direct',false)
        return channel;

    }catch(error){
          throw error;
    }
   
}
// subscribing Message means taking out what ever these is inside the queue;
 const subscribeMessage = async (channel,service,binding_key)=>{

        try{
            const applicationQueue =await channel.assertQueue('REMINDER_QUEUE');
    
            channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME,binding_key);
        
            channel.consume(applicationQueue.queue,msg=>{
                console.log('recieved data')
                console.log(msg.content.toString());
                const payload =JSON.parse(msg.content.toString())
                service(payload)
                channel.ack(msg);
            })
        }
        catch(error)

        {
            throw error
        }
  
    
 }
  // pushing message inside the queue
 const publishMessage= async (channel,binding_key,message)=>{

    try{   
           await channel.assertQueue('REMINDER_QUEUE')
           await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from(message));  
    }catch(error){
        throw error

    }

 }
   



module.exports={
    createChannel,
    subscribeMessage,
    publishMessage,
}

/*
🔧 createChannel Function – Setting up RabbitMQ Connection
Imports amqplib to interact with RabbitMQ.

connect(MESSAGE_BROKER_URL):

Connects to the RabbitMQ server.

Acts like calling the post office.

createChannel():

Opens a channel to send/receive messages.

Like getting a counter at the post office.

assertExchange(EXCHANGE_NAME, 'direct', false):

Declares an exchange if it doesn't exist.

'direct' type routes messages based on exact routing key.

⚠️ false should ideally be replaced with an options object like { durable: true }.

Wraps everything in a try...catch block to handle connection/setup errors.

📩 subscribeMessage Function – Listening for Messages
assertQueue(QUEUE_NAME):

Declares a queue (mailbox) for incoming messages.

Ensures the queue exists.

bindQueue(queue, exchange, binding_key):

Binds the queue to the exchange using a routing key.

Ensures only messages with a matching key go into this queue.

consume(queue, callback):

Listens for messages in the queue.

When a message arrives:

Prints it to the console.

Calls channel.ack(msg) to confirm it's been processed.

Prevents the message from being re-sent.


*/