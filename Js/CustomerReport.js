document.addEventListener("DOMContentLoaded", function() {
    displayCustomerReport();
});

function displayCustomerReport() {
    const customers = JSON.parse(localStorage.getItem("User_Details")) || [];
    let table = `
        <table>  
            <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Rental History(Bike ID)</th>
            </tr>`;

    for (const customer of customers) {
        const rentals = JSON.parse(localStorage.getItem("Request_Info")) || [];
      
        const customerRentals = rentals.filter(rental => rental.User === customer.UserName);
       
        const rentalHistory = customerRentals.map(rental => `${rental.BikeID} (${rental.From} to ${rental.Return})`).join('<br>');

        table += `
            <tr>
                <td>${customer.ID}</td>
                <td>${customer.UserName}</td>
                <td>${customer.Email}</td>
                <td>${customer.Mobile}</td>
                <td>${rentalHistory}</td>
            </tr>`;
    }

    table += `</table>`;
    document.getElementById("customer_report").innerHTML = table;
}