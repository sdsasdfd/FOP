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
import Services from "./pages/Services/Services";
import Profile from "./pages/Profile";
import NewService from "./pages/Services/NewService";
import EditService from "./pages/Services/EditService";
import Login from "./pages/Login";
import ProtectRoute from "./components/ProtectRoute";
import Faq from "./pages/FAQ/Faq";
import CreateFaq from "./pages/FAQ/CreateFaq";
import EditFaq from "./pages/FAQ/EditFaq";
import CreateFaqForServicer from "./pages/FAQ/FAQForServicer/CreateFaqForServicer";
import CreateFaqForUser from "./pages/FAQ/FAQForUser/CreateFaqForUser";
import EditFaqForServicer from "./pages/FAQ/FAQForServicer/EditFaqForServicer";
import EditFaqForUser from "./pages/FAQ/FAQForUser/EditFaqForUser";
import Complain from "./pages/Complain/Complain";
import SendResponse from "./pages/Complain/SendResponse";
import Testimonials from "./pages/Testimonials";
import Register from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="users" element={<Users />} />
            <Route path="servicers" element={<Servicers />} />
            <Route path="profile" element={<Profile />} />
            <Route path="services/:id" element={<EditService />} />
            <Route path="services/new-category" element={<NewService />} />
            <Route path="faq" element={<Faq />} />
            <Route path="faq/new/servicer" element={<CreateFaqForServicer />} />
            <Route path="faq/new/user" element={<CreateFaqForUser />} />

            <Route path="faq/servicer/:id" element={<EditFaqForServicer />} />
            <Route path="faq/user/:id" element={<EditFaqForUser />} />
            <Route path="complain" element={<Complain />} />
            <Route path="complain/:id" element={<SendResponse />} />
            <Route path="testimonial" element={<Testimonials />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
