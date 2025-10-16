const jwt = require("jsonwebtoken");
User = require("../models/user")

const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!!!");
    const token = "abc";
    const isAdminAuthorized = token === "abc";
    if (!isAdminAuthorized) {
        res.status(401).send("unAuauthorized Request")
    } else {
        next()
    }
}

const userAuth = (req, res, next) => {
    console.log("user auth is getting checked!!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("unAuauthorized Request")
    } else {
        next()
    }
}


// authentication using the Jwt token
const userAuth1 = async (req, res, next) => {
    // read the token from the request cookies
    // validate the token
    // Find the user

    try {
        const { token } = req.cookies;

        if (!token) {
           throw new Error("Token is not valid!!!!!!!!!!!!!!!!!!!!!!!!!") 
        }

        const decodedObj = await jwt.verify(token, "Dev@Uday#2710")

        const { _id } = decodedObj;

        const user = await User.findById(_id)

        if (!user) {
            throw new Error("User not found")
        }
        req.user = user;
        next()
    } catch (err) {
        res.status(400).send("Error:" + err.message)
    }

}

module.exports = {
    adminAuth,
    userAuth,
    userAuth1
};