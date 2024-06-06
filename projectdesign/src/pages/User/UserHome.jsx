import React, { createContext, useContext } from "react";
import {
  Navigate,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { customFetch } from "../../utils/customFetch";
import Navbar from "../../components/Landing/Navbar";
import NavbarPerson from "../../components/NavbarPerson";

import UserPage from "./UserPage";

const UserHome = () => {
  return (
    <>
      <NavbarPerson />
      <Outlet />
    </>
  );
};

export default UserHome;
