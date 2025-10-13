const express = require("express")
const app = express();

require("./query_params")(app);
require("./multiple_route_handelers")(app);
const connectDB = require("./config/database");
app.use(express.json());

const { adminAuth, userAuth } = require("./middlewares/auth");
const { createUser, getUser } = require("./error_handling");
const User = require("./models/user")
app.use("/user", userAuth); // auth middleware for user
app.use("/admin", adminAuth) // auth middleware for admin

app.post("/userError", createUser); // Error Handling for Post user
app.get("/userError", getUser);     // Error Handling for get user


app.use("/test", (req, res) => {
    res.send("Test from the server")
})

app.use("/admin", (req, res) => {
    res.send("list of all admins")
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


app.post('/signup', async (req, res) => {
    //creating a new instance of the user model 
    const user = new User(req.body)
    try {
        await user.save();
        res.send("User added successfully")
    }
    catch (err) {
        res.status(400).send("Error in crearting the user")
    }
})


// get user from the database

app.get("/userWithEmailId", async (req, res) => {

    const userEmail = req.body.emailId

    try {
        const user = await User.find({ emailId: userEmail })
        if (user.length >= 0) {
            res.status(404).send("User not found")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send('User not found')
    }
})

app.get("/allUsers", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Error fetching users" });
    }
});

app.delete("/deleteUser", async (req, res) => {
    const userId = req.body.userId

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).send("User Deleted Successfully");
    } catch (err) {
        res.status(400).send({ message: "unable to delete user" })
    }
})


// update user using the patch 

app.patch("/updateUser", async (req, res) => {
    const userId = req.body.userId

    try {
        await User.findByIdAndUpdate(userId, req.body);
        res.status(200).send("User Updated Successfully");
    } catch (err) {
        res.status(400).send({ message: "Error" })
    }
})

const startServer = async () => {
    await connectDB(); // Wait for DB connection
    app.listen(3000, () => {
        console.log(`🚀 Server is listening on port ${3000}`);
    });
};

startServer();
