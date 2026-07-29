const express = require("express");
const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);



router.post("/", async (req, res) => {

    try {

        const { question } = req.body;


        if(!question){

            return res.status(400).json({
                message:"Question required"
            });

        }



        const model =
        genAI.getGenerativeModel({

            model:"gemini-1.5-flash"

        });



        const result =
        await model.generateContent(question);



        const answer =
        result.response.text();



        res.json({

            answer: answer

        });



    } catch(error){

        console.log(error);


        res.status(500).json({

            message:error.message

        });

    }

});



module.exports = router;