import React, { useEffect, useState } from "react";
const bgImage = "/img/bgImg.jpg";
const Img = "/img/Bgimg1.jpg";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
const UserHero = () => {
  const [inputCategoryTitle, setInputCategoryTitle] = useState("");
  const [results, setResults] = useState([]);

  const handleSearchCategory = async () => {
    try {
      const res = await fetch(
        `/api/user/search-category?inputCategoryTitle=${inputCategoryTitle}`
      );
      const data = await res.json();
      console.log(data);
      setResults(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (inputCategoryTitle.trim()) {
      handleSearchCategory();
    } else {
      setResults([]);
    }
  }, [inputCategoryTitle]);
  return (
    <div
      className="bg-cover object-cover bg-center h-[calc(100vh-4.5rem)] flex justify-start items-center dark:bg-neutral-700 px-4 sm:pl-14"
      style={{ backgroundImage: `url(${Img})` }}
    >
      <div className="flex  flex-col">
        <h1 className="text-white text-2xl sm:text-5xl font-bold">
          Making Home Services Easy
        </h1>
        <p className="text-white text-[16px] sm:text-[18px] my-4">
          Experience excellence and convenience with our expert home services,
          including cleaning, mounting, cooking, <br /> plumbing, painting and
          more. Our skilled professionals bring top-tier quality to your
          doorstep.
        </p>
        <div className="bg-slate-100 rounded-md flex items-center relative py-4 px-2 gap-4 sm:w-[400px] md:w-[550px] lg:w-[680px]">
          <CiSearch className="text-2xl" />
          <input
            type="text"
            className="bg-transparent w-[80%] outline-none "
            placeholder="Search..."
            value={inputCategoryTitle}
            onChange={(e) => setInputCategoryTitle(e.target.value)}
          />
        </div>

        <div className="absolute bottom-[-20px]  h-[200px] sm:w-[400px] w-[360px]  md:w-[550px] lg:w-[680px] ">
          {results.map((result) => (
            <Link
              key={result._id}
              to={`servicers-list?category=${result.title.toLowerCase()}`}
              className=" bg-slate-200 h-[80px] flex mb-3 p-4 rounded-md  gap-4"
            >
              <img
                className="w-20 h-20 object-cover"
                src={result.image}
                alt=""
              />
              <div className=" flex flex-col">
                <span className=" font-semibold text-3xl">{result.title}</span>
                <p> {result.description} </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHero;
