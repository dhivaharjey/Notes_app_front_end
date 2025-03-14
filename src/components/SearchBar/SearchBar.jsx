import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useNoteContext } from "../../context/NoteProvider";
import { toast } from "react-toastify";
import { axiosInstance } from "../../Utils/axiosInstance";

const SearchBar = () => {
  const {
    isSearch,
    searchQuery,
    setSearchQuery,
    setAllNotes,
    setIsSearch,
    getAllNotesOfUser,
  } = useNoteContext();

  // Searching the particular note using api call search query then updating the res data to setAllNotes() it shows the searched notes only ,we can clear the search using clearSearch() function
  const searchNote = async () => {
    try {
      // console.log(searchQuery);
      if (!searchQuery) {
        return toast.error("Enter words  search box!!");
      }
      const res = await axiosInstance.get(
        `/notes/search?search=${encodeURIComponent(searchQuery)}`
      );
      if (res?.data) {
        setIsSearch((prev) => !prev);

        setAllNotes(res?.data);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    }
  };
  // console.log(searchQuery);
  //Clearing the search Query after that calling await getAllNotesOfUser(); to show allnotes  of the user
  const clearSearch = async () => {
    setSearchQuery("");
    setIsSearch((prev) => !prev);
    await getAllNotesOfUser();
  };

  return (
    <div className="w-[50vw] md:w-[30vw]   flex items-center bg-slate-100 rounded-md ">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search Notes.."
        className=" w-full text-sm bg-transparent px-3 py-[8px] outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {isSearch ? (
        <IoMdClose
          size={22}
          className=" mr-3 text-slate-400 cursor-pointer hover:text-black"
          onClick={clearSearch}
        />
      ) : (
        <FaMagnifyingGlass
          size={20}
          className=" mr-3 text-slate-400 cursor-pointer hover:text-black"
          onClick={searchNote}
        />
      )}
    </div>
  );
};

export default SearchBar;
