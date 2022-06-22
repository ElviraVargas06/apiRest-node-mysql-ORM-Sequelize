import "dotenv/config"
import "./database/db.js"
import express from "express";
import authRouter from "./routes/auth.route.js"

const app = express();

//Recibe datos JSON
app.use(express.json())

app.use("/api/v1/auth",authRouter)

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log("🌞🌞🌞🌞 http://localhost:" + PORT))