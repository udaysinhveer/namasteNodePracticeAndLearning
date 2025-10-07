const express = require("express")

const app = express();

app.use("/test", (req, res) => {
    res.send("Test from the server")
})

app.use("/hello", (req, res) => {
    res.send("Hello, Hello and Hello")
})

app.use("/namaste", (req, res) => {
    res.send("Namaste Uday")
})

app.listen(777, () => {
    console.log("server is listining successfully on port 3000");
})