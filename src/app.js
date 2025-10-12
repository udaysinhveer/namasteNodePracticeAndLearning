const express = require("express")
const app = express();

require("./query_params")(app);
require("./multiple_route_handelers")(app);


app.use("/test", (req, res) => {
    res.send("Test from the server")
})

app.get("/user", (req, res) => {
    res.send([

        {
            "id": 3,
            "name": "Udaysinh Veer",
            "email": "carla.mendes@example.com",
            "username": "carlam",
            "role": "editor",
            "created_at": "2023-11-01T18:47:00Z"
        },
        {
            "id": 4,
            "name": "Pratiksha Jadhav",
            "email": "david.lee@example.com",
            "username": "dlee",
            "role": "moderator",
            "created_at": "2024-01-22T12:05:00Z"
        },
        {
            "id": 5,
            "name": "Sanika Shinde",
            "email": "emily.zhao@example.com",
            "username": "emzhao",
            "role": "user",
            "created_at": "2024-03-14T16:30:00Z"
        },
        {
            "id": 5,
            "name": "Rashmi Kumari",
            "email": "emily.zhao@example.com",
            "username": "emzhao",
            "role": "user",
            "created_at": "2024-03-14T16:30:00Z"
        },
        {
            "id": 5,
            "name": "smital gajare",
            "email": "emily.zhao@example.com",
            "username": "emzhao",
            "role": "user",
            "created_at": "2024-03-14T16:30:00Z"
        }
    ]
    )
})

app.post("/user", (req, res) => {
    res.send("user saved successfully")
})


app.delete("/user", (req, res) => {
    res.send("user deleted successfuly")
})


app.put("/user", (req, res) => {
    res.send("user updated successfully")
})

// app.use("/hello", (req, res) => {
//     res.send("Hello, Hello and Hello")
// })

// app.use("/namaste", (req, res) => {
//     res.send("Namaste Uday")
// })

app.listen(3000, () => {
    console.log("server is listining successfully on port 3000");
})