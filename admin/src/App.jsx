import React from "react";

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Users from "./pages/Users";
import Servicers from "./pages/Servicers";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import NewCategory from "./pages/NewCategory";
import EditCategory from "./pages/EditCategory";
import Login from "./pages/Login";
import ProtectRoute from "./components/ProtectRoute";
import Testing from "./pages/Testing";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ProtectRoute>
//         <Root />
//       </ProtectRoute>
//     ),
//     children: [
//       { index: true, element: <Home /> },
//       { path: "users", element: <Users /> },
//       { path: "servicers", element: <Servicers /> },
//       { path: "category", element: <Category /> },
//       { path: "profile", element: <Profile /> },
//       { path: "/category/new-category", element: <NewCategory /> },
//       { path: "/category/:id", element: <EditCategory /> },
//     ],
//   },
//   { path: "/login", element: <Login /> },
// ]);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="category" element={<Category />} />
            <Route path="users" element={<Users />} />
            <Route path="servicers" element={<Servicers />} />
            <Route path="profile" element={<Profile />} />
            <Route path="category/:id" element={<EditCategory />} />
            <Route path="category/new-category" element={<NewCategory />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
  //  <RouterProvider router={router} />
};

export default App;
