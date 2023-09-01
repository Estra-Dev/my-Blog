import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import router from "./route/post.js"
import "dotenv/config"

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use("/", router)

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Welcome to Express JS")
})
app.all("*", (req, res) => res.send("This route does not exist"))

app.listen(PORT, () => {
  console.log(`server is currently running on port ${PORT}`)
  console.log(process.env)
})