const express=require('express')
const morgan=require('morgan')
const  app=express()
const axios=require('axios')

const {createProxyMiddleware}= require('http-proxy-middleware')

const rateLimit =require('express-rate-limit')

const PORT=3004

const limiter=rateLimit({
    windows:2*60*1000,
    max:5,
})

app.use(morgan('combined'))

app.use(limiter);

app.use('/bookingservice',async (req,res,next)=>{
       try{
        const response=await axios.get('http://localhost:3001/api/v1/isauthenticated',{
            headers:{
                'x-access-token':req.headers['x-access-token']
            }
        })
        if(response.data.success){
            next();
        }else{
            return resizeBy.status(401).json({
                message:'Unauthorised'
            })
        }


       }
       catch(error){
        return res.status(401).json({
            message:'Unauthorised'
        })
       }
})



app.use('/bookingservice',createProxyMiddleware({target:'http://localhost:3002/',changeOrigin:true}))
app.use('/flightsAndsearch',createProxyMiddleware({target:'http://localhost:3000/',changeOrigin:true}))
app.use('/authservice',createProxyMiddleware({target:'http://localhost:3001/',changeOrigin:true}))
app.use('/reminderservice',createProxyMiddleware({target:'http://localhost:3003/',changeOrigin:true}))


app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}` )
})
