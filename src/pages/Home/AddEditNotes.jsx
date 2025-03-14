import React, { useCallback, useEffect, useState } from "react";
import TagInput from "../../components/inputs/TagInput";
import { MdClose } from "react-icons/md";
import { axiosInstance } from "../../Utils/axiosInstance";
import { toast } from "react-toastify";
import { useNoteContext } from "../../context/NoteProvider";
import Loader from "../../components/Theme/Loader/Loader";

const AddEditNotes = ({ noteData, type, handleModalClose }) => {
  // console.log(noteData);

  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { getAllNotesOfUser } = useNoteContext();

  const editNote = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const payload = {
        title,
        content,
        tags,
        isPinned: noteData?.isPinned,
      };
      const res = await axiosInstance.put(`/notes/${noteData._id}`, payload);
      if (res?.data) {
        // setIsLoading(false);
        setError(null);
        await getAllNotesOfUser();
        handleModalClose();

        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errMsg);

      // setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewNote = async () => {
    try {
      setError("");
      setIsLoading(true);

      const payload = {
        title,
        content,
        isPinned: false,
        tags,
      };
      const res = await axiosInstance.post("/notes", payload);
      if (res?.data) {
        handleModalClose();
        await getAllNotesOfUser();
        toast.success(res?.data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errMsg);
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddEditNote = async () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");
    if (type === "edit") {
      await editNote();
    } else {
      await addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-5 h-5 rounded-full flex justify-center items-center absolute -top-1 -right-2 hover:bg-slate-500 "
        onClick={handleModalClose}
      >
        <MdClose
          size={26}
          className="hover:text-white
        text-slate-400 dark:text-white"
        />
      </button>
      <div className="flex flex-col gap-2 ">
        <label htmlFor="" className="input-label">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="text-2xl text-slate-950 outline-none p-2 rounded"
          placeholder="Title"
          autoFocus
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // value={notesData?.title}
          // onChange={handleNotesDataChange}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="" className="input-label">
          Content
        </label>
        <textarea
          name="content"
          id="content"
          className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded"
          placeholder="Content"
          required
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          // value={notesData?.content}
          // onChange={handleNotesDataChange}
        />
      </div>
      <div className="mt-3">
        <label htmlFor="" className="input-label">
          TAGS
        </label>
        <TagInput
          tags={tags}
          setTags={setTags}
          // addNewTag={addNewTag}
        />
      </div>
      {/* {tags?.map((tag, index) => (
        <p key={index} className="px-3 py-1 ">
          {tag}
        </p>
      ))} */}
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button
        className="btn-primary font-medium mt-5 p-3
        "
        onClick={handleAddEditNote}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex justify-center">
            <Loader />
          </span>
        ) : type === "edit" ? (
          "UPDATE"
        ) : (
          "ADD"
        )}
      </button>
    </div>
  );
};

export default AddEditNotes;
