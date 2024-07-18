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
import Category from "./pages/Category/Category";
import Profile from "./pages/Profile";
import NewCategory from "./pages/Category/NewCategory";
import EditCategory from "./pages/Category/EditCategory";
import Login from "./pages/Login";
import ProtectRoute from "./components/ProtectRoute";
import Testing from "./pages/Testing";
import Test from "./pages/Test";
import Faq from "./pages/FAQ/Faq";
import CreateFaq from "./pages/FAQ/CreateFaq";
import EditFaq from "./pages/FAQ/EditFaq";
import CreateFaqForServicer from "./pages/FAQ/FAQForServicer/CreateFaqForServicer";
import CreateFaqForUser from "./pages/FAQ/FAQForUser/CreateFaqForUser";
import EditFaqForServicer from "./pages/FAQ/FAQForServicer/EditFaqForServicer";
import EditFaqForUser from "./pages/FAQ/FAQForUser/EditFaqForUser";
import Complain from "./pages/Complain/Complain";
import SendResponse from "./pages/Complain/SendResponse";

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
            <Route path="faq" element={<Faq />} />
            <Route path="faq/new/servicer" element={<CreateFaqForServicer />} />
            <Route path="faq/new/user" element={<CreateFaqForUser />} />
            {/* <Route path="faq/new" element={<CreateFaq />} /> */}
            {/* <Route path="faq/:id" element={<EditFaq />} /> */}
            <Route path="faq/servicer/:id" element={<EditFaqForServicer />} />
            <Route path="faq/user/:id" element={<EditFaqForUser />} />
            <Route path="complain" element={<Complain />} />
            <Route path="complain/:id" element={<SendResponse />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
  //  <RouterProvider router={router} />
};

export default App;
