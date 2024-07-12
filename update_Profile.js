document.addEventListener("DOMContentLoaded", function() {
    const u_name = sessionStorage.getItem("User_Name");
    if (u_name) {
        document.getElementById("user").innerHTML = "User " +u_name;
    } else {
        document.getElementById("user").innerHTML = "User not found";
    }
});
