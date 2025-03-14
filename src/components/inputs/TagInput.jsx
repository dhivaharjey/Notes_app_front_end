import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  // To add new Tag
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags((prev) => [...prev, inputValue.trim()]);
      setInputValue("");
    } else {
      toast.error("Enter tags !!!");
    }
  };

  // When user press Enter button to add new tag
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputValue.trim() !== "") {
        // setTags((prev) => [...prev, inputValue.trim()]);
        addNewTag();
        // addNewTag(inputValue);
        // setInputValue("");
      }
    }
  };
  // console.log("render") ;
  // To Remove tag
  const handleRemove = (tagRemove) => {
    const filterTags = tags?.filter((tag) => tag !== tagRemove);
    setTags(filterTags);
  };
  return (
    <div>
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border  px-3 py-2 outline-none"
          placeholder="Add Tags"
          required
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() => {
            // addNewTag(inputValue);
            // setInputValue("");
            addNewTag();
          }}
          className="w-7 h-7 flex items-center justify-center border border-blue-700 dark:border-white rounded-2xl  hover:bg-blue-700 hover:text-white"
        >
          <MdAdd className="text-2xl  text-blue-700 dark:text-white  hover:text-white  " />
        </button>
      </div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags?.map((tag, index) => (
            <>
              <span
                key={tags?.lenght + 1}
                className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded-md "
              >
                #{tag}
                <button
                  onClick={() => {
                    handleRemove(tag);
                  }}
                >
                  <MdClose />
                </button>
              </span>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
