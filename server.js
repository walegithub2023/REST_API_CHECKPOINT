// mount required libraries
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config({ path: "config/.env" });

const User = require("./models/User"); // Load/initialize the User model

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middleware
app.use(express.json());

// Routes
app.get("/users", async (req, res) => {
  try {
    // Use the find method to retrieve all users from the database
    const users = await User.find();

    // Send the users in the response
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create new user and send new user in the response

app.post("/users", async (req, res) => {
  try {
    // Use the create method to add a new user to the database
    const newUser = await User.create(req.body);

    // Send the added user in the response
    res.json(newUser);
  } catch (error) {
    console.error("Error adding a new user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//edit user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    // Check if the user with the given ID exists
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the updated user in the response
    res.json(updatedUser);
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//remove user by ID and send a success message in response
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    // Check if the user with the given ID exists
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send a success message in the response
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
