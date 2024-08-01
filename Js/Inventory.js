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
    const id=Number(document.getElementById("idsearch").value);

    let bike = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    bike = bike.filter(item => 
        (id===0 || item.ID===id)&&
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
                    <button onclick="updateData(${data.ID}) " >Update</button>
                    <button onclick="deleteData(${data.ID})">Delete</button>
                </td>
            </tr>`;
    }

    table += `</table>`;
    document.getElementById("Bike_table").innerHTML = table;
}


function createBike() {
   
    const bike_type = document.getElementById("bike_type").value;
    const bike_brand = document.getElementById("bike_brand").value;
    const bike_year = document.getElementById("bike_year").value;
    const bike_reg = document.getElementById("bike_reg").value;
    const bike_price = document.getElementById("bike_price").value;
   // const bike_qty = document.getElementById("bike_qty").value;
    const bike_img = document.getElementById("bike_img").files[0];
   
    const reader = new FileReader();
    reader.onload = function(event) {
        const bike_details = {
            ID: Math.floor(Math.random() * (1000000 - 1)) + 1,
            Type: bike_type,
            Brand: bike_brand,
            Year: bike_year,
            Registration_Number: bike_reg,
            Rent: bike_price,
           // Quantity: bike_qty,
            Image: event.target.result
        };
       
        let create_bike = JSON.parse(localStorage.getItem("Bike_Details")) || [];
        create_bike.push(bike_details);
        localStorage.setItem("Bike_Details", JSON.stringify(create_bike));

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
                <th>Action</th>
            </tr>`;

    for (const data of display) {
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
                    <button onclick="updateData(${data.ID})" id="upd_btn">Update</button>
                    <button onclick="deleteData(${data.ID} )" id="dlt_btn">Delete</button>
                </td>
            </tr>`;
    }

    table += `</table>`;
    
    document.getElementById("Bike_table").innerHTML = table;
}

function deleteData(data) {
    let bike = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    bike = bike.filter(item => item.ID !== data); 
    localStorage.setItem("Bike_Details", JSON.stringify(bike));
    displayBikes();
}

function updateData(id) {
sessionStorage.setItem("ID",id);
window.location.href="update_bike.html";
      
}
