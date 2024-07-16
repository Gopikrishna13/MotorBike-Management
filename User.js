document.addEventListener("DOMContentLoaded", () => {
const bike_price=JSON.parse(localStorage.getItem("Bike_Details")) || [];
const bike_rent=bike_price.map(bike=>bike.Rent);
let min=(Math.min(...bike_rent));
let max=(Math.max(...bike_rent));


document.getElementById("Range").innerHTML=`<input type="range" min="${min}" max=${max} id="range">`;
document.getElementById("Rent").value=document.getElementById("range").value;
 document.addEventListener("input",()=>{
    document.getElementById("Rent").value=document.getElementById("range").value;
 })
    displayBikes(JSON.parse(localStorage.getItem("Bike_Details")) || []);
});

function displayBikes(bikes) {
    let content = '';

    for (let i = 0; i < bikes.length; i++) {
        content += `
            <div class="bike_card">
                <img src="${bikes[i].Image}" ><br>
                <strong>${bikes[i].Type}</strong>
                <em>${bikes[i].Brand}</em>
                Year: ${bikes[i].Year}<br>
                Reg. No: ${bikes[i].Registration_Number}<br>
                Rent: ${bikes[i].Rent}<br>
                <button onclick="viewBike(${bikes[i].ID})">View</button>
            </div>`;
    }

    document.getElementById("bike_details").innerHTML = content;
}

function searchBike() {
    const bike_type = document.getElementById("search_type").value.toLowerCase();
    const bike_brand = document.getElementById("search_brand").value.toLowerCase();
    const bike_rent = Number(document.getElementById("Rent").value);

    const search_bikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];

    const find_bikes = search_bikes.filter(bike => 
        (bike_type === "" || bike.Type.toLowerCase().includes(bike_type)) &&
        (bike_brand === "" || bike.Brand.toLowerCase().includes(bike_brand)) &&
        (bike_rent === 0 || bike.Rent<=bike_rent)
    );

    displayBikes(find_bikes);
}

function viewBike(id) {
  localStorage.setItem("BikeID",id);
  window.location.href="Userview.html";
}