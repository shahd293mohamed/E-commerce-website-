const mongoose = require("mongoose");
const connectDB = async () => {//it's promise
    try {
  const conn = await mongoose.connect(process.env.MONGO_URL);
  console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Database connection error ${error.message}`);
        process.exit(1);//stop the process 
    }
}

module.exports = connectDB