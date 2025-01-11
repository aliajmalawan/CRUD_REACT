import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./edit.css";
import "../adduser/Add.css";

const Edit = () => {
  const users = {
    fname: "",
    lname: "",
    number: "",
    email: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(users);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/update/${id}`,
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
        <h3>Update user</h3>
        <form className="addUserForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="fname">First name</label>
            <input
              type="text"
              value={user.fname}
              onChange={inputChangeHandler}
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
              value={user.lname}
              onChange={inputChangeHandler}
              id="lname"
              name="lname"
              autoComplete="off"
              placeholder="Last Name"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="number">Number</label>
            <input
              type="number"
              value={user.number}
              onChange={inputChangeHandler}
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
              value={user.email}
              onChange={inputChangeHandler}
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
            />
          </div>
          <div className="inputGroup">
            <button type="submit">UPDATE USER</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
