// =======================
// Transaction Model
// =======================

// Import mongoose
const mongoose = require("mongoose");


// Create transaction schema
const transactionSchema = new mongoose.Schema({

    // Link transaction to user
    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },


    // Transaction category
    category: {

        type: String,

        required: true

    },


    // Description of transaction
    description: {

        type: String,

        required: true

    },


    // Money amount
    amount: {

        type: Number,

        required: true

    },


    // Automatically save date
    date: {

        type: Date,

        default: Date.now

    }


});



// Export model
module.exports =
mongoose.model(
    "Transaction",
    transactionSchema
);