const user_details = JSON.parse(localStorage.getItem("User_Details")) || [];
const userName = sessionStorage.getItem("Customer_Name");
console.log(1);
const user = user_details.find(person => person.UserName === userName);
let formHTML;
if (user) {
    formHTML = `
    <form id="update_form">
        <label>User:</label>
        <label>${user.UserName}</label>
        <br><br>

        <label for="mobile">Mobile:</label>
        <input type="text" id="mobile" value="${user.Mobile}">
        <br><br>

        <label for="email">Email:</label>
        <input type="text" id="email" value="${user.Email}">
        <br><br>

        <label for="nic">NIC:</label>
        <input type="text" id="nic" value="${user.NIC}">
        <br><br>

        <label for="license">License:</label>
        <input type="text" id="license" value="${user.License}">
        <br><br>

        <input type="checkbox" id="option" onclick="clicked()">
        <label for="option">Change Password</label>
        <br><br>
        <div id="password"></div>
        <input type="submit" id="update_detail" value="Update">
    </form>`;

    document.getElementById("content").innerHTML = formHTML;
} else {
    console.error("User details not found.");
}

function clicked() {
    document.getElementById("password").innerHTML = `
    <label for="old">Old Password:</label>
    <input type="password" id="old">
    <br><br>
    <label for="new">New Password:</label>
    <input type="password" id="new">
    <br><br>
    <label for="confirm">Confirm:</label>
    <input type="password" id="confirm">
    `;
}

document.getElementById("update_form").addEventListener('submit', function(e) {
    e.preventDefault();
    const oldpassword = document.getElementById("old") ? document.getElementById("old").value : null;
    const newpassword = document.getElementById("new") ? document.getElementById("new").value : null;
    const confirmpassword = document.getElementById("confirm") ? document.getElementById("confirm").value : null;

    if (oldpassword && newpassword && confirmpassword) {
        const E_password = encryptpassword(oldpassword);
        const confirm = user_details.find(person => person.Password === E_password);

        if (confirm) {
            if (newpassword === confirmpassword) {
                const E_Newpassword = encryptpassword(newpassword);
                if (E_Newpassword.length >= 8) {
                    update_User(user.UserName, E_Newpassword, document.getElementById("mobile").value, document.getElementById("email").value, document.getElementById("nic").value, user.ID, document.getElementById("license").value);
                } else {
                    alert("New password should be at least 8 characters long");
                }
            } else {
                alert("Passwords do not match");
            }
        } else {
            alert("Incorrect old password");
        }
    } else {
        // If password fields are not filled out, only update other details
        update_User(user.UserName, user.Password, document.getElementById("mobile").value, document.getElementById("email").value, document.getElementById("nic").value, user.ID, document.getElementById("license").value);
    }
});

function encryptpassword(password) {
    return btoa(password);
}

function update_User(username, password, mobile, email, nic, id, license) {
    const updatedUser = {
        ID: id,
        UserName: username,
        Password: password,
        Email: email,
        Mobile: mobile,
        NIC: nic,
        License: license
    };

    const updatedUserDetails = user_details.map(person => {
        if (person.ID === id) {
            return updatedUser;
        } else {
            return person;
        }
    });

    localStorage.setItem("User_Details", JSON.stringify(updatedUserDetails));
    alert("Details updated successfully");
}
