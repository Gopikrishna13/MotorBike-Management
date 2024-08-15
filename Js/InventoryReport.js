document.addEventListener("DOMContentLoaded", function() {
    displayInventoryReport();
});

function displayInventoryReport() {
    const inventory = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    let table = `
        <table>  
            <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Year</th>
                <th>Registration No</th>
                <th>Rent</th>
                <th>Status</th>
            </tr>`;

    for (const bike of inventory) {
        table += `
            <tr>
                <td>${bike.ID}</td>
                <td><img src="${bike.Image}" width="50"></td>
                <td>${bike.Type}</td>
                <td>${bike.Brand}</td>
                <td>${bike.Year}</td>
                <td>${bike.Registration_Number}</td>
                <td>${bike.Rent}</td>
                <td>${bike.Status === 0 ? 'Available' : 'Rented'}</td>
            </tr>`;
    }

    table += `</table>`;
    document.getElementById("inventory_report").innerHTML = table;
}
