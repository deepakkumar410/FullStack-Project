const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const server = express();
dotenv.config();
const PORT = process.env.PORT || 8080 ;
const MONGODB_URL =  process.env.MONGODB_URL ;
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Mongoose Connect");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  Name: String,
  Phone_Number: String,
  Email: String,
  CourseName: String,
  Gender: String,
  Date_Of_Birth: String,
});
const User = mongoose.model("User", userSchema);

server.use(cors());
server.use(bodyparser.json());
server.post("/demo", async (req, res) => {
  let user = new User();
  user.Name = req.body.Name;
  user.Date_Of_Birth = req.body.Date_Of_Birth;
  user.Email = req.body.Email;
  user.Phone_Number = req.body.Phone_Number;
  user.Gender = req.body.Gender;
  user.CourseName = req.body.CourseName;
  const doc = await user.save();
  console.log(doc);
  res.json(doc);
});
server.get("/demo", async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
});
server.delete("/demo/:id", async (req, res) => {
  const userId = req.params.id; // Get the user ID from the request parameters
  try {
    const deletedUser = await User.findByIdAndDelete(userId); // Find and delete the user by ID
    if (!deletedUser) {
      return res.status(404).json({ message: "User  not found" }); // If no user is found, return a 404 status
    }
    res.json({ message: "User  deleted successfully", deletedUser }); // Return a success message and the deleted user
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" }); // Handle any server errors
  }
});
server.listen(PORT, () => {
  console.log("Start hello");
});
