const req_details = JSON.parse(localStorage.getItem("Request_Info")) || [];
document.addEventListener("DOMContentLoaded", () => {
   
    //console.log(req_details);

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

    for (const details of req_details) {
        table += `
            <tr>
                <td>${details.RequestID}</td>
                <td>${details.BikeID}</td>
                <td>${details.User}</td>
                <td>${details.From}</td>
                <td>${details.Time}</td>
                <td>${details.Return}</td>
                <td>
                <div id="Action">
                    <button class="action-btn" id="btnAccept" onclick="AcceptRequest(${details.RequestID})">Accept</button>
                    <button class="action-btn" id="btnDecline" onclick="DeclineRequest(${details.RequestID})">Decline</button>
                    </div>
                </td>
            </tr>`;
    }

    table += `</table>`;
    document.getElementById("request_details").innerHTML = table;


});

function AcceptRequest(reqID)
{


for(let i=0;i<req_details.length;++i)
{
if(req_details[i].RequestID===reqID)
{
req_details[i].Status=1;
localStorage.setItem("Request_info",JSON.stringify(req_details));
alert(`Status Accepted for ${reqID}`);
document.getElementById("Action").textContent="Accepted";
break;
}
}
}


function DeclineAccept(reqID)
{
for(let i=0;i<req_details.length;++i)
{
if(req_details[i].RequestID===reqID)
{
req_details[i].Status=-1;
localStorage.setItem("Request_infor",JSON.stringify(req_details));
alert(`Status Declined for ${reqID}`);
document.getElementById("Action").textContent="Declined";
break;
}
}
}