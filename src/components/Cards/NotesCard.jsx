import moment from "moment-timezone";
import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

const NotesCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  handleEdit,
  handleDelete,
  handlePinNote,
}) => {
  // console.log("note comp", tags);

  return (
    <div className="border rounded-md p-4 bg-white hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-[250] ease-in-out shadow-md">
      <div className="flex items-center justify-between ">
        <div>
          <h6 className="text-sm font-medium text-black">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment.utc(date).tz("Asia/Kolkata").format("Do  MMM YYYY hh:mm A")}
          </span>
        </div>
        <MdOutlinePushPin
          size={20}
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={handlePinNote}
        />
      </div>
      <p className=" text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500 ">
          {tags?.map((tag, index) => (
            <span key={index} className="mr-[1px]">
              <span className=" font-medium text-slate-600 ">#</span>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <MdCreate
            size={22}
            className="icon-btn hover:text-green-600"
            onClick={handleEdit}
          />

          <MdDelete
            size={22}
            className="icon-btn hover:text-red-500"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NotesCard;
