import React from "react";
import Hero from "../../components/Landing/Hero";
import OurServices from "../../components/Landing/OurServices";
import WhyChooseUs from "../../components/Landing/WhyChooseUs";
import TestimonialsFromClient from "../../components/Landing/TestimonialsFromClient";
import Footer from "../../components/Landing/Footer";

const Home = () => {
  return (
    <div className=" bg-slate-50 ">
      <Hero />
      <OurServices />
      <WhyChooseUs />
      <TestimonialsFromClient />
      <Footer />
    </div>
  );
};

export default Home;
