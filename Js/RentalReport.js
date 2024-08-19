document.addEventListener("DOMContentLoaded", function() {
    displayRentalReport();
});

function displayRentalReport() {
    const rentals = JSON.parse(localStorage.getItem("Request_Info")) || [];
    const returnedBikes = JSON.parse(localStorage.getItem("Stored_Bike_Details")) || [];

    let table = `
        <table>  
            <tr>
                <th>Rental ID</th>
                <th>Bike ID</th>
                <th>User</th>
                <th>Rental Date</th>
                <th>Return Date</th>
                <th>Status</th>
            </tr>`;

    let rentalID = 1; // Assign a unique rental ID for display purposes

    // Display bikes with status=1 from Request_Info as "Pending"
    for (const rental of rentals) {
        if (rental.Status === 1) {
            table += `
                <tr>
                    <td>${rentalID++}</td>
                    <td>${rental.BikeID}</td>
                    <td>${rental.User}</td>
                    <td>${rental.From}</td>
                    <td>${rental.Return || 'N/A'}</td>
                    <td>Pending</td>
                </tr>`;
        }
    }

    // Display bikes from Stored_Bike_Details as "Returned on [date]"
    for (const bike of returnedBikes) {
        let status = `Returned on ${new Date(bike.ReturnedTime).toLocaleString()}`;

        table += `
            <tr>
                <td>${rentalID++}</td>
                <td>${bike.BikeID}</td>
                <td>${bike.User}</td>
                <td>${bike.From}</td>
                <td>${bike.To}</td>
                <td>${status}</td>
            </tr>`;
    }

    table += `</table>`;
    document.getElementById("rental_report").innerHTML = table;
}