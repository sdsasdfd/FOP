import React, { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const EditGig = () => {
  const { currentUser } = useSelector((state) => state.user);

  const imageRef = useRef(null);

  const [dataDetails, setDataDetails] = useState({
    title: "",
    coverImg: "",
    price: 0,
    description: "",
    subCategory: [],
  });

  const handleSubCatChange = (e, index) => {
    const newValue = e.target.value;
    setDataDetails((prevDetails) => ({
      ...prevDetails,
      subCategory: prevDetails.subCategory.map((value, i) =>
        i === index ? newValue : value
      ),
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setDataDetails((prevDataDetails) => ({
        ...prevDataDetails,
        coverImg: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/gig/update-gig`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataDetails),
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await fetch(`/api/gig/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        } else {
          setDataDetails((prevDetails) => ({
            ...prevDetails,
            ...data,
            subCategory: data.subCategory || ["", "", "", ""],
          }));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchGig();
  }, [currentUser._id]);

  const addSubCategory = () => {
    if (dataDetails.subCategory.length < 4) {
      setDataDetails((prevDetails) => ({
        ...prevDetails,
        subCategory: [...prevDetails.subCategory, ""], // Add an empty string to indicate a new subcategory
      }));
    }
  };

  const removeSubCategory = (indexToRemove) => {
    setDataDetails((prevDetails) => ({
      ...prevDetails,
      subCategory: prevDetails.subCategory.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" container my-4 mx-auto px-8 sm:px-12"
    >
      <div className="mt-8 gap-12 flex lg:flex-row flex-col sm:justify-between ">
        <div className="flex-1">
          <div className="flex flex-col">
            <label className="mb-3 font-medium text-xl">Title</label>
            <input
              onChange={(e) =>
                setDataDetails({ ...dataDetails, title: e.target.value })
              }
              value={dataDetails.title || ""}
              type="text"
              className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
            />
          </div>

          <div className="flex flex-col my-7">
            <label className="mb-3 font-medium text-xl">Cover Image</label>
            <input
              type="file"
              className=" py-2 px-2 focus:outline-none"
              hidden
              accept="image/*"
              onChange={handleImage}
              ref={imageRef}
            />
            <div className=" relative">
              {dataDetails.coverImg && (
                <img
                  src={dataDetails.coverImg}
                  className="w-full object-cover  h-[200px] border-2"
                  alt="Cover"
                />
              )}
              <button type="button">
                <FaRegEdit
                  onClick={() => imageRef.current.click()}
                  className=" absolute top-[-5px] text-2xl text-gray-600  right-[-10px]"
                />
              </button>
            </div>
            <div className="flex flex-col my-4">
              <label className="mb-3 font-medium text-xl">Price</label>
              <input
                onChange={(e) =>
                  setDataDetails({ ...dataDetails, price: e.target.value })
                }
                value={dataDetails.price || 0}
                min={1000}
                type="number"
                className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col">
            <label className="mb-3 font-medium text-xl">Description</label>
            <textarea
              rows="4"
              cols="50"
              type="text"
              value={dataDetails.description || ""}
              className="border-2 border-gray-400 py-2 px-2 focus:outline-none"
              onChange={(e) =>
                setDataDetails({ ...dataDetails, description: e.target.value })
              }
            />
          </div>
          <div className="flex gap-4 flex-col my-6">
            <label className="mb-3 font-medium text-xl">Sub Categories</label>
            {dataDetails.subCategory.map((subCat, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  className="border-2 border-gray-400 w-full py-2 px-2 focus:outline-none"
                  placeholder={`eg. Cleaning ${index + 1}`}
                  onChange={(e) => handleSubCatChange(e, index)}
                  value={subCat || ""}
                />
                <button
                  type="button"
                  onClick={() => removeSubCategory(index)}
                  className="absolute top-0 right-0 m-2"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSubCategory()}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Add Sub Category
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className=" bg-blue-500 text-white w-[200px] py-2 rounded-md font-medium text-lg"
      >
        Update
      </button>
    </form>
  );
};

export default EditGig;
