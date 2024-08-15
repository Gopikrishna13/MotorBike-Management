document.addEventListener("DOMContentLoaded", function() {
    displayRentalReport();
});

function displayRentalReport() {
    const rentals = JSON.parse(localStorage.getItem("Request_Info")) || [];
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

    for (const rental of rentals) {
        let status = rental.ReturnDate ? 'Returned' : 'Pending';
        table += `
            <tr>
                <td>${rental.RequestID}</td>
                <td>${rental.BikeID}</td>
                <td>${rental.User}</td>
                <td>${rental.From}</td>
                <td>${rental.Return }</td>
                <td>${status}</td>
            </tr>`;
    }

    table += `</table>`;
    document.getElementById("rental_report").innerHTML = table;
}
