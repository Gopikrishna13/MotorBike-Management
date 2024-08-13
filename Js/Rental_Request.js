// Parse data from localStorage
const request_details = JSON.parse(localStorage.getItem("Request_Info")) || [];
const bike_details = JSON.parse(localStorage.getItem("Bike_Details")) || [];

document.addEventListener("DOMContentLoaded", () => {
    renderTable();
});

function renderTable() {
    let table = `
        <table>
            <tr> 
                <th>Request ID</th>
                <th>BikeID</th>
                <th>UserID</th>
                <th>From</th>
                <th>Time</th>
                <th>To</th>
                <th>Action</th>
            </tr>`;

    for (const details of request_details) {
        table += `
            <tr>
                <td>${details.RequestID}</td>
                <td>${details.BikeID}</td>
                <td>${details.User}</td>
                <td>${details.From}</td>
                <td>${details.Time}</td>
                <td>${details.Return}</td>
                <td>
                    <div class="action" data-id="${details.RequestID}">`
                        if (details.Status == 0) {
                            table += `
                                <button class="action-btn" onclick="AcceptRequest(${details.RequestID})">Accept</button>
                                <button class="action-btn" onclick="DeclineRequest(${details.RequestID})">Decline</button>`;
                        } else if (details.Status == 1) {
                            table += `Accepted`;
                        } else if (details.Status == -1) {
                            table += `Declined`;
                        }
                    table += `
                    </div>
                </td>
            </tr>`;
    }

    table += `</table>`;
    document.getElementById("request_details").innerHTML = table;
}

function AcceptRequest(reqID) {
    for (let i = 0; i < request_details.length; ++i) {
        if (request_details[i].RequestID === reqID) {
            request_details[i].Status = 1;

            localStorage.setItem("Request_Info", JSON.stringify(request_details));
            console.log(`Status updated for RequestID ${reqID}: ${request_details[i].Status}`);
            alert(`Status Accepted for ${reqID}`);
            updateActionButtons(reqID, "Accepted");
            updateBike(request_details[i].BikeID); // Correctly update the bike status
            break;
        }
    }
}

function updateBike(bikeID) {
    for (let i = 0; i < bike_details.length; ++i) {
        if (bike_details[i].ID === bikeID) {
            bike_details[i].Status = 1; // Update the status of the specific bike
            localStorage.setItem("Bike_Details", JSON.stringify(bike_details));
            break;
        }
    }
}

function DeclineRequest(reqID) {
    for (let i = 0; i < request_details.length; ++i) {
        if (request_details[i].RequestID === reqID) {
            request_details[i].Status = -1;
            localStorage.setItem("Request_Info", JSON.stringify(request_details));
            console.log(`Status updated for RequestID ${reqID}: ${request_details[i].Status}`);
            alert(`Status Declined for ${reqID}`);
            updateActionButtons(reqID, "Declined");
            break;
        }
    }
}

function updateActionButtons(reqID, status) {
    const actionDiv = document.querySelector(`.action[data-id="${reqID}"]`);
    if (actionDiv) {
        actionDiv.innerHTML = status;
    }
}
