import React from "react";

const TestEdit = () => {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>

            <button
              type="submit"
              className=" my-2 bg-blue-500 py-2 text-white rounded-md"
            >
              close
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default TestEdit;

// import React, { useRef, useState } from "react";
// import profileImg from "/img/profileImg.webp";
// import { MdEdit } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";
// import { FiEdit } from "react-icons/fi";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import {
//   updateUserFailure,
//   updateUserStart,
//   updateUserSuccess,
// } from "../../store/userSlice";

// const EditProfile = ({ setToggleModal }) => {
//   const { currentUser, loading } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const [img, setImg] = useState(currentUser.image);
//   const imgRef = useRef(null);
//   const handleImgChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImg(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const [username, setUsername] = useState(currentUser.username);
//   const [email, setEmail] = useState(currentUser.email);
//   const [location, setLocation] = useState(currentUser.location);

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch("/api/user/update-user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           image: img,
//           username,
//           email,
//           location,
//         }),
//       });

//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return console.log(data.message);
//       }
//       dispatch(updateUserSuccess(data));
//       setToggleModal(false);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//       console.log(error.message);
//     }
//   };

//   return (
//     <>
//       <div className=" rounded-lg shadow-md fixed py-6 bg-slate-100 px-4 h-[400px] top-[17%] right-[50%] translate-x-[50%] z-20 w-[400px] my-12  flex flex-col ">
//         <div className="absolute top-[-10px] cursor-pointer right-[-15px]">
//           <span onClick={() => setToggleModal(false)} className="  ">
//             <IoCloseCircleOutline className="text-4xl text-slate-600" />
//           </span>
//         </div>

//         <form onSubmit={handleUpdateProfile} className="flex flex-col">
//           <div className="flex  justify-center items-center">
//             <div className=" relative">
//               <img
//                 src={img || profileImg}
//                 className=" w-40 h-40 relative rounded-full  object-cover"
//                 alt=""
//               />
//               <input
//                 hidden
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleImgChange(e)}
//                 ref={imgRef}
//               />
//               <div className="absolute top-2 right-2 rounded-full p-2 bg-gray-500 bg-opacity-75 cursor-pointer transition duration-200">
//                 <MdEdit
//                   className="w-5 h-5 text-white"
//                   onClick={() => imgRef.current.click()}
//                 />
//               </div>
//             </div>
//           </div>
//           <input
//             className="border-2 my-1 rounded-md p-2  "
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             className="border-2  my-1 rounded-md p-2  "
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <select
//             className="border-2  my-1 rounded-md p-2  "
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           >
//             <option name="" value="jhelum" id="">
//               jhelum
//             </option>
//             <option name="" value="dina" id="">
//               dina
//             </option>
//           </select>
//           <button
//             type="submit"
//             onClick={handleUpdateProfile}
//             className=" my-2 bg-blue-500 py-2 text-white rounded-md"
//           >
//             {loading ? "Updating" : "Update"}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default EditProfile;
