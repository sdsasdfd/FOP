import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditFaqForServicer = () => {
  const [faqData, setFaqData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await fetch(`/api/faq/${id}`);
        const data = await res.json();

        setFaqData(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFaq();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/faq/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...faqData }),
      });
      const data = await res.json();
      if (data.success === false) {
        return console.log(data.message);
      } else {
        toast.success("Update Successfully!");
        navigate("/faq");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setFaqData({ ...faqData, [e.target.id]: e.target.value });
  };
  return (
    <div className="flex justify-center  min-h-screen bg-slate-50 ">
      <div className=" bg-white p-4 w-[350px] h-[350px] my-4 flex shadow-md flex-col border rounded-md">
        <h1 className=" text-3xl font-semibold mb-3">Edit FAQ For Servicer</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col my-2">
            <div className="flex flex-col my-2">
              <label className="mb-1 font-semibold text-lg">Question</label>
              <input
                className="focus:outline-none border-2 p-2 rounded-md"
                type="text"
                placeholder="Question..."
                defaultValue={faqData.question}
                id="question"
                onChange={handleChange}
              />
            </div>

            <label className="mb-1 font-semibold text-lg">Answer</label>
            <textarea
              className="focus:outline-none border-2 p-2 rounded-md"
              type="text"
              placeholder="Answer..."
              defaultValue={faqData.answer}
              id="answer"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 mt-2 "
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFaqForServicer;
