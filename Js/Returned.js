let returnedId = sessionStorage.getItem("Returned BikeID");
let returnedTime = new Date(Number(sessionStorage.getItem("Returned Time")));
const req_details = JSON.parse(localStorage.getItem("Request_Info")) || [];
const bike_details = req_details.filter(bike => bike.BikeID === Number(returnedId));

displaydetails(bike_details);

function displaydetails(bike_details) {
    let table = `
    <table>
        <tr>
            <th>BikeID</th>
            <th>UserID</th>
            <th>From</th>
            <th>To</th>
            <th>Return</th>
            <th>Due (hours)</th>
        </tr>
    `;

    for (const details of bike_details) {
        // Convert details.Return to a Date object
        const originalReturnDate = new Date(details.Return);

        // Calculate the time difference in milliseconds
        const timeDifferenceMs = returnedTime - originalReturnDate.getTime();

        // Convert time difference to hours
        const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));

        // Format the due time
        const dueTime = `${hours} hours`;

        table += `
        <tr>
            <td>${details.BikeID}</td>
            <td>${details.User}</td>
            <td>${details.From}</td>
            <td>${details.Return}</td>
            <td>${returnedTime.toLocaleString()}</td>
            <td>${dueTime}</td>
        </tr>
        `;
    }

    table += `</table>`;
    document.getElementById("table").innerHTML = table;
}
