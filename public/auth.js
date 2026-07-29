// Check if user has a login token
const token = localStorage.getItem("token");


// If no token exists, send them back to login
if (!token) {

    window.location.href = "index.html";

}
