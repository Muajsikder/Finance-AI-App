// Import mongoose
const mongoose = require("mongoose");


// Create portfolio schema
const portfolioSchema = new mongoose.Schema({

    // User who owns this investment
    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },


    // Stock or asset name
    asset: {

        type: String,

        required: true,

        trim: true

    },


    // Number of shares owned
    shares: {

        type: Number,

        required: true

    },


    // Current market price
    price: {

        type: Number,

        required: true

    },


    // Price user bought it for
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