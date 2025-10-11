module.exports = function (app) {
    app.post("/user", (req, res) => {
        const { email, name } = req.query;

        console.log("Email:", email);
        console.log("Name:", name);

        res.send("Routing User saved successfully");
    });


    //Regex Routes (Fully Custom)
    //This matches: /user/123 & /user/456
    //But not: /user/abc

    app.get(/^\/user\/[0-9]+$/, (req, res) => {
        res.send("Matched user with numeric ID");
        console.log("Matched user with numeric ID");

    });

    // Dynamic routes
    //GET http://localhost:3000/user/123sdfdfd

    app.get("/user/:id", (req, res) => {
        res.send(`User ID is ${req.params.id}`);
        console.log(`User ID is ${req.params.id}`);
        console.log("Matched user with character ID");

    });

    //multiple params:
    //GET http://localhost:3000/user/12/post/99


    app.get("/user/:userId/post/:postId", (req, res) => {
        res.send(req.params);
        console.log("multiple params", req.params);

    });

    //* (Wildcard)
    //Matches any characters (including none) between ab and cd.

    //http://localhost:3000/abXcd

    //http://localhost:3000/abXYZcd

    //http://localhost:3000/ab123cd

    app.get("/ab*cd", (req, res) => {
        res.send("Matched ab*cd");
    });
};


