import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Landing/Root";
import Home from "./pages/Landing/Home";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Faq from "./pages/FAQ/Faq";

import UserHome from "./pages/User/UserHome";
import UserPage from "./pages/User/UserPage";
import ServicersList from "./pages/User/ServicersListPage";
import ServicerProfile from "./pages/User/ServicerProfile";

import Servicer from "./pages/Servicer/Servicer";
import ServicerPage from "./pages/Servicer/ServicerPage";

import Conversation from "./pages/Conversation/Conversation";
import UserProfile from "./pages/Profile/UserProfile";
import MessageInfo from "./pages/MessageInfo/MessageInfo";
import SerProfile from "./pages/Servicer/SerProfile";
import Gig from "./pages/Servicer/Gig";
import ProtectRoute from "../../admin/src/components/ProtectRoute";
import EditGig from "./pages/Servicer/EditGig";
import { useSelector } from "react-redux";
import CheckUserExistProtectedRoute from "./components/protected/CheckUserExistProtectedRoute";
import Services from "./pages/Services/Services";

const router = createBrowserRouter([
  {
    element: <CheckUserExistProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Root />,
        children: [{ index: true, element: <Home /> }],
      },
    ],
  },

  { path: "/register", element: <Register /> },
  {
    path: "login",
    element: <Login />,
  },

  // user Routers
  {
    element: <ProtectRoute />,
    children: [
      {
        path: "/user-home",
        element: <UserHome />,
        children: [
          { index: true, element: <UserPage /> },
          { path: "servicers-list", element: <ServicersList /> },
          {
            path: "servicers-list/:id",
            element: <ServicerProfile />,
          },
          { path: "user-profile", element: <UserProfile /> },
          { path: "message-info", element: <MessageInfo /> },
          { path: "message-info/:id", element: <Conversation /> },
          { path: "services", element: <Services /> },
          { path: "faq", element: <Faq /> },
        ],
      },
    ],
  },
  // Servicer Routers
  {
    element: <ProtectRoute />,
    children: [
      {
        path: "/servicer-home",
        element: <Servicer />,
        children: [
          // { index: true, element: <ServicerPage /> },
          { index: true, element: <SerProfile /> },
          { path: "message-info", element: <MessageInfo /> },
          { path: "message-info/:id", element: <Conversation /> },
          { path: "edit-gig", element: <EditGig /> },
          { path: "faq", element: <Faq /> },
        ],
      },
    ],
  },
  { path: "gig", element: <Gig /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
