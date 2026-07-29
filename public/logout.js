// ==========================
// Logout

// Remove the saved login token
localStorage.removeItem("token");

// Return to login page
window.location.href = "index.html";