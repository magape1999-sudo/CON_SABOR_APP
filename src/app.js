import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

import connectDB from "./config/db.js"

import authRoutes from "./routes/auth.routes.js"
import menuRoutes from "./routes/menu.routes.js"

dotenv.config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

// Necesario para usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ruta a la carpeta public
const publicPath = path.join(__dirname, "../public")

// Servir archivos estáticos
app.use(express.static(publicPath))

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"))
})

// API
app.use("/api/auth", authRoutes)
app.use("/api/menu", menuRoutes)

//const PORT = 3000

//app.listen(PORT, () => {
 // console.log(`Servidor restaurante corriendo en http://localhost:${PORT}`)
// })
export default app
