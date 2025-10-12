const express = require("express")
const app = express();


// POST /user
const createUser = (req, res) => {
  try {
    console.log("Saving user data...");

    // simulate an error to test catch block
    throw new Error("Database connection failed");

    res.status(201).send("User saved successfully");
  } catch (error) {
    console.error("Error while creating user:", error.message);
    res.status(500).send("Something went wrong while saving the user");
  }
};

// GET /user
const getUser = (req, res) => {
  try {
    console.log("Fetching user data...");

    // simulate an error
    throw new Error("Unable to fetch data");

    res.status(200).send("User data fetched successfully");
  } catch (error) {
    console.error("Error while fetching user:", error.message);
    res.status(500).send("Something went wrong while fetching the user");
  }
};

module.exports = {
  createUser,
  getUser,
};
