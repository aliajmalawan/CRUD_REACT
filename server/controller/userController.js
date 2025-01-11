import User from "../model/userModel.js";
import mongoose from "mongoose";

// Create a new user
export const create = async (req, res) => {
  try {
    const userData = new User(req.body); // Fixed typo: `req.body`

    // Validate user data (optional but recommended)
    if (!userData) {
      return res.status(400).json({ msg: "Invalid user data" });
    }

    const savedData = await userData.save();
    res.status(201).json({ msg: "User created successfully", user: savedData });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get all users
export const getAll = async (req, res) => {
  try {
    const userData = await User.find();

    if (userData.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get a single user by ID
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(userExist);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    // Check if the user exists
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update the user data
    const updateData = await User.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the new data meets the schema requirements
    });

    res
      .status(200)
      .json({ msg: "User updated successfully", user: updateData });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "user not exist" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
