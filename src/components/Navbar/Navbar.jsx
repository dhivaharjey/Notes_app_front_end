import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useAppContext } from "../../context/AuthContext";

const Navbar = () => {
  const { userInfo } = useAppContext();
  // console.log(userInfo);

  return (
    <div className="h-[4rem]  bg-white dark:bg-blue-800 flex items-center justify-between px-2 sm:px-6   sm:py-3 drop-shadow-xl sticky top-0 ">
      <h2 className=" text-xl font-medium text-black dark:text-white py-2   ">
        Notes
      </h2>
      {userInfo && <SearchBar />}
      {userInfo && <ProfileInfo />}
    </div>
  );
};

export default Navbar;
