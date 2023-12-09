const mongoose = require("mongoose");
require("dotenv").config();


exports.dbConnect = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database is connected on ${connection.host}`);
    } catch (error) {
        console.log('Issue while connecting to database');
        console.log(error.message);
        process.exit(1);
    }
}