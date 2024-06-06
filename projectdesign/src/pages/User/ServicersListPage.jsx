import React from "react";
import ServicersList from "../../components/ServicersListPage/ServicersList";
import FilterServicer from "../../components/ServicersListPage/FilterServicer";

const ServicersListPage = () => {
  return (
    <div className="flex md:flex-row flex-col my-9 gap-2 lg:px-20 px-4 md:px-8">
      <FilterServicer />
      <ServicersList />
    </div>
  );
};

export default ServicersListPage;
