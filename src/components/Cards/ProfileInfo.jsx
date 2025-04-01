import React, { useState } from "react";
import { useAppContext } from "../../context/AuthContext";
import Theme from "../Theme/Theme";
import { useNoteContext } from "../../context/NoteProvider";

const ProfileInfo = () => {
  const [show, setShow] = useState(false);
  const { userInfo, logout } = useAppContext();
  const handleLogout = async () => {
    // setUserInfo(null);
    await logout();
  };
  return (
    <div className="flex justify-center items-center gap-3 ">
      <Theme />

      <div
        className="flex sm:items-center gap3 cursor-pointer "
        onClick={() => setShow((prev) => !prev)}
      >
        <div className=" relative w-7 h-7 sm:w-11 sm:h-11  flex items-center justify-center rounded-full text-slate-950 font-bold text-lg bg-slate-100">
          {userInfo?.userName?.charAt(0)}
        </div>

        <div
          className={` absolute top-[3.7rem] right-6  bg-slate-200 p-3 rounded-md flex flex-col transition-all duration-250 ease-in z-[1000] ",
          ${
            show
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible"
          }
          `}
        >
          <p className=" text-md font-medium">{userInfo?.userName}</p>
          <button
            className=" text-md text-slate-700 underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
