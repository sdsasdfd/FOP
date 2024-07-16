import React, { useEffect, useState } from "react";
import CategoryCard from "../../components/User/CategoryCard";
import { Link } from "react-router-dom";

const Services = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch("/api/category/all-category");
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
        }

        setCategories(data.categories);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategory();
  }, []);
  return (
    <div className="flex flex-wrap mt-10 sm:pl-14 justify-center sm:justify-normal">
      {categories.map((category) => (
        <div key={category._id}>
          <Link
            to={`/user-home/servicers-list?category=${category.title.toLowerCase()}`}
          >
            <CategoryCard category={category} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Services;
