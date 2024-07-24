import React from "react";
import logo from "../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          isAdmin: true,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        toast.error(data.message);
        return console.log(data.message);
      }

      navigate("/login");

      toast.success("Registration completed!");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className=" flex items-center h-full justify-center">
      <div className="  p-6  w-[400px] md:w-[500px] ">
        <span className="mb-5 mt-8 flex items-center justify-center">
          <img src={logo} width={80} height={80} alt="" />
        </span>
        <h3 className="text-2xl mb-10 font-bold text-center ">
          Register Your Account
        </h3>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col">
            <label className="text-left font-normal " htmlFor="">
              Username
            </label>

            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="border focus:border-2 focus:border-blue-600 outline-none py-2 px-3 mt-2 rounded-lg"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="text-left  " htmlFor="">
              Email
            </label>

            <input
              className="border focus:border-2 focus:border-blue-600 outline-none py-2 px-3 mt-2 rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="" htmlFor="">
              Password
            </label>

            <input
              className="border focus:border-2 focus:border-blue-600 outline-none py-2 px-3 mt-2 rounded-lg"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 mt-6 py-2 text-white rounded-lg w-[360px] md:w-[460px]  mb-3"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
