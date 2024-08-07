import React, { useContext, useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const ServicesOffer = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("/api/service/all-services");
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }

        setServices(data.categories);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategory();
  }, []);

  const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
    return (
      <button className="mr-3" onClick={() => scrollPrev()}>
        <FaArrowLeft />
      </button>
    );
  };

  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
    return (
      <button className="ml-3" onClick={() => scrollNext()}>
        <FaArrowRight />
      </button>
    );
  };
  return (
    <div className="my-6 px-6 sm:px-14">
      <h2 className="lg:px-12 my-8 text-4xl md:text-5xl mb-8 font-bold">
        Services Offer
      </h2>

      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {services.map((service) => (
          <div key={service._id}>
            <Link to={`servicers-list?category=${service.title.toLowerCase()}`}>
              <CategoryCard service={service} />
            </Link>
          </div>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default ServicesOffer;
