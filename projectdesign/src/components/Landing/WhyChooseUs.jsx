import React from "react";

const WhyChooseUs = () => {
  return (
    <div className=" bg-slate-200 py-4 my-14 px-8 sm:px-8 md:px-14 lg:px-24">
      <div className=" flex flex-col gap-1 text-center">
        <span className=" font-[400] text-lg text-blue-500">SOME REASON</span>
        <span className=" text-5xl font-bold">Why Choose Us</span>
      </div>

      <div className="my-14 flex gap-6 flex-wrap ">
        <div className=" flex items-start gap-2 md:w-[350px] w-full mb-5 ">
          <span className=" text-blue-600 font-medium text-lg">01</span>
          <span className="w-[80px] mt-3 bg-slate-800 h-[2px]"></span>
          <div className="flex flex-col">
            <h2 className=" font-bold text-lg">
              Convenience at Your Fingertips
            </h2>
            <p className=" font-medium text-gray-500">
              Our platform simplifies the process of booking home services. With
              just a few clicks, you can schedule appointments at your preferred
              time without any hassle.
            </p>
          </div>
        </div>

        <div className=" flex items-start gap-2 md:w-[350px] w-full mb-5 ">
          <span className=" text-blue-600 font-medium text-lg">02</span>
          <span className="w-[80px] mt-3 bg-slate-800 h-[2px]"></span>
          <div className="flex flex-col">
            <h2 className=" font-bold text-lg">Trusted Professionals</h2>
            <p className=" font-medium text-gray-500">
              We handpick and thoroughly vet all our service providers to ensure
              you receive top-quality and reliable service every time.
            </p>
          </div>
        </div>

        <div className=" flex items-start gap-2 md:w-[350px] w-full mb-5 ">
          <span className=" text-blue-600 font-medium text-lg">03</span>
          <span className="w-[80px] mt-3 bg-slate-800 h-[2px]"></span>
          <div className="flex flex-col">
            <h2 className=" font-bold text-lg">Transparent Pricing</h2>
            <p className=" font-medium text-gray-500">
              No hidden fees or surprise charges. Our pricing is clear and
              upfront, so you know exactly what to expect.
            </p>
          </div>
        </div>

        <div className=" flex items-start gap-2 md:w-[350px] w-full mb-5 ">
          <span className=" text-blue-600 font-medium text-lg">04</span>
          <span className="w-[80px] mt-3 bg-slate-800 h-[2px]"></span>
          <div className="flex flex-col">
            <h2 className=" font-bold text-lg">Wide Range of Services</h2>
            <p className=" font-medium text-gray-500">
              From plumbing and electrical work to cleaning and gardening, we
              offer a comprehensive range of services to meet all your home
              needs.
            </p>
          </div>
        </div>

        <div className=" flex items-start gap-2 md:w-[350px] w-full mb-5 ">
          <span className=" text-blue-600 font-medium text-lg">05</span>
          <span className="w-[80px] mt-3 bg-slate-800 h-[2px]"></span>
          <div className="flex flex-col">
            <h2 className=" font-bold text-lg">
              Customer Satisfaction Guaranteed
            </h2>
            <p className=" font-medium text-gray-500">
              We prioritize your satisfaction. If you’re not happy with the
              service, we’ll make it right. Your feedback is important to us.
            </p>
          </div>
        </div>

        <div className=" flex items-start gap-2 md:w-[350px] w-full mb-5 ">
          <span className=" text-blue-600 font-medium text-lg">06</span>
          <span className="w-[80px] mt-3 bg-slate-800 h-[2px]"></span>
          <div className="flex flex-col">
            <h2 className=" font-bold text-lg">Easy Communication</h2>
            <p className=" font-medium text-gray-500">
              Stay informed with real-time updates and direct communication with
              service providers, ensuring a smooth and efficient experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
