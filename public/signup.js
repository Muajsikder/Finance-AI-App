// Get signup form
const signupForm =
document.getElementById("signupForm");


// When user submits
signupForm.addEventListener(
"submit",
async function(event){


event.preventDefault();


// Get input values
const name =
document.getElementById("name").value;


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;


const confirmPassword =
document.getElementById("confirmPassword").value;



// Check passwords
if(password !== confirmPassword){

    alert("Passwords do not match");
    return;

}



// Send data to backend
const response = await fetch(
"/api/signup",
{

    method:"POST",

    headers:{
        "Content-Type":"application/json"
    },

    body:JSON.stringify({

        name,
        email,
        password

    })

});


const data = await response.json();



alert(data.message);



});