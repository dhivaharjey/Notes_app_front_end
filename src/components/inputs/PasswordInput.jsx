import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({
  inputName,
  placeholder,
  value,
  handleChange,
  handleBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className=" flex items-center text-sm bg-zinc-50 border-[1.5px] px-5 rounded-xl mb-4 outline-none">
      <input
        name={inputName}
        placeholder={placeholder || "password"}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className=" w-full text-sm bg-zinc-50 py-3 mr-3 rounded-xl outline-none"
        required
      />
      <div onClick={togglePassword} className=" cursor-pointer ">
        {showPassword ? (
          <FaRegEye size={22} className="text-primary" />
        ) : (
          <FaRegEyeSlash size={22} className=" text-slate-500" />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
