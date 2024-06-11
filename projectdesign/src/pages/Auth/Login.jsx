import React, { useState } from "react";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
// import { customFetch } from "../../utils/customFetch";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../store/userSlice";

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
        return dispatch(loginFailure(data.message));
      }
      if (data.roles === "user") {
        dispatch(loginSuccess(data));
        return navigate("/user-home");
      } else {
        dispatch(loginSuccess(data));
        return navigate("/servicer-home");
      }
    } catch (error) {
      return dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className=" p-6 w-[400px] md:w-[500px] shadow-lg rounded-2xl">
        <h3 className="text-[32px] font-bold text-center ">Login</h3>
        <Form onSubmit={submitHandler}>
          <div className="flex flex-col">
            <label className="text-left font-semibold " htmlFor="">
              Email
            </label>

            <input
              required
              name="email"
              className="border outline-none py-1 px-1 mt-3 rounded-lg"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="">
              Password
            </label>

            <input
              required
              name="password"
              className="border outline-none py-1 px-1 mt-2 rounded-lg"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-700 mt-6 py-2 text-white rounded-full w-[360px] md:w-[460px] mb-3"
          >
            Login
          </button>
        </Form>
        <p className="text-lg font-semibold">
          Do not have an account?{" "}
          <Link to="/register" className=" font-normal ">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
