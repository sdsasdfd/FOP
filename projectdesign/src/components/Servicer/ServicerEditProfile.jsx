import React, { useRef, useState } from "react";
import profileImg from "/img/profileImg.webp";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";

const EditProfile = ({ setToggleModal }) => {
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

  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(currentUser.category);

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch("/api/user/update-servicer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: img,
          username,
          email,
          category,
          location,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className=" rounded-lg shadow-md fixed py-6 bg-slate-100 px-4 h-[400px] top-[17%] right-[50%] translate-x-[50%] z-20 w-[400px] my-12  flex flex-col ">
        <div className="absolute top-[-10px] cursor-pointer right-[-15px]">
          <span onClick={() => setToggleModal(false)} className="  ">
            <IoCloseCircleOutline className="text-4xl text-slate-600" />
          </span>
        </div>
        <div className="flex  justify-center items-center">
          <div className=" relative">
            <img
              src={img || profileImg}
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
          <input
            className="border-2 my-1 rounded-md p-2  "
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border-2  my-1 rounded-md p-2  "
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-2  my-1 rounded-md p-2  "
            type="email"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <select
            className="border-2  my-1 rounded-md p-2  "
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option
              name=""
              defaultChecked={currentUser.location === "jhelum"}
              id=""
            >
              jhelum
            </option>
            <option
              name=""
              defaultChecked={currentUser.location === "dina"}
              id=""
            >
              dina
            </option>
          </select>
          <button
            onClick={handleUpdateProfile}
            className=" my-2 bg-blue-500 py-2 text-white rounded-md"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
