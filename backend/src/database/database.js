const mongoose = require("mongoose");
//to get packages and assign into variables.

const URI = "mongodb+srv://ecofirst:ecofirst12345@cluster0.fbthsdx.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI);
    console.log("Database Connected");
    
}
module.exports = connectDB;