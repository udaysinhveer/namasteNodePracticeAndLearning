const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth1 } = require("./middlewares/auth")


require("./query_params")(app);
require("./multiple_route_handelers")(app);
const connectDB = require("./config/database");
app.use(express.json());
app.use(cookieParser()); // cookie-parser is a middleware that helps Express read cookies from the incoming HTTP requests.

const { adminAuth, userAuth } = require("./middlewares/auth");
const { createUser, getUser } = require("./error_handling");
const User = require("./models/user")
app.use("/user", userAuth); // auth middleware for user
app.use("/admin", adminAuth) // auth middleware for admin

app.post("/userError", createUser); // Error Handling for Post user
app.get("/userError", getUser);     // Error Handling for get user
const { validateSignUpData } = require("./utils/validation")


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

    const { password, firstName, lastName, emailId } = req.body
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash
    });

    try {
        validateSignUpData(req);
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


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

app.patch("/updateUser/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body

    try {

        const allowedUpdates = [
            "about", "firstName", "lastName", "gender", "age", "skills", "password",
        ]
        const isUpdateAllowed = Object.keys(data).every(k =>
            allowedUpdates.includes(k)
        );

        if (!isUpdateAllowed) {
            throw new Error("Updates not allowed")
        };

        if (data?.skills.length > 10) {
            throw new Error("Skills should not be more than 10")
        }

        await User.findByIdAndUpdate(userId, req.body);
        res.status(200).send("User Updated Successfully");
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("invalid credentials")

            // never use and err message like email id is not found, it expose the our database. Instead, use generic error messages 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {

            // const token = await jwt.sign({ _id: user._id }, "Dev@Uday#2710", { expiresIn:"1d",}) // generating JWT token
            // 1. _id:user._id  ======> This is the payload, meaning the actual data you want to embed inside the JWT (JSON Web Token).
            //2. "Dev@Uday#2710" ======> It’s the secret key that signs the token to prevent tampering and ensures verification fails if the token is altered.

            const token = await user.getJWT()

            res.cookie("token", token);
            res.send("login successfully");
            console.log('token', token);

        } else {
            throw new Error("Password is Incorrect")
        }

    } catch (err) {
        res.status(400).send({ message: err.message })
    }
})


app.get("/profile",userAuth1, async (req, res) => {
    // const cookie = req.cookies;
    // const { token } = cookie;
    // if (!token) {
    //     throw new Error("Invalid token")
    // }

    // // validate token 
    // const decodedMessage = await jwt.verify(token, "Dev@Uday#2710");
    // const { _id } = decodedMessage
    // const user = await User.findById(_id);



    //using the middleware

    const user = req.user

    if (!user) {
        throw new Error("user does not exist")
    }
    res.send(user);
})


const startServer = async () => {
    await connectDB(); // Wait for DB connection
    app.listen(3000, () => {
        console.log(`🚀 Server is listening on port ${3000}`);
    });
};

startServer();
