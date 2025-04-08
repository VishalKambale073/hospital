const mongoose = require('mongoose');


const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL,{
            
        })
        console.log("MongoDB connected successffully");
    }
    catch(err){
        console.log("MongoDB connection failed",err);
        
    }
}

module.exports = connectDB;