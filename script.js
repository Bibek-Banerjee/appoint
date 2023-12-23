const but = document.getElementById("btn");
const list = document.getElementById("result");
but.addEventListener("click", () => {
    let n = document.getElementById("name").value;
    let m = document.getElementById("mail").value;
    let nu = document.getElementById("num").value;
    console.log(n, m, nu);
    var li = document.createElement("li");
    li.innerHTML = n + " " + m + " " + nu + `<button class="buton">Delete</button>` + `<button>Edit</button>`;
    list.appendChild(li);
    axios.post("https://crudcrud.com/api/eef04a9dfffd40f6af4af98b43c3c21e/AppData", {
        name: n,
        mail: m,
        phone: nu
    }).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    })
    
    document.getElementById("name").value="";
    document.getElementById("mail").value="";
    document.getElementById("num").value="";
})
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/eef04a9dfffd40f6af4af98b43c3c21e/AppData")
        .then((res) => {
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
                var lis = document.createElement("li");
                var del = document.createElement("button");
                del.innerText = "delete";
                var edit = document.createElement("button");
                edit.innerText = "edit";
                lis.innerHTML = res.data[i].mail + " " + res.data[i].name + " " + res.data[i].phone;
                lis.appendChild(del);
                lis.appendChild(edit);
                list.appendChild(lis);
                del.addEventListener("click", createDeleteHandler(res.data[i]._id, lis));
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

function createDeleteHandler(itemId, listItem) {
    return function (e) {
        // Remove the targeted <li> from the DOM
        listItem.remove();

        // Make a DELETE request to the server to remove the corresponding data
        axios.delete(`https://crudcrud.com/api/eef04a9dfffd40f6af4af98b43c3c21e/AppData/${itemId}`)
            .then((deleteRes) => {
                console.log("Element deleted from the server:", deleteRes);
            })
            .catch((deleteErr) => {
                console.log("Error deleting element from the server:", deleteErr);
            });
    };
}