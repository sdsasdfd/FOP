import React, { useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

const Gig = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);

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
  return (
    <div className=" container my-4 mx-auto px-8 sm:px-12">
      <div className="mt-8 gap-12 flex md:flex-row flex-col sm:justify-between ">
        <div className="flex-1">
          <div className="flex flex-col">
            <label className="mb-3 font-medium text-xl">Title</label>
            <input
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
              <button>
                <FaRegEdit
                  type="button"
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
            />
          </div>
          <div className="flex gap-4 flex-col my-6">
            <label className="mb-3 font-medium text-xl ">Sub Categories</label>
            <input
              type="text"
              className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              placeholder="eg. Cleaning Office "
            />
            <input
              type="text"
              className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              placeholder="eg. Cleaning Garden "
            />
            <input
              type="text"
              className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              placeholder="eg. Cleaning Garden "
            />
            <input
              type="text"
              className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              placeholder="eg. Cleaning Garden "
            />
          </div>
        </div>
      </div>
      <button className=" bg-blue-500 text-white w-[200px] py-2 rounded-md font-medium text-lg">
        Create
      </button>
    </div>
  );
};

export default Gig;
