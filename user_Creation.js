document.getElementById("select_Role").addEventListener("change", () => {
    let role = document.getElementById("select_Role").value;
    if (role == "Manager") {
        document.getElementById("User_details").style.display = "none";
        document.getElementById("Manager_details").style.display = "block";
    } else if (role == "User") {
        document.getElementById("Manager_details").style.display = "none";
        document.getElementById("User_details").style.display = "block";
    }
});

document.getElementById("user_creation").addEventListener("submit", validate);

function validate(e) {
    e.preventDefault();

    let role = document.getElementById("select_Role").value;
    if (role == "Manager") {
        let Manager_username = document.getElementById("M_username").value.trim();
        let Manager_passwd = document.getElementById("M_password").value.trim();
        let Manager_nic = document.getElementById("M_NIC").value.trim();
        let Manager_mobile = document.getElementById("M_Mobile").value.trim();

        if (checkManager(Manager_username)) {
            alert("Username already exists! Please choose another username.");
            location.reload();
            return;
        }

        if (Manager_username.startsWith("M")) {
            if (Manager_passwd.length >= 8) {
                Store_Manager(Manager_username, Manager_passwd, Manager_nic, Manager_mobile);
                alert("Manager account created successfully!");
                window.location.href = "Login.html";
            } else {
                document.getElementById("manager_password").textContent = "Invalid Password Length (should be at least 8 characters)";
            }
        } else {
            document.getElementById("manager_username").textContent = "Invalid User Name (should start with 'M')";
        }
    } else if (role == "User") {
        let User_Name = document.getElementById("U_username").value.trim();
        let User_Pwd = document.getElementById("U_password").value.trim();
        let NIC = document.getElementById("U_NIC").value.trim();
        let License = document.getElementById("License").value.trim();
        let User_mobile = document.getElementById("U_Mobile").value.trim();

        if (checkUser(User_Name)) {
            alert("Username already exists! Please choose another username.");
            location.reload();
            return;
        }

        if (User_Name.startsWith("U")) {
            if (User_Pwd.length >= 8) {
                Store_User(User_Name, User_Pwd, NIC, License, User_mobile);
                alert("User account created successfully!");
                window.location.href = "Login.html";
            } else {
                document.getElementById("user_password").textContent = "Invalid Password Length (should be at least 8 characters)";
            }
        } else {
            document.getElementById("user_username").textContent = "Invalid User Name (should start with 'U')";
        }
    }
}

function checkManager(Manager_username) {
    const Manager_details = JSON.parse(localStorage.getItem("Manager_Details")) || [];
    for (const manager of Manager_details) {
        if (manager.UserName === Manager_username) {
            return true; // Username already exists
        }
    }
    return false; // Username does not exist
}

function checkUser(User_Name) {
    const User_details = JSON.parse(localStorage.getItem("User_Details")) || [];
    for (const user of User_details) {
        if (user.UserName === User_Name) {
            return true; // Username already exists
        }
    }
    return false; // Username does not exist
}

function Store_Manager(Manager_username, Manager_passwd, Manager_nic, Manager_mobile) {
    const M_password = encrypt_password(Manager_passwd);
    const Manager = {
        UserName: Manager_username,
        Password: M_password,
        NIC: Manager_nic,
        Mobile: Manager_mobile
    };

    let Manager_details = JSON.parse(localStorage.getItem("Manager_Details")) || [];
    Manager_details.push(Manager);
    localStorage.setItem("Manager_Details", JSON.stringify(Manager_details));
}

function Store_User(User_Name, User_Pwd, NIC, License, User_mobile) {
    const U_password = encrypt_password(User_Pwd);
    const User = {
        UserName: User_Name,
        Password: U_password,
        NIC: NIC,
        License: License,
        Mobile: User_mobile
    };

    let User_details = JSON.parse(localStorage.getItem("User_Details")) || [];
    User_details.push(User);
    localStorage.setItem("User_Details", JSON.stringify(User_details));
}

function encrypt_password(password) {
    return window.btoa(password);
}
