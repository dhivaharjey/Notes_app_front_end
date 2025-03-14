import React from "react";

const EmptyCard = ({ message, image }) => {
  return (
    <div className="h-dvh mx-0 min-w-[100%] flex flex-col justify-center items-center dark:bg-slate-700">
      <img src={image} className="w-40 h-40 sm:w-72 sm:h-72" />
      <p className=" w-[100%] md:w-1/3  text-md font-medium text-slate-700  dark:text-white md:text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
