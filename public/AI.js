// Get AI form
const aiForm = document.querySelector("form");


// Get response display box
const responseBox =
document.getElementById("response");



aiForm.addEventListener(
"submit",
async function(event){


    // Stop page refresh
    event.preventDefault();



    const question =
    document.getElementById("question").value;



    // Check empty question
    if(question === ""){

        responseBox.innerText =
        "Please enter a question";

        return;

    }



    try {


        // Send question to backend
        const response =
        await fetch("/api/ai", {


            method:"POST",


            headers:{

                "Content-Type":"application/json",

                "Authorization":
                "Bearer " + localStorage.getItem("token")

            },


            body:JSON.stringify({

                question: question

            })


        });



        const data =
        await response.json();



        console.log("Backend response:", data);



        // Show Gemini answer
        if(data.answer){

            responseBox.innerText =
            data.answer;

        }


        // Show backend error
        else if(data.message){

            responseBox.innerText =
            data.message;

        }


        else{

            responseBox.innerText =
            "No response received";

        }



    } catch(error){


        console.log(error);


        responseBox.innerText =
        "Connection error";

    }


});