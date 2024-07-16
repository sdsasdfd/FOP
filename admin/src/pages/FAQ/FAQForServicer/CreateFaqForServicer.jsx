import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CreateFaqForServicer = () => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/faq/new/servicer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer, question }),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        console.log(data.message);
        return;
      }
      setLoading(false);
      toast.success("created Successfully");
      navigate("/faq");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  return (
    <div className="flex justify-center  min-h-screen bg-slate-50 ">
      <div className=" bg-white p-4 w-[350px] h-[350px] my-4 flex shadow-md flex-col border rounded-md">
        <h1 className=" text-3xl font-semibold mb-3">New FAQ For Servicer</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col my-2">
            <div className="flex flex-col my-2">
              <label className="mb-1 font-semibold text-lg">Question</label>
              <input
                className="focus:outline-none border-2 p-2 rounded-md"
                type="text"
                placeholder="Question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <label className="mb-1 font-semibold text-lg">Answer</label>
            <textarea
              className="focus:outline-none border-2 p-2 rounded-md"
              type="text"
              placeholder="Answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded-md py-2 mt-2 "
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFaqForServicer;
