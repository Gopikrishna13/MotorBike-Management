document.addEventListener("DOMContentLoaded", () => {
    const id = Number(sessionStorage.getItem("ID"));

    let bikes = JSON.parse(localStorage.getItem("Bike_Details")) || [];
    let bike_data = bikes.find(item => item.ID === id);

    if (bike_data) {
        let formHTML = `
            <form id="update_form">
                <label for="bike_type_update">Type</label>
                <input type="text" id="bike_type_update" value="${bike_data.Type}" required><br><br>

                <label for="bike_brand_update">Brand</label>
                <input type="text" id="bike_brand_update" value="${bike_data.Brand}" required><br><br>

                <label for="bike_year_update">Year</label>
                <input type="text" id="bike_year_update" value="${bike_data.Year}" required><br><br>

                <label for="bike_reg_update">Registration Number</label>
                <input type="text" id="bike_reg_update" value="${bike_data.Registration_Number}" required><br><br>

                <label for="bike_price_update">Rent</label>
                <input type="number" id="bike_price_update" value="${bike_data.Rent}" required><br><br>

                <label for="bike_img_update">Image</label><br>
                <img src="${bike_data.Image}" width="50"><br><br>
                <input type="file" id="bike_img_update"><br><br>

                <input type="submit" id="update_detail" value="Update">
                <input type="button" id="update_detail_cancel" value="Cancel">
            </form>
        `;

        document.getElementById("update_bike").innerHTML = formHTML;

        document.getElementById("update_form").addEventListener("submit", function(e) {
            e.preventDefault();

            const bike_type = document.getElementById("bike_type_update").value;
            const bike_brand = document.getElementById("bike_brand_update").value;
            const bike_year = document.getElementById("bike_year_update").value;
            const bike_reg = document.getElementById("bike_reg_update").value;
            const bike_price = document.getElementById("bike_price_update").value;
            const bike_img = document.getElementById("bike_img_update").files[0];

            // Check if registration number is unique
            let isUnique = !bikes.some(bike => bike.Registration_Number === bike_reg && bike.ID !== id);

            if (!isUnique) {
                alert("Registration number already exists. Please enter a unique registration number.");
                return;
            }

            const updateBikeDetails = (imageURL) => {
                const updatedBikeDetails = {
                    ID: id,
                    Type: bike_type,
                    Brand: bike_brand,
                    Year: bike_year,
                    Registration_Number: bike_reg,
                    Rent: bike_price,
                    Image: imageURL || bike_data.Image // Use new image URL or keep the old one
                };

                // Update the specific bike in the array
                const updatedBikes = bikes.map(bike => bike.ID === id ? updatedBikeDetails : bike);

                // Save updated array to localStorage
                localStorage.setItem("Bike_Details", JSON.stringify(updatedBikes));
                alert("Bike details updated successfully");
                window.location.href = "inventory.html"; // Redirect after update
            };

            if (bike_img) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    updateBikeDetails(event.target.result);
                };
                reader.readAsDataURL(bike_img);
            } else {
                updateBikeDetails();
            }
        });

        document.getElementById("update_detail_cancel").addEventListener("click", () => {
            window.location.href = "inventory.html"; 
        });
    } else {
        alert("Bike not found");
    }
});
