const users=JSON.parse(localStorage.getItem("User_Details")).length;

const totalbikes=JSON.parse(localStorage.getItem("Bike_Details")).length;

const request_details=JSON.parse(localStorage.getItem("Request_Info"))|| [];

const bookedRequest=request_details.filter(req=>req.Status==1);

const availablebikes=JSON.parse(localStorage.getItem("Bike_Details"))|| [];


const bikes_in=availablebikes.filter(bike=>bike.Status==0);

const distinctBike=[...new Set(bookedRequest.map(req=>req.BikeID))];
const pendingRequests = 20;   // Example value

// Update the card values
document.getElementById("totalUsers").textContent = users;
document.getElementById("totalBikes").textContent = totalbikes;
document.getElementById("BookedBikes").textContent = distinctBike.length;
document.getElementById("BikesInHand").textContent = bikes_in.length;

// // Placeholder for charts initialization
// // You'll need to add actual data and options for the charts
// const ctxPie = document.getElementById('pieChart').getContext('2d');
// const pieChart = new Chart(ctxPie, {
//     type: 'pie',
//     data: {
//         labels: ['Returned', 'Pending'],
//         datasets: [{
//             label: 'Bike Status',
//             data: [returnedBikes, pendingRequests],
//             backgroundColor: ['#007bff', '#ff0000'],
//         }]
//     },
// });

// const ctxLine = document.getElementById('lineChart').getContext('2d');
// const lineChart = new Chart(ctxLine, {
//     type: 'line',
//     data: {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//         datasets: [{
//             label: 'Bikes Returned Over Time',
//             data: [10, 20, 25, 30, 40, 50], // Example data
//             borderColor: '#007bff',
//             fill: false
//         }]
//     },
// });
