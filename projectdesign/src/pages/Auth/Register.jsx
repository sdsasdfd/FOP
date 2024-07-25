import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
const Register = () => {
  const navigate = useNavigate();

  const [isServicer, setIsServicer] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState("");
  const [category, setCategory] = useState("");
  const [categoryNames, setCategoryNames] = useState([]);

  const servicerRoleHandler = () => {
    setIsServicer(true);
    setRoles("servicer");
  };

  const userRoleHandler = () => {
    setIsServicer(false);
    setRoles("user");
  };

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
          roles,
          location: location.toLowerCase(),
          category: category.toLowerCase(),
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        toast.error(data.message);
        return console.log(data.message);
      }

      if (data.roles === "servicer") {
        return navigate("/gig");
      } else {
        navigate("/login");
      }
      toast.success("Registration completed!");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await fetch("/api/service/names");
        const data = await res.json();

        setCategoryNames(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNames();
  }, []);

  return (
    <>
      <div className=" flex items-center h-full justify-center">
        <div className="  p-6  w-[400px] md:w-[500px] ">
          <Link to={"/"} className="mb-5 mt-3 flex items-center justify-center">
            <img src={logo} width={80} height={80} alt="" />
          </Link>
          <h3 className="text-2xl mb-6 font-bold text-center ">
            Register you account
          </h3>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col">
              <label className="" htmlFor="">
                Username
              </label>

              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="border focus:border-2 focus:border-blue-600 outline-none py-2 px-3 mt-2 rounded-lg"
                type="text"
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
            <div className="flex flex-col mt-2">
              <select
                className="border focus:border-2 focus:border-blue-600 outline-none py-2 px-3 mt-2 rounded-lg"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              >
                <option value="">Select your Location</option>
                {}
                <option value="jhelum">Jhelum</option>
                <option value="Dina">Dina</option>
              </select>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={userRoleHandler}
                  checked={roles === "user"}
                />
                <label className="label" htmlFor="">
                  User
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={servicerRoleHandler}
                  checked={roles === "servicer"}
                />
                <label className="label" htmlFor="">
                  Servicer
                </label>
              </div>
            </div>
            {isServicer ? (
              <div className="flex flex-col mt-2">
                <select
                  className="border focus:border-2 focus:border-blue-600 outline-none py-2 px-3 mt-2 rounded-lg"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  required
                >
                  <option value="">Select your Category</option>
                  {categoryNames.map((categoryName, index) => (
                    <option key={index} value={categoryName}>
                      {categoryName}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="bg-blue-600 mt-6 py-2 text-white rounded-lg w-[360px] md:w-[460px]  mb-3"
            >
              Sign up
            </button>
          </form>
          <p className="text-lg font-semibold">
            Already have an account?{" "}
            <Link to="/login" className=" font-normal text-blue-600 ">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
