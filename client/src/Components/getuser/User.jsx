import React, { useState, useEffect } from "react";
import "./user.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/${userId}`)
      .then((response) => {
        setUsers((preUser) => preUser.filter((user) => user._id !== userId));
        toast.success(response.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="userTable">
        <Link to={"/add"} className="addButton">
          Add User
        </Link>
        <table border={1} cellPadding={10} cellSpacing={10}>
          <thead>
            <tr>
              <th>S.NO</th>
              <th>User Name</th>
              <th>Phone</th>
              <th>User Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    {user.fname} {user.lname}
                  </td>
                  <td> {user.number} </td>
                  <td> {user.email} </td>
                  <td className="actionButtons">
                    {/* Edit Button */}
                    <Link to={`/edit/` + user._id} className="edit">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    {/* Delete Button */}
                    <button onClick={() => deleteUser(user._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <footer
          style={{
            textAlign: "right",
            fontStyle: "italic",
            paddingTop: "8px",
            fontFamily: "Times New Roman",
          }}
        >
          CRUD-APP Developed by{" "}
          <b style={{ color: "darkblue", fontFamily: "Times New Roman" }}>
            <u>ALI AJMAL AWAN</u>
          </b>
        </footer>
      </div>
    </>
  );
};

export default User;
