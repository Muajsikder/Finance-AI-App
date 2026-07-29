// Get login form
const loginForm =
document.getElementById("loginForm");


// Listen for login submit
loginForm.addEventListener(
"submit",
async function(event){


    // Stop page refresh
    event.preventDefault();



    // Get user input
    const email =
    document.getElementById("email").value;


    const password =
    document.getElementById("password").value;




    try {


        // Send login request
        const response = await fetch(
        "/api/login",
        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },


            body:JSON.stringify({

                email,

                password

            })

        });



        const data =
        await response.json();





        // Login successful
        if(response.ok){


            // Save JWT token
            localStorage.setItem(
                "token",
                data.token
            );



            // Go to dashboard
            window.location.href =
            "dashboard.html";


        }
        else {


            // Show error only
            // when login fails
            alert(data.message);


        }



    } catch(error){


        console.log(error);


        alert(
            "Server connection error"
        );


    }



});