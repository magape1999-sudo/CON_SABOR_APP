const API = "http://localhost:3000/api/menu"
const token = localStorage.getItem("token")

let currentId = null

if(!token){
window.location = "login.html"
}

// ===== CREAR =====
document.getElementById("menuForm").addEventListener("submit", async e => {

e.preventDefault()

const name = document.getElementById("name").value
const price = document.getElementById("price").value
const description = document.getElementById("description").value

await fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":token
},
body:JSON.stringify({name,price,description})
})

e.target.reset()
loadMenu()

})

// ===== LISTAR =====
async function loadMenu(){

const res = await fetch(API)
const data = await res.json()

const container = document.getElementById("menuList")
container.innerHTML = ""

data.forEach(item => {

container.innerHTML += `
<div class="card">
<h3>${item.name}</h3>
<p>${item.description || "Sin descripción"}</p>
<div class="price">$${item.price}</div>

<div class="card-actions">
<button class="btn-warning" onclick="openEdit('${item._id}','${item.name}','${item.price}','${item.description}')">Editar</button>
<button onclick="deleteItem('${item._id}')">Eliminar</button>
</div>

</div>
`

})

}

// ===== ELIMINAR =====
async function deleteItem(id){

if(!confirm("¿Eliminar este plato?")) return

await fetch(API+"/"+id,{
method:"DELETE",
headers:{ "Authorization":token }
})

loadMenu()

}

// ===== ABRIR MODAL =====
function openEdit(id,name,price,description){

currentId = id

document.getElementById("editName").value = name
document.getElementById("editPrice").value = price
document.getElementById("editDescription").value = description

document.getElementById("editModal").style.display = "flex"

}

// ===== CERRAR MODAL =====
function closeModal(){
document.getElementById("editModal").style.display = "none"
}

// ===== ACTUALIZAR =====
async function updateItem(){

const name = document.getElementById("editName").value
const price = document.getElementById("editPrice").value
const description = document.getElementById("editDescription").value

await fetch(API+"/"+currentId,{
method:"PUT",
headers:{
"Content-Type":"application/json",
"Authorization":token
},
body:JSON.stringify({name,price,description})
})

closeModal()
loadMenu()

}

// ===== LOGOUT =====
function logout(){
localStorage.removeItem("token")
window.location = "login.html"
}

loadMenu()