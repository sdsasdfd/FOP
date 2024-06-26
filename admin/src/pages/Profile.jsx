import React, { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [img, setImg] = useState(null);
  const imgRef = useRef(null);
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [email, setEmail] = useState(currentUser.email);
  const [username, setUsername] = useState(currentUser.username);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/update-admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          image: img,
        }),
      });
      const data = await res.json();

      console.log("fetched data", data);
      if (data.success === false) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center  min-h-[500px] bg-slate-50 ">
      <div className=" bg-white p-4 w-[350px] my-4 flex shadow-md flex-col border rounded-md">
        <h1 className=" text-3xl font-semibold mb-3">Profile</h1>
        <div className="flex  justify-center items-center">
          <div className=" relative">
            <img
              src={img}
              className=" w-40 h-40 relative rounded-full  object-cover"
              alt=""
            />
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => handleImgChange(e)}
              ref={imgRef}
            />
            <div className="absolute top-2 right-2 rounded-full p-2 bg-gray-500 bg-opacity-75 cursor-pointer transition duration-200">
              <MdEdit
                className="w-5 h-5 text-white"
                onClick={() => imgRef.current.click()}
              />
            </div>
          </div>
        </div>
        <form className="flex flex-col">
          <div className="flex flex-col my-2">
            <label className="mb-1 font-semibold text-lg">Username</label>
            <input
              className="focus:outline-none border-2 p-2 rounded-md"
              type="text"
              placeholder="Name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-2">
            <label className="mb-1 font-semibold text-lg">Email</label>
            <input
              className="focus:outline-none border-2 p-2 rounded-md"
              type="text"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 mt-2 "
            onClick={handleUpdateProfile}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
