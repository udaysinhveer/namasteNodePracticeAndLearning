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

module.exports = {
    adminAuth,
    userAuth
};