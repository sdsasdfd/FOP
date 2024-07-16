import React from "react";

const EditFaq = () => {
  return (
    <div className="flex justify-center  min-h-screen bg-slate-50 ">
      <div className=" bg-white p-4 w-[350px] h-[350px] my-4 flex shadow-md flex-col border rounded-md">
        <h1 className=" text-3xl font-semibold mb-3">Edit FAQ</h1>
        <form className="flex flex-col">
          <div className="flex flex-col my-2">
            <div className="flex flex-col my-2">
              <label className="mb-1 font-semibold text-lg">Question</label>
              <input
                className="focus:outline-none border-2 p-2 rounded-md"
                type="text"
                placeholder="Question..."
              />
            </div>

            <label className="mb-1 font-semibold text-lg">Answer</label>
            <textarea
              className="focus:outline-none border-2 p-2 rounded-md"
              type="text"
              placeholder="Answer..."
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

export default EditFaq;
