// import React from "react";
// import { FaStar } from "react-icons/fa6";
// import { CiStar } from "react-icons/ci";
// import { FaRegStar } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import profileImg from "/img/profileImg.webp";
// const ServicerList = ({ servicerList }) => {
//   console.log(servicerList);
//   const description = servicerList?.description;
//   const id = servicerList?.servicerId._id;
//   console.log(servicerList.servicerId);
//   const price = servicerList?.price;

//   return (
//     <div className="mb-8 flex  flex-col gap-3 rounded-lg border p-6  shadow-lg">
//       <div className="flex items-center gap-4">
//         <img
//           src={profileImg || servicerList.servicerId?.image}
//           className="h-12 border w-12 rounded-full  sm:h-16 sm:w-16 md:h-20 md:w-20 "
//         />
//         <div className="w-[80%]">
//           <div className="flex items-center justify-between">
//             <h3 className="mb-1 pl-1 text-xl sm:text-3xl font-semibold">
//               {servicerList.servicerId.username}
//             </h3>
//             <span className="rounded-md text-sm bg-yellow-300 sm:p-1 p-[2px] sm:text-lg text-yellow-900">
//               {price} rs/Hour
//             </span>
//           </div>
//           <div className="mt-3  flex items-center gap-4">
//             <span className="rounded-md bg-blue-100 p-[2px] sm:p-1 sm:text-md text-sm text-blue-900">
//               {servicerList.servicerId.category}
//             </span>
//             <span className="rounded-md flex  sm:text-md sm:p-1 text-sm items-center gap-1 bg-green-100 p-1 text-green-900">
//               4.5 <FaStar />
//             </span>
//             <span className="rounded-md sm:p-1 text-sm bg-indigo-50 p-1 sm:text-md text-indigo-900">
//               reviews (1,200)
//             </span>
//           </div>
//         </div>
//       </div>
//       <div>
//         <p className="sm:text-md ml-2 text-slate-600">{description}</p>
//       </div>
//       <Link to={`${id}`}>
//         <button className=" w-full rounded-2xl bg-blue-500 py-1 text-white">
//           Visit
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default ServicerList;

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import profileImg from "/img/profileImg.webp";
const ServicerList = ({ servicerList }) => {
  // console.log(servicerList.price);
  const description = servicerList?.description;
  const id = servicerList?.servicerId._id;

  const price = servicerList?.price;

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
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/review/get-all-reviews/${id}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
        }
        setReviews(data.reviews || []);
        setStarCounts(data.starCounts || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
        setReviewCount(data.reviewCount || 0);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (id) {
      fetchReviews();
    }
  }, [id]);

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
      setScore(roundedScore);
    };

    calculateAverageRating();
  }, [reviews, starCounts]);

  // useEffect(() => {
  //   const getPriceFromGig = async () => {
  //     const res = await fetch(/api/gig//${id});
  //   }

  //   getPriceFromGig();
  // }, [])

  return (
    <div className="mb-8 flex  flex-col gap-3 rounded-lg border p-6  shadow-lg">
      <div className="flex items-center gap-4">
        <img
          src={servicerList.servicerId?.image || profileImg}
          className="h-12 border w-12 rounded-full  sm:h-16 sm:w-16 md:h-20 md:w-20 "
        />
        <div className="w-[80%]">
          <div className="flex items-center justify-between">
            <h3 className="mb-1 pl-1 text-xl sm:text-3xl font-semibold">
              {servicerList.servicerId.username}
            </h3>
            <span className="rounded-md text-sm bg-yellow-300 sm:p-1 p-[2px] sm:text-lg text-yellow-900">
              {price} rs/Hour
            </span>
          </div>
          <div className="mt-3  flex items-center gap-4">
            <span className="rounded-md bg-blue-100 p-[2px] sm:p-1 sm:text-md text-sm text-blue-900">
              {servicerList.servicerId.category}
            </span>
            <span className="rounded-md flex  sm:text-md sm:p-1 text-sm items-center gap-1 bg-green-100 p-1 text-green-900">
              {score} <FaStar />
            </span>
            <span className="rounded-md sm:p-1 text-sm bg-indigo-50 p-1 sm:text-md text-indigo-900">
              reviews ({reviewCount})
            </span>
          </div>
        </div>
      </div>
      <div>
        <p className="sm:text-md ml-2 text-slate-600">{description}</p>
      </div>
      <Link to={`${id}`}>
        <button className=" w-full rounded-2xl bg-blue-500 py-1 text-white">
          Visit
        </button>
      </Link>
    </div>
  );
};

export default ServicerList;
