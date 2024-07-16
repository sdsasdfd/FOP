import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const Category = () => {
  const [showModal, seShowModal] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("/api/category/all-category");
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }

        setCategories(data.categories);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategory();
  }, []);

  const handleDeleteCategory = async (id) => {
    try {
      const res = await fetch(`/api/category/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
      }
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="w-full p-5  ">
        <div className="p-4 bg-white flex-1 shadow-md rounded-md mb-4 ">
          <div className="flex justify-between items-center">
            <h1 className=" text-3xl font-semibold mb-3">Category</h1>
            <Link to="new-category">
              <IoMdAddCircle className="text-blue-600 text-3xl cursor-pointer" />
            </Link>
          </div>
        </div>
        {categories.length === 0 ? (
          <h1>No Category available</h1>
        ) : (
          <div className=" bg-white shadow-lg  rounded-md  overflow-auto">
            <table className="  w-full   ">
              <thead className="border-b">
                <tr>
                  <td className="font-semibold p-3 whitespace-nowrap ">ID</td>
                  <td className="font-semibold p-3 whitespace-nowrap">Image</td>
                  <td className="font-semibold p-3">Title</td>
                  <td className="font-semibold p-3">Desc</td>
                  <td className="font-semibold p-3">Action</td>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className=" border-b hover:bg-gray-100 whitespace-nowrap"
                  >
                    <td className="w-32 p-3  whitespace-nowrap">
                      {category._id}
                    </td>
                    <td className="w-36 p-3  ">
                      <img
                        className="w-20 h-20 object-cover  whitespace-nowrap rounded-md"
                        src={category.image}
                        alt=""
                      />
                    </td>
                    <td className=" p-3">{category.title}</td>
                    <td className=" p-3">{category.description}</td>
                    <td className=" p-3 items-center gap-4 ">
                      <Link to={`/category/${category._id}`}>
                        <button className="text-xl text-blue-600 mr-4">
                          <FiEdit />
                        </button>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(category._id)}
                        className=" text-red-500 text-xl"
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
