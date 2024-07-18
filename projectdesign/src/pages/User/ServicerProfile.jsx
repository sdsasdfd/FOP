import React, { useEffect, useState } from "react";
import bgImg from "/img/tv-mounting.jpg";
import { IoLocationOutline } from "react-icons/io5";

import profileImg from "/img/profileImg.webp";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const ServicerProfile = () => {
  const { id } = useParams();

  const [servicerInfo, setServicerInfo] = useState({});
  const [reviews, setReviews] = useState([]);
  const [starCounts, setStarCounts] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [score, setScore] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`/api/gig/${id}`);
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }
        // console.log(data);
        setServicerInfo(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchInfo();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/review/get-all-reviews/${id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        console.log(data);
        setReviews(data.reviews || []);
        setStarCounts(data.starCounts || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
        setReviewCount(data.reviewCount || 0);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (servicerInfo._id) {
      fetchReviews();
    }
  }, [servicerInfo]);

  const handleSendRequest = async () => {
    try {
      const res = await fetch(`/api/message/create/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      });
      const data = await res.json();
      toast.success("Request message send!");
      // console.log(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const calculateAverageRating = () => {
      const starCountValues = Object.values(starCounts);

      const totalScore = starCountValues.reduce((total, count, index) => {
        return total + count * (index + 1);
      }, 0);

      const sumOfResponses = starCountValues.reduce(
        (acc, currentStar) => acc + currentStar,
        0
      );

      const score = sumOfResponses ? totalScore / sumOfResponses : 0;

      const roundedScore = score.toFixed(1);
      console.log(roundedScore);
      setScore(roundedScore);
    };

    calculateAverageRating();
  }, [reviews, starCounts]);

  //formatting date for reviews
  function formatDate(createdAt) {
    const date = new Date(createdAt);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="container mx-auto mt-6  px-4">
      {/* //Hero Section with img */}
      <div
        className="h-[450px] md:pl-8 pl-4 rounded-lg text-white flex flex-col justify-end"
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
          <button
            onClick={handleSendRequest}
            className="bg-gray-300 font-semibold px-2 rounded-md py-1 text-black"
          >
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
                src={servicerInfo?.servicerId?.image || profileImg}
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
                {score} ({reviewCount})
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
            <span className="text-4xl mb-4 font-bold">{score}</span>
            <div className="flex sm:flex-col flex-row gap-2">
              <div className="rating mb-3 rating-sm gap-[2px]">
                {Array.from({ length: 5 }).map((_, index) => {
                  let starClass = "bg-gray-300";
                  if (index < Math.floor(score)) {
                    starClass = "bg-yellow-500"; // Full star
                  } else if (index === Math.floor(score) && score % 1 !== 0) {
                    starClass = "bg-yellow-500"; // Half star
                  }

                  return (
                    <span
                      key={index}
                      className={`inline-block w-5 h-5 mask mask-star-2 ${starClass}`}
                    ></span>
                  );
                })}
              </div>

              {/* <div className="rating mb-3">
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
              </div> */}
              <span className="text-lg font-medium">{reviewCount} reviews</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <div className="flex gap-4 items-center" key={star}>
                <span className="font-semibold">{star} Stars</span>
                <progress
                  className="progress w-56"
                  value={starCounts[star]}
                  max={reviews.length}
                ></progress>
                <span className="font-semibold">({starCounts[star]})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* user Reviews */}
      <div className="md:w-[70%] w-full">
        {reviews.length === 0 && (
          <span className=" font-medium text-xl">No Reviews</span>
        )}
        {reviews.map((review) => (
          <div key={review._id} className="mb-4  flex flex-col">
            <div className="flex mb-4 gap-4 items-center">
              <img
                src={review.userId.image || profileImg}
                alt=""
                className="w-20 h-20 rounded-full object-cover"
              />{" "}
              <div className="flex flex-col">
                <span className="font-bold text-[18px] ">
                  {review.userId.username}{" "}
                </span>
                <span> {formatDate(review.createdAt)} </span>
              </div>
            </div>
            <div className="rating mb-4 rating-sm gap-[2px]">
              {Array.from({ length: 5 }).map((_, index) => (
                <input
                  key={index}
                  type="radio"
                  name={`rating-${review._id}`}
                  className={`mask mask-star-2 ${
                    index < review.star ? "bg-yellow-500" : "bg-gray-300"
                  }`}
                  checked={index < review.star}
                  readOnly
                />
              ))}
            </div>
            <p className="font-semibold">{review.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicerProfile;
