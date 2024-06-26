import React, { useEffect, useState } from "react";
import bgImg from "/img/tv-mounting.jpg";
import { IoLocationOutline } from "react-icons/io5";

import { useParams } from "react-router-dom";
const ServicerProfile = () => {
  const { id } = useParams();

  const [servicerInfo, setServicerInfo] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`/api/gig/${id}`);
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }
        console.log(data);
        setServicerInfo(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/review/get-all-reviews/${id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }

        setReviews(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    // fetchReviews();
  }, []);

  const handleSendRequest = async () => {
    try {
      const res = await fetch(`/api/message/create/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      });
      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-6  px-4">
      {/* //Hero Section with img */}
      <div
        className=" h-[450px] md:pl-8 pl-4 rounded-lg text-white flex flex-col justify-end"
        style={{
          backgroundImage: `url(${servicerInfo.coverImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          objectFit: "cover",
        }}
      >
        <h1 className="text-4xl font-bold mb-4">Book a cleaning with</h1>
        <p className="mb-4">{servicerInfo?.description}</p>
        <div className="mb-8 flex gap-4  ">
          <button className="bg-blue-600 py-2 px-2 rounded-lg font-semibold">
            {servicerInfo.price}rs/Hour
          </button>
          <button className="bg-gray-300 font-semibold px-2 rounded-md py-1 text-black">
            Request
          </button>
        </div>
      </div>

      {/* //Servicer naming */}
      <div className="flex md:flex-row flex-col mb-8 mt-12 gap-4">
        <div className="w-full  md:w-[70%] ">
          <div className="flex mb-4 justify-between">
            <div className="flex gap-4 items-center">
              <img
                src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
                alt="user avatar"
                className="w-24 h-24 border rounded-full"
              />

              <h1 className="text-xl font-bold">
                {servicerInfo?.servicerId?.username}
              </h1>
            </div>
            <div className="flex gap-4 items-center ">
              <span
                className="flex items-center
          "
              >
                <IoLocationOutline className="font-bold text-lg" />
                <span className="font-semibold">
                  {servicerInfo.servicerId?.location}
                </span>
              </span>
              <span className="bg-blue-600 text-white py-1 px-1 rounded-md">
                4.9 (30)
              </span>
            </div>
          </div>
          <hr />
          <div className="mt-8 sm:border-b pb-4">
            <h2 className="font-bold text-2xl">
              About {servicerInfo.servicerId?.username}
            </h2>
            <p className="text-md font-semibold ">
              {servicerInfo?.description}
            </p>
          </div>
        </div>
        <div className=" w-full md:w-[28%] shadow-md rounded-md border p-4">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
            <div className="flex flex-wrap gap-2 ">
              {servicerInfo?.subCategory?.map((category, index) => (
                <span
                  key={index}
                  className="bg-gray-300 font-semibold px-2 rounded-lg py-1"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleSendRequest}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Request {servicerInfo.servicerId?.username}
          </button>
        </div>
      </div>
      {/* Ratings */}
      <div className="md:w-[70%] w-full mb-8">
        <h1 className="text-2xl font-semibold mb-4">Reviews</h1>
        <div className="flex flex-col sm:flex-row sm:gap-8 gap-2">
          <div className="flex flex-row items-center sm:flex-col gap-2">
            <span className="text-4xl mb-4 font-bold">4.8</span>
            <div className="flex sm:flex-col flex-row gap-2">
              <div className="rating mb-3">
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 bg-green-500"
                />
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 bg-green-500"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 bg-green-500"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 bg-green-500"
                />
                <input
                  type="radio"
                  name="rating-4"
                  className="mask mask-star-2 bg-green-500"
                />
              </div>
              <span className="text-lg font-medium">30 reviews</span>
            </div>
          </div>
          <div className="flex  flex-col gap-3">
            <div className="flex gap-4 items-center">
              <span className="font-semibold">5 Stars</span>
              <progress
                className="progress w-56"
                value={0}
                max="100"
              ></progress>
              <span className="font-semibold">(30)</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-semibold">4 Stars</span>
              <progress
                className="progress w-56"
                value="10"
                max="100"
              ></progress>
              <span className="font-semibold">(10)</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-semibold">3 Stars</span>
              <progress
                className="progress w-56"
                value="40"
                max="100"
              ></progress>
              <span className="font-semibold">(10)</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-semibold">2 Stars</span>
              <progress
                className="progress w-56"
                value="40"
                max="100"
              ></progress>
              <span className="font-semibold">(10)</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-semibold">1 Stars</span>
              <progress
                className="progress w-56"
                value="40"
                max="100"
              ></progress>
              <span className="font-semibold">(10)</span>
            </div>
          </div>
        </div>
      </div>
      {/* user Reviews */}
      {/* first */}
      <div className="md:w-[70%] w-full">
        {reviews.map((review) => (
          <div className="mb-4  flex flex-col">
            <div className="flex mb-4 items-center">
              <img
                src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
                alt=""
                className="w-20 h-20"
              />{" "}
              <div className="flex flex-col">
                <span className="font-bold text-[18px] ">
                  {review.userId.username}{" "}
                </span>
                <span> {review.createdAt} </span>
              </div>
            </div>
            <div className="rating mb-4 rating-sm gap-[2px]">
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-gray-700"
                checked
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-gray-700"
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-gray-700"
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-gray-700"
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-gray-700"
              />
            </div>
            <p className="font-semibold">{review.desc}</p>
          </div>
        ))}
        {/* second */}
        <div className="mb-4  flex flex-col">
          <div className="flex mb-4 items-center">
            <img
              src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
              alt=""
              className="w-20 h-20"
            />
            <div className="flex flex-col">
              <span className="font-bold text-[18px] ">John</span>
              <span>Jan 1 2024</span>
            </div>
          </div>
          <div className="rating mb-4 rating-sm gap-[2px]">
            <input
              type="radio"
              name="rating-3"
              className="mask mask-star-2 bg-gray-700"
            />
            <input
              type="radio"
              name="rating-3"
              className="mask mask-star-2 bg-gray-700"
            />
            <input
              type="radio"
              name="rating-3"
              className="mask mask-star-3 bg-gray-700"
            />
            <input
              type="radio"
              name="rating-3"
              className="mask mask-star-2 bg-gray-700"
              checked
            />
            <input
              type="radio"
              name="rating-3"
              className="mask mask-star-2 bg-gray-700"
            />
          </div>
          <p className="font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
            consectetur. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Harum, tempora totam. Sequi eos delectus adipisci at pariatur
            incidunt id nobis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicerProfile;
