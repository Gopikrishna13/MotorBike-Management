document.addEventListener("DOMContentLoaded", function() {
    displayCustomerReport();
});

function displayCustomerReport() {
    const customers = JSON.parse(localStorage.getItem("User_Details")) || [];
    const storedBikes = JSON.parse(localStorage.getItem("Stored_Bike_Details")) || [];

    let table = `
        <table>  
            <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Rental History (Bike ID)</th>
            </tr>`;

    for (const customer of customers) {
        // Filter stored bike details by the current customer
        const customerRentals = storedBikes.filter(bike => bike.User === customer.UserName);
       
        // Map each rental to a string with BikeID and rental period
        const rentalHistory = customerRentals.map(bike => `${bike.BikeID} (from ${bike.From} to ${bike.To})`).join('<br>');

        table += `
            <tr>
                <td>${customer.ID}</td>
                <td>${customer.UserName}</td>
                <td>${customer.Email}</td>
                <td>${customer.Mobile}</td>
                <td>${rentalHistory || 'No Rentals'}</td>
            </tr>`;
    }

    table += `</table>`;
    document.getElementById("customer_report").innerHTML = table;
}
