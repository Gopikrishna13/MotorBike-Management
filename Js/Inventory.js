document.addEventListener("DOMContentLoaded", function() {
    displayBikes();

    document.getElementById('add_btn').addEventListener('click', function() {
        var form = document.getElementById('bike_form');
        if (form.style.display === 'none') {
            form.style.display = 'block';
        } else {
            form.style.display = 'none';
        }
    });

    document.getElementById("search_btn").addEventListener("click", function() {
        searchBike(); 
    });

    document.getElementById("bike_form").addEventListener("submit", function(e) {
        e.preventDefault();
        createBike();
    });

    document.getElementById("bike_detail_cancel").addEventListener("click", function() {
        document.getElementById("bike_form").style.display = "none";
    });
});

function searchBike() {
    const type = document.getElementById("type_search").value.toLowerCase();
    const brand = document.getElementById("brand_search").value.toLowerCase();
    const year = document.getElementById("year_search").value.toLowerCase();
    const id = Number(document.getElementById("idsearch").value);

    let bike = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    bike = bike.filter(item => 
        (id === 0 || item.ID === id) &&
        (type === "" || item.Type.toLowerCase().includes(type)) &&
        (brand === "" || item.Brand.toLowerCase().includes(brand)) &&
        (year === "" || item.Year.toLowerCase().includes(year))
    );

    let table = `
        <table>  
            <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Year</th>
                <th>Registration No</th>
                <th>Rent</th>
                <th>Quantity</th>
                <th>Action</th>
            </tr>`;

    for (const data of bike) {
        table += `
            <tr>
                <td>${data.ID}</td>
                <td><img src="${data.Image}" width="50"></td>
                <td>${data.Type}</td>
                <td>${data.Brand}</td>
                <td>${data.Year}</td>
                <td>${data.Registration_Number}</td>
                <td>${data.Rent}</td>
                <td>${data.Quantity}</td>
                <td>
                    <button onclick="updateData(${data.ID})">Update</button>
                    <button onclick="deleteData(${data.ID})">Delete</button>
                </td>
            </tr>`;
    }

    table += `</table>`;
    document.getElementById("Bike_table").innerHTML = table;
}

function createBike() {
    const bike_type_elem = document.getElementById("bike_type");
    const bike_brand_elem = document.getElementById("bike_brand");
    const bike_year_elem = document.getElementById("bike_year");
    const bike_reg_elem = document.getElementById("bike_reg");
    const bike_price_elem = document.getElementById("bike_price");
    const bike_quantity_elem = document.getElementById("bike_quantity");
    const bike_img_elem = document.getElementById("bike_img");

    if (!bike_type_elem || !bike_brand_elem || !bike_year_elem || !bike_reg_elem || !bike_price_elem || !bike_quantity_elem || !bike_img_elem) {
        console.error("One or more form elements are missing.");
        return;
    }

    const bike_type = bike_type_elem.value;
    const bike_brand = bike_brand_elem.value;
    const bike_year = bike_year_elem.value;
    const bike_reg = bike_reg_elem.value;
    const bike_price = bike_price_elem.value;
    const bike_quantity = Number(bike_quantity_elem.value);
    const bike_img = bike_img_elem.files[0];

    if (bike_quantity < 1) {
        alert("Quantity must be at least 1.");
        return;
    }

    // Check if registration number is unique
    let existingBikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    let isUnique = !existingBikes.some(bike => bike.Registration_Number === bike_reg);

    if (!isUnique) {
        alert("Registration number already exists. Please enter a unique registration number.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        for (let i = 0; i < bike_quantity; i++) {
            const bike_details = {
                ID: Math.floor(Math.random() * (1000000 - 1)) + 1,
                Type: bike_type,
                Brand: bike_brand,
                Year: bike_year,
                Registration_Number: bike_reg,
                Rent: bike_price,
                Status: 0,
                Image: event.target.result
            };

            let create_bike = JSON.parse(localStorage.getItem("Bike_Details")) || [];
            create_bike.push(bike_details);
            localStorage.setItem("Bike_Details", JSON.stringify(create_bike));
        }

        document.getElementById("bike_form").style.display = "none";
        displayBikes();
    };
    reader.readAsDataURL(bike_img);
}

function displayBikes() {
    const display = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    let table = `
        <table>  
            <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Year</th>
                <th>Registration No</th>
                <th>Rent</th>
                <th>Quantity</th>
                <th>Action</th>
            </tr>`;

    let bikeCount = {};
    for (const data of display) {
        let bikeKey = `${data.Type}-${data.Brand}-${data.Year}-${data.Registration_Number}`;
        if (!bikeCount[bikeKey]) {
            bikeCount[bikeKey] = {
                ...data,
                Quantity: 0
            };
        }
        bikeCount[bikeKey].Quantity++;
    }

    for (const key in bikeCount) {
        const data = bikeCount[key];
        table += `
            <tr>
                <td>${data.ID}</td>
                <td><img src="${data.Image}" width="50"></td>
                <td>${data.Type}</td>
                <td>${data.Brand}</td>
                <td>${data.Year}</td>
                <td>${data.Registration_Number}</td>
                <td>${data.Rent}</td>
                <td>${data.Quantity}</td>
                <td>
                    <button onclick="updateData(${data.ID})" >Update</button>
                    <button onclick="deleteData(${data.ID})" style="background-color: #d9534f; color: white;">Delete</button>
                </td>
            </tr>`;
    }

    table += `</table>`;
    document.getElementById("Bike_table").innerHTML = table;
}
function deleteData(id) {
    let bike = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    bike = bike.filter(item => item.ID !== id); 
    localStorage.setItem("Bike_Details", JSON.stringify(bike));
    displayBikes();
}

function updateData(id) {
    sessionStorage.setItem("ID", id);
    window.location.href = "update_bike.html";
}
