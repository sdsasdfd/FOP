import React, { useEffect, useState } from "react";
import testimonialIcon from "../../assets/testimonial.png";
const TestimonialsFromClient = () => {
  const [testimonials, setTestimonials] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonial/get-all-testimonials");

        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          console.log(data.message);
          return;
        }
        console.log(data);
        setTestimonials(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className=" bg-slate-50 py-4 my-14 px-8 sm:px-8 md:px-14 lg:px-24">
      <div className=" flex flex-col gap-1 text-center">
        <span className=" font-[400] text-lg text-blue-500">TESTIMONIALS</span>
        <span className=" text-5xl font-bold">What Our Clients Say</span>
      </div>
      <div className="my-14 flex gap-6 flex-wrap text-center">
        {testimonials?.slice(0, 3)?.map((testimonial) => (
          <div
            key={testimonial._id}
            className="  md:w-[350px] w-full gap-5 flex flex-col mb-5 items-center"
          >
            <img
              className=""
              width={30}
              height={30}
              src={testimonialIcon}
              alt=""
            />
            <p className=" text-gray-400 text-[19px]">
              {testimonial.description}
            </p>
            <span className="font-bold text-blue-600 text-[20px]">
              {testimonial.user.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsFromClient;
