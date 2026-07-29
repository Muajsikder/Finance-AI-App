// =======================
// Import packages
// =======================

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
const portfolioRoutes =
require("./routes/Portfolio");

// Import User model
const User = require("./models/User");
const aiRoutes =
require("./routes/AI");


// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Port number
const port = process.env.PORT || 3000;

// =======================
// Middleware
// =======================

// Read JSON data
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));
app.use(
"/api/portfolio",
portfolioRoutes
);
app.use(
"/api/ai",
aiRoutes
);
const transactionRoutes =
require("./routes/transactions");

app.use(
"/api/transactions",
transactionRoutes
);


// =======================
// Home Page
// =======================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});

// =======================
// SIGNUP
// =======================

app.post("/api/signup", async (req, res) => {

    try {


        const {
            name,
            email,
            password
        } = req.body;



        // Check if email already exists
        const userExists = await User.findOne({
            email
        });



        if(userExists){

            return res.status(400).json({

                message: "Email already registered"

            });

        }



        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );



        // Create new user
        const user = new User({

            name,
            email,
            password: hashedPassword

        });



        // Save user to MongoDB
        await user.save();



        res.json({

            message: "Signup successful"

        });



    } catch(error){


        console.log(error);


        res.status(500).json({

            message:"Server error"

        });


    }


});





// =======================
// LOGIN
// =======================

app.post("/api/login", async (req, res) => {


    try {


        const {
            email,
            password
        } = req.body;



        // Find user by email
        const user = await User.findOne({

            email

        });



        // User does not exist
        if(!user){


            return res.status(400).json({

                message:"User not found"

            });


        }



        // Compare entered password
        // with hashed password
        const passwordMatch =
        await bcrypt.compare(

            password,

            user.password

        );



        // Wrong password
        if(!passwordMatch){


            return res.status(400).json({

                message:"Wrong password"

            });


        }

        // =======================
        // Create JWT token
        // =======================

        const token = jwt.sign(

            {
                id: user._id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"1h"
            }

        );




        // Send login response
        res.json({

            message:"Login successful",

            token: token,


            user:{

                name:user.name,

                email:user.email

            }


        });



    } catch(error){


        console.log(error);


        res.status(500).json({

            message:"Server error"

        });


    }


});





// =======================
// MongoDB Connection
// =======================

mongoose.connect(process.env.MONGO_URI)

.then(()=>{


    console.log("MongoDB Connected");



    app.listen(port, ()=>{


        console.log(
            `Server running on http://localhost:${port}`
        );


    });


})


.catch(error=>{


    console.log(
        "MongoDB connection failed:",
        error
    );


});