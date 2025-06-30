
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import EventDetails from "./pages/EventDetails";
import AuthProvider from "./Context/Provider/AuthProvider"; 
import PrivateRoute from "./routes/PrivateRoute"; 
import Profile from "./pages/Profile";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: (
          // <PrivateRoute>
            <About />
          // </PrivateRoute>
        ),
      },
      {
        path: "events/:id",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        {/* <ToastContainer position="top-center" autoClose={1500} /> */}
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
