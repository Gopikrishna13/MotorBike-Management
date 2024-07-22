 const manager_details = JSON.parse(localStorage.getItem("Manager_Details")) || [];
    const managerName = sessionStorage.getItem("Manager_Name");

    const manager = manager_details.find(person => person.UserName === managerName);
    let formHTML;
    if (manager) {
        formHTML = `
        <form id="update_form">
            <label>Manager:</label>
            <label>${manager.UserName}</label>
            <br><br>

            <label for="mobile">Mobile:</label>
            <input type="text" id="mobile" value="${manager.Mobile}">
            <br><br>

            <label for="email">Email:</label>
            <input type="text" id="email" value="${manager.Email}">
            <br><br>

            <label for="nic">NIC:</label>
            <input type="text" id="nic" value="${manager.NIC}">
            <br><br>

            <input type="checkbox" id="option" onclick="clicked()">
            <label for="option">Change Password</label>
            <br><br>
            <div id="password"></div>
            <input type="submit" id="update_detail" value="Update">
        </form>`;

        document.getElementById("content").innerHTML = formHTML;
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
        //check presence in DOM if not put throw error (dynamically update)
        const oldpassword = document.getElementById("old") ? document.getElementById("old").value : null;
        const newpassword = document.getElementById("new") ? document.getElementById("new").value : null;
        const confirmpassword = document.getElementById("confirm") ? document.getElementById("confirm").value : null;

        if (oldpassword && newpassword && confirmpassword) {
            const E_password = encryptpassword(oldpassword);
            const confirm = manager_details.find(person => person.Password === E_password);

            if (confirm) {
                if (newpassword === confirmpassword) {
                    const E_Newpassword = encryptpassword(newpassword);
                    if (E_Newpassword.length >= 8) {
                        update_Manager(manager.UserName, E_Newpassword, document.getElementById("mobile").value, document.getElementById("email").value, document.getElementById("nic").value, manager.ID);
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
            update_Manager(manager.UserName, manager.Password, document.getElementById("mobile").value, document.getElementById("email").value, document.getElementById("nic").value, manager.ID);
        }
    });

    function encryptpassword(password) {
        return btoa(password);
    }

    function update_Manager(username, password, mobile, email, nic, id) {
        const updatedManager = {
            ID: id,
            UserName: username,
            Password: password,
            Email: email,
            Mobile: mobile,
            NIC: nic
        };

        const updatedManagerDetails = manager_details.map(person => {
            if (person.ID === id) {
                return updatedManager;
            } else {
                return person;
            }
        });

        localStorage.setItem("Manager_Details", JSON.stringify(updatedManagerDetails));
        alert("Details updated successfully");
    }