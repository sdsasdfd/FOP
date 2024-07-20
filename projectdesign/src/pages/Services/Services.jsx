import React, { useEffect, useState } from "react";
import CategoryCard from "../../components/User/CategoryCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Services = () => {
  const [services, setServices] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

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
  return (
    <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3  mt-10 sm:px-14 ">
      {services.map((service) => (
        <div key={service._id}>
          <Link
            to={
              currentUser?._id
                ? `/user-home/servicers-list?category=${service.title.toLowerCase()}`
                : "/login"
            }
          >
            <CategoryCard service={service} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Services;
