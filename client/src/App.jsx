import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import User from "./Components/getuser/User";
import Add from "./Components/adduser/Add.jsx";
import Edit from "./Components/updateuser/Edit.jsx";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <Add />,
    },
    {
      path: "/edit/:id",
      element: <Edit />,
    },
  ]);

  return (
    <>
      <div className="App">
        <RouterProvider router={route}></RouterProvider>
      </div>
    </>
  );
}

export default App;
