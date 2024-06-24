import React, { createContext, useContext } from "react";
import {
  Navigate,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { customFetch } from "../../utils/customFetch";

import NavbarPerson from "../../components/NavbarPerson";

const UserHome = () => {
  return (
    <>
      <NavbarPerson />
      <Outlet />
    </>
  );
};

export default UserHome;
