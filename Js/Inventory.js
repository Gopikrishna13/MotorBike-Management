document.addEventListener("DOMContentLoaded", function() {
    displayBikes();

    document.getElementById('add_btn').addEventListener('click', function() {
        var form = document.getElementById('bike_form');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById("bike_quantity").addEventListener("input", generateRegNumberFields);

    document.getElementById("search_btn").addEventListener("click", searchBike);

    document.getElementById("bike_form").addEventListener("submit", function(e) {
        e.preventDefault();
        createBike();
    });

    document.getElementById("bike_detail_cancel").addEventListener("click", function() {
        document.getElementById("bike_form").style.display = "none";
    });

    document.getElementById("image_input").addEventListener("change", handleImageUpload);
});

function generateRegNumberFields() {
    const quantity = Number(document.getElementById("bike_quantity").value);
    const container = document.getElementById("reg_numbers_container");
    container.innerHTML = "";

    for (let i = 0; i < quantity; i++) {
        const label = document.createElement("label");
        label.textContent = `Registration Number ${i + 1}`;
        container.appendChild(label);

        const input = document.createElement("input");
        input.type = "text";
        input.required = true;
        input.className = "bike_reg";
        container.appendChild(input);

        container.appendChild(document.createElement("br"));
        container.appendChild(document.createElement("br"));
    }
}

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
                    <button id="upd_btn" onclick="updateData(${data.ID})">Update</button>
                    <button id="dlt_btn" onclick="deleteData(${data.ID})">Delete</button>
                </td>
            </tr>`;
    }

    table += `</table>`;
    document.getElementById("Bike_table").innerHTML = table;
}

function createBike() {
    const bike_model = document.getElementById("bike_model").value;
    const bike_brand = document.getElementById("bike_brand").value;
    const bike_year = document.getElementById("bike_year").value;
    const bike_price = document.getElementById("bike_price").value;
    const bike_reg_elems = document.querySelectorAll(".bike_reg");
    const image = document.getElementById("image_input").files[0];

    const reader = new FileReader();
    reader.onloadend = function() {
        let existingBikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];
        let existingRegs = existingBikes.map(bike => bike.Registration_Number);

        for (let i = 0; i < bike_reg_elems.length; i++) {
            const bike_reg = bike_reg_elems[i].value;

            // Check for unique registration number
            if (existingRegs.includes(bike_reg)) {
                alert(`Registration Number ${bike_reg} already exists.`);
                return; // Stop processing further if duplicate found
            }

            const newBike = {
                ID: existingBikes.length + 1,
                Image: reader.result,
                Type: bike_model,
                Brand: bike_brand,
                Year: bike_year,
                Rent: bike_price,
                Quantity: 1, 
                Registration_Number: bike_reg,
            };

            existingBikes.push(newBike);
        }

        localStorage.setItem("Bike_Details", JSON.stringify(existingBikes));

        displayBikes();
        document.getElementById("bike_form").style.display = "none";
    };

    reader.readAsDataURL(image);
}

function deleteData(id) {
    let existingBikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    existingBikes = existingBikes.filter(bike => bike.ID !== id);
    localStorage.setItem("Bike_Details", JSON.stringify(existingBikes));
    displayBikes();
}

function updateData(id) {
    console.log("Update button clicked for ID:", id);
    sessionStorage.setItem("ID", id);
    window.location.href = "update_bike.html";
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function() {
            
        };
        reader.readAsDataURL(file);
    }
}

function displayBikes() {
    let bike = JSON.parse(localStorage.getItem("Bike_Details")) || [];

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
              
                <td>
                    <button id="upd_btn" onclick="updateData(${data.ID})">Update</button>
                    <button id="dlt_btn" onclick="deleteData(${data.ID})">Delete</button>
                </td>
            </tr>`;
    }

    table += `</table>`;
    document.getElementById("Bike_table").innerHTML = table;
}









