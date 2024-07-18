import React, { useState } from "react";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../store/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        toast.error(data.message);
        return dispatch(loginFailure(data.message));
      }
      if (data.roles === "user") {
        toast.success("Logged In!");
        dispatch(loginSuccess(data));
        return navigate("/user-home");
      } else {
        toast.success("Logged In!");
        dispatch(loginSuccess(data));
        return navigate("/servicer-home");
      }
    } catch (error) {
      toast.error(data.message);
      return dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className=" p-6 w-[400px] md:w-[500px] ">
        <Link to={"/"} className="mb-5 mt-8 flex items-center justify-center">
          <img src={logo} width={80} height={80} alt="" />
        </Link>
        <h3 className="text-2xl mb-10 font-bold text-center ">
          Login to your account
        </h3>
        <Form onSubmit={submitHandler}>
          <div className="flex flex-col">
            <label className="text-left font-normal " htmlFor="">
              Email Address
            </label>

            <input
              required
              name="email"
              className="border focus:border-2 focus:border-blue-600 outline-none py-2 px-3 mt-2 rounded-lg"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="font-sm" htmlFor="">
              Password
            </label>

            <input
              required
              name="password"
              className="border focus:border-2 focus:border-blue-600 outline-none py-2 px-3 mt-2 rounded-lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 mt-6 py-2 text-white rounded-lg font-medium w-[360px] md:w-[460px] mb-3"
          >
            Login
          </button>
        </Form>
        <p className="text-lg font-semibold mt-2">
          Do not have an account?{" "}
          <Link to="/register" className=" font-normal text-blue-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
