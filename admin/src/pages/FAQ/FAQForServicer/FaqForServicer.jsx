import React from "react";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
const FaqForServicer = ({ dummyFaq }) => {
  const [faqDetails, setFaqDetails] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await fetch("/api/faq/servicer");

        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          console.log(data.message);
          return;
        }
        setFaqDetails(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    fetchFaq();
  }, []);

  const handleDeleteFaq = async (id) => {
    try {
      const res = await fetch(`/api/faq/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
      }
      setFaqDetails(faqDetails.filter((faq) => faq._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {faqDetails.length === 0 ? (
        <h1>No FAQ available</h1>
      ) : (
        <div className=" bg-white shadow-lg  rounded-md  overflow-auto">
          <table className="  w-full   ">
            <thead className="border-b">
              <tr>
                <td className="font-semibold p-3 whitespace-nowrap ">No.</td>
                <td className="font-semibold p-3">Questions</td>
                <td className="font-semibold p-3 whitespace-nowrap">Answers</td>

                <td className="font-semibold p-3">Action</td>
              </tr>
            </thead>
            <tbody>
              {faqDetails.map((faq, index) => {
                return (
                  <tr
                    key={faq._id}
                    className=" border-b hover:bg-gray-100 whitespace-nowrap"
                  >
                    <td className=" p-3  whitespace-nowrap"> {index + 1} </td>
                    <td className=" p-3  ">
                      {faq.question.substring(0, 15)}...
                    </td>
                    <td className=" p-3 ">{faq.answer.substring(0, 20)}...</td>

                    <td className=" p-3 items-center gap-4 ">
                      <Link to={`servicer/${faq._id}`}>
                        <button className="text-xl text-blue-600 mr-4">
                          <FiEdit />
                        </button>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(faq._id)}
                        className=" text-red-500 text-xl"
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
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

export default FaqForServicer;
