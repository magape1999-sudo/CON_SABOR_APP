const API = "http://localhost:3000/api/auth"

// ===== ELEMENTOS =====
const loginForm = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")

// ===== UTILIDADES UI =====
function showMessage(message, isError = false) {

let msg = document.getElementById("msg")

if(!msg){
msg = document.createElement("div")
msg.id = "msg"
msg.style.marginTop = "10px"
msg.style.textAlign = "center"
document.querySelector(".form-card").appendChild(msg)
}

msg.innerText = message
msg.style.color = isError ? "red" : "green"

}

// ===== REGISTRO =====
if(registerForm){

registerForm.addEventListener("submit", async e => {

e.preventDefault()

const username = document.getElementById("username").value
const email = document.getElementById("email").value
const password = document.getElementById("password").value

try{

const res = await fetch(API + "/register", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ username, email, password })
})

const data = await res.json()

if(!res.ok){
throw new Error(data.msg || "Error en el registro")
}

showMessage("✅ Usuario creado correctamente")

setTimeout(()=>{
window.location = "login.html"
},1500)

}catch(error){

showMessage("❌ " + error.message, true)

}

})

}

// ===== LOGIN =====
if(loginForm){

loginForm.addEventListener("submit", async e => {

e.preventDefault()

const email = document.getElementById("email").value
const password = document.getElementById("password").value

try{

const res = await fetch(API + "/login", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, password })
})

const data = await res.json()

if(!res.ok){
throw new Error(data.msg || "Error al iniciar sesión")
}

// Guardar token
localStorage.setItem("token", data.token)

showMessage("✅ Bienvenido")

setTimeout(()=>{
window.location = "dashboard.html"
},1000)

}catch(error){

showMessage("❌ " + error.message, true)

}

})

}