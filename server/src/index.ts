import express from "express"
import { createServer } from "http"
import cors from "cors"
import { Socket } from "./services/socket/socket"
import { copyFolder } from "./lib/folder"
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8000
const server = createServer(app)

const io = new Socket(server)

app.post("/requirements", (req, res) => {
  const { name, language } = req.body
  console.log("data = ", name, language)
  const val = copyFolder(language, name)
  if (val) return res.json("ok")
  return res.json("error")
})

server.listen(PORT, () => console.log("Listiing at port 8000"))