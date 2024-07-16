import React, { useEffect, useState } from "react";

import FaqCard from "./FaqCard";
import { useSelector } from "react-redux";
const Faq = () => {
  const [faqDetails, setFaqDetails] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const whoIs = () => {
    if (currentUser.roles === "user") {
      return "user";
    } else {
      return "servicer";
    }
  };

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await fetch(`/api/faq/${whoIs()}`);
        const data = await res.json();
        console.log(data);
        setFaqDetails(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFaq();
  }, []);

  return (
    <div className="lg:px-24 md:px-8 px-4 flex justify-center  h-screen">
      <div className=" mt-9 w-full ">
        <h1 className=" text-gray-600 text-center font-bold md:text-7xl text-[42px] sm:text-6xl mb-16">
          Questions? Look here.
        </h1>
        {faqDetails.length === 0 && <h1>No Faq available</h1>}
        {faqDetails.length > 0 && (
          <>
            {faqDetails.map((data) => (
              <FaqCard key={data._id} {...data} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Faq;
