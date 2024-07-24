import React, { useState } from "react";
import { toast } from "react-toastify";
const Suggestion = () => {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/testimonial/add-new-testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: suggestion }),
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        toast.error(data.message);
        setLoading(false);
        return;
      }
      toast.success("Suggestion has been sent");
      setLoading(false);
      setSuggestion("");
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <div className="my-8 px-6 sm:px-14">
      <h2 className="lg:px-16 text-4xl md:text-5xl mb-8 font-bold">
        Write About Us Here.
      </h2>

      <div className=" w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className=" my-8 w-full md:w[80%] lg:w-[70%] gap-4 flex justify-between "
        >
          <input
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            type="text"
            placeholder="Write..."
            className="px-2 w-[80%] py-[10px] focus:border-blue-600 border-[2px] border-slate-300 rounded-md focus:outline-none placeholder:text-gray-500 placeholder:text-lg"
          />
          <button
            disabled={loading}
            className=" w-[20%] bg-blue-600 text-white text-xl font-semibold rounded-md hover:bg-blue-500"
          >
            {loading ? (
              <div className="loading loading-spinner loading-md" />
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Suggestion;
