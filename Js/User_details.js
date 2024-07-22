const user_details = JSON.parse(localStorage.getItem("User_Details")) || [];
document.addEventListener("DOMContentLoaded",displayUsers(user_details));

function displayUsers(user_details)
{
    let table = `<tr>
            <th>ID</th>
            <th>User Name</th>
            <th>NIC</th>
            <th>License Number</th>
            <th>Mobile</th>
            <th>Email</th>
        </tr>`;

     for(const user of user_details)
     {
        table+=`
        <tr>
            <td>
                ${user.ID}
                </td>
                <td>
                ${user.UserName}</td>
                <td>
                ${user.NIC}</td>
                <td>
                  ${user.License}  </td>
                  <td>
                   ${user.Mobile} </td>
                   <td>
                   ${user.Email} </td>
                </tr>`;
     }

        document.getElementById("user_table").innerHTML = table;
}
      

document.getElementById("search_btn").addEventListener('click', () => {
            const u_Id = Number(document.getElementById("ID_search").value);
            const u_Name = document.getElementById("UName_search").value.toLowerCase();

          
            const find_user = user_details.filter(user => 
        ( u_Id === 0 || user.ID === u_Id) &&
        (u_Name === "" || user.UserName.toLowerCase().includes(u_Name))
    );
            
                displayUsers(find_user);
           
        });