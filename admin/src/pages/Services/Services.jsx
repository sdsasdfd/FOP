import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/service/all-services");
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }

        setServices(data.categories);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchServices();
  }, []);

  const handleDeleteService = async (id) => {
    try {
      const res = await fetch(`/api/service/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
      }
      setServices(services.filter((service) => service._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="w-full p-5  ">
        <div className="p-4 bg-white flex-1 shadow-md rounded-md mb-4 ">
          <div className="flex justify-between items-center">
            <h1 className=" text-3xl font-semibold mb-3">Services</h1>
            <Link to="new-category">
              <IoMdAddCircle className="text-blue-600 text-3xl cursor-pointer" />
            </Link>
          </div>
        </div>
        {services.length === 0 ? (
          <h1>No Services available</h1>
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
                {services.map((service) => (
                  <tr
                    key={service._id}
                    className=" border-b hover:bg-gray-100 whitespace-nowrap"
                  >
                    <td className="w-32 p-3  whitespace-nowrap">
                      {service._id}
                    </td>
                    <td className="w-36 p-3  ">
                      <img
                        className="w-20 h-20 object-cover  whitespace-nowrap rounded-md"
                        src={service.image}
                        alt=""
                      />
                    </td>
                    <td className=" p-3">{service.title}</td>
                    <td className=" p-3">{service.description}</td>
                    <td className=" p-3 items-center gap-4 ">
                      <Link to={`/services/${service._id}`}>
                        <button className="text-xl text-blue-600 mr-4">
                          <FiEdit />
                        </button>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteService(service._id)}
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

export default Services;
