import express from 'express'
const app = express()
import routes from './routes/index.js'
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", routes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started"));
