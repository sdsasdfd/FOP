import React from "react";
import UserHero from "../../components/User/UserHero";
import ServicesOffer from "../../components/User/ServicesOffer";
import HowItWork from "../../components/User/HowItWork";
import Suggestion from "../../components/User/Suggestion";
import Footer from "../../components/footer/Footer";
const UserPage = () => {
  return (
    <>
      <div className=" ">
        <UserHero />
        <ServicesOffer />
        <HowItWork />
        <Suggestion />
      </div>

      <Footer />
    </>
  );
};

export default UserPage;
