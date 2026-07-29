// Import mongoose
const mongoose = require("mongoose");


// Create portfolio schema
const portfolioSchema = new mongoose.Schema({

    // Owner of investment
    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },


    // Stock name
    asset: {

        type: String,

        required: true

    },


    // Number of shares
    shares: {

        type: Number,

        required: true

    },


    // Price per share
    price: {

        type: Number,

        required: true

    },


    // User purchase price
    purchasePrice: {

        type: Number,

        required: true

    }


});


// Export model
module.exports =
mongoose.model(
    "Portfolio",
    portfolioSchema
);