const user=sessionStorage.getItem("Customer_Name");
console.log(user);






// Parse data from localStorage
const request_details = JSON.parse(localStorage.getItem("Request_Info")) || [];
const bike_details = JSON.parse(localStorage.getItem("Bike_Details")) || [];

const user_detail=request_details.filter(req=>req.User==user);

// Debugging: Log parsed data
console.log("Request Details:", request_details);
console.log("Bike Details:", bike_details);

// Filter bike details with status 1 (booked)
const available_bikes = bike_details.filter(bike => bike.Status === 1);

// Find request details with matching BikeID where bike status is 1
const matched_requests = user_detail.filter(req => 
    available_bikes.some(bike => bike.ID === req.BikeID)
);

console.log("Matched Requests:", matched_requests);

document.addEventListener("DOMContentLoaded", () => {
    displaydetails(matched_requests);
});

// Function to display bike details in a table
function displaydetails(req_details) {
    let table = `
    <table>
        <tr>
            <th>BikeID</th>
        
            <th>From</th>
            <th>Time</th>
            <th>Return</th>
            <th>Due By</th>
          
        </tr>`;
   
    for (const details of req_details) {
        table += `
        <tr>
            <td>${details.BikeID}</td>
          
            <td>${details.From}</td>
            <td>${details.Time}</td>
            <td>${details.Return}</td>
            <td>${display(details.From, details.Time, details.Return)}</td>
           
        </tr>`;
    }

    table += `</table>`;
    document.getElementById("table").innerHTML = table;
}

// Function to display due date information
function display(from, time, returnDate) {
    const returnDateTimeObj = new Date(returnDate);
    const fromDateTimeStr = from + 'T' + time;
    const fromDateTimeObj = new Date(fromDateTimeStr);
    const today = new Date();

    // Calculate hours between now and return date
    const hoursLeft = (returnDateTimeObj - today) / (1000 * 60 * 60); // Difference in hours

    if (hoursLeft < 0) {
        return `Overdue by ${Math.abs(Math.floor(hoursLeft))} hours`;
    } else if (hoursLeft <= 24) {
        return `Due in ${Math.floor(hoursLeft)} hours`;
    } else {
        return 'Pending';
    }
}

// Search button event listener
document.getElementById("search_btn").addEventListener('click', () => {
    const finddetails = Number(document.getElementById("search_value").value);
    const disp_request = matched_requests.filter(req => req.BikeID === finddetails);
    displaydetails(disp_request);
});

// Function to handle bike return
function returnedbike(id, reqID, from, to, user) {
    // Update the status of the bike
    for (let i = 0; i < bike_details.length; ++i) {
        if (bike_details[i].ID === id) {
            bike_details[i].Status = 0;
            localStorage.setItem("Bike_Details", JSON.stringify(bike_details));
            break;
        }
    }

    // Remove the related request from Request_Info
    const updateRequest = request_details.filter(req => req.RequestID !== reqID);
    localStorage.setItem("Request_Info", JSON.stringify(updateRequest));

    // Store return details in localStorage
    const returnedDetails = {
        BikeID: id,
        User: user,
        From: from,
        To: to,
        ReturnedTime: new Date().toISOString() // Store as ISO string
    };

    let storedBikeDetails = JSON.parse(localStorage.getItem("Stored_Bike_Details")) || [];
    storedBikeDetails.push(returnedDetails);
    localStorage.setItem("Stored_Bike_Details", JSON.stringify(storedBikeDetails));
    window.location.href="Returned.html";
}
