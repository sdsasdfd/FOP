import React, { useEffect, useState } from "react";
import ServicerListCard from "./ServicerListCard";
import { Link } from "react-router-dom";

const ServicersList = ({ sortingOption }) => {
  const [servicerLists, setServicerLists] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.get("category");

    const categoryName = urlParams.toString();
    // console.log(categoryName);

    const fetchServicer = async () => {
      try {
        const res = await fetch(
          `/api/user/get-location-category?${categoryName}&sortingOrder=${sortingOption}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          console.log(data.message);
        }
        console.log(data);

        setServicerLists(data);
        // console.log(data);
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      }
    };
    fetchServicer();
  }, [sortingOption]);

  if (error) {
    return <div> {error} </div>;
  }
  return (
    <div className="sm:ml-4  mt-6  lg:w-[calc(100%-250px)] ">
      {servicerLists?.map((servicerList) => (
        <ServicerListCard key={servicerList._id} servicerList={servicerList} />
      ))}
    </div>
  );
};

export default ServicersList;
