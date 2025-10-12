const express = require('express');
const app = express();


// Middleware 1: Logs request method and URL
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, URL: ${req.url}`);
    next(); // move to the next middleware
});

// Middleware 2: Adds a timestamp to each request
app.use((req, res, next) => {
    req.requestTime = new Date();
    console.log('Timestamp added to request');
    next();
});


// Middleware 3: Authentication check (example)
function checkAuth(req, res, next) {
    console.log('Checking user authentication...');
    const isAuthenticated = true; // fake condition for demo
    if (isAuthenticated) {
        console.log('User authenticated');
        next(); // allow request to continue
    } else {
        res.status(403).send('Access Denied');
    }
}

// Middleware 4: Data validation
function validateData(req, res, next) {
    console.log('Validating request data...');
    // validation logic could be here
    next();
}

// Middleware 5: Simulate async work using setTimeout
function asyncMiddleware(req, res, next) {
    console.log('Starting async task...');
    setTimeout(() => {
        console.log('Async task completed');
        next();
    }, 500);
}


// Simple route handler for /home
app.get('/home', (req, res) => {
    console.log('Route handler for /home executed');
    res.send('Welcome Home');
});

// Route with multiple middlewares and handlers
app.get(
    '/dashboard',
    checkAuth,       // middleware 1 for this route
    validateData,    // middleware 2 for this route
    asyncMiddleware, // middleware 3 for this route
    (req, res, next) => {
        console.log('Preparing dashboard data...');
        next(); // continue to next handler
    },
    (req, res) => {
        console.log('Sending dashboard response...');
        res.send(`Dashboard loaded at ${req.requestTime}`);
    }
);


// 4. ERROR HANDLING MIDDLEWARE (always last)
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    res.status(500).send('Internal Server Error');
});


// 5. START THE SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
