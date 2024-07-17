const Id = Number(sessionStorage.getItem("BikeID"));
const userName=sessionStorage.getItem("Customer_Name");
const bike_details = JSON.parse(localStorage.getItem("Bike_Details")) || [];

const display = bike_details.find(bike => bike.ID == Id);
if(display) {
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("image").innerHTML = `<img src="${display.Image}" width="100">`;
        document.getElementById("type").innerHTML = `Type:${display.Type}`;
        document.getElementById("brand").innerHTML = `Brand:${display.Brand}`;
        document.getElementById("year").innerHTML = `Year:${display.Year}`;
        document.getElementById("Reg").innerHTML = `RegNo:${display.Registration_Number}`;
        document.getElementById("Rent").innerHTML = `Rent:${display.Rent}`;
        document.getElementById("From").innerHTML=`<label>From:</label><input type="date" id="date">`;
        document.getElementById("Time").innerHTML=`<label>Time:</label><input type="time" id="time">`;
        document.getElementById("return").innerHTML= `<button onclick="returnDate()">Confirm</button>`;
     
        document.getElementById("To").innerHTML=`<label>Return:</label><p id="return"></p>`;
        document.getElementById("button").innerHTML=`<button onclick="Request(Id,userName)">Request</button>`;

       

   

        
     
      
    });
}else{
    window.location.href="User.html";
}

function Request(id,uName)
{
   
let return_info=returnDate();

const reuquest_details={
    BikeID:id,
    User:uName,
    Image:`<img src="${display.Image}" width="100">`,
    From:document.getElementById("date").value,
    Time:document.getElementById("time").value,
    Return:return_info
}
 let request=JSON.parse(localStorage.getItem(("Request_Info")))|| [];
 request.push(reuquest_details);
localStorage.setItem("Request_Info",JSON.stringify(request));
}

function returnDate()
{
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const date_time = date + 'T' + time;
    const date_timeObj = new Date(date_time);
    
 
    date_timeObj.setHours(date_timeObj.getHours() + 24);
    

    const return_details = date_timeObj.toUTCString();
 
    
    document.getElementById("return").innerHTML=return_details;
    return return_details;


    
}
