// Parse data from localStorage
const storedBikeDetails = JSON.parse(localStorage.getItem("Stored_Bike_Details")) || [];

// Function to display bike details in a table
function displayReturnedBikes(storedBikeDetails) {
    let table = `
    <table>
        <tr>
            <th>BikeID</th>
            <th>User</th>
            <th>From</th>
            <th>Return</th>
            <th>Return Time</th>
            <th>Due (hours)</th>
        </tr>
    `;

    for (const details of storedBikeDetails) {
        const originalReturnDate = new Date(details.To);
        const returnDateTime = new Date(details.ReturnedTime);
        const timeDifferenceMs = returnDateTime - originalReturnDate.getTime();
        const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
        const dueTime = `${hours} hours`;

        table += `
        <tr>
            <td>${details.BikeID}</td>
            <td>${details.User}</td>
            <td>${details.From}</td>
            <td>${originalReturnDate.toLocaleString()}</td>
            <td>${returnDateTime.toLocaleString()}</td>
            <td>${dueTime}</td>
        </tr>
        `;
    }

    table += `</table>`;
    document.getElementById("table").innerHTML = table;
}

document.addEventListener("DOMContentLoaded", () => {
    displayReturnedBikes(storedBikeDetails);
});
