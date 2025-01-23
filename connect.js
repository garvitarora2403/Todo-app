const mongoose=require("mongoose")
require("dotenv").config()

async function connectToMongodb(){

    const MONGO_URI = process.env.MONGO_URI;

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,  // Wait for up to 30 seconds to establish the connection
        socketTimeoutMS: 45000,           // Set socket timeout to 45 seconds for queries
      };
    

      mongoose.connect(MONGO_URI, options)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);  // Exit the process if MongoDB connection fails
  });
}


module.exports={
    connectToMongodb
}