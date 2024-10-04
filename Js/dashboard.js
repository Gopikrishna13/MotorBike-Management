// Retrieve data from localStorage
const users = JSON.parse(localStorage.getItem("User_Details")).length;
const totalbikes = JSON.parse(localStorage.getItem("Bike_Details")).length;
const request_details = JSON.parse(localStorage.getItem("Request_Info")) || [];
const bookedRequest = request_details.filter(req => req.Status == 1);
const availablebikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];

const returned_bikes = JSON.parse(localStorage.getItem("Stored_Bike_Details")) || [];
const bikes_in = availablebikes.filter(bike => bike.Status == 0);
const distinctBike = new Set(bookedRequest.map(req => req.BikeID)).size;
let totalIncome = 0;


// Calculate income by bike brand
const incomeByBrand = {};

returned_bikes.forEach(returned => {
    const bike = availablebikes.find(bike => bike.ID === returned.BikeID);

    if (bike) {
        // Convert Rent to number
        const rent = parseFloat(bike.Rent);
        totalIncome += rent;
        if (!incomeByBrand[bike.Brand]) {
            incomeByBrand[bike.Brand] = 0;
        }
        incomeByBrand[bike.Brand] += rent;
    }
});

// Update the card values
document.getElementById("totalUsers").textContent = users;
document.getElementById("totalBikes").textContent = totalbikes;
document.getElementById("BookedBikes").textContent = distinctBike.length;
document.getElementById("BikesInHand").textContent = bikes_in.length;

// Prepare data for the pie chart
const labels = Object.keys(incomeByBrand);
const data = Object.values(incomeByBrand);

// Check data in console
console.log('Labels for Pie Chart:', labels);
console.log('Data for Pie Chart:', data);

// Create the pie chart
const ctx_pie = document.getElementById('pieChart').getContext('2d');
ctx_pie.canvas.width = 300;  // Desired width
ctx_pie.canvas.height = 300; // Desired height

const pieChart = new Chart(ctx_pie, {
    type: 'pie',
    data: {
        labels: labels, // Dynamic labels
        datasets: [{
            label: 'Income by Bike Brand',
            data: data, // Dynamic data
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false, // Disable responsiveness
        maintainAspectRatio: false // Maintain aspect ratio
    }
});

// Calculate total income per month
const monthlyIncome = Array(12).fill(0);

returned_bikes.forEach(returned => {
    const bike = availablebikes.find(bike => bike.ID === returned.BikeID);
    if (bike) {
        const rent = parseFloat(bike.Rent); // Convert Rent to number
        const returnDate = new Date(returned.ReturnedTime);
        const month = returnDate.getMonth(); // Get the month (0 = January, 11 = December)
        monthlyIncome[month] += rent; // Add the bike rent to the corresponding month
    }
});

// Check monthly income data
console.log('Monthly Income Data:', monthlyIncome);

// Labels for the bar chart
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Create the bar chart
const ctx_bar = document.getElementById('barChart').getContext('2d');
ctx_bar.canvas.width = 300;  // Match the width of the pie chart
ctx_bar.canvas.height = 300; // Match the height of the pie chart

const barChart = new Chart(ctx_bar, {
    type: 'bar',
    data: {
        labels: months,
        datasets: [{
            label: 'Total Income',
            data: monthlyIncome,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: false, // Disable responsiveness
        maintainAspectRatio: false, // Maintain aspect ratio
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    autoSkip: false // Ensure all labels are displayed
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        // Format the numbers to avoid scientific notation
                        return value.toLocaleString(); // Adds commas as thousands separators
                    }
                }
            }
        }
    }
});

// Prepare data for the stacked bar chart
const brandMonthlyIncome = {};

// Initialize brandMonthlyIncome for each brand and each month
Object.keys(incomeByBrand).forEach(brand => {
    brandMonthlyIncome[brand] = Array(12).fill(0);
});

returned_bikes.forEach(returned => {
    const bike = availablebikes.find(bike => bike.ID === returned.BikeID);
    if (bike) {
        const rent = parseFloat(bike.Rent); // Convert Rent to number
        const returnDate = new Date(returned.ReturnedTime);
        const month = returnDate.getMonth(); // Get the month (0 = January, 11 = December)
        brandMonthlyIncome[bike.Brand][month] += rent; // Add the bike rent to the corresponding month and brand
    }
});

// Prepare datasets for the stacked bar chart
const stackedDatasets = Object.keys(brandMonthlyIncome).map(brand => {
    return {
        label: brand,
        data: brandMonthlyIncome[brand],
        backgroundColor: getRandomColor(), // Function to generate random colors for each brand
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1
    };
});

// Function to generate a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
}

// Create the stacked bar chart
const ctx_stacked = document.createElement('canvas');
document.querySelector('.graphs').insertBefore(ctx_stacked, ctx_bar.canvas);

ctx_stacked.width = 300;  // Match the width of the pie chart
ctx_stacked.height = 300; // Match the height of the pie chart

const stackedBarChart = new Chart(ctx_stacked.getContext('2d'), {
    type: 'bar',
    data: {
        labels: months,
        datasets: stackedDatasets
    },
    options: {
        responsive: false, // Disable responsiveness
        maintainAspectRatio: false, // Maintain aspect ratio
        scales: {
            x: {
                beginAtZero: true,
                stacked: true, // Enable stacking
                ticks: {
                    autoSkip: false // Ensure all labels are displayed
                }
            },
            y: {
                beginAtZero: true,
                stacked: true, // Enable stacking
                ticks: {
                    callback: function(value) {
                        // Format the numbers to avoid scientific notation
                        return value.toLocaleString(); // Adds commas as thousands separators
                    }
                }
            }
        }
    }
});
