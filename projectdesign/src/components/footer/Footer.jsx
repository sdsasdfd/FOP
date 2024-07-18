import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  const [serviceNames, setServiceNames] = useState([]);
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await fetch("/api/category/names");
        const data = await res.json();

        setServiceNames(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNames();
  }, []);
  return (
    <div className=" px-6 md:px-20 border-t-2 py-5">
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-between">
        <div className="mt-4 flex-1 ">
          <Logo />
        </div>
        <div className=" flex flex-col gap-3 mb-4">
          <Link>Home</Link>
          <Link>Services</Link>
          <Link>FAQ</Link>
          <Link>Messages</Link>
        </div>
        <div className=" flex flex-col gap-3">
          <span className=" font-semibold text-lg">Location</span>
          <span>Jhelum</span>
          <span>Dina</span>
          <span>Lahore</span>
          <span>Karachi</span>
          <span>Multan</span>
        </div>
        <div className=" flex flex-col gap-3">
          <span className=" font-semibold text-lg">Services</span>
          {serviceNames.map((service) => (
            <span key={service}> {service} </span>
          ))}
        </div>
      </div>
      <div className=" mt-3">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved Industries
          Ltd
        </p>
      </div>
    </div>
  );
};

export default Footer;
