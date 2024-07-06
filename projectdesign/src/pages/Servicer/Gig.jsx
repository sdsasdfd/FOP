import React, { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Gig = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState("");
  const [subCat, setSubCat] = useState([]);

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const checkServicer = () => {
    if (!currentUser) {
      return navigate("/");
    }
  };

  useEffect(() => {
    checkServicer();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubCatChange = (e, index) => {
    const newValue = e.target.value;
    setSubCat((prevSubCat) => {
      const updatedSubCat = [...prevSubCat];
      updatedSubCat[index] = newValue;
      return updatedSubCat;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/gig/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: desc,
          price: +price,
          coverImg: image,
          subCategory: subCat,
        }),
      });

      if (!res.ok) {
        // If the response is not ok, throw an error with the status text
        return console.log(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log(data.message);
      }
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" container my-4 mx-auto px-8 sm:px-12"
    >
      <div className="mt-8 gap-12 flex md:flex-row flex-col sm:justify-between ">
        <div className="flex-1">
          <div className="flex flex-col">
            <label className="mb-3 font-medium text-xl">Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              placeholder="eg. I will do something I am really good at... "
            />
          </div>

          <div className="flex flex-col my-7">
            <label className="mb-3 font-medium text-xl">Cover Image</label>
            <input
              type="file"
              className=" py-2 px-2 focus:outline-none"
              hidden
              accept="image/*"
              onChange={(e) => handleImage(e)}
              ref={imageRef}
            />
            <div className=" relative">
              <img
                src={image ? image : "/img/Dummyimages.png"}
                className="w-full object-cover  h-[200px] border-2"
                alt=""
              />
              <button type="button">
                <FaRegEdit
                  onClick={() => imageRef.current.click()}
                  className=" absolute top-[-5px] text-2xl text-gray-600  right-[-10px]"
                />
              </button>
            </div>
            <div className="flex flex-col my-4">
              <label className="mb-3 font-medium text-xl" htmlFor="">
                Price
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                min={1000}
                placeholder="Price eg. 1200Rs per day"
                type="number"
                className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col">
            <label className="mb-3 font-medium text-xl" htmlFor="">
              Description
            </label>
            <textarea
              rows="4"
              cols="50"
              type="text"
              placeholder="Brief description to introduce your service to customer"
              className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="flex gap-4 flex-col my-6">
            <label className="mb-3 font-medium text-xl ">Sub Categories</label>
            <input
              type="text"
              className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              placeholder="eg. Cleaning Office "
              onChange={(e) => handleSubCatChange(e, 0)}
              value={subCat[0] || ""}
            />
            <input
              type="text"
              className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              placeholder="eg. Cleaning Garden "
              onChange={(e) => handleSubCatChange(e, 1)}
              value={subCat[1] || ""}
            />
            <input
              type="text"
              className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              placeholder="eg. Cleaning Garden "
              onChange={(e) => handleSubCatChange(e, 2)}
              value={subCat[2] || ""}
            />
            <input
              type="text"
              className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              placeholder="eg. Cleaning Garden "
              onChange={(e) => handleSubCatChange(e, 3)}
              value={subCat[3] || ""}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className=" bg-blue-500 text-white w-[200px] py-2 rounded-md font-medium text-lg"
      >
        Create
      </button>
    </form>
  );
};

export default Gig;
