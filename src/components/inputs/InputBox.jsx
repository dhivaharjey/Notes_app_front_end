import React from "react";

const InputBox = ({
  id,
  inputName,
  placeholder,
  type,
  value,
  handleChange,
  handleBlur,
}) => {
  return (
    <>
      <div className=" flex items-center text-sm bg-zinc-50 border-[1.5px] px-5 rounded-xl mb-4 outline-none">
        <input
          id={id}
          name={inputName}
          placeholder={placeholder || " input"}
          type={type || "text"}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className=" w-full text-sm bg-zinc-50 py-3 mr-3 rounded-xl outline-none"
          required
        />
      </div>
    </>
  );
};

export default InputBox;
