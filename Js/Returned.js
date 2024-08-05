// Function to store bike details and return time in localStorage
function storeDetails(bike_details, returnedTime) {
    const detailsToStore = bike_details.map(details => ({
        BikeID: details.BikeID,
        User: details.User,
        From: details.From,
        Return: details.Return,
        ReturnTime: returnedTime.toISOString(), // Store as ISO string
        DueTime: `${Math.floor((returnedTime - new Date(details.Return)) / (1000 * 60 * 60))} hours`
    }));

    localStorage.setItem('Stored_Bike_Details', JSON.stringify(detailsToStore));
}

// Get details and return time from sessionStorage
let returnedId = sessionStorage.getItem("Returned BikeID");
let returnedTime = new Date(Number(sessionStorage.getItem("Returned Time")));
const req_details = JSON.parse(localStorage.getItem("Request_Info")) || [];
const bike_details = req_details.filter(bike => bike.BikeID === Number(returnedId));

// Store the details
storeDetails(bike_details, returnedTime);

// Display the details
displaydetails(bike_details);

// Function to display bike details in a table
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

document.addEventListener("DOMContentLoaded", () => {
    // Fetch stored details from localStorage
    const storedDetails = JSON.parse(localStorage.getItem('Stored_Bike_Details')) || [];
    
    // Display the stored details
    displaydetails(storedDetails);
});
