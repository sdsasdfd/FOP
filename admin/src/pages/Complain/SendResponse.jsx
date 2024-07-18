import React, { useRef, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const SendResponse = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/complain/res/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complainDesc: description, subject }),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
      }
      console.log(data);
      setLoading(false);
      navigate("/complain");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center  min-h-[400px] bg-slate-50 ">
      <div className=" bg-white p-4 w-[350px] my-4 flex shadow-md flex-col border rounded-md">
        <h1 className=" text-3xl font-semibold mb-3">Response </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col my-2">
            <label className="mb-1 font-semibold text-lg">Subject</label>
            <input
              className="focus:outline-none border-2 p-2 rounded-md"
              type="text"
              placeholder="Write..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className=" flex flex-col my-2">
            <label className="mb-1 font-semibold text-lg">Description</label>
            <textarea
              className="focus:outline-none border-2 p-2 rounded-md"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 mt-2 "
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendResponse;
