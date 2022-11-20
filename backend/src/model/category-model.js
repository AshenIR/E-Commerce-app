const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
    },
    avatar: {
        type: String
    },
    cloudinary_id: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("categories", categorySchema);