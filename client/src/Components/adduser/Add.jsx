import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Add.css";
import toast from "react-hot-toast";

const Add = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    number: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/create",
        user
      );

      // Log response to verify the structure
      console.log(response);

      if (response.data && response.data.msg) {
        toast.success(response.data.msg, { position: "top-right" });
      } else {
        toast.success("User created successfully!", { position: "top-right" });
      }

      // Delay navigation to show success message
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      // Log the error to debug
      console.log(error.response ? error.response.data : error.message);

      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg, { position: "top-right" });
      } else {
        toast.error("Something went wrong", { position: "top-right" });
      }
    }
  };

  return (
    <>
      <div className="addUser">
        <Link to={"/"} className="bckBtn">
          Back
        </Link>
        <h3>Add new user</h3>
        <form className="addUserForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="fname">First name</label>
            <input
              type="text"
              onChange={inputHandler}
              id="fname"
              name="fname"
              autoComplete="off"
              placeholder="First Name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="lname">Last name</label>
            <input
              type="text"
              onChange={inputHandler}
              id="lname"
              name="lname"
              autoComplete="off"
              placeholder="Last Name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="number">Number</label>
            <input
              type="text"
              onChange={inputHandler}
              id="number"
              name="number"
              autoComplete="off"
              placeholder="Number"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={inputHandler}
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={inputHandler}
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Password"
            />
          </div>
          <div className="inputGroup">
            <button type="submit">ADD USER</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
