import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGeneralComplain = async () => {
      try {
        const res = await fetch("/api/testimonial/get-all-testimonials");

        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          console.log(data.message);
          return;
        }
        setTestimonials(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    fetchGeneralComplain();
  }, []);
  return (
    <>
      {testimonials.length === 0 ? (
        <h1>No Testimonials available</h1>
      ) : (
        <div className=" bg-white shadow-lg  rounded-md  overflow-auto">
          <table className="  w-full   ">
            <thead className="border-b">
              <tr>
                <td className="font-semibold p-3 whitespace-nowrap ">No.</td>
                <td className="font-semibold p-3">Username</td>
                <td className="font-semibold p-3 whitespace-nowrap ">
                  Complain
                </td>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial, index) => {
                return (
                  <tr
                    key={testimonial._id}
                    className=" border-b hover:bg-gray-100 whitespace-nowrap"
                  >
                    <td className=" p-3  whitespace-nowrap"> {index + 1} </td>
                    <td className=" p-3  ">{testimonial.user.username}</td>
                    <td className=" p-3 ">{testimonial.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Testimonials;
