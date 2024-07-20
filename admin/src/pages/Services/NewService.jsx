import React, { useRef, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NewService = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/service/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image }),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
      }
      console.log(data);
      setLoading(false);
      navigate("/services");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex justify-center  min-h-[500px] bg-slate-50 ">
      <div className=" bg-white p-4 w-[350px] my-4 flex shadow-md flex-col border rounded-md">
        <h1 className=" text-3xl font-semibold mb-3">New Service</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col my-2">
            <label className=" font-semibold text-lg mb-1">Image</label>
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md py-1"
              onClick={() => imageRef.current.click()}
            >
              Select Image
            </button>
            <input
              ref={imageRef}
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImage(e)}
            />
            {image && (
              <div className=" relative">
                <img
                  src={image}
                  className="w-full h-36 rounded-md object-cover my-2 border-2   p-2"
                  alt=""
                />
                <span>
                  <IoIosCloseCircle
                    className=" absolute top-0 right-[-10px] text-3xl cursor-pointer text-gray-500"
                    onClick={(e) => {
                      setImage(null);
                      e.target.value = null;
                    }}
                  />
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col my-2">
            <label className="mb-1 font-semibold text-lg">Title</label>
            <input
              className="focus:outline-none border-2 p-2 rounded-md"
              type="text"
              placeholder="Name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            {loading ? "Creating Category..." : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewService;
