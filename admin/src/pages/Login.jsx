import React, { useState } from "react";
import CircleEffect from "../components/Circle";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        toast.error(data.message);
      }

      if (!data.isAdmin) {
        return toast.error("Only admin can access it");
      }
      if (res.ok) {
        dispatch(loginSuccess(data));
        toast.success("Login...");
        navigate("/");
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    // <div className="bg-slate-50 w-full flex justify-center items-center h-screen ">
    //   <div className="flex justify-between w-1/2 bg-white shadow-lg rounded-md items-center ">
    //     <div className="flex-1 bg-white p-4 w-[350px] my-4 flex  flex-col  rounded-md ">
    //       <h1 className=" text-3xl font-semibold mb-3">Welcome back</h1>
    //       <form onSubmit={handleSubmit}>
    //         <div className="flex flex-col my-2">
    //           <label className="mb-1 font-semibold text-lg">Email</label>
    //           <input
    //             className="focus:outline-none border-2 p-2 rounded-md"
    //             type="email"
    //             placeholder="Enter your Email..."
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //         </div>
    //         <div className="flex flex-col my-3">
    //           <label className="mb-1 font-semibold text-lg">Password</label>
    //           <input
    //             className="focus:outline-none border-2 p-2 rounded-md"
    //             type="password"
    //             placeholder="Enter passwordl..."
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //           <button
    //             type="submit"
    //             className="bg-blue-500 text-white rounded-md py-2 mt-4 "
    //           >
    //             Login
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //     <div className="flex-1">
    //       <CircleEffect />
    //     </div>
    //   </div>
    // </div>
    <div className="h-full flex items-center justify-center">
      <div className=" p-6 w-[400px] md:w-[500px] ">
        <span className="mb-5 mt-8 flex items-center justify-center">
          <img src={logo} width={80} height={80} alt="" />
        </span>
        <h3 className="text-2xl mb-10 font-bold text-center ">
          Login to your account
        </h3>
        <form onSubmit={submitHandler}>
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
        </form>
      </div>
    </div>
  );
};

export default Login;
