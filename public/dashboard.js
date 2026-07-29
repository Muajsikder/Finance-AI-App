const buttons = document.querySelectorAll("button");


buttons.forEach(function(button){

    button.addEventListener("click", function(){

        alert(button.innerText + " clicked");

    });

}); 

// Logout button
const logout = document.getElementById("logout");

logout.addEventListener("click", function(event){

    event.preventDefault();

    localStorage.removeItem("token");

    window.location.href = "index.html";

});