document.getElementById("user_login").addEventListener("submit", login_validate);

function login_validate(event) {
    event.preventDefault();
    let username = document.getElementById("Username").value;
    let password = document.getElementById("password").value;

    if (username.startsWith("M")) {
        const m_login = manager_Login(username, password);
        if (m_login) {
            localStorage.setItem("Manager_Name", JSON.stringify(username));
            window.location.href = "Manager_Dashboard.html"; // Redirect to manager dashboard
        } else {
            document.getElementById("response").innerHTML = "Login Failed";
        }
    } else if (username.startsWith("U")) {
        const u_login = user_Login(username, password);
        if (u_login) {
            localStorage.setItem("Customer_Name", JSON.stringify(username));
            window.location.href = "User.html"; // Redirect to user page
        } else {
            document.getElementById("response").innerHTML = "Login Failed";
        }
    } else {
        document.getElementById("response").innerHTML = "Invalid Login";
    }
}

function manager_Login(username, password) {
    const manager_details = JSON.parse(localStorage.getItem("Manager_Details"));
    if (!manager_details) {
        console.error("No manager details found in localStorage");
        return false;
    }

    const E_mpasswd = encrypt_password(password);

    for (const manager of manager_details) {
        if (manager.UserName === username && manager.Password === E_mpasswd) {
            return true;
        }
    }
    return false;
}

function user_Login(username, password) {
    const user_details = JSON.parse(localStorage.getItem("User_Details"));
    if (!user_details) {
        console.error("No user details found in localStorage");
        return false;
    }

    const E_Upasswd = encrypt_password(password);

    for (const user of user_details) {
        if (user.UserName === username && user.Password === E_Upasswd) {
            return true;
        }
    }
    return false;
}

function encrypt_password(password) {
    return window.btoa(password);
}

