document.addEventListener("DOMContentLoaded", () => {
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
    const bike_rent = document.getElementById("search_rent").value.toLowerCase();

    const search_bikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];

    const find_bikes = search_bikes.filter(bike => 
        (bike_type === "" || bike.Type.toLowerCase().includes(bike_type)) &&
        (bike_brand === "" || bike.Brand.toLowerCase().includes(bike_brand)) &&
        (bike_rent === "" || bike.Rent.toLowerCase().includes(bike_rent))
    );

    displayBikes(find_bikes);
}

function viewBike(id) {
  sessionStorage.setItem("BikeID",id);
  window.location.href="Userview.html";
}