const mongoose = require("mongoose");
const productSchema = new mongoose.Schema ({
    productName: {
        type: String,
    },
    categoryID: {
        type: String
    },
    brand: {
        type: String
    },
    price:{
        type: String
    },
    avatar:{
        type: String
    },
    cloudinary_id: {
        type: String
    },
    description:{
        type: String
    }
});

module.exports = mongoose.model("products",productSchema);