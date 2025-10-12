module.exports = function (app) {
    app.get("/multipleRouteHandelers",

        (req, res, next) => {
            console.log("Handeling the route 1");
            next()
        },

        (req, res, next) => {
            console.log("Handeling the route 2");
            res.send("Handeling the route 2")
        },

        (req, res, next) => {
            console.log("Handeling the route 3");
        },

        (req, res, next) => {
            console.log("Handeling the route 4");
        }

    )
}