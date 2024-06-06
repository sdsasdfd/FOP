import React, { useEffect, useState } from "react";
import ServicerList from "./ServicerList";
import { Link } from "react-router-dom";

const ServicersList = () => {
  const [servicerLists, setServicerLists] = useState([]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    urlParams.get("category");

    const categoryName = urlParams.toString();

    const fetchServicer = async () => {
      try {
        const res = await fetch(
          `/api/user/get-location-category?${categoryName}`
        );
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }
        setServicerLists(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchServicer();
  }, []);
  return (
    <div className="sm:ml-4  mt-6  lg:w-[calc(100%-250px)] ">
      {servicerLists.map((servicerList) => (
        <ServicerList key={servicerList._id} servicerList={servicerList} />
      ))}
    </div>
  );
};

export default ServicersList;
