const Id = Number(sessionStorage.getItem("BikeID"));
const bike_details = JSON.parse(localStorage.getItem("Bike_Details")) || [];

const display = bike_details.find(bike => bike.ID == Id);
if(display) {
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("image").innerHTML = `<img src="${display.Image}" width="100">`;
        document.getElementById("type").innerHTML = `Type:${display.Type}`;
        document.getElementById("brand").innerHTML = `Brand:${display.Brand}`;
        document.getElementById("year").innerHTML = `Year:${display.Year}`;
        document.getElementById("Reg").innerHTML = `RegNo:${display.Registration_Number}`;
        document.getElementById("Rent").innerHTML = `Rent:${display.Rent}`;
        document.getElementById("button").innerHTML=`<button onclick="Request(Id)">Request</button>`;
    });
}else{
    window.location.href="User.html";
}