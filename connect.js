const mongoose=require("mongoose")
require("dotenv").config()

async function connectToMongodb(){
    

    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('db is connected')
    })
}


module.exports={
    connectToMongodb
}