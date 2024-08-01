const requset_details = JSON.parse(localStorage.getItem("Request_Info")) || [];
const req_details=requset_details.filter(req=>req.Status===1)
document.addEventListener("DOMContentLoaded", () => {
   displaydetails(req_details);
});

function displaydetails(req_details)
{
    let table = `
    <table>
        <tr>
            <th>BikeID</th>
            <th>User</th>
            <th>From</th>
            <th>Time</th>
            <th>Return</th>
            <th>Due By</th>
            <th>Action</th>
        </tr>`;
   
for(const details of req_details) {
    table += `
        <tr>
            <td>${details.BikeID}</td>
            <td>${details.User}</td>
            <td>${details.From}</td>
            <td>${details.Time}</td>
            <td>${details.Return}</td>
            <td>${display(details.From, details.Time, details.Return)}</td>
            <td> <button onclick="returnedbike(${details.BikeID})"id="return">Return</button></td>
        </tr>`;
}

table += `</table>`;
document.getElementById("table").innerHTML = table;
}
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

document.getElementById("search_btn").addEventListener('click',()=>{
const finddetails=Number(document.getElementById("search_value").value) ;
const disp_request=req_details.filter(req=>req.BikeID===finddetails);
displaydetails(disp_request);

})

function returnedbike(id)
{
    sessionStorage.setItem("Returned BikeID",id);
    sessionStorage.setItem("Returned Time",Date.now().toString())
    for(let i=0;i<req_details.length;++i)
    {
        if(requset_details[i].BikeID===id)
        {
            req_details[i].Status=0;
            localStorage.setItem("Request_Info",JSON.stringify(req_details));
        }
     
    }
    window.location.href="Returned.html";
}