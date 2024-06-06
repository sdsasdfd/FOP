import React from "react";
import UserHero from "../../components/User/UserHero";
import ServicesOffer from "../../components/User/ServicesOffer";

const UserPage = () => {
  return (
    <div className=" px-6 sm:px-14">
      <UserHero />
      <ServicesOffer />
    </div>
  );
};

export default UserPage;
