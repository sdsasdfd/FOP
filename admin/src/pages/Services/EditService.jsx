import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditService = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const { id } = useParams();
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/service/${id}`);
        const data = await res.json();
        // setDescription(data.description);
        // setTitle(data.title);
        // setImage(data.image);
        setFormData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/service/update/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image }),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      navigate("/services");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center  min-h-[500px] bg-slate-50 ">
      <div className=" bg-white p-4 w-[350px] my-4 flex shadow-md flex-col border rounded-md">
        <h1 className=" text-3xl font-semibold mb-3">Update Service</h1>
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

            <div className=" relative">
              <img
                src={formData.image}
                className="w-full h-36 rounded-md object-cover my-2 border-2   p-2"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col my-2">
            <label className="mb-1 font-semibold text-lg">Title</label>
            <input
              className="focus:outline-none border-2 p-2 rounded-md"
              type="text"
              placeholder="Name..."
              defaultValue={formData.title}
              id="title"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              onChange={handleChange}
            />
          </div>
          <div className=" flex flex-col my-2">
            <label className="mb-1 font-semibold text-lg">Description</label>
            <textarea
              className="focus:outline-none border-2 p-2 rounded-md"
              placeholder="Description..."
              defaultValue={formData.description}
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
              id="description"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 mt-2 "
          >
            Update Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditService;
