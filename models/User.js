// Import mongoose
const mongoose = require("mongoose");


// Create rules for a User document
const userSchema = new mongoose.Schema({

    // User's display name
    name: {
        type: String,
        required: true
    },


    // User email used for login
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },


    // Hashed password
    password: {
        type: String,
        required: true
    }

}, {

    // Automatically creates createdAt and updatedAt
    timestamps: true

});


// Create User model
const User = mongoose.model("User", userSchema);


// Export model
module.exports = User;