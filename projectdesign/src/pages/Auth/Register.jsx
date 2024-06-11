import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
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
          location,
          category: category.toLowerCase(),
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return console.log(data.message);
      }

      navigate("/login");
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await fetch("/api/category/names");
        const data = await res.json();

        setCategoryNames(data);
        // console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNames();
  }, []);

  // console.log(categoryNames);
  return (
    <>
      <div className="container mr-auto">
        <Link to="/">
          <img src={logo} width="64px" alt="" />
        </Link>
      </div>
      <div className=" flex items-center h-full justify-center">
        <div className="  p-6 shadow-lg rounded-2xl w-[400px] mx-2">
          <h3 className="text-[32px] font-bold text-center ">Register</h3>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="">
                Username
              </label>

              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="border outline-none p-1 my-1 rounded-lg"
                type="text"
                placeholder="Enter Username"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left font-semibold " htmlFor="">
                Email
              </label>

              <input
                className="border outline-none p-1 my-1 rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Enter email"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="">
                Password
              </label>

              <input
                className="border outline-none p-1 my-1 rounded-lg"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter password"
              />
            </div>
            <div className="flex flex-col mt-2">
              <select
                className="border my-1 rounded-lg outline-none p-1 font-semibold"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              >
                <option value="">Select your Location</option>
                {}
                <option value="jhelum">Jhelum</option>
                <option value="Dina">Dina</option>
              </select>
            </div>
            <div className="mt-1 flex gap-4">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={userRoleHandler}
                  checked={roles === "user"}
                />
                <label className="font-semibold" htmlFor="">
                  User
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  onChange={servicerRoleHandler}
                  checked={roles === "servicer"}
                />
                <label className="font-semibold" htmlFor="">
                  Servicer
                </label>
              </div>
            </div>
            {isServicer ? (
              <div className="flex flex-col">
                <select
                  className="border my-1 rounded-lg outline-none p-1 font-semibold"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
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
              className="bg-emerald-700 mt-6 py-2 text-white rounded-full w-[350px]  mb-3"
            >
              Sign up
            </button>
          </form>
          <p className="text-lg font-semibold">
            Already have an account?{" "}
            <Link to="/login" className=" font-normal ">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
